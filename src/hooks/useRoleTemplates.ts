import { useCallback, useEffect, useState } from "react";
import {
  type ApiTemplate,
  type TemplateInput,
  createTemplate as apiCreate,
  deleteTemplate as apiDelete,
  listTemplates,
} from "../lib/api";
import { ROLE_TEMPLATES } from "../data/roleTemplates";

const FALLBACK: ApiTemplate[] = ROLE_TEMPLATES.map((t) => ({
  id: t.id,
  title: t.title,
  summary: t.summary,
  context: t.context,
  isCustom: false,
  createdAt: 0,
  updatedAt: 0,
}));

export function useRoleTemplates() {
  const [templates, setTemplates] = useState<ApiTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listTemplates();
      setTemplates(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load templates");
      setTemplates(FALLBACK);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(async (input: TemplateInput) => {
    const created = await apiCreate(input);
    setTemplates((prev) => [...prev, created]);
    return created;
  }, []);

  const remove = useCallback(async (id: string) => {
    await apiDelete(id);
    setTemplates((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { templates, loading, error, reload: load, create, remove };
}
