import { useState } from "react";
import type { RoleContext } from "../../types";

type Props = {
  initial: RoleContext;
  onSave: (role: RoleContext) => void;
};

export function RoleStep({ initial, onSave }: Props) {
  const [role, setRole] = useState(initial.role);
  const [objectives, setObjectives] = useState(initial.objectives);
  const [context, setContext] = useState(initial.context);

  const canContinue = role.trim().length > 0 && objectives.trim().length > 0;

  return (
    <section className="space-y-6">
      <header>
        <h2 className="text-xl font-semibold text-neutral-900">Setting the stage</h2>
        <p className="mt-1 text-sm text-neutral-600">
          Saved for this session — you won't be asked again until you reset it.
        </p>
      </header>

      <div className="space-y-5">
        <Field
          label="Your role"
          hint="e.g. marketing lead at an indie streaming startup"
          value={role}
          onChange={setRole}
        />
        <Field
          label="Your objective"
          hint="e.g. preparing an investor pitch deck for Series A"
          value={objectives}
          onChange={setObjectives}
        />
        <Field
          label="Other context (optional)"
          hint="anything Claude should know about the work"
          value={context}
          onChange={setContext}
          multiline
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!canContinue}
          onClick={() => onSave({ role, objectives, context })}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-neutral-300"
        >
          Save role & continue
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  multiline,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-neutral-800">{label}</span>
      <span className="block text-xs text-neutral-500">{hint}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="mt-2 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        />
      )}
    </label>
  );
}
