const trackSources = {
  'data-analytics': [
    {
      label: 'GeeksforGeeks: Excel Interview Questions (2025)',
      url: 'https://www.geeksforgeeks.org/excel/excel-interview-questions-and-answers/',
    },
    {
      label: 'InterviewBit: SQL Interview Questions (Jan 2026)',
      url: 'https://www.interviewbit.com/sql-interview-questions/',
    },
    {
      label: 'GeeksforGeeks: Pandas Interview Questions (Sep 2025)',
      url: 'https://www.geeksforgeeks.org/pandas/pandas-interview-questions/',
    },
    {
      label: 'GeeksforGeeks: Power BI Interview Questions (Sep 2025)',
      url: 'https://www.geeksforgeeks.org/power-bi/power-bi-interview-questions-and-answers/',
    },
    {
      label: 'GeeksforGeeks: Tableau Interview Questions (Sep 2025)',
      url: 'https://www.geeksforgeeks.org/tableau-interview-questions-and-answers/',
    },
  ],
  'mern-stack': [
    {
      label: 'InterviewBit: MERN Stack Interview Questions (Jan 2026)',
      url: 'https://www.interviewbit.com/mern-stack-interview-questions/',
    },
    {
      label: 'InterviewBit: React Interview Questions (Jan 2026)',
      url: 'https://www.interviewbit.com/react-interview-questions/',
    },
    {
      label: 'InterviewBit: JavaScript Interview Questions (Jan 2026)',
      url: 'https://www.interviewbit.com/javascript-interview-questions/',
    },
    {
      label: 'InterviewBit: Node.js Interview Questions (Jan 2026)',
      url: 'https://www.interviewbit.com/node-js-interview-questions/',
    },
    {
      label: 'GeeksforGeeks: MongoDB Interview Questions (Sep 2025)',
      url: 'https://www.geeksforgeeks.org/mongodb/mongodb-interview-questions/',
    },
  ],
};

const topicSources = {
  excel: [
    {
      label: 'GeeksforGeeks: Excel for Data Analysis Questions (Jun 2025)',
      url: 'https://www.geeksforgeeks.org/excel/top-excel-interview-questions-for-data-analysis/',
    },
  ],
  sql: [
    {
      label: 'GeeksforGeeks: SQL Interview Questions (Oct 2025)',
      url: 'https://www.geeksforgeeks.org/sql-interview-questions/',
    },
  ],
  react: [
    {
      label: 'InterviewBit: React Interview Questions (Jan 2026)',
      url: 'https://www.interviewbit.com/react-interview-questions/',
    },
  ],
  html: [
    {
      label: 'InterviewBit: HTML Interview Questions',
      url: 'https://www.interviewbit.com/html-interview-questions/',
    },
  ],
  mongodb: [
    {
      label: 'GeeksforGeeks: MongoDB Interview Questions (Sep 2025)',
      url: 'https://www.geeksforgeeks.org/mongodb/mongodb-interview-questions/',
    },
  ],
};

export function getResearchSources(topicId, trackId) {
  return [...(topicSources[topicId] ?? []), ...(trackSources[trackId] ?? [])];
}
