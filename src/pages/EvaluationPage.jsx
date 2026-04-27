import { useMemo } from 'react';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import { SCORE_THRESHOLD } from '../data/evaluationData';
import { calculateScore } from '../utils/evaluation';

const EvaluationPage = ({
  directOptions,
  scoringQuestions,
  directSelections,
  answers,
  onToggleDirect,
  onAnswerChange,
  onEvaluate,
}) => {
  const score = useMemo(() => calculateScore(answers), [answers]);

  return (
    <div className="mx-auto max-w-4xl space-y-6 rounded-2xl bg-white p-6 shadow-lg sm:p-10">
      <ProgressBar currentStep={2} totalSteps={3} />

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h2 className="mb-3 text-xl font-bold text-slate-900">Verificación de calificación directa</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {directOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3"
            >
              <input
                type="checkbox"
                checked={directSelections.includes(option)}
                onChange={() => onToggleDirect(option)}
                className="h-4 w-4"
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-bold text-slate-900">Evaluación por puntaje</h2>
        <p className="mb-4 text-sm text-slate-600">Umbral actual: {SCORE_THRESHOLD} puntos.</p>

        <div className="mb-4 rounded-lg bg-blue-50 p-3 text-sm font-medium text-blue-700">
          Puntaje en tiempo real: {score.toFixed(1)}
        </div>

        <div className="space-y-4">
          {scoringQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              selectedValue={answers[question.id]}
              onChange={onAnswerChange}
            />
          ))}
        </div>
      </section>

      <button
        type="button"
        onClick={() => onEvaluate(score)}
        className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
      >
        Ver resultado
      </button>
    </div>
  );
};

export default EvaluationPage;
