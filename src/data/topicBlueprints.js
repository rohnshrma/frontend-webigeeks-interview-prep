export const topicBlueprints = {
  excel: {
    intro:
      'Excel interviews at the fresher level often test formula confidence, data cleaning basics, and dashboard-friendly thinking.',
    conceptualPrompts: [
      {
        title: 'What is the difference between relative and absolute cell references in Excel?',
        answer:
          'Relative references change when a formula is copied, while absolute references stay fixed using the $ symbol. Interviewers ask this to check whether you can build reusable formulas without breaking lookups or calculations.',
      },
      {
        title: 'When would you use VLOOKUP, XLOOKUP, or INDEX-MATCH?',
        answer:
          'VLOOKUP is simple for left-to-right lookups, XLOOKUP is more flexible and modern, and INDEX-MATCH is useful when you need compatibility or dynamic left/right lookups. A good answer shows you understand trade-offs, not just syntax.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you count the number of "Closed" records in a status column?',
        answer:
          'Use COUNTIF when a single condition is enough. COUNTIF(B2:B20, "Closed") scans the range and returns the number of matching cells. For multiple conditions use COUNTIFS.',
        code: '=COUNTIF(B2:B20, "Closed")',
      },
      {
        title: 'How can you combine first and last names from two columns into one full name?',
        answer:
          'Use the & concatenation operator or TEXTJOIN. The & approach is the simplest: =A2 & " " & B2 joins the values with a space between them.',
        code: '=A2 & " " & B2',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the output of `=ROUND(12.345, 2)`',
        code: '=ROUND(12.345, 2)',
        output: '12.35',
        explanation:
          'ROUND keeps two decimal places and rounds the third decimal based on the next digit, so 12.345 becomes 12.35.',
      },
    ],
  },

  sql: {
    intro:
      'Entry-level SQL interviews usually focus on filtering, joins, aggregations, and reading query output correctly.',
    conceptualPrompts: [
      {
        title: 'What is the difference between WHERE and HAVING in SQL?',
        answer:
          'WHERE filters rows before grouping, while HAVING filters grouped results after aggregation. This difference matters when you want to remove groups based on COUNT, SUM, or AVG.',
      },
      {
        title: 'Why do we use JOINs in relational databases?',
        answer:
          'JOINs combine related data from multiple tables using matching keys. They let you answer business questions without storing repeated information in a single table.',
      },
    ],
    practicalPrompts: [
      {
        title: 'Write a query to find the top 3 highest salaries from an employees table.',
        answer:
          'Sort the salary column in descending order and limit the result. This demonstrates your ability to rank records for reporting questions.',
        code: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 3;',
      },
      {
        title: 'How would you count employees in each department?',
        answer:
          'Use GROUP BY with COUNT. This shows that you can summarize business data rather than just returning raw rows.',
        code: 'SELECT department, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department;',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the output row count of this GROUP BY query',
        code: 'SELECT department, COUNT(*)\nFROM employees\nGROUP BY department;',
        output: 'One row per distinct department',
        explanation:
          'Because the query groups by department, SQL returns aggregated output for each distinct department value instead of one row per employee.',
      },
    ],
  },

  python: {
    intro:
      'Python interviews at the fresher level test data types, control flow, functions, and the ability to write clean short scripts.',
    conceptualPrompts: [
      {
        title: 'What is the difference between a list and a tuple in Python?',
        answer:
          'Lists are mutable — you can add, remove, or change items. Tuples are immutable — their content cannot change after creation. Tuples are typically faster and are used for fixed data, while lists are used when the data needs to change.',
      },
      {
        title: 'How does Python handle variable scope in functions?',
        answer:
          'Python uses the LEGB rule: Local, Enclosing, Global, Built-in. A variable defined inside a function is local to that function. To modify a global variable inside a function you need the global keyword.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you create a filtered list of even numbers from 1 to 10?',
        answer:
          'Use a list comprehension with a condition. List comprehensions are Pythonic and preferred over loops for simple transformations.',
        code: 'evens = [n for n in range(1, 11) if n % 2 == 0]\nprint(evens)',
      },
      {
        title: 'How would you count the number of words in a sentence string?',
        answer:
          'Use str.split() to break the sentence into a list of words, then len() to count them. split() handles multiple spaces gracefully.',
        code: 'sentence = "data analyst interview prep"\nword_count = len(sentence.split())\nprint(word_count)',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the output of list slicing',
        code: 'items = [10, 20, 30, 40]\nprint(items[1:3])',
        output: '[20, 30]',
        explanation:
          'Python slicing includes the start index and excludes the end index. Index 1 is 20 and index 3 is 40, which is excluded.',
      },
    ],
  },

  pandas: {
    intro:
      'Pandas interviews test your ability to load, explore, filter, group, and clean tabular data — skills directly used in analyst jobs.',
    conceptualPrompts: [
      {
        title: 'What is the difference between a Pandas Series and a DataFrame?',
        answer:
          'A Series is a one-dimensional labeled array similar to a column. A DataFrame is a two-dimensional table with rows and columns. Most real data arrives as a DataFrame, while individual columns are accessed as Series.',
      },
      {
        title: 'Why is it important to avoid Python loops when using Pandas?',
        answer:
          'Pandas operations are vectorized, meaning they run on entire columns at once using optimized C-level code. Writing loops cancels this advantage and makes operations much slower on large datasets.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you load a CSV file and display the first 5 rows?',
        answer:
          'Use pd.read_csv() to load the file and .head() to preview the first rows. This is the standard starting point for any data analysis task.',
        code: "import pandas as pd\n\ndf = pd.read_csv('employees.csv')\nprint(df.head())",
      },
      {
        title: 'How would you calculate average salary grouped by department?',
        answer:
          'Use groupby() to group rows by department and .mean() on the salary column. This pattern maps directly to real reporting tasks.',
        code: "summary = df.groupby('department')['salary'].mean()\nprint(summary)",
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what type selecting one column by name returns',
        code: "result = df['salary']\nprint(type(result))",
        output: '<class \'pandas.core.series.Series\'>',
        explanation:
          'Selecting a single column from a DataFrame using square brackets returns a Pandas Series, not another DataFrame.',
      },
    ],
  },

  numpy: {
    intro:
      'NumPy interviews focus on array creation, vectorized operations, slicing, and basic statistics — all cornerstones of numeric data work.',
    conceptualPrompts: [
      {
        title: 'What is the key difference between a Python list and a NumPy array?',
        answer:
          'NumPy arrays are homogeneous — every element must be the same type — and they support vectorized operations, allowing arithmetic on the entire array without loops. Python lists accept mixed types but lack this speed advantage.',
      },
      {
        title: 'Why are NumPy operations faster than Python loops for numeric work?',
        answer:
          'NumPy operations are implemented in C and use contiguous memory blocks, eliminating Python object overhead. This makes array-wise math orders of magnitude faster for large datasets.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you create a NumPy array and double every element?',
        answer:
          'Use np.array() to create the array, then multiply by 2. The operation applies to every element automatically without a loop.',
        code: 'import numpy as np\n\narr = np.array([1, 2, 3])\nprint(arr * 2)',
      },
      {
        title: 'How would you compute the mean of a numeric array?',
        answer:
          'Use .mean() directly on the NumPy array. NumPy provides built-in statistical methods that run efficiently for large datasets.',
        code: 'import numpy as np\n\nscores = np.array([70, 80, 90])\nprint(scores.mean())',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the output of NumPy array slicing',
        code: 'import numpy as np\narr = np.array([5, 10, 15, 20])\nprint(arr[1:3])',
        output: '[10 15]',
        explanation:
          'NumPy slicing works like Python list slicing — index 1 is 10 and index 3 is excluded, so [10 15] is printed without commas.',
      },
    ],
  },

  matplotlib: {
    intro:
      'Matplotlib interviews cover basic chart creation, labeling, and understanding which chart type suits a given business question.',
    conceptualPrompts: [
      {
        title: 'When would you use a line chart versus a bar chart in Matplotlib?',
        answer:
          'Line charts show trends over continuous data such as time series. Bar charts compare distinct categories. Choosing the wrong chart type makes data harder to interpret even if the code is correct.',
      },
      {
        title: 'Why is labeling axes and adding a title important in a Matplotlib chart?',
        answer:
          'Labels and titles make a chart self-explanatory to stakeholders. A chart without axis labels requires the viewer to guess the context, which is the most common feedback in data reporting roles.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you plot a simple line chart of monthly sales?',
        answer:
          'Use plt.plot() with the months on the x-axis and sales on the y-axis. Always call plt.show() at the end in scripts.',
        code: "import matplotlib.pyplot as plt\n\nmonths = ['Jan', 'Feb', 'Mar']\nsales = [100, 130, 160]\nplt.plot(months, sales)\nplt.title('Monthly Sales')\nplt.show()",
      },
      {
        title: 'How would you label the axes on a chart?',
        answer:
          'Use plt.xlabel() and plt.ylabel() after the plot command. This is one of the most frequently missed steps by beginners but is standard in any professional chart.',
        code: "plt.xlabel('Month')\nplt.ylabel('Revenue (USD)')",
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the visual output of this Matplotlib code',
        code: "plt.bar(['A', 'B'], [5, 8])\nplt.show()",
        output: 'A bar chart with two bars labeled A and B, with heights 5 and 8',
        explanation:
          'plt.bar creates a categorical bar chart. The first list is the x-axis labels and the second list is the bar heights.',
      },
    ],
  },

  tableau: {
    intro:
      'Tableau interviews test your understanding of dimensions versus measures, calculated fields, filters, and how to build actionable dashboards.',
    conceptualPrompts: [
      {
        title: 'What is the difference between a dimension and a measure in Tableau?',
        answer:
          'Dimensions are qualitative fields used to categorize data, such as Region or Category. Measures are quantitative fields used for aggregation, such as Sales or Profit. Tableau automatically aggregates measures when dimensions are placed on rows or columns.',
      },
      {
        title: 'How does a context filter differ from a regular filter in Tableau?',
        answer:
          'A context filter runs first and creates a primary subset of data. Other filters then operate on this subset rather than the full dataset. This is useful for performance and for setting conditional top-N filters correctly.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you write a calculated field to classify sales as High or Normal?',
        answer:
          'Use an IF statement in a calculated field. Calculated fields let you create reusable business logic columns without modifying the source data.',
        code: 'IF [Sales] > 1000 THEN "High" ELSE "Normal" END',
      },
      {
        title: 'How would you create a simple profit ratio metric as a calculated field?',
        answer:
          'Divide the Profit field by the Sales field. Tableau applies the aggregation context, so this becomes PROFIT/SALES per the selected dimension level.',
        code: '[Profit] / [Sales]',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what view Tableau builds when you drag Category to Rows and SUM(Sales) to Columns',
        code: 'Rows: Category\nColumns: SUM(Sales)',
        output: 'A horizontal bar chart comparing total Sales by Category',
        explanation:
          'Tableau creates a bar chart because a dimension (Category) drives the row breakdown and a continuous measure (SUM of Sales) determines bar length.',
      },
    ],
  },

  'power-bi': {
    intro:
      'Power BI interviews focus on data modeling, DAX basics, relationships between tables, and building meaningful KPI dashboards.',
    conceptualPrompts: [
      {
        title: 'What is the difference between a calculated column and a measure in Power BI?',
        answer:
          'A calculated column computes a row-by-row value stored in the data model and consumes memory. A measure computes dynamically based on the filter context and is more memory-efficient. Measures are generally preferred for aggregations in reports.',
      },
      {
        title: 'What is the role of relationships in a Power BI data model?',
        answer:
          'Relationships connect tables through primary and foreign keys, allowing DAX to propagate filters across tables. Without correct relationships, visuals will show incorrect or unfiltered totals.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you write a Total Sales measure in DAX?',
        answer:
          'Use the SUM function inside a MEASURE definition. This is the most fundamental DAX pattern and appears in nearly every Power BI report.',
        code: 'Total Sales = SUM(Sales[Amount])',
      },
      {
        title: 'How would you count distinct customers in DAX?',
        answer:
          'Use DISTINCTCOUNT on the customer ID column. This avoids double-counting customers who made multiple purchases.',
        code: 'Unique Customers = DISTINCTCOUNT(Sales[CustomerID])',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the result of this CALCULATE expression',
        code: 'CALCULATE(SUM(Sales[Amount]), Sales[Region] = "West")',
        output: 'The total sales amount only for rows where Region is West',
        explanation:
          'CALCULATE modifies the filter context before evaluating the aggregation, restricting SUM to West region rows.',
      },
    ],
  },

  html: {
    intro:
      'HTML interview questions for beginners emphasize semantic structure, accessibility, and proper element usage.',
    conceptualPrompts: [
      {
        title: 'Why are semantic HTML elements important?',
        answer:
          'Semantic elements like header, main, article, and footer improve accessibility, SEO, and code readability. They help browsers and assistive technologies understand the structure of the page.',
      },
      {
        title: 'What is the difference between block-level and inline elements?',
        answer:
          'Block-level elements usually take full width and start on a new line, while inline elements only take the space they need and flow inside text content. Examples: div is block-level; span is inline.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you create a simple accessible navigation bar?',
        answer:
          'Wrap links inside a nav element and use an unordered list if there are multiple items. This provides meaningful structure for users and screen readers.',
        code: '<nav aria-label="Primary">\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/topics">Topics</a></li>\n  </ul>\n</nav>',
      },
      {
        title: 'How do you associate a label with an input field for accessibility?',
        answer:
          'Use the for/id pair so the label is connected to the input. This improves accessibility and lets users click the label to focus the input.',
        code: '<label for="email">Email</label>\n<input id="email" type="email" />',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the rendered output of:',
        code: '<p>Hello <strong>World</strong></p>',
        output: 'Hello World — with "World" rendered in bold',
        explanation:
          'The paragraph renders normal text, and the strong element gives semantic emphasis that browsers typically display in bold.',
      },
    ],
  },

  css: {
    intro:
      'CSS interview questions test selectors, the box model, specificity, layout systems, and responsive design fundamentals.',
    conceptualPrompts: [
      {
        title: 'What is the CSS box model and why does it matter?',
        answer:
          'The box model defines how every HTML element is rendered as a rectangular box with content, padding, border, and margin. Understanding it is essential for debugging layout issues and controlling spacing correctly.',
      },
      {
        title: 'What is the difference between margin and padding in CSS?',
        answer:
          'Padding is space inside the border between the border and the content. Margin is space outside the border between the element and its neighbors. Margin can collapse between adjacent elements; padding cannot.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you center a block element horizontally using CSS?',
        answer:
          'Set a fixed width and use margin: 0 auto. This is the classic centering pattern for block-level containers that does not require Flexbox.',
        code: '.container {\n  width: 600px;\n  margin: 0 auto;\n}',
      },
      {
        title: 'How would you make a card responsive so it does not grow beyond 420px?',
        answer:
          'Use width: 100% so it shrinks on small screens combined with max-width: 420px to cap the growth. This is a standard responsive pattern.',
        code: '.card {\n  width: 100%;\n  max-width: 420px;\n}',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the effect on the rendered box',
        code: '.box {\n  width: 200px;\n  padding: 20px;\n  box-sizing: content-box;\n}',
        output: 'The total rendered width is 240px (200 content + 20 left padding + 20 right padding)',
        explanation:
          'With box-sizing: content-box (the default), padding is added outside the stated width, making the total wider than 200px.',
      },
    ],
  },

  flexbox: {
    intro:
      'Flexbox interview questions test alignment, direction, wrapping, and your ability to build common UI patterns without float hacks.',
    conceptualPrompts: [
      {
        title: 'What is the main axis in Flexbox and how do you change it?',
        answer:
          'The main axis is the direction flex items flow — horizontal by default. Use flex-direction: column to switch to vertical. justify-content controls spacing along the main axis; align-items controls it on the cross axis.',
      },
      {
        title: 'What is the difference between justify-content and align-items?',
        answer:
          'justify-content distributes space along the main axis (horizontally in a row). align-items controls alignment on the cross axis (vertically in a row). Mixing them up is the most common Flexbox interview mistake.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you build a horizontal navbar with items spaced apart?',
        answer:
          'Use display: flex on the container and justify-content: space-between to push items to the ends. Add align-items: center to vertically center them.',
        code: '.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
      },
      {
        title: 'How would you stack flex items vertically on mobile screens?',
        answer:
          'Use a media query to apply flex-direction: column. This switches the main axis so items stack instead of sitting in a row.',
        code: '@media (max-width: 640px) {\n  .nav {\n    flex-direction: column;\n  }\n}',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the layout behavior of this Flexbox container',
        code: '.container {\n  display: flex;\n  justify-content: center;\n  gap: 16px;\n}',
        output: 'Items appear in a horizontal row, centered, with 16px gaps between them',
        explanation:
          'display: flex makes children flex items on a row. justify-content: center centers them, and gap adds spacing between items.',
      },
    ],
  },

  javascript: {
    intro:
      'JavaScript interviews for freshers test closures, scope, array methods, async behavior, and event-driven patterns used in real UIs and APIs.',
    conceptualPrompts: [
      {
        title: 'What is the difference between let, const, and var in JavaScript?',
        answer:
          'var is function-scoped and hoisted to the top of its function. let and const are block-scoped and not accessible before declaration. const prevents reassignment but does not make objects immutable. Using let and const is strongly preferred in modern JavaScript.',
      },
      {
        title: 'What is a closure in JavaScript and when is it useful?',
        answer:
          'A closure is a function that remembers the variables from its outer scope even after that outer function has returned. Closures are useful for data privacy, memoization, and creating factory functions.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you remove duplicates from an array without a library?',
        answer:
          'Use a Set to store unique values, then spread it back into an array. A Set automatically discards duplicates.',
        code: 'const values = [1, 2, 2, 3];\nconst unique = [...new Set(values)];\nconsole.log(unique);',
      },
      {
        title: 'How would you fetch data from an API using async/await?',
        answer:
          'Use async on the function and await on the fetch call and the json() parsing. Wrap in try/catch to handle network errors.',
        code: "async function loadUsers() {\n  const response = await fetch('/api/users');\n  const data = await response.json();\n  console.log(data);\n}",
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the output of this typeof check',
        code: 'console.log(typeof null);',
        output: '"object"',
        explanation:
          'typeof null returning "object" is a long-standing JavaScript bug that was kept for backward compatibility. null is not an object.',
      },
    ],
  },

  react: {
    intro:
      'React interviews for early-career candidates usually test component thinking, hooks, state flow, and routing basics.',
    conceptualPrompts: [
      {
        title: 'What problem does useEffect solve in React?',
        answer:
          'useEffect handles side effects such as fetching data, setting timers, or syncing with browser APIs after rendering. It keeps side-effect logic separate from the render phase.',
      },
      {
        title: 'When would you choose useReducer over useState?',
        answer:
          'useReducer is useful when state transitions are more complex, involve multiple related values, or need predictable action-based updates. It scales better than several disconnected useState calls.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you toggle a boolean state value correctly in React?',
        answer:
          'Use the updater form of setState so the new value is based on the previous value. This avoids the stale closure problem.',
        code: 'const [open, setOpen] = useState(false);\n\nconst toggle = () => {\n  setOpen((current) => !current);\n};',
      },
      {
        title: 'How can you navigate to another page programmatically in React Router?',
        answer:
          'Use the useNavigate hook inside an event handler. For declarative link navigation in JSX use the Link component.',
        code: "import { useNavigate } from 'react-router-dom';\n\nfunction LogoutButton() {\n  const navigate = useNavigate();\n  return (\n    <button onClick={() => navigate('/login')}>Logout</button>\n  );\n}",
      },
    ],
    outputPrompts: [
      {
        title: 'Guess when this useEffect console.log runs',
        code: 'const [count, setCount] = useState(0);\n\nuseEffect(() => {\n  console.log(count);\n}, [count]);',
        output: 'It logs after the initial render and after each change to count',
        explanation:
          'The effect depends on count, so React runs it after the initial render and after each update where count has changed.',
      },
    ],
  },

  'node-js': {
    intro:
      'Node.js interviews test the event loop, async patterns, module system, and building lightweight servers and utilities.',
    conceptualPrompts: [
      {
        title: 'What is the Node.js event loop and why does it matter?',
        answer:
          'The event loop is what allows Node to handle multiple concurrent requests on a single thread. It continuously checks for pending async callbacks and runs them when their operations complete. Blocking the event loop with heavy synchronous code freezes all requests.',
      },
      {
        title: 'What is the difference between blocking and non-blocking operations in Node?',
        answer:
          'Blocking operations wait for the result before the process continues, halting the event loop. Non-blocking operations use callbacks, promises, or async/await so the event loop can serve other requests while waiting.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you create a simple HTTP server in Node.js?',
        answer:
          'Use the built-in http module to create a server. The callback receives the request and response objects for every incoming connection.',
        code: "import http from 'http';\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello World');\n});\n\nserver.listen(3000);",
      },
      {
        title: 'How would you export a reusable utility function from a Node module?',
        answer:
          'Use the export keyword in ESM or module.exports in CommonJS. Exporting makes functions available to other files that import the module.',
        code: 'export function calculateTotal(values) {\n  return values.reduce((sum, value) => sum + value, 0);\n}',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the console output order',
        code: "console.log('start');\nsetTimeout(() => console.log('timer'), 0);\nconsole.log('end');",
        output: 'start, end, timer',
        explanation:
          'The timer callback is placed in the callback queue and runs only after the current synchronous code (start and end) finishes.',
      },
    ],
  },

  'express-js': {
    intro:
      'Express.js interviews focus on routing, middleware, error handling, and building clean REST API structures.',
    conceptualPrompts: [
      {
        title: 'What is middleware in Express and how does it work?',
        answer:
          'Middleware are functions that have access to req, res, and next. They run in order and can modify the request or response, end the request-response cycle, or call next() to pass control to the next middleware. They are used for logging, authentication, parsing, and error handling.',
      },
      {
        title: 'What is the difference between app.use() and a specific route method like app.get()?',
        answer:
          'app.use() applies middleware to all HTTP methods and paths (or paths matching a prefix). app.get() only runs for GET requests to an exact path. app.use() is used for middleware; route-specific methods are used for handlers.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you define a basic GET route that returns JSON?',
        answer:
          'Use app.get() with the path and a callback. Call res.json() to send a JSON response with the correct Content-Type header automatically.',
        code: "import express from 'express';\nconst app = express();\n\napp.get('/users', (req, res) => {\n  res.json([{ id: 1, name: 'Riya' }]);\n});",
      },
      {
        title: 'How would you add middleware to parse incoming JSON request bodies?',
        answer:
          'Call app.use(express.json()) before your routes. Without this, req.body will be undefined for POST and PUT requests with JSON payloads.',
        code: 'app.use(express.json());',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what this middleware does when a request arrives',
        code: "app.use((req, res, next) => {\n  console.log(req.method);\n  next();\n});",
        output: 'It logs the HTTP method for every request, then passes control to the next middleware or route',
        explanation:
          'next() is the key — without it, the request would hang. The middleware logs the method and then continues the chain.',
      },
    ],
  },

  mongodb: {
    intro:
      'MongoDB interviews cover document structure, CRUD operations, query operators, indexing concepts, and embedding versus referencing.',
    conceptualPrompts: [
      {
        title: 'What is the difference between embedding and referencing documents in MongoDB?',
        answer:
          'Embedding stores related data inside a single document, which is fast to read but can grow large. Referencing stores a foreign ID and requires a join-like lookup, but keeps documents smaller. Embedding is preferred when data is always accessed together; referencing when it is shared or large.',
      },
      {
        title: 'How does MongoDB differ from a relational database?',
        answer:
          'MongoDB stores data in flexible JSON-like documents rather than fixed-schema tables. There are no JOINs by default — you either embed related data or use $lookup in aggregation pipelines. This makes MongoDB easier to evolve but harder to enforce strict data integrity.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you insert a single document into a MongoDB collection?',
        answer:
          'Use insertOne() with the document object. MongoDB adds an automatic _id field unless you provide one.',
        code: "db.users.insertOne({ name: 'Asha', age: 23, skills: ['React', 'MongoDB'] })",
      },
      {
        title: 'How would you query all users older than 21?',
        answer:
          'Use the $gt query operator inside find(). Comparison operators like $gt, $lt, $gte, and $lte are core MongoDB query building blocks.',
        code: 'db.users.find({ age: { $gt: 21 } })',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what _id is in this MongoDB document',
        code: "{ _id: ObjectId('abc123'), name: 'Asha' }",
        output: 'A unique primary identifier automatically assigned by MongoDB',
        explanation:
          'MongoDB generates an ObjectId for _id by default. It encodes a timestamp, machine ID, and counter to ensure uniqueness.',
      },
    ],
  },

  mongoose: {
    intro:
      'Mongoose interviews test schema design, model creation, validation, and querying with the Mongoose ODM in a Node.js backend.',
    conceptualPrompts: [
      {
        title: 'What is the purpose of a Mongoose Schema?',
        answer:
          'A Schema defines the shape of documents in a MongoDB collection: field names, types, default values, and validators. Without a schema, raw MongoDB accepts any data; Mongoose enforces structure at the application level.',
      },
      {
        title: 'What is the difference between a Mongoose Schema and a Mongoose Model?',
        answer:
          'A Schema is the blueprint — it defines field names, types, and rules. A Model is the compiled class created from the schema using mongoose.model(). You use the Model to create, read, update, and delete documents.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you define a user schema with required name and unique email?',
        answer:
          'Create a Schema with the type and validation options for each field. The required and unique options enforce these constraints at the model level.',
        code: "import mongoose from 'mongoose';\n\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, required: true, unique: true }\n});",
      },
      {
        title: 'How would you create a Mongoose model from a schema?',
        answer:
          'Pass the collection name and schema to mongoose.model(). The returned class is used to create and query documents.',
        code: "const User = mongoose.model('User', userSchema);",
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what happens when you try to create a user without the required name field',
        code: "await User.create({ email: 'test@example.com' });",
        output: 'Mongoose throws a ValidationError because the required name field is missing',
        explanation:
          'Mongoose validates against the schema before sending data to MongoDB. A missing required field causes an immediate validation error.',
      },
    ],
  },

  authentication: {
    intro:
      'Authentication interviews cover login flows, password hashing, session vs token-based auth, and protecting Express routes.',
    conceptualPrompts: [
      {
        title: 'What is the difference between authentication and authorization?',
        answer:
          'Authentication verifies who you are — for example, by checking a password or token. Authorization determines what you are allowed to do — for example, whether an authenticated user can access an admin route.',
      },
      {
        title: 'What are the key steps in a secure login flow?',
        answer:
          'Collect credentials, validate input, find the user by email, compare the hashed password using bcrypt, check account status, and issue a JWT or session token. Never store plain-text passwords.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you write an Express middleware to protect a private route?',
        answer:
          'Read the Authorization header, verify the JWT, attach the decoded user to req, and call next(). If verification fails, respond with 401.',
        code: "function requireAuth(req, res, next) {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ message: 'Unauthorized' });\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch {\n    res.status(401).json({ message: 'Invalid token' });\n  }\n}",
      },
      {
        title: 'How would you describe a secure authentication flow for a MERN app?',
        answer:
          '1. Validate credentials on the backend. 2. Hash passwords with bcrypt. 3. Issue a signed JWT after login. 4. Send the token in the response. 5. Protect private routes by verifying the token via middleware.',
        code: '// Flow outline:\n// 1. POST /login → validate → compare hash → sign JWT\n// 2. Frontend stores token\n// 3. Private routes verify token via middleware',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the HTTP response when a user without a token hits a protected route',
        code: "function requireAuth(req, res, next) {\n  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });\n  next();\n}",
        output: 'A 401 Unauthorized JSON response with the message "Unauthorized"',
        explanation:
          '401 is the standard HTTP status for missing or invalid authentication credentials.',
      },
    ],
  },

  bcrypt: {
    intro:
      'bcrypt interviews test how passwords are hashed, why bcrypt is preferred, and how to securely verify passwords without storing them in plain text.',
    conceptualPrompts: [
      {
        title: 'Why should you use bcrypt for passwords instead of SHA-256 or MD5?',
        answer:
          'bcrypt is specifically designed to be slow, which makes brute-force attacks much harder. SHA-256 and MD5 are fast hashing algorithms designed for performance — great for checksums, but dangerous for passwords because attackers can try billions of guesses per second.',
      },
      {
        title: 'What is a salt in bcrypt and why is it added?',
        answer:
          'A salt is a random string added to the password before hashing. It ensures that the same password produces a different hash each time, defeating rainbow table attacks. bcrypt generates and stores the salt inside the hash automatically.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you hash a user password before storing it in the database?',
        answer:
          'Use bcrypt.hash() with the password and a salt round count. 10 rounds is a common production default balancing security and speed.',
        code: "import bcrypt from 'bcrypt';\n\nconst hashedPassword = await bcrypt.hash(password, 10);",
      },
      {
        title: 'How would you verify a login password against the stored hash?',
        answer:
          'Use bcrypt.compare() with the plain password and the stored hash. It returns true if they match. Never decrypt — always compare.',
        code: "const isMatch = await bcrypt.compare(password, user.passwordHash);",
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the return value of bcrypt.compare() when the password is wrong',
        code: "const result = await bcrypt.compare('wrong', user.passwordHash);\nconsole.log(result);",
        output: 'false',
        explanation:
          'compare() returns a boolean. When the plain-text password does not match the stored hash, it returns false without revealing any information about the hash.',
      },
    ],
  },

  jwt: {
    intro:
      'JWT interviews test token creation, decoding, verification, and the security considerations around expiry, storage, and signing secrets.',
    conceptualPrompts: [
      {
        title: 'What are the three parts of a JWT and what does each contain?',
        answer:
          'A JWT has a header (algorithm + token type), a payload (claims such as userId and role), and a signature (hashed header + payload using the secret). All three parts are base64url-encoded and joined by dots.',
      },
      {
        title: 'Why should JWTs have an expiry time?',
        answer:
          'Without an expiry, a stolen token remains valid forever. Setting expiresIn forces the client to re-authenticate periodically, limiting the damage window if a token is compromised.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you sign a JWT after a user logs in successfully?',
        answer:
          'Use jwt.sign() with the payload, the secret, and an options object containing expiresIn. The returned string is the token sent to the client.',
        code: "import jwt from 'jsonwebtoken';\n\nconst token = jwt.sign(\n  { userId: user._id },\n  process.env.JWT_SECRET,\n  { expiresIn: '1h' }\n);",
      },
      {
        title: 'How would you verify a JWT received in an Authorization header?',
        answer:
          'Use jwt.verify() with the token and the same secret used to sign it. It throws if the token is expired or tampered with, so wrap it in a try/catch.',
        code: "const decoded = jwt.verify(token, process.env.JWT_SECRET);\n// decoded now contains the payload claims",
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what happens when you verify a JWT with the wrong secret',
        code: "jwt.verify(token, 'wrong-secret')",
        output: 'Throws a JsonWebTokenError — the signature is invalid',
        explanation:
          'The signature is computed from the secret. A wrong secret produces a different expected signature that does not match the token\'s actual signature.',
      },
    ],
  },

  'passport-local': {
    intro:
      'passport-local interviews test strategy setup, serialize/deserialize user, session middleware integration, and done() callback usage.',
    conceptualPrompts: [
      {
        title: 'What is the role of passport.serializeUser and passport.deserializeUser?',
        answer:
          'serializeUser converts the user object to a minimal session identifier (usually user.id) to store in the session. deserializeUser takes that ID from the session and retrieves the full user object from the database for each request.',
      },
      {
        title: 'What does the done() callback do inside a Passport strategy?',
        answer:
          'done() signals completion to Passport. done(null, user) means success. done(null, false) means authentication failed. done(err) means an error occurred. Passport uses the result to decide whether to call next() or return a failure response.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you define a passport-local strategy for email/password login?',
        answer:
          'Define a new LocalStrategy with usernameField set to email. Inside the callback, find the user, compare the password, and call done accordingly.',
        code: "import passport from 'passport';\nimport { Strategy as LocalStrategy } from 'passport-local';\n\npassport.use(new LocalStrategy(\n  { usernameField: 'email' },\n  async (email, password, done) => {\n    const user = await User.findOne({ email });\n    if (!user) return done(null, false);\n    const ok = await bcrypt.compare(password, user.password);\n    return ok ? done(null, user) : done(null, false);\n  }\n));",
      },
      {
        title: 'How would you attach Passport middleware to an Express app?',
        answer:
          'Call passport.initialize() and passport.session() after the session middleware. The order is important — session must come before Passport.',
        code: 'app.use(session({ secret: \'key\', resave: false, saveUninitialized: false }));\napp.use(passport.initialize());\napp.use(passport.session());',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what calling done(null, false) inside the strategy does',
        code: "done(null, false, { message: 'Invalid credentials' });",
        output: 'Authentication fails — Passport treats the login as unsuccessful and does not create a session',
        explanation:
          'Passing false as the user argument tells Passport the credentials were not valid. A 401 or redirect normally follows.',
      },
    ],
  },

  'passport-google-oauth20': {
    intro:
      'passport-google-oauth20 interviews test OAuth2 flow, credential configuration, callback handling, and how Google identity maps to local users.',
    conceptualPrompts: [
      {
        title: 'What is the OAuth2 authorization code flow that passport-google-oauth20 uses?',
        answer:
          'The app redirects the user to Google with a client ID and requested scopes. Google shows a consent screen, and on approval redirects back to the callback URL with an authorization code. Passport exchanges the code for access tokens and then calls the verify callback with the decoded profile.',
      },
      {
        title: 'How does passport-google-oauth20 handle users who are new versus returning?',
        answer:
          'Inside the verify callback you receive the Google profile. You check your database for an existing user with that googleId or email. If found, authenticate them; if not, create a new user record and then authenticate.',
      },
    ],
    practicalPrompts: [
      {
        title: 'How would you configure a Google OAuth strategy in Express?',
        answer:
          'Provide clientID, clientSecret, and callbackURL from your Google Cloud Console credentials. In the verify callback, find or create the user using profile.id and profile.emails.',
        code: "passport.use(new GoogleStrategy({\n  clientID: process.env.GOOGLE_CLIENT_ID,\n  clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n  callbackURL: '/auth/google/callback',\n}, async (accessToken, refreshToken, profile, done) => {\n  let user = await User.findOne({ googleId: profile.id });\n  if (!user) user = await User.create({ googleId: profile.id, name: profile.displayName });\n  return done(null, user);\n}));",
      },
      {
        title: 'How would you start the Google login flow from an Express route?',
        answer:
          'Use passport.authenticate("google") with the scope option. This redirects the browser to Google\'s consent page.',
        code: "app.get('/auth/google',\n  passport.authenticate('google', { scope: ['profile', 'email'] })\n);",
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what happens if the callbackURL in your strategy does not match what is registered in Google Cloud Console',
        code: "callbackURL: '/auth/google/callback'  // but Google Console has /auth/google/cb",
        output: 'Google returns a redirect_uri_mismatch error and the login flow fails',
        explanation:
          'OAuth providers validate redirect URIs strictly. Even a trailing slash difference causes a rejection for security reasons.',
      },
    ],
  },
};
