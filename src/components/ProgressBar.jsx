const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full" aria-label="Progreso de evaluación">
      <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
        <span>Paso {currentStep} de {totalSteps}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
