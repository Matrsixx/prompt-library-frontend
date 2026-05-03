import { Link } from "react-router-dom";

function Help() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">Help</h1>
        <p className="mt-2 text-sm text-neutral-600">
          A short guide to getting the most out of the prompt builder.
        </p>
      </header>

      <section className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
          How the 3-step flow works
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          The builder splits a good prompt into three parts so each one gets your full attention.
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
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
          Using role templates
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Role templates are pre-written briefs for common roles — security consultant, product
          manager, technical writer, and more. Two ways to use them:
        </p>
        <ul className="mt-6 space-y-4 text-sm text-neutral-700">
          <li className="flex gap-3">
            <Tag>Copy</Tag>
            <span>
              On the <Link to="/" className="font-medium text-indigo-700 hover:underline">home page</Link>,
              click <em>Copy context</em> on any card to put a self-contained role brief on your
              clipboard. Paste it into any LLM (Claude, ChatGPT, etc.) before you start chatting.
            </span>
          </li>
          <li className="flex gap-3">
            <Tag>Use</Tag>
            <span>
              Click <em>Use this role</em> on a card, or pick a template chip inside the role step,
              to auto-fill the role / objectives / context fields. You can edit any field before
              saving — the template is a starting point, not a lock-in.
            </span>
          </li>
          <li className="flex gap-3">
            <Tag>Own</Tag>
            <span>
              Prefer to write from scratch? Hit <em>Use My Own Role Context</em> in the role step
              to clear the fields and start blank.
            </span>
          </li>
        </ul>
      </section>

      <section className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h2 className="text-lg font-semibold tracking-tight text-neutral-900">
          Tips for each step
        </h2>

        <div className="mt-6 space-y-6 text-sm text-neutral-700">
          <TipGroup title="Setting the stage">
            <Tip>
              Be specific about your role — "marketing lead at an indie streaming startup" beats
              "marketer."
            </Tip>
            <Tip>
              Name the deliverable in the objective, not the activity. <em>"A 10-slide investor
              deck"</em> beats <em>"help with fundraising."</em>
            </Tip>
            <Tip>
              Use the optional context for hidden constraints the model couldn't guess — audience,
              deadline, budget, prior attempts that didn't work.
            </Tip>
          </TipGroup>

          <TipGroup title="Defining the task">
            <Tip>
              One action per prompt. If you're tempted to write "and then…", split it into two
              prompts.
            </Tip>
            <Tip>
              Use a verb. "Draft," "review," "summarize," "compare" — concrete verbs anchor the
              output.
            </Tip>
            <Tip>
              The autosuggestions are matched against your wording — type a few keywords from your
              domain to see relevant starters.
            </Tip>
          </TipGroup>

          <TipGroup title="Specifying rules">
            <Tip>
              Format beats tone. Saying "bulleted list, max 5 items, each under 20 words" gives
              you something predictable; "be concise" rarely does.
            </Tip>
            <Tip>
              If you have a reference example, paste it in. One good example outperforms a
              paragraph of instructions.
            </Tip>
            <Tip>
              Tone is a default, not a hard rule — for high-stakes content, restate it inside the
              task itself too.
            </Tip>
          </TipGroup>
        </div>
      </section>
    </main>
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

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-0.5 inline-flex h-5 shrink-0 items-center rounded-full bg-indigo-600/10 px-2 text-[10px] font-semibold uppercase tracking-wide text-indigo-700">
      {children}
    </span>
  );
}

function TipGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <ul className="mt-2 space-y-2 text-neutral-700">{children}</ul>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neutral-400" />
      <span>{children}</span>
    </li>
  );
}

export default Help;
