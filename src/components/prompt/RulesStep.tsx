import { useState } from "react";
import type { RulesContext } from "../../types";

type Props = {
  initial: RulesContext;
  onBack: () => void;
  onContinue: (rules: RulesContext) => void;
};

const TONE_PRESETS = ["Professional", "Concise", "Friendly", "Technical", "Academic"];

export function RulesStep({ initial, onBack, onContinue }: Props) {
  const [tone, setTone] = useState(initial.tone);
  const [format, setFormat] = useState(initial.format);
  const [examples, setExamples] = useState(initial.examples);

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-neutral-900">Specifying rules</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Style, tone, format — anything Claude should follow. Examples are optional.
        </p>
      </header>

      <div className="space-y-5">
        <div>
          <span className="block text-sm font-medium text-neutral-800">Tone & style</span>
          <span className="block text-xs text-neutral-500">
            pick a preset or write your own
          </span>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TONE_PRESETS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t.toLowerCase())}
                className={[
                  "rounded-full border px-3 py-1 text-xs transition",
                  tone.toLowerCase() === t.toLowerCase()
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-neutral-300 bg-white text-neutral-700 hover:border-indigo-300",
                ].join(" ")}
              >
                {t}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            placeholder="e.g. professional"
            className="mt-2 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <label className="block">
          <span className="block text-sm font-medium text-neutral-800">Format</span>
          <span className="block text-xs text-neutral-500">
            e.g. "a 5-page report with an executive summary, market analysis, competitive landscape,
            and growth opportunities"
          </span>
          <textarea
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            rows={3}
            className="mt-2 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-medium text-neutral-800">Examples (optional)</span>
          <span className="block text-xs text-neutral-500">
            paste reference examples or describe what "good" looks like
          </span>
          <textarea
            value={examples}
            onChange={(e) => setExamples(e.target.value)}
            rows={3}
            className="mt-2 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </label>
      </div>

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
          onClick={() => onContinue({ tone, format, examples })}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500"
        >
          Build prompt
        </button>
      </div>
    </section>
  );
}
