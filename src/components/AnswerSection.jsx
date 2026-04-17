import React from 'react';
import CodeBlock from './CodeBlock';
import OutputPrediction from './OutputPrediction';

function AnswerSection({ question, showAnswer }) {
  if (!showAnswer) {
    return null;
  }

  return (
    <div className="mt-5 space-y-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Answer</p>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{question.answer}</p>
      </div>

      {question.explanation ? (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Explanation</p>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{question.explanation}</p>
        </div>
      ) : null}

      {question.code ? <CodeBlock code={question.code} /> : null}
      {question.type === 'output' ? (
        <OutputPrediction output={question.output} explanation={question.explanation} choices={question.choices} />
      ) : null}
    </div>
  );
}

export default AnswerSection;
