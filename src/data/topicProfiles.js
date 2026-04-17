const profiles = {
  excel: {
    comparison: 'VLOOKUP, XLOOKUP, and INDEX-MATCH',
    commonMistake: 'hardcoding ranges instead of using absolute references or structured tables',
    projectUseCase: 'a sales tracker that cleans raw data and summarizes KPIs in a dashboard',
    codeSamples: [
      {
        title: 'How would you count rows where status is Closed?',
        code: '=COUNTIF(B2:B100, "Closed")',
        answer: 'COUNTIF is still one of the most common fresher-level Excel questions because it proves you can write condition-based summaries quickly.',
        explanation: 'Interviewers like this because it maps directly to reporting tasks such as counting closed tickets, active orders, or completed calls.',
      },
      {
        title: 'How would you fetch a manager name for an employee id?',
        code: '=XLOOKUP(E2, A2:A100, C2:C100, "Not Found")',
        answer: 'XLOOKUP is preferred in modern Excel because it is more readable and flexible than older lookup formulas.',
        explanation: 'A strong answer mentions that XLOOKUP can search in either direction and lets you define a fallback result.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the output of `=ROUND(12.345, 2)`',
        code: '=ROUND(12.345, 2)',
        output: '12.35',
        explanation: 'The third decimal place is 5, so Excel rounds the second decimal place up.',
      },
      {
        title: 'Guess the output of `=LEN("Data Analyst")`',
        code: '=LEN("Data Analyst")',
        output: '12',
        explanation: 'LEN counts all characters, including the space between the two words.',
      },
    ],
  },
  sql: {
    comparison: 'WHERE and HAVING',
    commonMistake: 'forgetting the execution order when mixing filtering, grouping, and aggregation',
    projectUseCase: 'an employee reporting dashboard that needs joins, filters, and grouped metrics',
    codeSamples: [
      {
        title: 'Write a query to count employees by department.',
        code: 'SELECT department, COUNT(*) AS employee_count\nFROM employees\nGROUP BY department;',
        answer: 'This is a standard aggregation question that appears frequently in analyst and backend interviews.',
        explanation: 'It checks whether you can move from row-level data to summary-level business insights.',
      },
      {
        title: 'Write a query to find the top 3 salaries.',
        code: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 3;',
        answer: 'Ordering plus limiting is one of the most common warm-up tasks in entry-level SQL rounds.',
        explanation: 'Candidates are expected to know sorting, ranking basics, and how to return only the needed rows.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the result shape of a grouped query',
        code: 'SELECT department, COUNT(*)\nFROM employees\nGROUP BY department;',
        output: 'One row per distinct department',
        explanation: 'GROUP BY collapses employee rows into department-level summaries.',
      },
      {
        title: 'Guess the output of a filtered aggregate',
        code: "SELECT COUNT(*)\nFROM employees\nWHERE department = 'Sales';",
        output: 'A single number representing how many Sales employees exist',
        explanation: 'COUNT(*) returns a scalar aggregate, so the result is one row with one value.',
      },
    ],
  },
  python: {
    comparison: 'lists and tuples',
    commonMistake: 'mutating shared data unintentionally or ignoring Python’s built-in helpers',
    projectUseCase: 'a small data-cleaning script that reads input, transforms records, and prints a result',
    codeSamples: [
      {
        title: 'How would you create a filtered list of even numbers?',
        code: 'numbers = [1, 2, 3, 4, 5, 6]\nevens = [n for n in numbers if n % 2 == 0]\nprint(evens)',
        answer: 'List comprehensions are frequently asked because they show Python fluency in one short example.',
        explanation: 'This is a compact way to transform and filter data without writing a longer loop.',
      },
      {
        title: 'How would you count words in a sentence?',
        code: 'sentence = "data analyst interview prep"\nword_count = len(sentence.split())\nprint(word_count)',
        answer: 'Freshers are often given tiny string-processing tasks like this to test basics.',
        explanation: 'split() converts a sentence into a list of words, and len() returns the number of items.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the output of slicing',
        code: 'items = [10, 20, 30, 40]\nprint(items[1:3])',
        output: '[20, 30]',
        explanation: 'Python slicing includes the start index and excludes the end index.',
      },
      {
        title: 'Guess the output of a loop total',
        code: 'total = 0\nfor n in [1, 2, 3]:\n    total += n\nprint(total)',
        output: '6',
        explanation: 'The loop accumulates the values one by one and prints the final sum.',
      },
    ],
  },
  pandas: {
    comparison: 'Series and DataFrame',
    commonMistake: 'writing loops for tasks that Pandas can solve with vectorized operations',
    projectUseCase: 'cleaning a CSV export and summarizing department-level salary metrics',
    codeSamples: [
      {
        title: 'How would you load a CSV and inspect the first rows?',
        code: "import pandas as pd\n\ndf = pd.read_csv('employees.csv')\nprint(df.head())",
        answer: 'Reading data and checking the first few rows is still a very common fresher interview step.',
        explanation: 'It shows that you begin analysis by validating the shape and content of the dataset.',
      },
      {
        title: 'How would you calculate average salary by department?',
        code: "summary = df.groupby('department')['salary'].mean()\nprint(summary)",
        answer: 'groupby is one of the hottest Pandas interview themes because it connects directly to real reporting tasks.',
        explanation: 'This groups rows by department and computes the mean salary within each group.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the output of selecting one column',
        code: "print(df['salary'])",
        output: 'A Pandas Series containing the salary column values',
        explanation: 'Selecting one column returns a Series, not a full DataFrame.',
      },
      {
        title: 'Guess the result of dropping missing rows',
        code: 'clean_df = df.dropna()\nprint(clean_df.shape)',
        output: 'A tuple with fewer rows if the original data had missing values',
        explanation: 'dropna removes rows containing missing values, so the row count can decrease.',
      },
    ],
  },
  numpy: {
    comparison: 'Python lists and NumPy arrays',
    commonMistake: 'forgetting that NumPy prefers array-wise operations over manual loops',
    projectUseCase: 'fast numeric transformation for a feature engineering step',
    codeSamples: [
      {
        title: 'How would you create a NumPy array and multiply it by 2?',
        code: 'import numpy as np\n\narr = np.array([1, 2, 3])\nprint(arr * 2)',
        answer: 'Vectorized arithmetic is a core NumPy concept and shows why arrays are useful in analytics.',
        explanation: 'Each element is multiplied without writing an explicit loop.',
      },
      {
        title: 'How would you compute the mean of an array?',
        code: 'import numpy as np\n\nscores = np.array([70, 80, 90])\nprint(scores.mean())',
        answer: 'Basic aggregation methods such as mean, sum, and max appear often in beginner rounds.',
        explanation: 'NumPy provides fast built-in statistical operations on numeric arrays.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the output of array slicing',
        code: 'import numpy as np\narr = np.array([5, 10, 15, 20])\nprint(arr[1:3])',
        output: '[10 15]',
        explanation: 'NumPy slicing works similarly to Python list slicing.',
      },
      {
        title: 'Guess the output shape',
        code: 'import numpy as np\nmatrix = np.array([[1, 2], [3, 4], [5, 6]])\nprint(matrix.shape)',
        output: '(3, 2)',
        explanation: 'The matrix has 3 rows and 2 columns.',
      },
    ],
  },
  matplotlib: {
    comparison: 'line charts and bar charts',
    commonMistake: 'choosing a chart type that does not match the business question',
    projectUseCase: 'visualizing monthly sales or attendance trends for a report',
    codeSamples: [
      {
        title: 'How would you plot a simple line chart?',
        code: "import matplotlib.pyplot as plt\n\nmonths = ['Jan', 'Feb', 'Mar']\nsales = [100, 130, 160]\nplt.plot(months, sales)\nplt.show()",
        answer: 'Basic plotting syntax is a very common beginner-level visualization question.',
        explanation: 'Interviewers want to see if you know how to convert a small dataset into a readable chart.',
      },
      {
        title: 'How would you add chart labels?',
        code: "plt.title('Monthly Sales')\nplt.xlabel('Month')\nplt.ylabel('Revenue')",
        answer: 'Labeling charts properly is part of data storytelling, not just coding syntax.',
        explanation: 'A chart without a title and axis labels is hard to interpret in real dashboards or reports.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the visual output',
        code: "plt.bar(['A', 'B'], [5, 8])\nplt.show()",
        output: 'A bar chart with two bars labeled A and B, with heights 5 and 8',
        explanation: 'bar creates categorical bars rather than a continuous line.',
      },
      {
        title: 'Guess what happens if `plt.show()` is removed in a script',
        code: "plt.plot([1, 2, 3], [4, 5, 6])",
        output: 'In many script environments, the figure will not display automatically',
        explanation: 'show() is commonly needed to render the chart in standalone scripts.',
      },
    ],
  },
  tableau: {
    comparison: 'dimensions and measures',
    commonMistake: 'confusing filters, parameters, and calculated fields during dashboard design',
    projectUseCase: 'building an interactive sales dashboard with drill-down filters',
    codeSamples: [
      {
        title: 'How would you explain a calculated field in Tableau?',
        code: 'IF [Sales] > 1000 THEN "High" ELSE "Normal" END',
        answer: 'Calculated fields are regularly discussed because they show whether you can translate business rules into metrics.',
        explanation: 'The formula categorizes rows based on a sales threshold.',
      },
      {
        title: 'How would you create a profit ratio metric?',
        code: '[Profit] / [Sales]',
        answer: 'Simple business KPIs like ratio, growth, and category-level summaries are common interview prompts.',
        explanation: 'A calculated field turns raw columns into a reusable business metric.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what happens when a dimension is dragged to Rows and a measure to Columns',
        code: 'Rows: Category\nColumns: SUM(Sales)',
        output: 'Tableau builds a view that compares Sales by Category',
        explanation: 'The dimension defines categories, while the measure becomes the aggregated value.',
      },
      {
        title: 'Guess the effect of applying a context filter',
        code: 'Context Filter: Region = Asia',
        output: 'Other filters operate on the Asia subset instead of the full dataset',
        explanation: 'Context filters create a primary filtered subset before later filters run.',
      },
    ],
  },
  'power-bi': {
    comparison: 'Power Query and DAX',
    commonMistake: 'using calculated columns when a measure would be more appropriate',
    projectUseCase: 'a BI dashboard that tracks sales, refreshes data, and exposes KPI cards',
    codeSamples: [
      {
        title: 'How would you write a Total Sales measure?',
        code: 'Total Sales = SUM(Sales[Amount])',
        answer: 'Basic DAX measures are frequently asked in fresher and analyst interviews.',
        explanation: 'This measure aggregates the Amount column in the current filter context.',
      },
      {
        title: 'How would you count unique customers?',
        code: 'Unique Customers = DISTINCTCOUNT(Sales[CustomerID])',
        answer: 'DISTINCTCOUNT is a common real-world metric because many dashboards track unique users or customers.',
        explanation: 'It counts unique IDs instead of total rows.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the result of a filtered measure',
        code: 'CALCULATE(SUM(Sales[Amount]), Sales[Region] = "West")',
        output: 'The total sales amount only for rows in the West region',
        explanation: 'CALCULATE changes the filter context before evaluating the aggregation.',
      },
      {
        title: 'Guess what DirectQuery changes',
        code: 'Mode: DirectQuery',
        output: 'Queries run against the source more directly instead of importing all data into the model',
        explanation: 'This affects freshness, performance, and modeling trade-offs.',
      },
    ],
  },
  html: {
    comparison: 'semantic and non-semantic tags',
    commonMistake: 'using generic div elements where a semantic element would improve structure',
    projectUseCase: 'building an accessible landing page or form layout',
    codeSamples: [
      {
        title: 'How would you create an accessible navigation block?',
        code: '<nav aria-label="Primary">\n  <ul>\n    <li><a href="/">Home</a></li>\n    <li><a href="/topics">Topics</a></li>\n  </ul>\n</nav>',
        answer: 'Semantic navigation and link structure are still asked frequently in frontend interviews.',
        explanation: 'This gives the page clearer structure for browsers and assistive technologies.',
      },
      {
        title: 'How would you connect a label to an email input?',
        code: '<label for="email">Email</label>\n<input id="email" type="email" />',
        answer: 'Form accessibility remains a very common HTML interview theme.',
        explanation: 'The label is connected to the input through matching for and id attributes.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the rendered output',
        code: '<p>Hello <strong>World</strong></p>',
        output: 'A paragraph showing “Hello World”, with World emphasized in bold by default',
        explanation: 'strong gives semantic emphasis and browsers usually render it as bold.',
      },
      {
        title: 'Guess the effect of a void element',
        code: '<img src="photo.jpg" alt="Profile photo" />',
        output: 'The browser renders an image and does not expect a closing tag',
        explanation: 'img is a void element, so it does not wrap content.',
      },
    ],
  },
  css: {
    comparison: 'margin and padding',
    commonMistake: 'fighting layout issues without first checking the box model',
    projectUseCase: 'styling a card-based dashboard for responsive screens',
    codeSamples: [
      {
        title: 'How would you center text and change the background color?',
        code: '.card {\n  background-color: #f8fafc;\n  text-align: center;\n}',
        answer: 'Basic property usage still shows up in junior frontend rounds.',
        explanation: 'This example changes visual appearance without affecting document structure.',
      },
      {
        title: 'How would you make a card responsive with max-width?',
        code: '.card {\n  width: 100%;\n  max-width: 420px;\n}',
        answer: 'Responsive sizing is a practical CSS skill interviewers expect even from freshers.',
        explanation: 'The element can shrink on small screens but won’t grow beyond 420px.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the output of this selector',
        code: '.title {\n  color: #0f172a;\n  font-weight: 700;\n}',
        output: 'Elements with class title become dark and bold',
        explanation: 'The selector targets every element whose class includes title.',
      },
      {
        title: 'Guess the box size effect',
        code: '.box {\n  width: 200px;\n  padding: 20px;\n}',
        output: 'The rendered box takes more visual space than 200px unless box-sizing is changed',
        explanation: 'Padding adds extra space around the content area.',
      },
    ],
  },
  flexbox: {
    comparison: 'justify-content and align-items',
    commonMistake: 'mixing up main axis and cross axis behavior',
    projectUseCase: 'building a navbar or card grid without relying on floats',
    codeSamples: [
      {
        title: 'How would you place items in a horizontal row with spacing?',
        code: '.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
        answer: 'Navbar-style alignment is one of the most common beginner Flexbox questions.',
        explanation: 'display: flex activates Flexbox and the other properties control spacing and alignment.',
      },
      {
        title: 'How would you stack items vertically on smaller screens?',
        code: '@media (max-width: 640px) {\n  .nav {\n    flex-direction: column;\n  }\n}',
        answer: 'Responsive Flexbox adjustments show up often because they map directly to real UIs.',
        explanation: 'flex-direction changes the main axis from row to column.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the layout behavior',
        code: '.container {\n  display: flex;\n  gap: 16px;\n}',
        output: 'Child items appear in a row with 16px space between them',
        explanation: 'gap applies spacing between flex items without margin hacks.',
      },
      {
        title: 'Guess the effect of `justify-content: center`',
        code: '.container {\n  display: flex;\n  justify-content: center;\n}',
        output: 'Items are centered along the main axis',
        explanation: 'In a row layout, the main axis is horizontal.',
      },
    ],
  },
  javascript: {
    comparison: 'let, const, and var',
    commonMistake: 'ignoring scope and asynchronous behavior during debugging',
    projectUseCase: 'building interactive UI logic, API calls, and event-driven features',
    codeSamples: [
      {
        title: 'How would you remove duplicates from an array?',
        code: 'const values = [1, 2, 2, 3];\nconst uniqueValues = [...new Set(values)];\nconsole.log(uniqueValues);',
        answer: 'Array transformation questions remain extremely common in JavaScript screenings.',
        explanation: 'Set stores unique values, and the spread operator converts it back into an array.',
      },
      {
        title: 'How would you fetch data with async/await?',
        code: "async function loadUsers() {\n  const response = await fetch('/api/users');\n  const data = await response.json();\n  console.log(data);\n}",
        answer: 'Async data handling is one of the most relevant 2026-era JavaScript interview areas.',
        explanation: 'await pauses execution until the promise resolves, which keeps the code readable.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the output',
        code: 'console.log(typeof null);',
        output: '"object"',
        explanation: 'This is a well-known JavaScript quirk that still appears in interviews.',
      },
      {
        title: 'Guess the output of strict equality',
        code: "console.log(2 === '2');",
        output: 'false',
        explanation: 'Strict equality checks both value and type.',
      },
    ],
  },
  react: {
    comparison: 'useState and useReducer',
    commonMistake: 'treating state updates as immediate synchronous changes',
    projectUseCase: 'a small product page with local state, effects, and route-based navigation',
    codeSamples: [
      {
        title: 'How would you toggle local UI state?',
        code: "const [open, setOpen] = useState(false);\n\nconst toggle = () => {\n  setOpen((current) => !current);\n};",
        answer: 'State toggling is a classic fresher React question because it tests hook usage and updater functions.',
        explanation: 'The updater form avoids stale values by calculating from the current state.',
      },
      {
        title: 'How would you fetch data in a component?',
        code: "useEffect(() => {\n  async function loadData() {\n    const response = await fetch('/api/questions');\n    const data = await response.json();\n    setQuestions(data);\n  }\n\n  loadData();\n}, []);",
        answer: 'Data fetching with useEffect continues to show up regularly in junior React interviews.',
        explanation: 'The empty dependency array means the effect runs after the initial render.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the console output timing',
        code: "const [count, setCount] = useState(0);\n\nuseEffect(() => {\n  console.log(count);\n}, [count]);",
        output: 'It logs after the initial render and after each change to count',
        explanation: 'Effects run after render, not during render.',
      },
      {
        title: 'Guess the rendered result',
        code: 'return <>{items.length ? <List /> : <p>No items</p>}</>;',
        output: 'The List renders only when items.length is truthy; otherwise “No items” appears',
        explanation: 'This is conditional rendering using the ternary operator.',
      },
    ],
  },
  'node-js': {
    comparison: 'blocking and non-blocking operations',
    commonMistake: 'forgetting that heavy synchronous work can block the event loop',
    projectUseCase: 'a lightweight API server that reads requests and returns JSON',
    codeSamples: [
      {
        title: 'How would you create a simple Node server?',
        code: "import http from 'http';\n\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { 'Content-Type': 'text/plain' });\n  res.end('Hello World');\n});\n\nserver.listen(3000);",
        answer: 'Server creation is a very common Node.js interview warm-up.',
        explanation: 'This shows how Node handles requests using the built-in http module.',
      },
      {
        title: 'How would you export a reusable helper?',
        code: "export function calculateTotal(values) {\n  return values.reduce((sum, value) => sum + value, 0);\n}",
        answer: 'Interviewers still ask about modules because modular code is core to Node projects.',
        explanation: 'Exporting lets other files import and reuse the helper function.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the event loop order',
        code: "console.log('start');\nsetTimeout(() => console.log('timer'), 0);\nconsole.log('end');",
        output: 'start, end, timer',
        explanation: 'The timer callback runs after the current synchronous code completes.',
      },
      {
        title: 'Guess the returned value',
        code: "const value = Promise.resolve(5);\nconsole.log(value);",
        output: 'A Promise object, not the number 5 directly',
        explanation: 'Promises represent future values until they are awaited or handled.',
      },
    ],
  },
  'express-js': {
    comparison: 'application middleware and route middleware',
    commonMistake: 'forgetting next() or handling errors inconsistently',
    projectUseCase: 'a REST API with validation, routing, and centralized error handling',
    codeSamples: [
      {
        title: 'How would you define a basic GET route?',
        code: "import express from 'express';\n\nconst app = express();\n\napp.get('/users', (req, res) => {\n  res.json([{ id: 1, name: 'Riya' }]);\n});",
        answer: 'Basic route handling is one of the first things interviewers ask in Express rounds.',
        explanation: 'The route listens for GET requests and returns JSON data.',
      },
      {
        title: 'How would you add middleware for JSON parsing?',
        code: "app.use(express.json());",
        answer: 'Middleware knowledge is central to Express interviews in 2026 prep material.',
        explanation: 'express.json() parses incoming JSON request bodies before route handlers run.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what this middleware does',
        code: "app.use((req, res, next) => {\n  console.log(req.method);\n  next();\n});",
        output: 'It logs the HTTP method for every request and then passes control onward',
        explanation: 'Calling next() is what allows the request to continue through the stack.',
      },
      {
        title: 'Guess the response status',
        code: "res.status(201).json({ message: 'Created' });",
        output: 'An HTTP 201 response with a JSON body',
        explanation: '201 is the standard status code for successful resource creation.',
      },
    ],
  },
  mongodb: {
    comparison: 'embedding and referencing',
    commonMistake: 'designing documents like rigid SQL tables without considering MongoDB’s strengths',
    projectUseCase: 'storing user and product data in flexible document collections',
    codeSamples: [
      {
        title: 'How would you insert one document?',
        code: "db.users.insertOne({ name: 'Asha', age: 23, skills: ['React', 'MongoDB'] })",
        answer: 'CRUD basics are still one of the first MongoDB interview checkpoints.',
        explanation: 'insertOne adds a single JSON-like document to the collection.',
      },
      {
        title: 'How would you query users older than 21?',
        code: "db.users.find({ age: { $gt: 21 } })",
        answer: 'Query operators such as $gt, $lt, and $in are common fresher topics.',
        explanation: 'The query returns only documents where age is greater than 21.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the result shape',
        code: "db.users.find({ name: 'Asha' })",
        output: 'A cursor or matching document list, not just a plain object value',
        explanation: 'MongoDB query methods return query results rather than isolated scalar values.',
      },
      {
        title: 'Guess what `_id` does',
        code: "{ _id: ObjectId('...'), name: 'Asha' }",
        output: 'The document contains a unique primary identifier',
        explanation: 'MongoDB automatically creates _id to identify each document uniquely.',
      },
    ],
  },
  mongoose: {
    comparison: 'MongoDB collections and Mongoose models',
    commonMistake: 'assuming schema validation happens automatically without defining constraints',
    projectUseCase: 'modeling users, products, or orders cleanly in a Node backend',
    codeSamples: [
      {
        title: 'How would you define a simple user schema?',
        code: "import mongoose from 'mongoose';\n\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n  email: { type: String, required: true, unique: true }\n});",
        answer: 'Schema definition is a standard Mongoose interview area because it connects directly to backend structure.',
        explanation: 'The schema defines fields, types, and validation rules.',
      },
      {
        title: 'How would you create a model?',
        code: "const User = mongoose.model('User', userSchema);",
        answer: 'Interviewers want to see whether you know how schemas become usable models.',
        explanation: 'The model is the class used to create and query documents.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what happens if a required field is missing',
        code: "await User.create({ email: 'test@example.com' });",
        output: 'Mongoose throws a validation error',
        explanation: 'The required name field is missing, so schema validation fails.',
      },
      {
        title: 'Guess the result type',
        code: "const users = await User.find();",
        output: 'An array of matching documents',
        explanation: 'find returns a list, even if the list is empty.',
      },
    ],
  },
  authentication: {
    comparison: 'authentication and authorization',
    commonMistake: 'mixing up identity verification with permission checks',
    projectUseCase: 'protecting login, profile, and admin-only routes in a MERN app',
    codeSamples: [
      {
        title: 'How would you protect an Express route with middleware?',
        code: "function requireAuth(req, res, next) {\n  if (!req.user) {\n    return res.status(401).json({ message: 'Unauthorized' });\n  }\n\n  next();\n}",
        answer: 'Protected route logic is one of the most common authentication interview themes.',
        explanation: 'The middleware blocks unauthenticated requests before the controller runs.',
      },
      {
        title: 'How would you describe a secure login flow?',
        code: "// 1. Validate credentials\n// 2. Compare hashed password\n// 3. Issue session or token\n// 4. Protect private routes",
        answer: 'Interviewers often want the flow more than the framework-specific syntax.',
        explanation: 'A good answer covers validation, password hashing, token or session creation, and authorization checks.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess the response when auth fails',
        code: "return res.status(401).json({ message: 'Unauthorized' });",
        output: 'A 401 Unauthorized HTTP response',
        explanation: '401 indicates the client is not authenticated.',
      },
      {
        title: 'Guess the difference in behavior',
        code: 'Authenticated user + role check',
        output: 'Authentication checks identity first; authorization then checks access rights',
        explanation: 'These are related but different security steps.',
      },
    ],
  },
  bcrypt: {
    comparison: 'hashing and encryption',
    commonMistake: 'trying to decrypt passwords instead of comparing hashes',
    projectUseCase: 'storing user passwords safely during signup and login',
    codeSamples: [
      {
        title: 'How would you hash a password?',
        code: "import bcrypt from 'bcrypt';\n\nconst hashedPassword = await bcrypt.hash(password, 10);",
        answer: 'Hashing passwords is a must-know task in backend interviews today.',
        explanation: 'bcrypt adds salting and multiple rounds, making brute-force attacks harder.',
      },
      {
        title: 'How would you compare a plain password with a stored hash?',
        code: "const isMatch = await bcrypt.compare(password, user.password);",
        answer: 'compare is asked often because it shows you understand verification without decrypting.',
        explanation: 'The library hashes the input internally and compares the result safely.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what bcrypt returns',
        code: "await bcrypt.hash('secret123', 10)",
        output: 'A hashed string, not the original password',
        explanation: 'The output is a one-way password hash with salt information embedded.',
      },
      {
        title: 'Guess the result of comparing the wrong password',
        code: "await bcrypt.compare('wrong', user.password)",
        output: 'false',
        explanation: 'compare returns a boolean indicating whether the password matches.',
      },
    ],
  },
  jwt: {
    comparison: 'signing and verifying',
    commonMistake: 'assuming JWT alone handles logout, revocation, and all security concerns',
    projectUseCase: 'issuing tokens after login and validating them on private routes',
    codeSamples: [
      {
        title: 'How would you sign a JWT after login?',
        code: "import jwt from 'jsonwebtoken';\n\nconst token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {\n  expiresIn: '1h',\n});",
        answer: 'Token creation is one of the most common JWT interview tasks.',
        explanation: 'The token payload carries claims, and the secret signs the token.',
      },
      {
        title: 'How would you verify an incoming token?',
        code: "const decoded = jwt.verify(token, process.env.JWT_SECRET);",
        answer: 'Verification is the other half of JWT usage and usually follows token signing in interviews.',
        explanation: 'verify checks the signature and decodes the payload if the token is valid.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what happens if the secret is wrong',
        code: "jwt.verify(token, 'wrong-secret')",
        output: 'Verification throws an error',
        explanation: 'The signature no longer matches, so the token is rejected.',
      },
      {
        title: 'Guess what `expiresIn: "1h"` means',
        code: "jwt.sign(payload, secret, { expiresIn: '1h' })",
        output: 'The token becomes invalid after one hour',
        explanation: 'The library writes an expiration claim into the token.',
      },
    ],
  },
  'passport-local': {
    comparison: 'manual login handling and Passport strategy-based login',
    commonMistake: 'not understanding serializeUser and deserializeUser in session-based auth',
    projectUseCase: 'email-password login in an Express app with reusable authentication flow',
    codeSamples: [
      {
        title: 'How would you define a local strategy?',
        code: "import passport from 'passport';\nimport { Strategy as LocalStrategy } from 'passport-local';\n\npassport.use(new LocalStrategy(async (username, password, done) => {\n  return done(null, { username });\n}));",
        answer: 'passport-local interviews often start with what the local strategy does.',
        explanation: 'The strategy handles username-password authentication logic.',
      },
      {
        title: 'How would you attach Passport middleware?',
        code: "app.use(passport.initialize());\napp.use(passport.session());",
        answer: 'Middleware order matters in Passport setups and interviewers often check that understanding.',
        explanation: 'initialize sets up Passport, while session enables persistent login sessions.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what `serializeUser` is used for',
        code: "passport.serializeUser((user, done) => done(null, user.id));",
        output: 'It stores a minimal user identifier in the session',
        explanation: 'Passport serializes the user so the full user object does not need to live in the session.',
      },
      {
        title: 'Guess the result of failed local auth',
        code: "done(null, false, { message: 'Invalid credentials' });",
        output: 'Authentication fails and Passport treats the login as unsuccessful',
        explanation: 'Passing false as the user tells Passport the credentials were not valid.',
      },
    ],
  },
  'passport-google-oauth20': {
    comparison: 'local authentication and OAuth-based social login',
    commonMistake: 'forgetting that OAuth verifies identity through a provider rather than asking for a local password',
    projectUseCase: 'adding Google sign-in to a MERN application',
    codeSamples: [
      {
        title: 'How would you configure a Google strategy?',
        code: "import passport from 'passport';\nimport { Strategy as GoogleStrategy } from 'passport-google-oauth20';\n\npassport.use(new GoogleStrategy({\n  clientID: process.env.GOOGLE_CLIENT_ID,\n  clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n  callbackURL: '/auth/google/callback',\n}, (accessToken, refreshToken, profile, done) => done(null, profile)));",
        answer: 'Configuring provider credentials and callback flow is the core Passport Google interview topic.',
        explanation: 'The provider redirects users back to the callback URL after consent.',
      },
      {
        title: 'How would you start Google login in Express?',
        code: "app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));",
        answer: 'The login start route is a common practical question in OAuth interviews.',
        explanation: 'This redirects the user to Google’s consent screen with the requested scopes.',
      },
    ],
    outputPrompts: [
      {
        title: 'Guess what the callback route receives',
        code: "app.get('/auth/google/callback', passport.authenticate('google'))",
        output: 'A Google-authenticated user flow, assuming the provider returns successfully',
        explanation: 'Passport processes the provider response and attempts to authenticate the user.',
      },
      {
        title: 'Guess why a callback URL mismatch breaks login',
        code: 'callbackURL: /auth/google/callback',
        output: 'The OAuth provider rejects the flow if the configured callback does not match',
        explanation: 'OAuth providers validate redirect URLs strictly for security.',
      },
    ],
  },
};

