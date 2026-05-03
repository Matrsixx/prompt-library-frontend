import { useEffect, useMemo, useState } from "react";
import type { RulesContext, Step, TaskContext } from "../types";
import { Stepper } from "../components/prompt/Stepper";
import { RoleStep } from "../components/prompt/RoleStep";
import { TaskStep } from "../components/prompt/TaskStep";
import { RulesStep } from "../components/prompt/RulesStep";
import { ResultStep } from "../components/prompt/ResultStep";
import { buildPrompt } from "../lib/buildPrompt";
import { useSessionRole } from "../context/SessionRoleContext";

const EMPTY_ROLE = { role: "", objectives: "", context: "" };
const EMPTY_TASK: TaskContext = { action: "" };
const EMPTY_RULES: RulesContext = { tone: "professional", format: "", examples: "" };

function Prompt() {
  const { role, setRole } = useSessionRole();
  const [task, setTask] = useState<TaskContext>(EMPTY_TASK);
  const [rules, setRules] = useState<RulesContext>(EMPTY_RULES);
  const [step, setStep] = useState<Step>(role ? "task" : "role");

  // If role is cleared from the navbar, bounce the user back to the role step.
  useEffect(() => {
    if (!role && step !== "role") setStep("role");
  }, [role, step]);

  const prompt = useMemo(
    () => (role ? buildPrompt(role, task, rules) : ""),
    [role, task, rules],
  );

  const startOver = () => {
    setTask(EMPTY_TASK);
    setRules(EMPTY_RULES);
    setStep(role ? "task" : "role");
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-8">
      <div className="mb-8">
        <Stepper current={step} />
      </div>

      {role && step !== "role" && (
        <RoleBanner role={role} onEdit={() => setStep("role")} />
      )}

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
        {step === "role" && (
          <RoleStep
            initial={role ?? EMPTY_ROLE}
            onSave={(r) => {
              setRole(r);
              setStep("task");
            }}
          />
        )}
        {step === "task" && role && (
          <TaskStep
            initial={task}
            onBack={() => setStep("role")}
            onContinue={(t) => {
              setTask(t);
              setStep("rules");
            }}
          />
        )}
        {step === "rules" && role && (
          <RulesStep
            initial={rules}
            onBack={() => setStep("task")}
            onContinue={(r) => {
              setRules(r);
              setStep("result");
            }}
          />
        )}
        {step === "result" && role && (
          <ResultStep
            prompt={prompt}
            onBack={() => setStep("rules")}
            onStartOver={startOver}
          />
        )}
      </div>
    </main>
  );
}

function RoleBanner({
  role,
  onEdit,
}: {
  role: { role: string; objectives: string };
  onEdit: () => void;
}) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4 rounded-md border border-emerald-100 bg-emerald-50/60 px-4 py-3 text-sm">
      <div>
        <div className="text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
          Saved for this session
        </div>
        <div className="mt-0.5 text-neutral-800">
          <span className="font-medium">{role.role}</span>
          {role.objectives && <span className="text-neutral-600"> — {role.objectives}</span>}
        </div>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="shrink-0 text-xs font-medium text-emerald-700 hover:underline"
      >
        edit
      </button>
    </div>
  );
}

export default Prompt;
