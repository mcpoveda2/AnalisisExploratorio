const STORAGE_KEYS = {
  ADMIN_CONFIG: 'gran_escala_admin_config',
  EVIDENCE_HISTORY: 'gran_escala_evidence_history',
};

export const loadAdminConfig = (fallbackConfig) => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ADMIN_CONFIG);
    if (!raw) return fallbackConfig;

    const parsed = JSON.parse(raw);
    if (!parsed?.scoringQuestions || !parsed?.directOptions) return fallbackConfig;

    return {
      ...fallbackConfig,
      ...parsed,
    };
  } catch {
    return fallbackConfig;
  }
};

export const saveAdminConfig = (config) => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_CONFIG, JSON.stringify(config));
};

export const loadEvaluationHistory = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.EVIDENCE_HISTORY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveEvaluationEvidence = (evidence) => {
  const current = loadEvaluationHistory();
  const next = [evidence, ...current];
  localStorage.setItem(STORAGE_KEYS.EVIDENCE_HISTORY, JSON.stringify(next));
  return next;
};
