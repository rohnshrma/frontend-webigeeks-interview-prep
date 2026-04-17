import React, { useState } from 'react';
import { Bookmark, BookmarkCheck, ChevronDown, ChevronUp, Star, CheckCircle2, HelpCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import AnswerSection from './AnswerSection';

const EXPERIENCE_META = {
  fresher: { label: 'Fresher',  bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300' },
  junior:  { label: '1–2 Yrs', bg: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300' },
  mid:     { label: '3–5 Yrs', bg: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300' },
};

function QuestionCard({ question, topicId }) {
  const isOutputMCQ = question.type === 'output' && Array.isArray(question.choices) && question.choices.length > 0;
  const [expanded, setExpanded] = useState(isOutputMCQ);
  const [showAnswer, setShowAnswer] = useState(isOutputMCQ);
  const { state, dispatch, toggleQuestionAction, isAuthenticated } = useAppContext();

  const saved   = state.savedQuestions.includes(question.id);
  const qAction = state.questionActions?.[question.id] ?? {};
  const expMeta = EXPERIENCE_META[question.experienceLevel] ?? EXPERIENCE_META.fresher;

  function handleQuestionAction(action) {
    // Optimistic update — immediately reflect in UI, then persist
    const current = state.questionActions?.[question.id] ?? {};
    const updated = { ...current, [action]: !current[action] };
    dispatch({ type: 'SET_QUESTION_ACTIONS', payload: { ...state.questionActions, [question.id]: updated } });
    toggleQuestionAction(question.id, action);
  }

  return (
    <article className="panel-surface rounded-[28px] p-5 md:p-6 transition-shadow hover:shadow-lg dark:hover:shadow-slate-900/40">
      {/* Header row */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="space-y-3 flex-1 min-w-0">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Experience level badge */}
            <span className={`rounded-full px-2.5 py-1 text-xs font-bold tracking-wide ${expMeta.bg}`}>
              {expMeta.label}
            </span>
            {/* Question type */}
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white dark:bg-slate-100 dark:text-slate-950">
              {question.type === 'output' ? '🧩 Guess Output' : question.type}
            </span>
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
              {question.difficulty ?? 'Medium'}
            </span>
          </div>

          <h3 className="text-base font-bold leading-7 text-slate-900 dark:text-white">{question.question}</h3>
        </div>

        {/* Right-hand action buttons */}
        <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
          {/* Bookmark / Save */}
          <button
            type="button"
            title={saved ? 'Remove bookmark' : 'Bookmark'}
            onClick={() => dispatch({ type: 'TOGGLE_SAVE_QUESTION', payload: question.id })}
            className={`rounded-full border p-2 text-sm font-medium transition ${
              saved
                ? 'border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-400/30 dark:bg-sky-500/10 dark:text-sky-300'
                : 'ghost-chip'
            }`}
          >
            {saved ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
          </button>

          {/* Per-question actions — only for authenticated users */}
          {isAuthenticated && (
            <>
              {/* Star */}
              <button
                type="button"
                title={qAction.starred ? 'Unstar' : 'Star this question'}
                onClick={() => handleQuestionAction('starred')}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition inline-flex items-center gap-1.5 ${
                  qAction.starred
                    ? 'border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-400/30 dark:bg-amber-500/10 dark:text-amber-300'
                    : 'ghost-chip'
                }`}
              >
                <Star size={13} className={qAction.starred ? 'fill-current' : ''} />
                Star
              </button>

              {/* Correct */}
              <button
                type="button"
                title={qAction.correct ? 'Mark as not correct' : 'I know this'}
                onClick={() => handleQuestionAction('correct')}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition inline-flex items-center gap-1.5 ${
                  qAction.correct
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-500/10 dark:text-emerald-300'
                    : 'ghost-chip'
                }`}
              >
                <CheckCircle2 size={13} />
                Correct
              </button>

              {/* Doubtful */}
              <button
                type="button"
                title={qAction.doubtful ? 'Remove doubt flag' : 'Mark as doubtful'}
                onClick={() => handleQuestionAction('doubtful')}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition inline-flex items-center gap-1.5 ${
                  qAction.doubtful
                    ? 'border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300'
                    : 'ghost-chip'
                }`}
              >
                <HelpCircle size={13} />
                Doubtful
              </button>
            </>
          )}
        </div>
      </div>

      {/* Active action indicator strip */}
      {isAuthenticated && (qAction.correct || qAction.doubtful || qAction.starred) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {qAction.starred   && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300 font-semibold">⭐ Starred</span>}
          {qAction.correct   && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300 font-semibold">✓ I know this</span>}
          {qAction.doubtful  && <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300 font-semibold">? Doubtful</span>}
        </div>
      )}

      {/* Show answer toggle — for non-MCQ questions */}
      {!isOutputMCQ && (
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => { setShowAnswer((c) => !c); setExpanded(true); }}
            className="primary-pill inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold"
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
            {showAnswer ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      )}

      {expanded ? <AnswerSection question={question} showAnswer={showAnswer} /> : null}
    </article>
  );
}

export default QuestionCard;
