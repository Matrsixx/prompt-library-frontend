import type { Step } from "../../types";

const ORDER: Step[] = ["role", "task", "rules", "result"];
const LABEL: Record<Step, string> = {
  role: "Setting the stage",
  task: "Defining the task",
  rules: "Specifying rules",
  result: "Your prompt",
};

export function Stepper({ current }: { current: Step }) {
  const currentIdx = ORDER.indexOf(current);
  return (
    <ol className="flex items-center gap-2 text-sm">
      {ORDER.map((s, i) => {
        const state = i < currentIdx ? "done" : i === currentIdx ? "active" : "todo";
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={[
                "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold",
                state === "done" && "bg-emerald-500 text-white",
                state === "active" && "bg-indigo-600 text-white",
                state === "todo" && "bg-neutral-200 text-neutral-500",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {i + 1}
            </span>
            <span
              className={state === "active" ? "font-medium text-neutral-900" : "text-neutral-500"}
            >
              {LABEL[s]}
            </span>
            {i < ORDER.length - 1 && <span className="mx-1 text-neutral-300">/</span>}
          </li>
        );
      })}
    </ol>
  );
}
