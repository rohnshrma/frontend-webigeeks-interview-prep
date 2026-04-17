import { getTopicProfile } from '../data/topicProfiles';

function createQuestionId(topicId, index) {
  return `${topicId}-question-${index + 1}`;
}

function createBaseQuestion({ id, type, title, answer, code = '', output = '', explanation = '', choices = null }) {
  return {
    id,
    type,
    question: title,
    answer,
    code,
    output,
    explanation,
    choices,   // Array<{ label: string; correct: boolean }> | null – only for output type
    difficulty: type === 'conceptual' ? 'Easy' : type === 'practical' ? 'Medium' : 'Medium',
  };
}

/**
 * Given the correct output string, generate 3 plausible wrong choices.
 * These are topic-aware distractors so they look realistic in MCQs.
 */
function generateMCQChoices(correctOutput, topicId) {
  // Predefined wrong-choice sets per topic for realism
  const wrongSets = {
    excel: ['#VALUE!', '#REF!', '#NAME?', '0', '12.34', '12.3', '12.4', '13', '11', 'True'],
    sql: ['Multiple rows', 'NULL', 'An error', 'Zero rows', 'A single value', 'Undefined'],
    python: ['[1, 2, 3]', 'None', 'Error', '[10, 20]', '[20, 30, 40]', '3', '4', '5', '0', '[]'],
    pandas: ['A DataFrame', 'None', 'True', 'Error', 'A list', '(0, 0)', '(5, 3)', '(10, 5)'],
    numpy: ['[5  10]', '[10  20]', '[5, 10, 15]', '(2,)', '(4,)', '(2, 2)', '[0  0]'],
    matplotlib: ['A scatter plot', 'An error', 'A pie chart', 'A line chart', 'Nothing', 'A heatmap'],
    tableau: ['Filters run first', 'A calculated field', 'An error', 'A measure', 'A parameter', 'Nothing'],
    'power-bi': ['The full dataset', 'An error', 'NULL', 'A calculated column', 'Zero', 'All regions'],
    html: ['Bold text on a new line', 'No visible effect', 'An error in the browser', 'An image renders', 'A heading appears'],
    css: ['The box stays 200px', 'Borders collapse', 'The text turns red', 'Items stack vertically', 'Nothing changes'],
    flexbox: ['Items stack vertically', 'Items overflow', 'A grid forms', 'Items collapse', 'Nothing changes'],
    javascript: ['"undefined"', '"number"', '"null"', '"string"', 'true', 'null', '0', 'ReferenceError'],
    react: ['Logs on every keystroke', 'Only logs once', 'Logs before render', 'Never logs', 'Logs synchronously', 'The List never renders'],
    'node-js': ['start, timer, end', 'timer, start, end', 'end, start, timer', 'Promise { 5 }', 'The number 5', 'undefined'],
    'express-js': ['A 200 response', 'The request continues without the log', 'An error is thrown', 'A 404 response', 'A 500 response'],
    mongodb: ['A plain JavaScript object', 'undefined', 'null', 'A string', 'A number'],
    mongoose: ['The document saves without error', 'Returns undefined', 'Returns null', 'An array of documents', 'A Promise<null>'],
    authentication: ['A 403 Forbidden response', 'A 200 OK response', 'A 500 error', 'Redirect to login', 'A 404 response'],
    bcrypt: ['The original password', 'undefined', 'true', 'null', 'A number'],
    jwt: ['The decoded payload', 'The original string', 'undefined', 'A 403 error', 'null'],
    'passport-local': ['Saves the full user object', 'Returns undefined', 'Throws an error', 'Authentication succeeds anyway'],
    'passport-google-oauth20': ['A local login form', 'An error page', 'A 401 response', 'The home page'],
  };

  const pool = wrongSets[topicId] ?? [
    'An error is thrown',
    'undefined',
    'Nothing happens',
    'null',
    'true',
    'false',
    'A Promise',
  ];

  // Pick 3 unique distractors not equal to the correctOutput
  const distractors = pool
    .filter((w) => w.toLowerCase() !== correctOutput.toLowerCase())
    .slice(0, 3);

  // Pad with generic options if pool was too small
  const generic = ['An error is thrown', 'undefined', 'null', 'Nothing happens'];
  let idx = 0;
  while (distractors.length < 3) {
    const g = generic[idx++ % generic.length];
    if (!distractors.includes(g) && g.toLowerCase() !== correctOutput.toLowerCase()) {
      distractors.push(g);
    }
  }

  // Shuffle correct + wrong into 4 choices
  const all = [
    { label: correctOutput, correct: true },
    ...distractors.map((d) => ({ label: d, correct: false })),
  ];

  // Fisher-Yates shuffle
  for (let i = all.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [all[i], all[j]] = [all[j], all[i]];
  }

  return all;
}