function makeFallbackProfile(topicTitle) {
  return {
    comparison: 'core concepts and practical implementation choices',
    commonMistake: `answering ${topicTitle} questions with definitions only instead of small real examples`,
    projectUseCase: `a beginner-friendly project feature that uses ${topicTitle} in a realistic way`,
    codeSamples: [
      {
        title: `Show a small example that demonstrates the core idea of ${topicTitle}.`,
        code: `// Example for ${topicTitle}\nconst message = 'Explain the core pattern clearly';\nconsole.log(message);`,
        answer: 'Interviewers usually prefer a small but correct example over an overly advanced one.',
        explanation: 'A short example proves that you can move from theory to implementation.',
      },
      {
        title: `How would you use ${topicTitle} in a mini project?`,
        code: `// Use ${topicTitle} in one focused project feature.`,
        answer: 'Connect the topic to one user-facing feature or one backend/data step.',
        explanation: 'This helps you answer the “where would you use it?” follow-up naturally.',
      },
    ],
    outputPrompts: [
      {
        title: `Guess the output or behavior of a basic ${topicTitle} example.`,
        code: `// Predict the result of a small ${topicTitle} example.`,
        output: 'The result depends on the example and the core concept being tested.',
        explanation: 'Output-based questions reveal whether you can reason through behavior, not just memorize words.',
      },
      {
        title: `Guess how a small ${topicTitle} change affects the final result.`,
        code: `// Change one part of the example and predict the new result.`,
        output: 'A strong answer explains both the result and why it changed.',
        explanation: 'This is the sort of follow-up interviewers use to test understanding under pressure.',
      },
    ],
  };
}

export function getTopicProfile(topicId, topicTitle) {
  return profiles[topicId] ?? makeFallbackProfile(topicTitle);
}
