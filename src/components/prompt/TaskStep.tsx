import { useMemo, useState } from "react";
import type { TaskContext } from "../../types";
import { matchRecommendations } from "../../data/recommendations";

type Props = {
  initial: TaskContext;
  onBack: () => void;
  onContinue: (task: TaskContext) => void;
};

export function TaskStep({ initial, onBack, onContinue }: Props) {
  const [action, setAction] = useState(initial.action);
  const [dismissed, setDismissed] = useState(false);

  const suggestions = useMemo(() => {
    if (dismissed) return [];
    return matchRecommendations(action);
  }, [action, dismissed]);

  const canContinue = action.trim().length > 0;

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-neutral-900">Defining the task</h2>
        <p className="mt-1 text-sm text-neutral-600">
          What action do you want Claude to take? Write, analyze, build, research, something else.
        </p>
      </header>

      <label className="block">
        <span className="block text-sm font-medium text-neutral-800">The task</span>
        <span className="block text-xs text-neutral-500">
          e.g. "research the current state of the independent film streaming market and identify key
          trends"
        </span>
        <textarea
          autoFocus
          value={action}
          onChange={(e) => {
            setAction(e.target.value);
            setDismissed(false);
          }}
          rows={5}
          className="mt-2 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      </label>

      {suggestions.length > 0 && (
        <div className="rounded-md border border-indigo-100 bg-indigo-50/60 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wide text-indigo-700">
              Suggestions from the library
            </span>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              className="text-xs text-indigo-600 hover:underline"
            >
              dismiss
            </button>
          </div>
          <ul className="space-y-1.5">
            {suggestions.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => {
                    setAction(s.prompt);
                    setDismissed(true);
                  }}
                  className="group flex w-full items-start gap-2 rounded px-2 py-1.5 text-left hover:bg-white"
                >
                  <span className="mt-0.5 shrink-0 rounded-full bg-indigo-600/10 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                    {s.topic}
                  </span>
                  <span className="text-sm text-neutral-800 group-hover:text-indigo-700">
                    {s.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-md px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
        >
          Back
        </button>
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => onContinue({ action })}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          Continue
        </button>
      </div>
    </section>
  );
}
