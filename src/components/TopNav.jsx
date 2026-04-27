const TopNav = ({ onNavigate, activeView }) => (
  <nav className="mx-auto mb-6 flex w-full max-w-4xl flex-wrap gap-2">
    {[
      { id: 'home', label: 'Inicio' },
      { id: 'evaluation', label: 'Evaluación' },
      { id: 'history', label: 'Historial' },
      { id: 'admin', label: 'Panel admin' },
    ].map((item) => (
      <button
        key={item.id}
        type="button"
        onClick={() => onNavigate(item.id)}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
          activeView === item.id
            ? 'bg-blue-600 text-white'
            : 'bg-white text-slate-700 hover:bg-slate-100'
        }`}
      >
        {item.label}
      </button>
    ))}
  </nav>
);

export default TopNav;
