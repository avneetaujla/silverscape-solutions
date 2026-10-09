// Audits rendered pages for image reuse. Usage: node scripts/audit-media.mjs [baseUrl]
// Reports any image used twice on one page, and every page each image appears on.
const base = (process.argv[2] ?? "http://127.0.0.1:5173").replace(/\/$/, "");

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const paths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);

const usage = new Map();
let problems = 0;

for (const path of paths) {
  const html = await (await fetch(base + path)).text();
  const ids = [...html.matchAll(/<img\b[^>]*?\bsrc="([^"]+)"/g)]
    .map((m) => m[1].match(/media\/([a-z0-9-]+?)-\d+(?:-[\w-]+)?\.jpg/)?.[1])
    .filter(Boolean);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) {
      problems++;
      console.log(`DUPLICATE on ${path}: ${id}`);
    }
    seen.add(id);
    usage.set(id, [...(usage.get(id) ?? []), path]);
  }
}

console.log(
  `\n${paths.length} pages checked, ${usage.size} distinct images rendered.\n`,
);
for (const [id, where] of [...usage].sort(
  (a, b) => b[1].length - a[1].length,
)) {
  console.log(
    `${String(where.length).padStart(3)}  ${id.padEnd(28)} ${where.join("  ")}`,
  );
}
process.exit(problems ? 1 : 0);
