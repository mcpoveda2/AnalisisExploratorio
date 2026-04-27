import { SCORE_THRESHOLD } from '../data/evaluationData';

/**
 * Suma el puntaje de respuestas seleccionadas.
 * @param {Record<string, number>} answers
 */
export const calculateScore = (answers) =>
  Object.values(answers).reduce((total, value) => total + (value ?? 0), 0);

/**
 * Determina si el tratamiento califica como gran escala por umbral.
 * @param {number} score
 */
export const qualifiesByScore = (score) => score >= SCORE_THRESHOLD;
