import React, { useState, useEffect, useCallback } from 'react';
import { adminLogin, adminGetStudents, adminApproveStudent, adminDeleteStudent } from '../utils/api';

// Course topic maps (matching backend track IDs)
const COURSE_TOPICS = {
  'mern-stack': [
    'html', 'css', 'flexbox', 'javascript', 'react',
    'node-js', 'express-js', 'mongodb', 'mongoose',
    'authentication', 'bcrypt', 'jwt', 'passport-local', 'passport-google-oauth20',
  ],
  'data-analytics': [
    'excel', 'sql', 'python', 'pandas', 'numpy',
    'matplotlib', 'tableau', 'power-bi',
  ],
};

const COURSE_TOPIC_LABELS = {
  'mern-stack': {
    html: 'HTML', css: 'CSS', flexbox: 'Flexbox', javascript: 'JavaScript',
    react: 'React', 'node-js': 'Node.js', 'express-js': 'Express.js',
    mongodb: 'MongoDB', mongoose: 'Mongoose', authentication: 'Authentication',
    bcrypt: 'bcrypt', jwt: 'JWT', 'passport-local': 'passport-local',
    'passport-google-oauth20': 'Passport Google OAuth',
  },
  'data-analytics': {
    excel: 'Excel', sql: 'SQL', python: 'Python', pandas: 'Pandas',
    numpy: 'NumPy', matplotlib: 'Matplotlib', tableau: 'Tableau', 'power-bi': 'Power BI',
  },
};

const COURSE_NAMES = {
  'mern-stack': 'MERN Stack',
  'data-analytics': 'Data Analytics',
};

const COURSE_COLORS = {
  'mern-stack': { accent: '#f97316', light: 'rgba(249,115,22,0.12)', badge: '#fff7ed', badgeText: '#c2410c' },
  'data-analytics': { accent: '#0ea5e9', light: 'rgba(14,165,233,0.12)', badge: '#f0f9ff', badgeText: '#0369a1' },
};

// ── Admin Login Screen ─────────────────────────────────────
function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await adminLogin({ email, password });
      onLogin(data.token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0c1a2e 100%)',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 28,
        padding: '40px 36px',
        width: '100%',
        maxWidth: 420,
        backdropFilter: 'blur(24px)',
        boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 18,
            background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(14,165,233,0.35)',
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <p style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 6 }}>WebiGeeks</p>
          <h1 style={{ color: 'white', fontSize: 24, fontWeight: 800, margin: 0 }}>Admin Panel</h1>
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 6 }}>Sign in with your admin credentials</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@careersprintr.com"
              required
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '12px 14px', color: 'white', fontSize: 14, outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#0ea5e9'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14, padding: '12px 14px', color: 'white', fontSize: 14, outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = '#0ea5e9'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 12, padding: '10px 14px', color: '#fca5a5', fontSize: 13, fontWeight: 500,
            }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
              border: 'none', borderRadius: 14, padding: '13px', color: 'white',
              fontSize: 14, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1, marginTop: 4,
              boxShadow: '0 8px 24px rgba(14,165,233,0.3)',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => { if (!loading) { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 12px 32px rgba(14,165,233,0.4)'; }}}
            onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 8px 24px rgba(14,165,233,0.3)'; }}
          >
            {loading ? 'Signing in…' : 'Sign in to Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Progress Bar Component ─────────────────────────────────
function ProgressBar({ percent, color = '#0ea5e9', height = 8, animated = false }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 999, height, overflow: 'hidden' }}>
      <div style={{
        height: '100%',
        width: `${Math.min(100, Math.max(0, percent))}%`,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        borderRadius: 999,
        transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: animated ? `0 0 12px ${color}60` : 'none',
      }} />
    </div>
  );
}

