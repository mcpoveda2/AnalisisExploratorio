const HistoryPage = ({ history }) => (
  <div className="mx-auto max-w-4xl space-y-6 rounded-2xl bg-white p-6 shadow-lg sm:p-10">
    <h2 className="text-2xl font-bold text-slate-900">Historial de evaluaciones</h2>

    {history.length === 0 ? (
      <p className="rounded-lg bg-slate-100 p-4 text-sm text-slate-600">
        Aún no hay evidencias guardadas.
      </p>
    ) : (
      <div className="space-y-3">
        {history.map((item) => (
          <article key={item.id} className="rounded-xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">{new Date(item.createdAt).toLocaleString()}</p>
            <p className="mt-1 font-semibold text-slate-900">{item.resultLabel}</p>
            <p className="text-sm">Puntaje: {item.score.toFixed(1)}</p>
            <p className="text-sm text-slate-600">
              Directa: {item.directSelections.length > 0 ? item.directSelections.join(', ') : 'Ninguna'}
            </p>
          </article>
        ))}
      </div>
    )}
  </div>
);

export default HistoryPage;