function makeOutputQuestion(topicId, index, prompt) {
  return createBaseQuestion({
    id: createQuestionId(topicId, index),
    type: 'output',
    title: prompt.title,
    answer: 'Pick the correct output from the choices below, then reveal the explanation.',
    code: prompt.code,
    output: prompt.output,
    explanation: prompt.explanation,
    choices: generateMCQChoices(prompt.output, topicId),
  });
}

export function generateQuestionsForTopic({ topicId, topicTitle, trackTitle, blueprint, tags = [] }) {
  const profile = getTopicProfile(topicId, topicTitle);
  const [primaryTag = 'core concepts', secondaryTag = 'implementation', tertiaryTag = 'debugging'] = tags;

  const questions = [
    // ── Conceptual Q1: real blueprint question ───────────────
    createBaseQuestion({
      id: createQuestionId(topicId, 0),
      type: 'conceptual',
      title: blueprint.conceptualPrompts[0].title,
      answer: blueprint.conceptualPrompts[0].answer,
    }),
    // ── Conceptual Q2: real blueprint question ───────────────
    createBaseQuestion({
      id: createQuestionId(topicId, 1),
      type: 'conceptual',
      title: blueprint.conceptualPrompts[1].title,
      answer: blueprint.conceptualPrompts[1].answer,
    }),
    // ── Conceptual Q3: common beginner mistakes ───────────────
    createBaseQuestion({
      id: createQuestionId(topicId, 2),
      type: 'conceptual',
      title: `What beginner mistakes do candidates make in ${topicTitle}?`,
      answer: `A very common mistake is ${profile.commonMistake}. Good answers also mention readability, debugging habits, and correct use of ${secondaryTag.toLowerCase()}.`,
      explanation: 'This question is popular because it reveals whether you have hands-on practice rather than only tutorial-level familiarity.',
    }),
    // ── Conceptual Q4: project framing ────────────────────────
    createBaseQuestion({
      id: createQuestionId(topicId, 3),
      type: 'conceptual',
      title: `How would you explain ${topicTitle} through a mini project on your resume?`,
      answer: `Frame your answer around ${profile.projectUseCase}. Interviewers want to hear what problem you solved, why you chose ${topicTitle}, and what result it produced.`,
      explanation: 'Resume-based interview questions are increasingly common because they test real ownership, not just rehearsed definitions.',
    }),
    // ── Practical Q1: real code from blueprint ────────────────
    createBaseQuestion({
      id: createQuestionId(topicId, 4),
      type: 'practical',
      title: blueprint.practicalPrompts[0].title,
      answer: blueprint.practicalPrompts[0].answer,
      code: blueprint.practicalPrompts[0].code,
    }),
    // ── Practical Q2: real code from blueprint ────────────────
    createBaseQuestion({
      id: createQuestionId(topicId, 5),
      type: 'practical',
      title: blueprint.practicalPrompts[1].title,
      answer: blueprint.practicalPrompts[1].answer,
      code: blueprint.practicalPrompts[1].code,
    }),
    // ── Practical Q3: profile code sample 1 ──────────────────
    createBaseQuestion({
      id: createQuestionId(topicId, 6),
      type: 'practical',
      title: profile.codeSamples[0].title,
      answer: profile.codeSamples[0].answer,
      code: profile.codeSamples[0].code,
      explanation: profile.codeSamples[0].explanation,
    }),
    // ── Practical Q4: profile code sample 2 ──────────────────
    createBaseQuestion({
      id: createQuestionId(topicId, 7),
      type: 'practical',
      title: profile.codeSamples[1].title,
      answer: profile.codeSamples[1].answer,
      code: profile.codeSamples[1].code,
      explanation: profile.codeSamples[1].explanation,
    }),
    // ── Output / Guess-the-output MCQ 1 (blueprint) ──────────
    makeOutputQuestion(topicId, 8, blueprint.outputPrompts[0]),
    // ── Output / Guess-the-output MCQ 2 (profile) ────────────
    makeOutputQuestion(topicId, 9, profile.outputPrompts[0]),
    // ── Output / Guess-the-output MCQ 3 (profile) ────────────
    makeOutputQuestion(topicId, 10, profile.outputPrompts[1]),
    // ── Conceptual Q5: follow-up awareness ────────────────────
    createBaseQuestion({
      id: createQuestionId(topicId, 11),
      type: 'conceptual',
      title: `What follow-up questions can an interviewer ask after a basic ${topicTitle} answer?`,
      answer: `Common follow-ups move from definition to application: compare two approaches, explain a bug, optimize a simple example, or connect ${topicTitle} to ${tertiaryTag.toLowerCase()}.`,
      explanation: 'Preparing for follow-ups is one of the easiest ways to sound more interview-ready than candidates who memorize single-line answers.',
    }),
  ];

  return questions;
}
