import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatTemplateForCopy } from "../data/roleTemplates";
import { useRoleTemplates } from "../hooks/useRoleTemplates";
import type { ApiTemplate, TemplateInput } from "../lib/api";

function Home() {
  const navigate = useNavigate();
  const { templates, loading, error, create, remove } = useRoleTemplates();
  const [showForm, setShowForm] = useState(false);

  return (
    <main className="mx-auto max-w-5xl px-6 pt-12 pb-16">
      <section
        id="about"
        className="mx-auto max-w-3xl rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-8 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
            About
          </span>
          <span className="inline-flex items-center rounded-full bg-neutral-900/5 px-3 py-1 text-xs font-medium text-neutral-700">
            Based on Claude 101
          </span>
        </div>

        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
          Build better prompts, faster.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-neutral-700">
          The structure used in this app — <span className="font-medium text-neutral-900">setting the stage</span>,{" "}
          <span className="font-medium text-neutral-900">defining the task</span>, and{" "}
          <span className="font-medium text-neutral-900">specifying the rules</span> — is taken directly
          from the prompt-engineering framework taught in{" "}
          <span className="font-medium text-neutral-900">Claude 101</span> on Anthropic Academy.
          Anyone using this app is automatically following Anthropic's recommended approach for
          writing high-quality prompts — no prior prompt-engineering experience required.
        </p>

        <ol className="mt-6 space-y-3 text-sm text-neutral-700">
          <Bullet n={1} title="Setting the stage">
            What is your role and what are your objectives? Is there context about your work that Claude should know about?
          </Bullet>
          <Bullet n={2} title="Defining the task">
            What action do you want Claude to take? Do you want Claude to write, analyze, build, or something else?
          </Bullet>
          <Bullet n={3} title="Specifying rules">
            What's the style or tone you want Claude to use? Are there examples that you can attach to show Claude what you're looking for?
          </Bullet>
        </ol>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => navigate("/prompt")}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
          >
            Create Prompt
          </button>
        </div>
      </section>

      <section className="mt-12">
        <header className="mx-auto flex max-w-3xl items-end justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
              Role templates
            </h3>
            <p className="mt-1 text-sm text-neutral-600">
              Pre-written role briefs you can paste into any LLM, or use as the starting
              point for a new prompt here. Add your own with{" "}
              <span className="font-medium">+ New template</span>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm((v) => !v)}
            className="shrink-0 rounded-md border border-indigo-300 bg-white px-3 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-50"
          >
            {showForm ? "Cancel" : "+ New template"}
          </button>
        </header>

        {error && (
          <p className="mx-auto mt-4 max-w-3xl rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
            Couldn't reach the backend ({error}). Showing built-in templates only.
          </p>
        )}

        {showForm && (
          <NewTemplateForm
            onCancel={() => setShowForm(false)}
            onSubmit={async (input) => {
              await create(input);
              setShowForm(false);
            }}
          />
        )}

        {loading ? (
          <p className="mt-6 text-center text-sm text-neutral-500">Loading templates…</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                onUse={() => navigate("/prompt", { state: { template: t } })}
                onDelete={t.isCustom ? () => remove(t.id) : undefined}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function TemplateCard({
  template,
  onUse,
  onDelete,
}: {
  template: ApiTemplate;
  onUse: () => void;
  onDelete?: () => Promise<void> | void;
}) {
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        formatTemplateForCopy({
          id: template.id,
          title: template.title,
          summary: template.summary,
          context: template.context,
        }),
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!confirm(`Delete "${template.title}"?`)) return;
    setDeleting(true);
    try {
      await onDelete();
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-neutral-900">{template.title}</h4>
        {template.isCustom && (
          <span className="shrink-0 rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-indigo-700">
            Custom
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-neutral-600">{template.summary}</p>

      <div className="mt-4 flex-1 space-y-2 rounded-md bg-neutral-50 p-3 text-xs text-neutral-700">
        <DetailRow label="Role" value={template.context.role} />
        <DetailRow label="Objectives" value={template.context.objectives} />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:border-indigo-400 hover:text-indigo-700"
        >
          {copied ? "Copied!" : "Copy context"}
        </button>
        <button
          type="button"
          onClick={onUse}
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-500"
        >
          Use this role
        </button>
        {onDelete && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="ml-auto rounded-md border border-red-200 bg-white px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "…" : "Delete"}
          </button>
        )}
      </div>
    </article>
  );
}

function NewTemplateForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (input: TemplateInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<TemplateInput>({
    title: "",
    summary: "",
    role: "",
    objectives: "",
    context: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (k: keyof TemplateInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create template");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-4 max-w-3xl space-y-3 rounded-xl border border-indigo-200 bg-white p-4 shadow-sm sm:p-6"
    >
      <h4 className="text-sm font-semibold text-neutral-900">New custom template</h4>

      <Field label="Title" hint="e.g. Customer Success Manager">
        <input
          required
          maxLength={120}
          value={form.title}
          onChange={update("title")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
      </Field>

      <Field label="Summary" hint="One-line description shown on the card">
        <input
          required
          maxLength={400}
          value={form.summary}
          onChange={update("summary")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
      </Field>

      <Field label="Role" hint='"Senior X with experience in Y"'>
        <textarea
          required
          rows={2}
          value={form.role}
          onChange={update("role")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
      </Field>

      <Field label="Objectives" hint="What this role is trying to accomplish">
        <textarea
          required
          rows={3}
          value={form.objectives}
          onChange={update("objectives")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
      </Field>

      <Field label="Context" hint="How this role thinks and operates">
        <textarea
          required
          rows={3}
          value={form.context}
          onChange={update("context")}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
        />
      </Field>

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}

      <div className="flex items-center gap-2 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Save template"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-neutral-800">{label}</span>
      {hint && <span className="block text-[11px] text-neutral-500">{hint}</span>}
      <div className="mt-1">{children}</div>
    </label>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-[10px] font-semibold uppercase tracking-wide text-neutral-500">
        {label}
      </span>
      <span className="block leading-snug text-neutral-700">{value}</span>
    </div>
  );
}

function Bullet({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-600/10 text-xs font-semibold text-indigo-700">
        {n}
      </span>
      <span>
        <span className="font-medium text-neutral-900">{title}</span>
        <span className="text-neutral-600"> — {children}</span>
      </span>
    </li>
  );
}

export default Home;
