import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLE_TEMPLATES, formatTemplateForCopy, type RoleTemplate } from "../data/roleTemplates";

function Home() {
  const navigate = useNavigate();

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
        <header className="mx-auto max-w-3xl">
          <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
            Role templates
          </h3>
          <p className="mt-1 text-sm text-neutral-600">
            Pre-written role briefs you can paste straight into any LLM, or use as the starting
            point for a new prompt here.
          </p>
        </header>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ROLE_TEMPLATES.map((t) => (
            <TemplateCard
              key={t.id}
              template={t}
              onUse={() => navigate("/prompt", { state: { templateId: t.id } })}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

function TemplateCard({
  template,
  onUse,
}: {
  template: RoleTemplate;
  onUse: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatTemplateForCopy(template));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="flex flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-indigo-300 hover:shadow">
      <h4 className="text-sm font-semibold text-neutral-900">{template.title}</h4>
      <p className="mt-1 text-xs text-neutral-600">{template.summary}</p>

      <div className="mt-4 flex-1 space-y-2 rounded-md bg-neutral-50 p-3 text-xs text-neutral-700">
        <DetailRow label="Role" value={template.context.role} />
        <DetailRow label="Objectives" value={template.context.objectives} />
      </div>

      <div className="mt-4 flex items-center gap-2">
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
      </div>
    </article>
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
