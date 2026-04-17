import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle2, Clock, ListChecks, Filter } from 'lucide-react';
import TopicList from '../components/TopicList';
import QuestionCard from '../components/QuestionCard';
import ResearchSources from '../components/ResearchSources';
import { useAppContext } from '../context/AppContext';
import { useTopicQuestions } from '../hooks/useTopicQuestions';
import { EXPERIENCE_LABELS } from '../data/tracks';

const FILTER_OPTIONS = [
  { value: 'all',     label: 'All Levels' },
  { value: 'fresher', label: 'Fresher (0 yrs)' },
  { value: 'junior',  label: '1–2 Years' },
  { value: 'mid',     label: '3–5 Years' },
];

function TopicPage() {
  const { trackId, topicId } = useParams();
  const { dispatch, state, isAuthenticated } = useAppContext();
  const { track, topic, questions, rawQuestions } = useTopicQuestions(trackId, topicId);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [trackId, topicId]);

  if (!track || !topic) {
    return <p className="text-sm text-slate-500">Topic not found.</p>;
  }

  const completed = state.completedTopics.includes(topic.id);

  // Count questions per experience level for the filter badges using actual fetched data
  const dynamicQuestions = rawQuestions || topic.questions;
  const counts = { all: dynamicQuestions.length, fresher: 0, junior: 0, mid: 0 };
  dynamicQuestions.forEach((q) => {
    if (counts[q.experienceLevel] !== undefined) counts[q.experienceLevel]++;
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[300px_1fr]">
      {/* ── Sidebar ── */}
      <aside className="space-y-4 xl:sticky xl:top-28 xl:h-fit">
        {/* Topic info + completion */}
        <div className="panel-surface rounded-[28px] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{track.title}</p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-950 dark:text-white">{topic.title}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{topic.intro}</p>

          {/* Completed / Pending toggle */}
          <div className="mt-5 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => dispatch({ type: 'TOGGLE_COMPLETE_TOPIC', payload: topic.id })}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                completed
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600'
                  : 'border border-slate-200 bg-slate-50 text-slate-600 hover:border-emerald-300 hover:text-emerald-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <CheckCircle2 size={16} className={completed ? 'fill-white stroke-emerald-500' : ''} />
              {completed ? 'Completed' : 'Mark Done'}
            </button>

            <button
              type="button"
              onClick={() => {
                // If currently completed, clicking "Pending" will un-mark it
                if (completed) dispatch({ type: 'TOGGLE_COMPLETE_TOPIC', payload: topic.id });
              }}
              className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold transition ${
                !completed
                  ? 'bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20'
                  : 'border border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500'
              }`}
            >
              <Clock size={16} />
              Pending
            </button>
          </div>

          {isAuthenticated && (
            <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
              Topic completion is saved to your account.
            </p>
          )}
        </div>

        {/* Topic navigator */}
        <div className="panel-surface rounded-[28px] p-4">
          <div className="mb-4 flex items-center gap-2">
            <ListChecks size={18} className="text-slate-500 dark:text-slate-300" />
            <h3 className="font-semibold text-slate-900 dark:text-white">Topic Navigator</h3>
          </div>
          <TopicList topics={track.topics} trackId={track.id} />
        </div>

        <ResearchSources sources={topic.sources} />
      </aside>

      {/* ── Main content ── */}
      <section className="space-y-5">
        {/* Header + Filter bar */}
        <div className="panel-surface rounded-[28px] p-5 md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">
                {questions.length} Question{questions.length !== 1 ? 's' : ''}
                {state.experienceFilter !== 'all' ? ` · ${EXPERIENCE_LABELS[state.experienceFilter] ?? ''}` : ''}
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-slate-950 dark:text-white">
                {topic.title} — WebiGeeks Interview Prep
              </h3>
            </div>
          </div>

          {/* ── Experience level filter ── */}
          <div className="mt-5">
            <div className="flex items-center gap-2 mb-3">
              <Filter size={14} className="text-slate-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Filter by Experience</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTER_OPTIONS.map(({ value, label }) => {
                const active = state.experienceFilter === value;
                const count = counts[value] ?? 0;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => dispatch({ type: 'SET_EXPERIENCE_FILTER', payload: value })}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
                        : 'ghost-chip hover:border-slate-400'
                    }`}
                  >
                    {label}
                    <span className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${
                      active ? 'bg-white/20 text-current dark:bg-slate-900/20' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick progress summary */}
          {isAuthenticated && (
            <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
              {[
                { label: 'Starred',  count: dynamicQuestions.filter((q) => state.questionActions?.[q.id]?.starred).length,  color: 'text-amber-600' },
                { label: 'Correct',  count: dynamicQuestions.filter((q) => state.questionActions?.[q.id]?.correct).length,   color: 'text-emerald-600' },
                { label: 'Doubtful', count: dynamicQuestions.filter((q) => state.questionActions?.[q.id]?.doubtful).length,  color: 'text-rose-600' },
                { label: 'Saved',    count: dynamicQuestions.filter((q) => state.savedQuestions.includes(q.id)).length,       color: 'text-sky-600' },
              ].map(({ label, count, color }) => (
                <div key={label} className="text-center">
                  <p className={`text-2xl font-extrabold ${color}`}>{count}</p>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Question cards */}
        {questions.map((question) => (
          <QuestionCard key={question.id} question={question} topicId={topic.id} />
        ))}

        {questions.length === 0 && (
          <div className="panel-surface rounded-[28px] p-10 text-center">
            <p className="text-lg font-semibold text-slate-900 dark:text-white">No questions found.</p>
            <p className="mt-2 text-sm text-slate-500">
              {state.experienceFilter !== 'all' ? 'Try a different experience level or clear the filter.' : 'Try a different search term.'}
            </p>
            {state.experienceFilter !== 'all' && (
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_EXPERIENCE_FILTER', payload: 'all' })}
                className="mt-4 primary-pill px-5 py-2 text-sm font-semibold"
              >
                Show All Levels
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export default TopicPage;
