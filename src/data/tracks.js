import { topicBlueprints } from './topicBlueprints';
import { TOPIC_QUESTIONS } from './realQuestions';
import { getResearchSources } from './researchSources';


const trackDefinitions = [
  {
    id: 'data-analytics',
    title: 'Data Analytics',
    shortDescription: 'Master spreadsheet logic, data manipulation, visualization, and analytics storytelling.',
    accent: 'from-sky-500 via-cyan-400 to-teal-300',
    heroStats: ['8 Topics', 'Dashboard Thinking', '0-1 Year Ready'],
    topics: [
      { id: 'excel',      title: 'Excel',       level: 'Foundation',    tags: ['Formulas', 'Lookups', 'Cleaning'] },
      { id: 'sql',        title: 'SQL',          level: 'Foundation',    tags: ['Queries', 'Joins', 'Aggregation'] },
      { id: 'python',     title: 'Python',       level: 'Foundation',    tags: ['Syntax', 'Functions', 'Logic'] },
      { id: 'pandas',     title: 'Pandas',       level: 'Applied',       tags: ['DataFrames', 'Cleaning', 'Analysis'] },
      { id: 'numpy',      title: 'NumPy',        level: 'Applied',       tags: ['Arrays', 'Vectorization', 'Performance'] },
      { id: 'matplotlib', title: 'Matplotlib',   level: 'Applied',       tags: ['Plots', 'Customization', 'Storytelling'] },
      { id: 'tableau',    title: 'Tableau',      level: 'Visualization', tags: ['Dashboards', 'Filters', 'Calculated Fields'] },
      { id: 'power-bi',   title: 'Power BI',     level: 'Visualization', tags: ['DAX', 'Reports', 'Models'] },
    ],
  },
  {
    id: 'mern-stack',
    title: 'MERN Stack',
    shortDescription: 'Learn frontend, backend, database, and authentication skills expected in junior full-stack interviews.',
    accent: 'from-orange-500 via-amber-400 to-rose-300',
    heroStats: ['14 Topics', 'Full Stack Flow', 'Project-Oriented'],
    topics: [
      { id: 'html',                    title: 'HTML',                    level: 'Foundation', tags: ['Semantic', 'Forms', 'Accessibility'] },
      { id: 'css',                     title: 'CSS',                     level: 'Foundation', tags: ['Selectors', 'Box Model', 'Responsive'] },
      { id: 'flexbox',                 title: 'Flexbox',                 level: 'Foundation', tags: ['Alignment', 'Layout', 'Spacing'] },
      { id: 'javascript',              title: 'JavaScript',              level: 'Foundation', tags: ['Closures', 'Array Methods', 'Async'] },
      { id: 'react',                   title: 'React',                   level: 'Core',       tags: ['Hooks', 'Components', 'State'] },
      { id: 'node-js',                 title: 'Node.js',                 level: 'Backend',    tags: ['Runtime', 'Modules', 'Events'] },
      { id: 'express-js',              title: 'Express.js',              level: 'Backend',    tags: ['Middleware', 'Routing', 'REST APIs'] },
      { id: 'mongodb',                 title: 'MongoDB',                 level: 'Database',   tags: ['Documents', 'Queries', 'Indexes'] },
      { id: 'mongoose',                title: 'Mongoose',                level: 'Database',   tags: ['Schemas', 'Models', 'Validation'] },
      { id: 'authentication',          title: 'Authentication',          level: 'Security',   tags: ['bcrypt', 'JWT', 'Sessions'] },
      { id: 'bcrypt',                  title: 'bcrypt',                  level: 'Security',   tags: ['Hashing', 'Salting', 'Passwords'] },
      { id: 'jwt',                     title: 'JWT',                     level: 'Security',   tags: ['Tokens', 'Claims', 'Authorization'] },
      { id: 'passport-local',          title: 'passport-local',          level: 'Security',   tags: ['Local Login', 'Sessions', 'Strategy'] },
      { id: 'passport-google-oauth20', title: 'passport-google-oauth20', level: 'Security',   tags: ['OAuth', 'Google Login', 'Strategy'] },
    ],
  },
];

const EXPERIENCE_LABELS = {
  fresher: 'Fresher (0 yrs)',
  junior:  '1–2 Years',
  mid:     '3–5 Years',
};

function createTopic(topic, track) {
  const blueprint = topicBlueprints[topic.id];
  const intro = blueprint?.intro ?? 'This topic covers key concepts, practical code examples, and output prediction challenges for your interview preparation.';

  // Use real researched questions; fall back to empty array if none
  const topicQuestions = TOPIC_QUESTIONS[topic.id] ?? [];

  return {
    ...topic,
    trackId: track.id,
    trackTitle: track.title,
    intro,
    sources: getResearchSources(topic.id, track.id),
    questions: topicQuestions,
  };
}

export function getTracks() {
  return trackDefinitions.map((track) => ({
    ...track,
    topics: track.topics.map((topic) => createTopic(topic, track)),
  }));
}

export { EXPERIENCE_LABELS };
