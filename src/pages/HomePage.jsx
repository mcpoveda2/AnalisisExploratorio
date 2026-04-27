const HomePage = ({ onStart }) => (
  <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-lg sm:p-10">
    <h1 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl">
      Evaluación de tratamiento de datos personales
    </h1>

    <p className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
      Nota legal: esta herramienta es informativa y no reemplaza asesoría legal especializada.
      Verifica siempre el contexto normativo aplicable en tu jurisdicción.
    </p>

    <button
      type="button"
      onClick={onStart}
      className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
    >
      Comenzar evaluación
    </button>
  </div>
);

export default HomePage;
