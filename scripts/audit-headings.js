// Heading line-break audit. In the browser console on the dev server:
//   const { auditHeadings } = await import("/scripts/audit-headings.js");
//   console.log(await auditHeadings([1440, 390]));
// Renders every sitemap page in an off-screen iframe at each width and reports
// how each display heading wraps, flagging lines that end on a connector word,
// split a protected phrase, or leave a one-word last line. Pass
// { all: true } to list every multi-line heading, flagged or not.

const STOP = new Set(
  "a an the to of for with and & or in on at by from into your our its their how as than per".split(
    " ",
  ),
);
const PHRASES = [
  "Kentucky Bluegrass",
  "Bluegrass sod",
  "Southern Ontario",
  "Greater Toronto",
  "Toronto Area",
  "Lake Ontario",
  "your property",
  "your home",
  "your project",
];

function lines(doc, h, fs) {
  const words = [];
  const walker = doc.createTreeWalker(h, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    for (const m of node.data.matchAll(/\S+/g)) {
      const r = doc.createRange();
      r.setStart(node, m.index);
      r.setEnd(node, m.index + m[0].length);
      const rect = r.getClientRects()[0];
      if (!rect) continue;
      const last = words[words.length - 1];
      // Punctuation in its own text node ("Guelph" + "?") belongs to the word.
      if (
        last &&
        Math.abs(rect.left - last.right) < 1 &&
        Math.abs(rect.top - last.top) < fs / 2
      ) {
        last.text += m[0];
        last.right = rect.right;
      } else words.push({ text: m[0], top: rect.top, right: rect.right });
    }
  }
  const out = [];
  let top = null;
  for (const w of words) {
    if (top === null || Math.abs(w.top - top) > fs / 2) {
      out.push([w.text]);
      top = w.top;
    } else out[out.length - 1].push(w.text);
  }
  const L = out.map((l) => l.join(" "));
  L.right = Math.max(0, ...words.map((w) => w.right));
  return L;
}

function flags(L) {
  const f = [];
  L.slice(0, -1).forEach((l, i) => {
    const last = l.split(" ").pop();
    if (STOP.has(last.toLowerCase().replace(/[^a-z&]/g, "")))
      f.push(`ends:${last}`);
    const pair = `${last} ${L[i + 1].split(" ")[0]}`
      .replace(/[,.?:]/g, "")
      .toLowerCase();
    for (const p of PHRASES) if (pair === p.toLowerCase()) f.push(`split:${p}`);
  });
  if (L.length > 1 && !L[L.length - 1].includes(" ")) f.push("orphan");
  return f;
}

export async function auditHeadings(widths, { all = false, only } = {}) {
  const xml = await (await fetch("/sitemap.xml")).text();
  let paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname,
  );
  if (only) paths = paths.filter(only);
  const seen = new Map();
  const report = [];
  for (const w of widths) {
    for (const p of paths) {
      const f = document.createElement("iframe");
      f.style.cssText = `position:fixed;left:-6000px;top:0;width:${w}px;height:900px;border:0`;
      document.body.appendChild(f);
      await new Promise((r) => {
        f.onload = r;
        f.src = p;
      });
      const doc = f.contentDocument;
      await doc.fonts.ready;
      await new Promise((r) => setTimeout(r, 200));
      if (doc.documentElement.scrollWidth > w)
        report.push(`${w} OVERFLOW ${p}`);
      for (const h of doc.querySelectorAll("h1,h2,h3")) {
        const fs = parseFloat(getComputedStyle(h).fontSize);
        if (fs < 22 || h.closest(".sr-only") || !h.offsetParent) continue;
        const L = lines(doc, h, fs);
        // Text running past the heading's own box (nowrap groups too wide).
        const spill = L.right > h.getBoundingClientRect().right + 2;
        if (L.length < 2 && !spill) continue;
        const fl = flags(L);
        if (spill) fl.unshift("SPILL");
        if (!all && !fl.length) continue;
        const key = `${w}|${L.join("/")}`;
        if (seen.has(key)) {
          seen.get(key).n++;
          continue;
        }
        const rec = {
          text: `${w} ${h.tagName}·${Math.round(fs)} [${fl.join(",")}] ${L.join(" / ")}  — ${p}`,
          n: 1,
        };
        seen.set(key, rec);
        report.push(rec);
      }
      f.remove();
    }
  }
  return report
    .map((r) =>
      typeof r === "string" ? r : r.text + (r.n > 1 ? ` (+${r.n - 1})` : ""),
    )
    .join("\n");
}
