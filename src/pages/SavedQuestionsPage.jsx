import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { flattenQuestions } from '../utils/topicHelpers';
import QuestionCard from '../components/QuestionCard';

function SavedQuestionsPage() {
  const { tracks, state } = useAppContext();
  const questions = flattenQuestions(tracks).filter((question) => state.savedQuestions.includes(question.id));

  return (
    <div className="space-y-6">
      <section className="panel-surface rounded-[32px] p-6 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Revision vault</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">Saved Questions</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
              Revisit your high-priority interview questions from both tracks in one focused review space. These are private to your account.
            </p>
          </div>
          <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            {questions.length} question{questions.length === 1 ? '' : 's'} saved
          </div>
        </div>
      </section>

      {questions.length ? (
        <div className="space-y-5">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} topicId={question.topicId} />
          ))}
        </div>
      ) : (
        <section className="panel-surface rounded-[32px] p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
            <Bookmark size={24} />
          </div>
          <h3 className="mt-5 text-2xl font-bold text-slate-950 dark:text-white">Nothing saved yet</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Save strong questions while practicing topics, and they’ll appear here for quick revision before interviews.
          </p>
          <Link
            to="/"
            className="primary-pill mt-6 inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold"
          >
            Explore tracks
            <ArrowRight size={16} />
          </Link>
        </section>
      )}
    </div>
  );
}

export default SavedQuestionsPage;
