import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <section className="rounded-xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
          Build better prompts, faster.
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Three small steps — set the stage, define the task, specify the rules — then copy your
          prompt or hand it off to Claude.
        </p>

        <ol className="mt-6 space-y-3 text-sm text-neutral-700">
          <Bullet n={1} title="Setting the stage">
            Your role, objective, and context. Saved per session so you're not re-asked.
          </Bullet>
          <Bullet n={2} title="Defining the task">
            What do you want Claude to do? Suggestions appear as you type.
          </Bullet>
          <Bullet n={3} title="Specifying rules">
            Tone, format, reference examples.
          </Bullet>
        </ol>

        <div className="mt-8">
          <button
            type="button"
            onClick={() => navigate("/prompt")}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500"
          >
            Start a new prompt
          </button>
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

export default Home;
