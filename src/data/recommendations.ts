import type { Recommendation } from "../types";

// Hardcoded recommendation library. Populated further later.
export const RECOMMENDATIONS: Recommendation[] = [
  {
    id: "cs-threat-model",
    topic: "Cybersecurity",
    label: "Threat model a new feature",
    prompt:
      "perform a STRIDE threat-model analysis of the feature, identify trust boundaries, enumerate realistic attack vectors, and recommend mitigations ranked by risk",
    keywords: ["security", "threat", "stride", "risk", "cyber", "attack", "vulnerability"],
  },
  {
    id: "cs-owasp-review",
    topic: "Cybersecurity",
    label: "OWASP Top 10 code review",
    prompt:
      "review the attached code for the OWASP Top 10 (2021) vulnerability classes and report each finding with severity, a concrete proof-of-concept, and a remediation",
    keywords: ["security", "owasp", "review", "vulnerability", "cyber", "audit", "code"],
  },
  {
    id: "cs-incident-runbook",
    topic: "Cybersecurity",
    label: "Incident response runbook",
    prompt:
      "draft an incident-response runbook for a suspected credential-theft event, including detection signals, containment steps, eradication, recovery, and post-incident review",
    keywords: ["security", "incident", "response", "runbook", "breach", "cyber"],
  },
  {
    id: "mkt-market-research",
    topic: "Marketing",
    label: "Market research report",
    prompt:
      "research the current state of the market, identify key trends, competitor positioning, and growth opportunities, using current web sources with citations",
    keywords: ["market", "research", "competitor", "trends", "marketing", "industry"],
  },
  {
    id: "mkt-positioning",
    topic: "Marketing",
    label: "Positioning & messaging",
    prompt:
      "develop a positioning statement and three messaging pillars, each with supporting proof points and a sample tagline",
    keywords: ["positioning", "messaging", "brand", "marketing", "pitch"],
  },
  {
    id: "eng-refactor",
    topic: "Engineering",
    label: "Refactor plan",
    prompt:
      "propose a staged refactor plan that keeps tests green at every step, with each stage's scope, risk, and rollback plan",
    keywords: ["refactor", "engineering", "code", "rewrite", "cleanup"],
  },
  {
    id: "eng-architecture",
    topic: "Engineering",
    label: "System architecture review",
    prompt:
      "review the system architecture and flag scalability bottlenecks, single points of failure, and cost hotspots, with concrete remediations",
    keywords: ["architecture", "scalability", "system", "design", "engineering"],
  },
  {
    id: "eng-debug",
    topic: "Engineering",
    label: "Debug a production issue",
    prompt:
      "help diagnose a production issue: form hypotheses ranked by likelihood, list the evidence that would confirm or rule out each, and suggest a minimal repro",
    keywords: ["debug", "bug", "production", "issue", "error", "troubleshoot"],
  },
  {
    id: "rsrch-literature",
    topic: "Research",
    label: "Literature review",
    prompt:
      "produce a literature review of the topic, grouped by school of thought, with citations and a summary of open questions",
    keywords: ["research", "literature", "review", "academic", "study", "paper"],
  },
  {
    id: "rsrch-summary",
    topic: "Research",
    label: "Summarize a paper",
    prompt:
      "summarize the attached paper: its central claim, method, key evidence, and limitations, in plain language",
    keywords: ["research", "paper", "summary", "summarize", "academic"],
  },
  {
    id: "data-analysis",
    topic: "Data",
    label: "Exploratory data analysis",
    prompt:
      "perform an exploratory analysis of the dataset: describe the schema, surface data-quality issues, and highlight three non-obvious patterns worth investigating",
    keywords: ["data", "analysis", "eda", "dataset", "analytics", "explore"],
  },
  {
    id: "writing-edit",
    topic: "Writing",
    label: "Edit for clarity",
    prompt:
      "edit the attached draft for clarity and concision, keeping the author's voice, and leave inline comments explaining non-trivial changes",
    keywords: ["edit", "writing", "draft", "clarity", "proofread"],
  },
];

export function matchRecommendations(query: string, limit = 5): Recommendation[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored = RECOMMENDATIONS.map((r) => {
    const haystack = [r.topic, r.label, r.prompt, ...r.keywords].join(" ").toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (haystack.includes(t)) score += 1;
      if (r.keywords.some((k) => k.toLowerCase() === t)) score += 2;
      if (r.topic.toLowerCase().includes(t)) score += 1;
    }
    return { r, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.r);
  return scored;
}
