import ProgressBar from '../components/ProgressBar';

const ResultPage = ({ result, score, onRestart, onSaveEvidence, onExportPdf }) => {
  const isQualified = result === 'qualified';

  return (
    <div className="mx-auto max-w-3xl space-y-6 rounded-2xl bg-white p-6 shadow-lg sm:p-10">
      <ProgressBar currentStep={3} totalSteps={3} />

      <section
        className={`rounded-xl border p-5 ${
          isQualified
            ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
            : 'border-rose-200 bg-rose-50 text-rose-800'
        }`}
      >
        <h2 className="mb-2 text-2xl font-bold">
          {isQualified ? 'Califica como gran escala' : 'No califica'}
        </h2>
        <p className="text-sm">
          Puntaje final registrado: <strong>{score.toFixed(1)}</strong>
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onSaveEvidence}
          className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700"
        >
          Guardar evidencia
        </button>

        <button
          type="button"
          onClick={onExportPdf}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Exportar PDF
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl bg-slate-800 px-5 py-3 font-semibold text-white transition hover:bg-slate-900"
        >
          Realizar nueva evaluación
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
