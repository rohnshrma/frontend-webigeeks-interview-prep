import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Code2, Sparkles, Target, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import TrackSummaryCard from '../components/TrackSummaryCard';

function HomePage() {
  const { tracks, state, isAuthenticated, user } = useAppContext();
  const totalSaved = state.savedQuestions.length;
  const totalCompleted = state.completedTopics.length;

  // Logged-in users see only their enrolled course track
  const visibleTracks = isAuthenticated && user?.course
    ? tracks.filter((t) => t.id === user.course)
    : tracks;

  const enrolledTrack = isAuthenticated && user?.course
    ? tracks.find((t) => t.id === user.course)
    : null;

  return (
    <div className="space-y-10">
      <section className="panel-surface relative overflow-hidden rounded-[36px] px-6 py-8 md:px-10 md:py-12">
        <div className="absolute inset-0 bg-grid bg-[size:22px_22px] opacity-40" />
        <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
              <Sparkles size={14} />
              Modern prep for early-career candidates
            </div>
            <h2 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl dark:text-white">
              {isAuthenticated
                ? `Welcome back, ${user?.name?.split(' ')[0]}! Ready to prepare?`
                : 'Practice smarter for Data Analytics and MERN interviews with focused, realistic question sets.'}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300">
              {isAuthenticated
                ? `You're enrolled in ${enrolledTrack?.title ?? 'your course'}. Dive into your topics below.`
                : 'Explore two structured learning tracks, review interview questions by topic, save high-priority questions, and keep momentum with a visual progress tracker.'}
            </p>
            <div className="mt-5 rounded-3xl border border-slate-200 bg-white/90 px-5 py-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300">
              {isAuthenticated
                ? `Signed in as ${user?.name}. Your saved questions, topic actions, and completed topics are synced with your account.`
                : 'Create an account or log in to keep your own saved questions and progress in the backend.'}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {isAuthenticated && enrolledTrack ? (
                <Link
                  to={`/track/${enrolledTrack.id}`}
                  className="primary-pill px-5 py-3 text-sm font-semibold"
                >
                  Go to {enrolledTrack.title} →
                </Link>
              ) : (
                <>
                  <Link to="/login" className="primary-pill px-5 py-3 text-sm font-semibold">
                    Login to Start
                  </Link>
                  <Link to="/register" className="ghost-chip px-5 py-3 text-sm font-semibold">
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/15 dark:bg-slate-900">
                <Target size={20} className="text-skyglass" />
                <p className="mt-5 text-3xl font-extrabold">{totalCompleted}</p>
                <p className="mt-2 text-sm text-slate-300">Topics completed</p>
              </div>
              <div className="rounded-[28px] bg-orange-500 p-5 text-white shadow-2xl shadow-orange-500/20">
                <Code2 size={20} />
                <p className="mt-5 text-3xl font-extrabold">{totalSaved}</p>
                <p className="mt-2 text-sm text-orange-100">Questions saved</p>
              </div>
            </div>
            <div className="rounded-[30px] border border-white/70 bg-white/90 p-6 dark:border-slate-700 dark:bg-slate-900/85">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-sky-100 p-3 text-sky-600 dark:bg-sky-500/10 dark:text-sky-300">
                  <BarChart3 size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Question style mix</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Conceptual, practical, and MCQ output questions per topic</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white">4</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">Conceptual</p>
                </div>
                <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white">4</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">Practical</p>
                </div>
                <div className="rounded-2xl bg-indigo-100 p-4 dark:bg-indigo-900/40">
                  <p className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-300">3</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">MCQ Output</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isAuthenticated && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/80 px-5 py-3 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-400 flex items-center gap-2">
          <Lock size={14} />
          You have access to the <strong className="text-slate-700 dark:text-slate-200">&nbsp;{enrolledTrack?.title}</strong>.
          To access another track, contact your admin.
        </div>
      )}

      <section className="grid gap-6">
        {visibleTracks.map((track) => (
          <TrackSummaryCard key={track.id} track={track} />
        ))}
      </section>
    </div>
  );
}

export default HomePage;
