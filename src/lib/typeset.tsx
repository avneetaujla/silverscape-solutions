import {
  Children,
  Fragment,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Heading typesetting. Headings use `text-wrap: balance` for even line
 * lengths; this keeps balance from breaking lines where the sense doesn't:
 *
 * - connector words stay with the word they introduce ("an outdoor",
 *   "your property", "in Kitchener"), so a line never ends on one;
 * - product and place names stay on one line ("Kentucky Bluegrass sod",
 *   "Southern Ontario") from `sm` up — on phones they may wrap rather than
 *   overflow.
 *
 * Names longer than SHORT characters are only held together from `sm` (or
 * `md` past LONG characters) up, where heading columns are wide enough.
 */

const CONNECTORS = new Set([
  "a",
  "an",
  "the",
  "to",
  "of",
  "for",
  "with",
  "and",
  "&",
  "or",
  "in",
  "on",
  "at",
  "by",
  "from",
  "into",
  "your",
  "our",
  "its",
  "their",
  "how",
  "as",
  "than",
  "per",
]);

const PHRASES = [
  "Kentucky Bluegrass sod",
  "Kentucky Bluegrass",
  "Southern Ontario",
  "Greater Toronto Area",
  "Lake Ontario",
  "Ontario One Call",
  "Lawn Maintenance",
  "Property Upkeep",
].map((p) => p.toLowerCase().split(" "));

const SHORT = 14;
// Connector chains up to this length ("of a landscaping") never break.
const CHAIN = 20;
// Groups longer than this need a wider column than `sm` gives a display head.
const LONG = 24;

export type TypesetOptions = {
  /**
   * Breakpoint from which product/place names are held together. Card titles
   * in narrow columns pass "lg" or "xl".
   */
  phrasesFrom?: "sm" | "lg" | "xl";
};

const bare = (word: string) => word.toLowerCase().replace(/[^\p{L}&-]/gu, "");
const isConnector = (word: string) => CONNECTORS.has(bare(word));

const endsClause = (word: string) => /[,.;:!?—–]$/.test(word);

function keepClass(text: string, from: "sm" | "lg" | "xl") {
  if (text.length <= SHORT) return "keep-phrase";
  if (from === "xl") return "xl:keep-phrase";
  // Card titles: also held in any `@container` card wide enough for them.
  if (from === "lg")
    return text.length > LONG
      ? "xl:keep-phrase @min-[21rem]:keep-phrase"
      : "lg:keep-phrase @min-[16rem]:keep-phrase";
  return text.length > LONG ? "md:keep-phrase" : "sm:keep-phrase";
}

type Unit = { words: string[]; phrase: boolean; sentence?: boolean };

const endsSentence = (word: string) => /[.?!:]$/.test(word);

function toUnits(words: string[]): Unit[] {
  const units: Unit[] = [];
  for (let i = 0; i < words.length;) {
    // Short sentences and clauses in a longer heading stay whole ("Three
    // divisions.", "Sod Installation:"), so lines break between them.
    if (i === 0 || endsSentence(words[i - 1])) {
      let j = i;
      while (j < words.length - 1 && !endsSentence(words[j])) j++;
      const sentence = words.slice(i, j + 1);
      if (
        endsSentence(words[j]) &&
        sentence.length >= 2 &&
        sentence.length < words.length &&
        sentence.join(" ").length <= LONG
      ) {
        units.push({ words: sentence, phrase: true, sentence: true });
        i = j + 1;
        continue;
      }
    }
    const match = PHRASES.find((p) =>
      p.every((w, j) => bare(words[i + j] ?? "") === w),
    );
    if (match) {
      units.push({ words: words.slice(i, i + match.length), phrase: true });
      i += match.length;
    } else {
      units.push({ words: [words[i]], phrase: false });
      i += 1;
    }
  }
  return units;
}

function setString(text: string, opts: Required<TypesetOptions>): ReactNode {
  const lead = text.match(/^\s*/)![0];
  const trail = text.slice(lead.length).match(/\s*$/)![0];
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (words.length < 2) return text;

  const units = toUnits(words);
  const out: ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < units.length; i++) {
    const group: Unit[] = [units[i]];
    while (
      !group[group.length - 1].phrase &&
      isConnector(group[group.length - 1].words[0]) &&
      i + 1 < units.length
    ) {
      group.push(units[++i]);
    }
    // A name followed by one last word reads as one noun ("Southern Ontario
    // climate"); keep it so the last word isn't left alone.
    const last = group[group.length - 1];
    let noun: string | undefined;
    if (
      last.phrase &&
      !endsClause(last.words[last.words.length - 1]) &&
      i + 2 === units.length &&
      !units[i + 1].phrase &&
      !isConnector(units[i + 1].words[0])
    ) {
      noun = units[++i].words[0];
    }
    if (out.length) out.push(" ");

    if (group.length === 1 && !group[0].phrase) {
      out.push(group[0].words[0]);
      continue;
    }

    const connectors = group.filter((u) => !u.phrase).flatMap((u) => u.words);
    const phrase = group.find((u) => u.phrase);
    const full = group.flatMap((u) => u.words).join(" ");

    if (!phrase) {
      // Connector chain: on phones keep at least the last connector + word.
      const tail = connectors.slice(-2).join(" ");
      out.push(
        full.length <= CHAIN ? (
          <span key={key++} className="keep-phrase">
            {full}
          </span>
        ) : tail === full ? (
          <span key={key++} className={keepClass(full, opts.phrasesFrom)}>
            {full}
          </span>
        ) : (
          <span key={key++} className={keepClass(full, opts.phrasesFrom)}>
            {connectors.slice(0, -2).join(" ")}{" "}
            <span className="keep-phrase">{tail}</span>
          </span>
        ),
      );
      continue;
    }

    // Phrase, optionally led by connectors ("for the Southern Ontario").
    const lead = [...connectors, phrase.words[0]].join(" ");
    const rest = phrase.words.slice(1).join(" ");
    const always =
      phrase.sentence && opts.phrasesFrom === "sm" && full.length <= CHAIN;
    const name = (
      <span
        key={key++}
        className={always ? "keep-phrase" : keepClass(full, opts.phrasesFrom)}
      >
        {connectors.length && lead.length <= CHAIN ? (
          <span className="keep-phrase">{lead}</span>
        ) : (
          lead
        )}{" "}
        {rest}
      </span>
    );
    const withNoun = `${full} ${noun}`;
    out.push(
      noun ? (
        <span key={key++} className={keepClass(withNoun, opts.phrasesFrom)}>
          {name} {noun}
        </span>
      ) : (
        name
      ),
    );
  }

  return (
    <>
      {lead}
      {out}
      {trail}
    </>
  );
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node))
    return textOf(node.props.children);
  return "";
}

