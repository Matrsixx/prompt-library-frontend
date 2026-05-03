export type RoleContext = {
  role: string;
  objectives: string;
  context: string;
};

export type TaskContext = {
  action: string;
};

export type RulesContext = {
  tone: string;
  format: string;
  examples: string;
};

export type Recommendation = {
  id: string;
  topic: string;
  label: string;
  prompt: string;
  keywords: string[];
};

export type Step = "role" | "task" | "rules" | "result";
