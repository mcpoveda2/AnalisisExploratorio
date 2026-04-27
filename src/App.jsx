import { useMemo, useState } from 'react';
import TopNav from './components/TopNav';
import { SCORE_THRESHOLD, defaultAdminConfig } from './data/evaluationData';
import AdminPage from './pages/AdminPage';
import EvaluationPage from './pages/EvaluationPage';
import HistoryPage from './pages/HistoryPage';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import { qualifiesByScore } from './utils/evaluation';
import { exportEvaluationToPdf } from './utils/pdf';
import {
  loadAdminConfig,
  loadEvaluationHistory,
  saveAdminConfig,
  saveEvaluationEvidence,
} from './utils/storage';

const initialState = {
  step: 'home',
  directSelections: [],
  answers: {},
  score: 0,
  result: null,
  lastEvaluation: null,
};

const App = () => {
  const [config, setConfig] = useState(() => loadAdminConfig(defaultAdminConfig));
  const [history, setHistory] = useState(() => loadEvaluationHistory());
  const [state, setState] = useState(initialState);

  const hasDirectQualification = useMemo(
    () => state.directSelections.length > 0,
    [state.directSelections],
  );

  const handleNavigate = (step) => {
    setState((prev) => ({ ...prev, step }));
  };

  const handleStart = () => {
    setState((prev) => ({ ...prev, step: 'evaluation' }));
  };

  const handleToggleDirect = (option) => {
    setState((prev) => {
      const isSelected = prev.directSelections.includes(option);
      const nextSelections = isSelected
        ? prev.directSelections.filter((item) => item !== option)
        : [...prev.directSelections, option];

      return { ...prev, directSelections: nextSelections };
    });
  };

  const handleAnswerChange = (questionId, points) => {
    setState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: points,
      },
    }));
  };

  const buildEvaluationSnapshot = (score, resultCode) => ({
    id: `${Date.now()}`,
    createdAt: new Date().toISOString(),
    score,
    resultCode,
    resultLabel: resultCode === 'qualified' ? 'Califica como gran escala' : 'No califica',
    directSelections: state.directSelections,
    answers: state.answers,
    answersSummary: config.scoringQuestions.map((question) => {
      const selectedPoints = state.answers[question.id];
      const selectedOption = question.options.find((option) => option.points === selectedPoints);

      return {
        question: question.label,
        optionLabel: selectedOption?.label ?? 'Sin respuesta',
        points: selectedPoints ?? 0,
      };
    }),
  });

  const handleEvaluate = (score) => {
    const resultCode = hasDirectQualification
      ? 'qualified'
      : qualifiesByScore(score)
        ? 'qualified'
        : 'not-qualified';

    const snapshot = buildEvaluationSnapshot(score, resultCode);

    setState((prev) => ({
      ...prev,
      score,
      result: resultCode,
      step: 'result',
      lastEvaluation: snapshot,
    }));
  };

  const handleSaveEvidence = () => {
    if (!state.lastEvaluation) return;
    const nextHistory = saveEvaluationEvidence(state.lastEvaluation);
    setHistory(nextHistory);
  };

  const handleExportPdf = () => {
    if (!state.lastEvaluation) return;
    exportEvaluationToPdf({
      evaluation: state.lastEvaluation,
      threshold: SCORE_THRESHOLD,
    });
  };

  const handleRestart = () => {
    setState(initialState);
  };

  const handleUpdateQuestionField = (questionIndex, field, value) => {
    setConfig((prev) => {
      const nextQuestions = [...prev.scoringQuestions];
      nextQuestions[questionIndex] = {
        ...nextQuestions[questionIndex],
        [field]: value,
      };

      return {
        ...prev,
        scoringQuestions: nextQuestions,
      };
    });
  };

  const handleUpdateOptionField = (questionIndex, optionIndex, field, value) => {
    setConfig((prev) => {
      const nextQuestions = [...prev.scoringQuestions];
      const nextOptions = [...nextQuestions[questionIndex].options];
      nextOptions[optionIndex] = {
        ...nextOptions[optionIndex],
        [field]: value,
      };

      nextQuestions[questionIndex] = {
        ...nextQuestions[questionIndex],
        options: nextOptions,
      };

      return {
        ...prev,
        scoringQuestions: nextQuestions,
      };
    });
  };

  const handleSaveAdminConfig = () => {
    saveAdminConfig(config);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 px-4 py-8 sm:py-12">
      <TopNav onNavigate={handleNavigate} activeView={state.step} />

      {state.step === 'home' && <HomePage onStart={handleStart} />}

      {state.step === 'evaluation' && (
        <EvaluationPage
          directOptions={config.directOptions}
          scoringQuestions={config.scoringQuestions}
          directSelections={state.directSelections}
          answers={state.answers}
          onToggleDirect={handleToggleDirect}
          onAnswerChange={handleAnswerChange}
          onEvaluate={handleEvaluate}
        />
      )}

      {state.step === 'result' && (
        <ResultPage
          result={state.result}
          score={state.score}
          onSaveEvidence={handleSaveEvidence}
          onExportPdf={handleExportPdf}
          onRestart={handleRestart}
        />
      )}

      {state.step === 'history' && <HistoryPage history={history} />}

      {state.step === 'admin' && (
        <AdminPage
          config={config}
          onUpdateQuestionField={handleUpdateQuestionField}
          onUpdateOptionField={handleUpdateOptionField}
          onSave={handleSaveAdminConfig}
        />
      )}
    </main>
  );
};

export default App;
