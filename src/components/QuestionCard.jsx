const QuestionCard = ({ question, selectedValue, onChange }) => (
  <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <h3 className="mb-3 text-lg font-semibold text-slate-900">{question.label}</h3>
    <div className="space-y-2">
      {question.options.map((option) => {
        const id = `${question.id}-${option.label}`;
        return (
          <label
            key={id}
            htmlFor={id}
            className="flex cursor-pointer items-center justify-between rounded-lg border border-slate-200 p-3 hover:bg-slate-50"
          >
            <span className="text-sm font-medium">{option.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-500">{option.points} pts</span>
              <input
                id={id}
                type="radio"
                name={question.id}
                checked={selectedValue === option.points}
                onChange={() => onChange(question.id, option.points)}
                className="h-4 w-4"
              />
            </div>
          </label>
        );
      })}
    </div>
  </section>
);

export default QuestionCard;
