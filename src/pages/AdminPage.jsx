const AdminPage = ({ config, onUpdateQuestionField, onUpdateOptionField, onSave }) => (
  <div className="mx-auto max-w-4xl space-y-6 rounded-2xl bg-white p-6 shadow-lg sm:p-10">
    <h2 className="text-2xl font-bold text-slate-900">Panel admin: editar preguntas</h2>
    <p className="text-sm text-slate-600">
      Modifica textos y puntajes. Los cambios se guardan en el navegador (localStorage).
    </p>

    <div className="space-y-4">
      {config.scoringQuestions.map((question, questionIndex) => (
        <section key={question.id} className="rounded-xl border border-slate-200 p-4">
          <label className="mb-2 block text-sm font-semibold">Pregunta</label>
          <input
            type="text"
            value={question.label}
            onChange={(event) =>
              onUpdateQuestionField(questionIndex, 'label', event.target.value)
            }
            className="mb-4 w-full rounded-lg border border-slate-300 px-3 py-2"
          />

          <div className="space-y-2">
            {question.options.map((option, optionIndex) => (
              <div key={`${question.id}-${optionIndex}`} className="grid gap-2 sm:grid-cols-2">
                <input
                  type="text"
                  value={option.label}
                  onChange={(event) =>
                    onUpdateOptionField(questionIndex, optionIndex, 'label', event.target.value)
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
                <input
                  type="number"
                  step="0.1"
                  value={option.points}
                  onChange={(event) =>
                    onUpdateOptionField(questionIndex, optionIndex, 'points', Number(event.target.value))
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2"
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>

    <button
      type="button"
      onClick={onSave}
      className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
    >
      Guardar configuración
    </button>
  </div>
);

export default AdminPage;
