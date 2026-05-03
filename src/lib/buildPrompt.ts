import type { RoleContext, RulesContext, TaskContext } from "../types";

export function buildPrompt(
  role: RoleContext,
  task: TaskContext,
  rules: RulesContext,
): string {
  const stage: string[] = [];
  if (role.role.trim()) stage.push(`I'm ${role.role.trim()}`);
  if (role.objectives.trim()) stage.push(role.objectives.trim());
  if (role.context.trim()) stage.push(role.context.trim());
  const stageLine = stage.join(", ") + (stage.length ? "." : "");

  const taskLine = task.action.trim()
    ? `Can you ${stripLeadingVerbPrefix(task.action.trim())}?`
    : "";

  const ruleParts: string[] = [];
  if (rules.tone.trim()) ruleParts.push(`Use a ${rules.tone.trim()} tone`);
  if (rules.format.trim()) ruleParts.push(`structure it as ${rules.format.trim()}`);
  if (rules.examples.trim()) ruleParts.push(`reference these examples: ${rules.examples.trim()}`);
  const rulesLine = ruleParts.length ? ruleParts.join("; ") + "." : "";

  return [stageLine, taskLine, rulesLine].filter(Boolean).join(" ").trim();
}

function stripLeadingVerbPrefix(s: string): string {
  // drop a leading "can you" / "please" to avoid "Can you can you..."
  return s.replace(/^(please\s+|can\s+you\s+)/i, "");
}

export function claudeUrl(prompt: string): string {
  return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
}