// ── Student Detail Modal ───────────────────────────────────
function StudentModal({ student, onClose }) {
  if (!student) return null;

  const course = student.course || 'mern-stack';
  const topics = COURSE_TOPICS[course] || [];
  const labels = COURSE_TOPIC_LABELS[course] || {};
  const completedTopics = student.progress?.completedTopics ?? [];
  const savedCount = student.progress?.savedQuestions?.length ?? 0;
  const importantCount = student.progress?.importantQuestions?.length ?? 0;
  const overallPct = topics.length > 0 ? Math.round((completedTopics.length / topics.length) * 100) : 0;
  const colors = COURSE_COLORS[course] || COURSE_COLORS['mern-stack'];

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(2,6,23,0.8)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 28, width: '100%', maxWidth: 580,
        maxHeight: '88vh', overflowY: 'auto',
        boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
        scrollbarWidth: 'thin', scrollbarColor: 'rgba(148,163,184,0.3) transparent',
      }}>
        {/* Modal Header */}
        <div style={{
          padding: '28px 28px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          position: 'sticky', top: 0, background: '#0f172a', zIndex: 1,
          borderRadius: '28px 28px 0 0',
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 16,
                background: colors.light,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, fontWeight: 800, color: colors.accent,
                flexShrink: 0,
              }}>
                {student.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h2 style={{ color: 'white', fontSize: 18, fontWeight: 800, margin: 0 }}>{student.name}</h2>
                <p style={{ color: '#64748b', fontSize: 13, margin: '3px 0 0' }}>{student.email}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10, width: 34, height: 34, cursor: 'pointer', color: '#94a3b8',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                fontSize: 18, lineHeight: 1, transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.12)'}
              onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
            >✕</button>
          </div>

          {/* Overall progress */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ color: '#94a3b8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                Overall Progress — {COURSE_NAMES[course]}
              </span>
              <span style={{ color: 'white', fontSize: 18, fontWeight: 800 }}>{overallPct}%</span>
            </div>
            <ProgressBar percent={overallPct} color={colors.accent} height={10} animated />
            <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
              {[
                { label: 'Topics Done', val: `${completedTopics.length}/${topics.length}`, icon: '✅' },
                { label: 'Saved Qs', val: savedCount, icon: '🔖' },
                { label: 'Starred Qs', val: importantCount, icon: '⭐' },
              ].map(s => (
                <div key={s.label} style={{
                  flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 14,
                  padding: '12px 14px', border: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <div style={{ fontSize: 16, marginBottom: 4 }}>{s.icon}</div>
                  <div style={{ color: 'white', fontSize: 18, fontWeight: 800 }}>{s.val}</div>
                  <div style={{ color: '#64748b', fontSize: 11, fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Topic-wise breakdown */}
        <div style={{ padding: '20px 28px 28px' }}>
          <h3 style={{ color: '#94a3b8', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', margin: '0 0 14px' }}>
            Topic-wise Progress
          </h3>
          {topics.length === 0 && (
            <p style={{ color: '#475569', fontSize: 13 }}>No topics found for this course.</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {topics.map(topicId => {
              const done = completedTopics.includes(topicId);
              const topicAction = (student.progress?.topicActions ?? {})[topicId] ?? {};
              return (
                <div
                  key={topicId}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: done ? `${colors.light}` : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${done ? colors.accent + '44' : 'rgba(255,255,255,0.06)'}`,
                    borderRadius: 14, padding: '11px 14px',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: 8, flexShrink: 0,
                    background: done ? colors.accent : 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {done ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
                    )}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: done ? 'white' : '#64748b', flex: 1 }}>
                    {labels[topicId] || topicId}
                  </span>

                  {/* Topic action badges */}
                  <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                    {topicAction.started && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 6, background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }}>Started</span>
                    )}
                    {topicAction.important && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 6, background: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: '1px solid rgba(245,158,11,0.3)' }}>⭐</span>
                    )}
                    {topicAction.correct && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 6, background: 'rgba(34,197,94,0.2)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.3)' }}>👍</span>
                    )}
                    {topicAction.issue && (
                      <span style={{ fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 6, background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)' }}>⚠️</span>
                    )}
                  </div>

                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: done ? colors.accent : '#374151' }}>
                    {done ? 'Done' : 'Pending'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Student Card ───────────────────────────────────────────
function StudentCard({ student, onApprove, onDelete, onClick }) {
  const course = student.course || 'mern-stack';
  const topics = COURSE_TOPICS[course] || [];
  const completedTopics = student.progress?.completedTopics ?? [];
  const overallPct = topics.length > 0 ? Math.round((completedTopics.length / topics.length) * 100) : 0;
  const colors = COURSE_COLORS[course] || COURSE_COLORS['mern-stack'];

  const [hover, setHover] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      style={{
        background: hover ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 22,
        padding: '20px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        transform: hover ? 'translateY(-2px)' : 'none',
        boxShadow: hover ? '0 12px 40px rgba(0,0,0,0.3)' : '0 2px 12px rgba(0,0,0,0.15)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 16 }}>
        {/* Avatar */}
        <div style={{
          width: 44, height: 44, borderRadius: 14, flexShrink: 0,
          background: colors.light,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 800, color: colors.accent,
        }}>
          {student.name?.charAt(0)?.toUpperCase()}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <h3 style={{ color: 'white', fontSize: 15, fontWeight: 700, margin: 0 }}>{student.name}</h3>
            {/* Approval badge */}
            <span style={{
              fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em',
              padding: '2px 8px', borderRadius: 99,
              background: student.approved ? 'rgba(34,197,94,0.15)' : 'rgba(245,158,11,0.15)',
              color: student.approved ? '#4ade80' : '#fbbf24',
              border: `1px solid ${student.approved ? 'rgba(74,222,128,0.3)' : 'rgba(251,191,36,0.3)'}`,
            }}>
              {student.approved ? 'Approved' : 'Pending'}
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: 12, margin: '3px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{student.email}</p>
        </div>

        {/* Course badge */}
        <span style={{
          fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 99,
          background: student.course === 'mern-stack' ? 'rgba(249,115,22,0.15)' : 'rgba(14,165,233,0.15)',
          color: student.course === 'mern-stack' ? '#fb923c' : '#38bdf8',
          border: `1px solid ${student.course === 'mern-stack' ? 'rgba(249,115,22,0.3)' : 'rgba(14,165,233,0.3)'}`,
          flexShrink: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>
          {student.course === 'mern-stack' ? 'MERN' : 'Analytics'}
        </span>
      </div>

      {/* Progress */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <span style={{ color: '#64748b', fontSize: 11, fontWeight: 600 }}>
            {completedTopics.length}/{topics.length} topics
          </span>
          <span style={{ color: 'white', fontSize: 13, fontWeight: 800 }}>{overallPct}%</span>
        </div>
        <ProgressBar percent={overallPct} color={colors.accent} />
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { icon: '🔖', val: student.progress?.savedQuestions?.length ?? 0, label: 'Saved' },
          { icon: '⭐', val: student.progress?.importantQuestions?.length ?? 0, label: 'Starred' },
        ].map(s => (
          <div key={s.label} style={{
            flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 10,
            padding: '8px 10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ fontSize: 12 }}>{s.icon}</div>
            <div style={{ color: 'white', fontSize: 15, fontWeight: 800 }}>{s.val}</div>
            <div style={{ color: '#64748b', fontSize: 10, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
        <div style={{
          flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 10,
          padding: '8px 10px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ fontSize: 12 }}>📅</div>
          <div style={{ color: '#64748b', fontSize: 10, fontWeight: 600, marginTop: 2 }}>Joined</div>
          <div style={{ color: '#94a3b8', fontSize: 10, fontWeight: 600 }}>
            {new Date(student.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 8 }} onClick={e => e.stopPropagation()}>
        {!student.approved && (
          <button
            onClick={() => onApprove(student.id)}
            style={{
              flex: 1, background: 'rgba(34,197,94,0.15)', border: '1px solid rgba(74,222,128,0.3)',
              borderRadius: 12, padding: '8px 12px', color: '#4ade80',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(34,197,94,0.25)'; }}
            onMouseLeave={e => { e.target.style.background = 'rgba(34,197,94,0.15)'; }}
          >
            ✓ Approve
          </button>
        )}
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            style={{
              flex: student.approved ? 1 : 0, background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: 12, padding: '8px 12px', color: '#f87171',
              fontSize: 12, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
              minWidth: student.approved ? undefined : 40,
            }}
            onMouseEnter={e => { e.target.style.background = 'rgba(239,68,68,0.22)'; }}
            onMouseLeave={e => { e.target.style.background = 'rgba(239,68,68,0.12)'; }}
          >
            {student.approved ? '✕ Remove' : '✕'}
          </button>
        ) : (
          <div style={{ flex: 1, display: 'flex', gap: 6 }}>
            <button
              onClick={() => onDelete(student.id)}
              style={{
                flex: 1, background: 'rgba(239,68,68,0.25)', border: '1px solid rgba(239,68,68,0.4)',
                borderRadius: 12, padding: '8px', color: '#fca5a5',
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
              }}
            >Confirm</button>
            <button
              onClick={() => setConfirmDelete(false)}
              style={{
                flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, padding: '8px', color: '#94a3b8',
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
              }}
            >Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Admin Dashboard ───────────────────────────────────
function AdminPage() {
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem('admin-token') || '');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [filter, setFilter] = useState('all'); // all | pending | approved
  const [courseFilter, setCourseFilter] = useState('all'); // all | mern-stack | data-analytics
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStudents = useCallback(async (token) => {
    setLoading(true);
    setError('');
    try {
      const data = await adminGetStudents(token);
      setStudents(data.students);
    } catch (err) {
      setError(err.message);
      if (err.message.includes('Invalid') || err.message.includes('expired')) {
        setAdminToken('');
        sessionStorage.removeItem('admin-token');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (adminToken) {
      fetchStudents(adminToken);
    }
  }, [adminToken, fetchStudents]);

  function handleLogin(token) {
    sessionStorage.setItem('admin-token', token);
    setAdminToken(token);
  }

  function handleLogout() {
    sessionStorage.removeItem('admin-token');
    setAdminToken('');
    setStudents([]);
  }

  async function handleApprove(studentId) {
    try {
      await adminApproveStudent(adminToken, studentId);
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, approved: true } : s));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(studentId) {
    try {
      await adminDeleteStudent(adminToken, studentId);
      setStudents(prev => prev.filter(s => s.id !== studentId));
      if (selectedStudent?.id === studentId) setSelectedStudent(null);
    } catch (err) {
      setError(err.message);
    }
  }

  if (!adminToken) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  // Filter students
  const filtered = students.filter(s => {
    if (filter === 'pending' && s.approved) return false;
    if (filter === 'approved' && !s.approved) return false;
    if (courseFilter !== 'all' && s.course !== courseFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return s.name?.toLowerCase().includes(q) || s.email?.toLowerCase().includes(q);
    }
    return true;
  });

  const totalStudents = students.length;
  const approvedCount = students.filter(s => s.approved).length;
  const pendingCount = students.filter(s => !s.approved).length;
  const mernCount = students.filter(s => s.course === 'mern-stack').length;
  const analyticsCount = students.filter(s => s.course === 'data-analytics').length;

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0c1a2e 100%)',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      color: 'white',
    },
    header: {
      padding: '0 32px',
      height: 64,
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backdropFilter: 'blur(20px)',
      background: 'rgba(10,15,30,0.8)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    main: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '32px 24px',
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 12,
            background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 10, color: '#64748b', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>WebiGeeks</p>
            <h1 style={{ fontSize: 15, fontWeight: 800, color: 'white', margin: 0 }}>Admin Dashboard</h1>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={() => fetchStudents(adminToken)}
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: '7px 14px', color: '#94a3b8',
              fontSize: 12, fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6, transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            Refresh
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
              borderRadius: 10, padding: '7px 14px', color: '#f87171',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(239,68,68,0.22)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(239,68,68,0.12)'}
          >
            Sign Out
          </button>
        </div>
      </header>

      <main style={styles.main}>
        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 28 }}>
          {[
            { label: 'Total Students', val: totalStudents, icon: '👥', color: '#6366f1' },
            { label: 'Approved', val: approvedCount, icon: '✅', color: '#22c55e' },
            { label: 'Pending Approval', val: pendingCount, icon: '⏳', color: '#f59e0b' },
            { label: 'MERN Stack', val: mernCount, icon: '🟠', color: '#f97316' },
            { label: 'Data Analytics', val: analyticsCount, icon: '🔵', color: '#0ea5e9' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 18, padding: '18px 20px',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 14, flexShrink: 0,
                background: `${stat.color}22`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20,
              }}>
                {stat.icon}
              </div>
              <div>
                <div style={{ fontSize: 26, fontWeight: 800, color: 'white', lineHeight: 1 }}>{stat.val}</div>
                <div style={{ fontSize: 11, color: '#64748b', fontWeight: 600, marginTop: 3 }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 24,
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 18, padding: '14px 18px',
        }}>
          {/* Search */}
          <div style={{ flex: '1 1 200px', position: 'relative' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2.5" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              placeholder="Search by name or email…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '9px 12px 9px 34px',
                color: 'white', fontSize: 13, outline: 'none',
              }}
            />
          </div>

          {/* Status filter */}
          <div style={{ display: 'flex', gap: 6 }}>
            {['all', 'pending', 'approved'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  background: filter === f ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${filter === f ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 10, padding: '7px 14px',
                  color: filter === f ? '#a5b4fc' : '#64748b',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                  textTransform: 'capitalize',
                }}
              >{f}</button>
            ))}
          </div>

          {/* Course filter */}
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { key: 'all', label: 'All Courses' },
              { key: 'mern-stack', label: '🟠 MERN' },
              { key: 'data-analytics', label: '🔵 Analytics' },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setCourseFilter(f.key)}
                style={{
                  background: courseFilter === f.key ? 'rgba(14,165,233,0.15)' : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${courseFilter === f.key ? 'rgba(14,165,233,0.35)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 10, padding: '7px 14px',
                  color: courseFilter === f.key ? '#38bdf8' : '#64748b',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                }}
              >{f.label}</button>
            ))}
          </div>
        </div>

        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 14, padding: '12px 18px', color: '#fca5a5', fontSize: 13, fontWeight: 500, marginBottom: 20,
          }}>{error}</div>
        )}

        {/* Students grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
            <div style={{
              width: 40, height: 40, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: '#0ea5e9',
              borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 0.8s linear infinite',
            }} />
            <p style={{ fontSize: 14, fontWeight: 600 }}>Loading students…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎓</div>
            <p style={{ color: '#64748b', fontSize: 15, fontWeight: 600 }}>
              {students.length === 0 ? 'No students registered yet.' : 'No students match your filters.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
            {filtered.map(student => (
              <StudentCard
                key={student.id}
                student={student}
                onApprove={handleApprove}
                onDelete={handleDelete}
                onClick={() => setSelectedStudent(student)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Student detail modal */}
      {selectedStudent && (
        <StudentModal
          student={students.find(s => s.id === selectedStudent.id) || selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #475569; }
      `}</style>
    </div>
  );
}

export default AdminPage;
