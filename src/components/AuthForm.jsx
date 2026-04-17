import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AuthForm({
  title,
  subtitle,
  buttonLabel,
  alternateLabel,
  alternatePath,
  onSubmit,
  authError,
  authLoading,
  includeName = false,
  includeCourse = false,
  pendingApproval = false,
}) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    course: '',
  });
  const [localError, setLocalError] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLocalError('');

    if (includeName && !formState.name.trim()) {
      setLocalError('Name is required.');
      return;
    }

    if (!formState.email.trim() || !formState.password.trim()) {
      setLocalError('Email and password are required.');
      return;
    }

    if (includeCourse && !formState.course) {
      setLocalError('Please select a course.');
      return;
    }

    await onSubmit(formState);
  }

  if (pendingApproval) {
    return (
      <section className="mx-auto max-w-xl">
        <div className="panel-surface rounded-[32px] p-6 md:p-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white mb-2">Registration Submitted!</h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-7">
            Your account is pending admin approval. You'll be able to log in once an admin reviews and approves your registration. Please check back later.
          </p>
          <Link to="/login" className="mt-6 inline-block primary-pill px-6 py-2.5 text-sm font-semibold">
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-xl">
      <div className="panel-surface rounded-[32px] p-6 md:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">Account</p>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-slate-300">{subtitle}</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          {includeName ? (
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Name</span>
              <input
                name="name"
                value={formState.name}
                onChange={updateField}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
                placeholder="Rohan Kumar"
              />
            </label>
          ) : null}

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={updateField}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="you@example.com"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Password</span>
            <input
              type="password"
              name="password"
              value={formState.password}
              onChange={updateField}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-sky-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="Minimum 6 characters"
            />
          </label>

          {includeCourse ? (
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Choose your course</span>
              <div className="grid grid-cols-2 gap-3 mt-1">
                {[
                  { value: 'mern-stack', label: 'MERN Stack', emoji: '🟠', desc: 'Full-stack web development' },
                  { value: 'data-analytics', label: 'Data Analytics', emoji: '🔵', desc: 'Spreadsheets, SQL, Python & BI' },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => setFormState((s) => ({ ...s, course: opt.value }))}
                    className={`flex flex-col items-start gap-1 rounded-2xl border-2 px-4 py-3.5 text-left transition-all duration-200 ${
                      formState.course === opt.value
                        ? 'border-sky-400 bg-sky-50 text-sky-900 dark:border-sky-500 dark:bg-sky-500/10 dark:text-sky-200'
                        : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
                    }`}
                  >
                    <span className="text-lg">{opt.emoji}</span>
                    <span className="text-sm font-semibold">{opt.label}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{opt.desc}</span>
                  </button>
                ))}
              </div>
            </label>
          ) : null}

          {localError || authError ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-400/30 dark:bg-rose-500/10 dark:text-rose-300">
              {localError || authError}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={authLoading}
            className="primary-pill inline-flex w-full items-center justify-center px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
          >
            {authLoading ? 'Please wait...' : buttonLabel}
          </button>
        </form>

        <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
          {alternateLabel}{' '}
          <Link to={alternatePath} className="font-semibold text-sky-700 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200">
            Continue here
          </Link>
        </p>
      </div>
    </section>
  );
}

export default AuthForm;
