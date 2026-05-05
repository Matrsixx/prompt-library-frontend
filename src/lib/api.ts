import type { RoleContext } from "../types";

const BASE = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8787";

export type ApiTemplate = {
  id: string;
  title: string;
  summary: string;
  context: RoleContext;
  isCustom: boolean;
  createdAt: number;
  updatedAt: number;
};

export type TemplateInput = {
  title: string;
  summary: string;
  role: string;
  objectives: string;
  context: string;
};

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function listTemplates(): Promise<ApiTemplate[]> {
  const res = await fetch(`${BASE}/api/templates`);
  return handle<ApiTemplate[]>(res);
}

export async function createTemplate(input: TemplateInput): Promise<ApiTemplate> {
  const res = await fetch(`${BASE}/api/templates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handle<ApiTemplate>(res);
}

export async function updateTemplate(
  id: string,
  input: TemplateInput,
): Promise<ApiTemplate> {
  const res = await fetch(`${BASE}/api/templates/${encodeURIComponent(id)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  return handle<ApiTemplate>(res);
}

export async function deleteTemplate(id: string): Promise<void> {
  const res = await fetch(`${BASE}/api/templates/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  await handle<void>(res);
}
