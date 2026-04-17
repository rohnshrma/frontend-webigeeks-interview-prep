import React, { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

function OutputPrediction({ output, explanation, choices }) {
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  // If no MCQ choices, fall back to the old reveal-based UI
  if (!choices || choices.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300/80 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-800/60">
        <button
          type="button"
          onClick={() => setRevealed((c) => !c)}
          className="flex w-full items-center justify-between text-left text-sm font-semibold text-slate-700 transition hover:text-slate-950 dark:text-slate-200 dark:hover:text-white"
        >
          <span>{revealed ? 'Hide predicted output' : 'Reveal the output'}</span>
        </button>
        {revealed && (
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Output</p>
              <p className="rounded-xl bg-white px-3 py-2 dark:bg-slate-900">{output}</p>
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Why</p>
              <p>{explanation}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  const hasAnswered = selected !== null;
  const isCorrect = hasAnswered && selected.correct;

  return (
    <div className="rounded-2xl border border-dashed border-indigo-300/70 bg-indigo-50/60 p-4 dark:border-indigo-500/30 dark:bg-indigo-500/5">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-indigo-600 dark:text-indigo-400">
        🧩 Guess the Output — Multiple Choice
      </p>

      <div className="grid gap-2">
        {choices.map((choice, idx) => {
          let bkg = 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-indigo-400 cursor-pointer';
          let textColor = 'text-slate-800 dark:text-slate-200';
          let icon = null;

          if (hasAnswered) {
            if (choice.correct) {
              bkg = 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-400 dark:border-emerald-500/50';
              textColor = 'text-emerald-800 dark:text-emerald-300 font-semibold';
              icon = <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />;
            } else if (choice === selected && !choice.correct) {
              bkg = 'bg-red-50 dark:bg-red-500/10 border-red-400 dark:border-red-500/50';
              textColor = 'text-red-800 dark:text-red-300 font-semibold';
              icon = <XCircle size={16} className="text-red-500 flex-shrink-0" />;
            } else {
              bkg = 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 opacity-50';
            }
          }

          return (
            <button
              key={idx}
              type="button"
              disabled={hasAnswered}
              onClick={() => setSelected(choice)}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${bkg} ${textColor} ${!hasAnswered ? 'hover:bg-indigo-50 dark:hover:bg-indigo-500/10' : ''}`}
            >
              <span className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold
                ${hasAnswered ? (choice.correct ? 'bg-emerald-500 text-white' : choice === selected ? 'bg-red-500 text-white' : 'bg-slate-300 text-slate-600 dark:bg-slate-600 dark:text-slate-400') : 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'}`}>
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="flex-1">{choice.label}</span>
              {icon}
            </button>
          );
        })}
      </div>

      {hasAnswered && (
        <div className={`mt-4 rounded-xl p-3 text-sm ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30' : 'bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30'}`}>
          <p className={`font-bold mb-1 ${isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
            {isCorrect ? '✅ Correct!' : '❌ Not quite — the correct answer is highlighted above.'}
          </p>
          {explanation && (
            <p className="text-slate-600 dark:text-slate-400 leading-6">{explanation}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default OutputPrediction;