function joinLead(
  conn: string,
  el: ReactElement,
  opts: Required<TypesetOptions>,
  key: string,
): ReactNode {
  const text = `${conn} ${textOf(el)}`;
  const kids = Children.toArray(
    (el.props as { children?: ReactNode }).children,
  );
  const first = kids[0];
  if (
    text.length <= CHAIN ||
    typeof el.type !== "string" ||
    typeof first !== "string"
  ) {
    return (
      <span key={key} className={keepClass(text, opts.phrasesFrom)}>
        {conn} {setElement(el, opts)}
      </span>
    );
  }

  // Too long to hold on phones, so split the element after its first word or
  // name and keep only that with the connector there.
  const unit = toUnits(first.trim().split(/\s+/))[0].words;
  const lead = first.match(
    new RegExp(`^\\s*\\S+(?:\\s+\\S+){${unit.length - 1}}`),
  )![0];
  const rest = [first.slice(lead.length), ...kids.slice(1)].filter(
    (n) => n !== "",
  );
  const [w0, ...more] = unit;
  const piece = (k: string, children: ReactNode) =>
    cloneElement(el, { key: k }, children);
  const start = (
    <span className="keep-phrase">
      {conn} {piece("a", w0)}
    </span>
  );
  return (
    <span key={key} className={keepClass(text, opts.phrasesFrom)}>
      {more.length ? (
        <span
          className={keepClass(`${conn} ${unit.join(" ")}`, opts.phrasesFrom)}
        >
          {start}
          {piece("b", ` ${more.join(" ")}`)}
        </span>
      ) : (
        start
      )}
      {rest.length > 0 &&
        cloneElement(el, { key: "c" }, ...setNodes(rest, opts))}
    </span>
  );
}

function setNodes(nodes: ReactNode[], opts: Required<TypesetOptions>) {
  // Merge adjacent strings so phrases split by JSX expressions still match.
  const merged: ReactNode[] = [];
  for (const n of nodes) {
    const prev = merged[merged.length - 1];
    if (
      (typeof n === "string" || typeof n === "number") &&
      typeof prev === "string"
    ) {
      merged[merged.length - 1] = prev + String(n);
    } else {
      merged.push(typeof n === "number" ? String(n) : n);
    }
  }

  const out: ReactNode[] = [];
  merged.forEach((node, i) => {
    const next = merged[i + 1];
    if (typeof node === "string") {
      // Trailing connectors before an element join it: "in <em>Guelph</em>".
      const words = node.trim().split(/\s+/);
      let k = words.length;
      while (k > 0 && isConnector(words[k - 1])) k--;
      if (k < words.length && /\s$/.test(node) && isValidElement(next)) {
        const ws = node.match(/^\s*/)![0];
        const head = k ? `${ws}${words.slice(0, k).join(" ")} ` : ws;
        if (head) out.push(<span key={`h${i}`}>{setString(head, opts)}</span>);
        out.push(joinLead(words.slice(k).join(" "), next, opts, `j${i}`));
        merged[i + 1] = null;
        return;
      }
      out.push(<span key={`s${i}`}>{setString(node, opts)}</span>);
    } else if (isValidElement(node)) {
      out.push(setElement(node, opts, `e${i}`));
    } else if (node != null) {
      out.push(node);
    }
  });
  return out;
}

function setElement(
  el: ReactElement,
  opts: Required<TypesetOptions>,
  key?: string,
): ReactNode {
  const children = (el.props as { children?: ReactNode }).children;
  if (el.type === Fragment)
    return (
      <Fragment key={key}>
        {setNodes(Children.toArray(children), opts)}
      </Fragment>
    );
  if (typeof el.type !== "string") return el;
  if (children == null) return key ? cloneElement(el, { key }) : el;
  return cloneElement(
    el,
    key ? { key } : {},
    ...setNodes(Children.toArray(children), opts),
  );
}

/** Applies heading typesetting to a string or simple inline JSX. */
export function typeset(node: ReactNode, options: TypesetOptions = {}) {
  const opts = { phrasesFrom: options.phrasesFrom ?? "sm" } as const;
  if (typeof node === "string") return setString(node, opts);
  if (Array.isArray(node)) return setNodes(node, opts);
  if (isValidElement(node)) return setElement(node, opts);
  return node;
}
