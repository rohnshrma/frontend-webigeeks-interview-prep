// Sources: GeeksForGeeks, Toptal Python guide, python.org, Real Python

export const pythonAnalyticsQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'py2-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between a list, tuple, and set in Python?',
    answer:'List: ordered, mutable, allows duplicates — use when elements may change. Tuple: ordered, immutable, allows duplicates — use for fixed data (coordinates, DB rows), faster than lists. Set: unordered, mutable, NO duplicates — use for membership testing and removing duplicates. Frozenset is the immutable version of set.' },

  { id:'py2-f2', experienceLevel:'fresher', type:'output',
    question:'Guess the output',
    code:'x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)',
    output:'[1, 2, 3, 4]',
    explanation:'y = x copies the reference, not the list. Both point to the same object in memory. y.append(4) mutates the shared list.',
    choices:[
      { label:'[1, 2, 3, 4]', correct:true },
      { label:'[1, 2, 3]', correct:false },
      { label:'Error — cannot modify y as it is a copy', correct:false },
      { label:'[4]', correct:false }] },

  { id:'py2-f3', experienceLevel:'fresher', type:'conceptual',
    question:'What is a Python dictionary and how do you iterate over keys, values, and items?',
    answer:'A dictionary stores key-value pairs (hash map). Keys must be immutable (str, int, tuple); values can be anything.',
    code:"d = {'name': 'Priya', 'score': 95}\n\nfor key in d:               # iterate keys\nfor key in d.keys():       # explicit\nfor value in d.values():   # iterate values\nfor key, val in d.items(): # iterate key-value pairs\n\n# Lookup:\nd.get('age', 0)  # returns 0 if key missing (no KeyError)" },

  { id:'py2-f4', experienceLevel:'fresher', type:'practical',
    question:'How do you read a CSV file in Python?',
    code:"import csv\n\n# Using csv module:\nwith open('data.csv', newline='') as f:\n    reader = csv.DictReader(f)  # rows as dicts\n    for row in reader:\n        print(row['name'], row['score'])\n\n# Using Pandas (most common in data roles):\nimport pandas as pd\ndf = pd.read_csv('data.csv')\nprint(df.head())",
    answer:'DictReader gives each row as a dict keyed by column headers. Pandas .read_csv() is preferred for data analysis.' },

  { id:'py2-f5', experienceLevel:'fresher', type:'conceptual',
    question:'What is a Python lambda function?',
    answer:'A lambda is an anonymous, single-expression function: lambda arguments: expression. Used for short, throwaway functions — mainly in sort(), map(), filter(), and DataFrame.apply(). Cannot contain statements like loops or assignments.',
    code:"# Sort by second element:\npoints = [(1, 5), (3, 2), (2, 8)]\npoints.sort(key=lambda p: p[1])  # [(3,2), (1,5), (2,8)]\n\n# Filter even numbers:\nevens = list(filter(lambda x: x % 2 == 0, range(10)))" },

  { id:'py2-f6', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between Python 2 and Python 3?',
    answer:'Key differences: (1) print — function in Py3 (print("hello")), statement in Py2. (2) Division — 5/2 = 2.5 in Py3, 2 in Py2. (3) str — unicode by default in Py3; Py2 has separate unicode type. (4) range() — returns an iterator in Py3, list in Py2. (5) input() — always returns string in Py3. Python 2 reached end-of-life in January 2020.' },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'py2-j1', experienceLevel:'junior', type:'conceptual',
    question:'What are Python decorators and how do you write one?',
    answer:'A decorator wraps a function to add behaviour without modifying its code. Uses @ syntax as shorthand.',
    code:'def timer(func):\n    import time\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        elapsed = time.perf_counter() - start\n        print(f"{func.__name__} took {elapsed:.4f}s")\n        return result\n    return wrapper\n\n@timer\ndef process_data(df):\n    return df.groupby("category").sum()' },

  { id:'py2-j2', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between *args and **kwargs?',
    answer:'*args collects extra positional arguments into a TUPLE. **kwargs collects extra keyword arguments into a DICT. Use them to write flexible functions that accept variable inputs.',
    code:"def describe(*args, **kwargs):\n    print('Positional:', args)   # tuple\n    print('Keyword:', kwargs)    # dict\n\ndescribe(1, 2, 'hello', name='Rohan', score=95)\n# Positional: (1, 2, 'hello')\n# Keyword: {'name': 'Rohan', 'score': 95}" },

  { id:'py2-j3', experienceLevel:'junior', type:'output',
    question:'Guess the output — mutable default argument',
    code:'def add_item(item, lst=[]):\n    lst.append(item)\n    return lst\n\nprint(add_item("a"))\nprint(add_item("b"))',
    output:'["a"]\n["a", "b"]',
    explanation:'In Python, mutable default arguments are evaluated ONCE when the function is defined and shared across all calls. This is a classic Python gotcha.',
    choices:[
      { label:'["a"] then ["a","b"] (shared list)', correct:true },
      { label:'["a"] then ["b"] (new list each call)', correct:false },
      { label:'Error on second call', correct:false },
      { label:'["a","b"] then ["a","b"]', correct:false }] },

  { id:'py2-j4', experienceLevel:'junior', type:'conceptual',
    question:'What is a generator in Python and when should you use one?',
    answer:'A generator is a function that uses yield to produce values lazily — one at a time, on demand. Unlike a list, a generator doesn\'t store all values in memory. Use generators for: (1) Processing large files line by line, (2) Infinite sequences, (3) Data pipelines where you only need one value at a time.',
    code:'def read_large_file(path):\n    with open(path) as f:\n        for line in f:\n            yield line.strip()  # one line at a time, no RAM overflow\n\n# Compare:\nlines_list = [l.strip() for l in open("huge.csv")]  # loads entire file!\nlines_gen = (l.strip() for l in open("huge.csv"))   # lazy — uses no extra RAM' },

  { id:'py2-j5', experienceLevel:'junior', type:'practical',
    question:'How do you measure the execution time of a Python function?',
    code:'import time\nimport timeit\n\n# Method 1: time.perf_counter (high resolution)\nstart = time.perf_counter()\nresult = slow_function(data)\nelapsed = time.perf_counter() - start\nprint(f"Took {elapsed:.4f} seconds")\n\n# Method 2: timeit module (best for benchmarking)\nimport timeit\nlapse = timeit.timeit("sum(range(10000))", number=1000)\nprint(f"Average: {lapse/1000:.6f}s")' },

  // ── MID ─────────────────────────────────────────
  { id:'py2-m1', experienceLevel:'mid', type:'conceptual',
    question:'What is the Python GIL and how does it affect multi-threading?',
    answer:'The GIL (Global Interpreter Lock) is a mutex in CPython that allows only ONE thread to execute Python bytecode at a time. For CPU-bound tasks (calculations), threads don\'t achieve true parallelism — use multiprocessing or concurrent.futures.ProcessPoolExecutor. For I/O-bound tasks (network, files), GIL is released during I/O waits — threads are effective. asyncio is even better for I/O-bound work with thousands of concurrent operations.' },

  { id:'py2-m2', experienceLevel:'mid', type:'practical',
    question:'How do you implement concurrent data processing in Python?',
    code:'from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor\nimport pandas as pd\n\n# CPU-bound (use processes to bypass GIL):\ndef process_chunk(chunk):\n    return chunk.groupby("category").agg({"sales": "sum"})\n\nchunks = [df[i::4] for i in range(4)]  # split into 4 parts\nwith ProcessPoolExecutor(max_workers=4) as executor:\n    results = list(executor.map(process_chunk, chunks))\nfinal = pd.concat(results)\n\n# I/O-bound (threads are fine):\nwith ThreadPoolExecutor(max_workers=10) as pool:\n    futures = [pool.submit(fetch_data, url) for url in urls]' },

  { id:'py2-m3', experienceLevel:'mid', type:'conceptual',
    question:'What is Python metaclass and how is it used?',
    answer:'A metaclass is the class of a class — it controls how classes are created. When Python creates a class, it calls the metaclass\'s __new__ and __init__. Use cases: (1) ORMs like SQLAlchemy use metaclasses to register models, (2) Django models use ModelBase metaclass. 99% of Python code never needs custom metaclasses — use class decorators or __init_subclass__ for simpler alternatives.' },
];

export const pandasQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'pd2-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is a Pandas DataFrame and how is it different from a Series?',
    answer:'A Series is a one-dimensional labeled array (like one column with an index). A DataFrame is a two-dimensional table of rows and columns — think of it as a dictionary where each key is a column name and each value is a Series. They share the same index.' },

  { id:'pd2-f2', experienceLevel:'fresher', type:'practical',
    question:'How do you load a CSV, check its info, and display basic statistics?',
    code:'import pandas as pd\n\ndf = pd.read_csv("sales.csv")\nprint(df.shape)       # (rows, columns)\nprint(df.head())      # first 5 rows\nprint(df.dtypes)      # data types per column\nprint(df.info())      # non-null counts + dtypes\nprint(df.describe())  # count, mean, std, min, percentiles, max\nprint(df.isnull().sum())  # null count per column' },

  { id:'pd2-f3', experienceLevel:'fresher', type:'output',
    question:'Guess what .isnull().sum() returns',
    code:'df.isnull().sum()',
    output:'A Series indexed by column names with the count of missing (NaN) values in each column',
    explanation:'.isnull() creates a boolean DataFrame (True=NaN), .sum() adds True=1 per column.',
    choices:[
      { label:'Count of NaN values per column', correct:true },
      { label:'Total null count (one number)', correct:false },
      { label:'Boolean DataFrame same shape as df', correct:false },
      { label:'Rows with any null', correct:false }] },

  { id:'pd2-f4', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between .loc[] and .iloc[]?',
    answer:'.loc[] is LABEL-based — use actual index labels and column names. .iloc[] is INTEGER-POSITION-based — use 0-based integer positions like array indexing. When the index is integers (default), they look the same but behave differently with slicing: .loc[0:3] includes 3; .iloc[0:3] excludes 3.',
    code:"df.loc[0, 'name']         # row with index label 0, column 'name'\ndf.iloc[0, 2]             # row at position 0, column at position 2\ndf.loc[df['age'] > 25]    # boolean selection with loc\ndf.iloc[0:10, 1:4]        # first 10 rows, columns 1-3" },

  { id:'pd2-f5', experienceLevel:'fresher', type:'practical',
    question:'How do you filter rows and handle missing values?',
    code:"# Filter:\nhigh_earners = df[df['salary'] > 50000]\nmultiple = df[(df['dept'] == 'IT') & (df['salary'] > 40000)]\n\n# Handle missing values:\ndf.dropna()                      # drop rows with any NaN\ndf.dropna(subset=['salary'])     # only if salary is NaN\ndf['age'].fillna(df['age'].mean()) # fill with column mean\ndf.fillna({'city': 'Unknown', 'score': 0})  # fill different cols" },

  { id:'pd2-f6', experienceLevel:'fresher', type:'conceptual',
    question:'How do you rename columns and change data types in Pandas?',
    code:"# Rename:\ndf.rename(columns={'first_name': 'name', 'sal': 'salary'}, inplace=True)\n# Or set all at once:\ndf.columns = ['id', 'name', 'salary', 'dept']\n\n# Change types:\ndf['salary'] = df['salary'].astype(float)\ndf['date'] = pd.to_datetime(df['date'])\ndf['category'] = df['category'].astype('category')  # memory efficient" },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'pd2-j1', experienceLevel:'junior', type:'practical',
    question:'How do you group by multiple columns and apply multiple aggregations?',
    code:"result = df.groupby(['department', 'city']).agg(\n    avg_salary=('salary', 'mean'),\n    max_salary=('salary', 'max'),\n    headcount=('salary', 'count'),\n    total_budget=('salary', 'sum'),\n).reset_index()\n\n# Named aggregation is the modern way (avoid DeprecationWarning)" },

  { id:'pd2-j2', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between merge(), join(), and concat()?',
    answer:'merge(): SQL-style join on common column(s) — flexible, handles all join types. join(): shorthand for merge on index — for index-aligned DataFrames. concat(): stacks DataFrames vertically (axis=0) or horizontally (axis=1) — no key matching, just alignment by position/index.',
    code:"# merge (like SQL JOIN):\npd.merge(df1, df2, on='id', how='left')\n\n# concat (like UNION ALL):\npd.concat([df_2023, df_2024], ignore_index=True)\n\n# join on index:\ndf1.join(df2, on='city_id', how='inner')" },

  { id:'pd2-j3', experienceLevel:'junior', type:'output',
    question:'Guess the shape after this transpose',
    code:"df = pd.DataFrame({'A': [1,2,3], 'B': [4,5,6], 'C': [7,8,9]})\nprint(df.T.shape)",
    output:'(3, 3) — original (3, 3) stays (3, 3) when transposed',
    explanation:'df.T transposes — rows become columns. Original: 3 rows × 3 columns. Transposed: 3 rows × 3 columns (same shape when square).',
    choices:[
      { label:'(3, 3)', correct:true },
      { label:'(9, 1)', correct:false },
      { label:'Error — cannot transpose DataFrames', correct:false },
      { label:'(1, 9)', correct:false }] },

  { id:'pd2-j4', experienceLevel:'junior', type:'practical',
    question:'How do you use apply() to create a new column based on row-wise logic?',
    code:"# Column-wise (default axis=0):\ndf['salary_k'] = df['salary'].apply(lambda x: x / 1000)\n\n# Row-wise with multiple columns (axis=1):\ndf['grade'] = df.apply(\n    lambda row: 'A' if row['score'] >= 90\n                else 'B' if row['score'] >= 75\n                else 'C',\n    axis=1\n)\n\n# Vectorized alternative (much faster for simple cases):\ndf['grade'] = pd.cut(df['score'], bins=[0,74,89,100], labels=['C','B','A'])" },

  // ── MID ─────────────────────────────────────────
  { id:'pd2-m1', experienceLevel:'mid', type:'conceptual',
    question:'What is vectorization in Pandas and why avoid loops?',
    answer:'Vectorized operations apply to all elements simultaneously using NumPy\'s C-level implementation — no Python interpreter overhead per element. A Python loop has tens of microseconds overhead per iteration; vectorized operations process millions of cells in milliseconds. Profile with %timeit: df["col"].apply(lambda x: x*2) vs df["col"] * 2 — vectorized is typically 10-100× faster.' },

  { id:'pd2-m2', experienceLevel:'mid', type:'practical',
    question:'How do you handle time series data in Pandas?',
    code:"df['date'] = pd.to_datetime(df['date'])\ndf = df.set_index('date')\n\n# Resample — aggregate by time period:\nmonthly = df['sales'].resample('ME').sum()   # monthly sums\nweekly  = df['visits'].resample('W').mean()  # weekly avg\n\n# Time-based indexing:\nq1_2024 = df['2024-01':'2024-03']\n\n# Rolling average:\ndf['7d_avg'] = df['sales'].rolling(window=7).mean()" },

  { id:'pd2-m3', experienceLevel:'mid', type:'conceptual',
    question:'What is a MultiIndex in Pandas and when would you use it?',
    answer:'MultiIndex (hierarchical indexing) allows multiple levels of row or column labels. Created by: groupby + .unstack(), pd.MultiIndex.from_tuples(), or .set_index([col1, col2]). Use when: data has natural hierarchy (country → city, year → quarter), pivot-style data needs nested columns, or you want to use .xs() to cross-section on one level.',
    code:"# After multi-level groupby:\nsales = df.groupby(['year', 'quarter'])['revenue'].sum()\nprint(sales[2024])        # select all of 2024\nprint(sales[2024]['Q1'])  # specific quarter\nsales.unstack('quarter')  # pivot to wide format" },
];

export const numpyFullQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'np2-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is NumPy and why is it faster than Python lists for numerical work?',
    answer:'NumPy is a scientific computing library providing multi-dimensional arrays and mathematical functions. Faster because: (1) Contiguous memory layout — all elements same type, no Python object overhead, better CPU cache performance. (2) Vectorized operations run in C — no Python interpreter loop per element. (3) BLAS/LAPACK optimised linear algebra. Benchmark: NumPy array multiply 100K elements is ~50× faster than a Python list comprehension.' },

  { id:'np2-f2', experienceLevel:'fresher', type:'practical',
    question:'How do you create common NumPy arrays?',
    code:'import numpy as np\n\nnp.array([1, 2, 3, 4])           # from list\nnp.zeros((3, 4))                  # 3×4 zeros\nnp.ones((2, 3), dtype=np.int32)   # 2×3 ones as int\nnp.arange(0, 10, 2)               # [0, 2, 4, 6, 8]\nnp.linspace(0, 1, 5)             # [0, 0.25, 0.5, 0.75, 1.0]\nnp.eye(3)                         # 3×3 identity matrix\nnp.random.seed(42); np.random.rand(3, 3)  # 3×3 random [0,1)' },

  { id:'np2-f3', experienceLevel:'fresher', type:'output',
    question:'Guess the output',
    code:'import numpy as np\narr = np.array([10, 20, 30, 40])\nprint(arr * 3)',
    output:'[30 60 90 120]',
    explanation:'NumPy broadcasts the scalar 3 and multiplies every element — no loop needed.',
    choices:[
      { label:'[30 60 90 120]', correct:true },
      { label:'[10, 20, 30, 40, 10, 20, 30, 40, 10, 20, 30, 40] (repeated 3x)', correct:false },
      { label:'Error — cannot multiply array by scalar', correct:false },
      { label:'120', correct:false }] },

  { id:'np2-f4', experienceLevel:'fresher', type:'conceptual',
    question:'What does the shape attribute tell you and how do you reshape an array?',
    answer:'shape returns a tuple of the dimensions: (rows, columns) for 2D. reshape() creates a new view with a different shape — total elements must remain the same. -1 means "calculate this dimension automatically".',
    code:'arr = np.arange(12)\nprint(arr.shape)           # (12,)\n\ngrid = arr.reshape(3, 4)   # 3 rows × 4 cols\nprint(grid.shape)          # (3, 4)\n\nflat = grid.reshape(-1)    # back to 1D automatically\ncol = arr.reshape(-1, 1)   # (12, 1) column vector' },

  { id:'np2-f5', experienceLevel:'fresher', type:'conceptual',
    question:'What is NumPy indexing and slicing?',
    code:'arr = np.array([[1,2,3],[4,5,6],[7,8,9]])\n\narr[0, 1]        # row 0, col 1 → 2\narr[1:, :2]      # rows 1+ , first 2 cols → [[4,5],[7,8]]\narr[:, 2]        # all rows, col 2 → [3,6,9]\narr[arr > 4]     # boolean mask → [5,6,7,8,9]' },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'np2-j1', experienceLevel:'junior', type:'conceptual',
    question:'What is broadcasting in NumPy and when does it fail?',
    answer:'Broadcasting automatically expands arrays of different shapes for operations — without copying data. Rules: dimensions are compared right-to-left; sizes must either match or be 1 (then expanded). Fails (ValueError) when dimensions don\'t match and neither is 1.',
    code:'a = np.ones((3, 4))\nb = np.ones((4,))   # treated as (1,4)\nresult = a + b       # valid: (3,4) + (1,4) → (3,4)\n\nc = np.ones((3,))\n# a + c → ERROR: (3,4) + (3,) would need to be (1,3) or (3,1) for valid broadcast' },

  { id:'np2-j2', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between a NumPy view and a copy?',
    answer:'A view shares the underlying data buffer — modifying it modifies the original. A copy has its own memory. Slicing returns a view (memory efficient). Fancy indexing (boolean or integer array selection) returns a copy. np.copy() creates an explicit copy.',
    code:'a = np.array([1, 2, 3, 4, 5])\nb = a[1:4]   # view — shares memory\nb[0] = 99\nprint(a)     # [1, 99, 3, 4, 5] — original changed!\n\nc = a[1:4].copy()  # explicit copy\nc[0] = 0\nprint(a)     # unchanged' },

  { id:'np2-j3', experienceLevel:'junior', type:'output',
    question:'Guess the output',
    code:'arr = np.array([1, 2, 3])\nb = arr\nb[0] = 99\nprint(arr)',
    output:'[99  2  3]',
    explanation:'b = arr is assignment — both variables reference the same NumPy array object. Modifying b modifies arr.',
    choices:[
      { label:'[99  2  3]', correct:true },
      { label:'[1  2  3] (assignment copies arrays)', correct:false },
      { label:'Error — cannot modify via alias', correct:false },
      { label:'[99  99  99]', correct:false }] },

  { id:'np2-j4', experienceLevel:'junior', type:'practical',
    question:'How do you compute statistical measures along an axis?',
    code:'data = np.array([[10, 20, 30],\n                 [40, 50, 60],\n                 [70, 80, 90]])\n\nnp.mean(data)          # overall mean: 50.0\nnp.mean(data, axis=0)  # column means: [40. 50. 60.]\nnp.mean(data, axis=1)  # row means:    [20. 50. 80.]\nnp.std(data, axis=0)   # column std dev\nnp.sum(data, axis=1)   # row sums: [60, 150, 240]' },

  // ── MID ─────────────────────────────────────────
  { id:'np2-m1', experienceLevel:'mid', type:'conceptual',
    question:'What is vectorization and how do you use np.vectorize?',
    answer:'Vectorization applies a function element-wise across arrays using optimised C loops. np.vectorize wraps a Python function to apply it element-wise — convenient but NOT as fast as true NumPy ufuncs since Python overhead remains per element. It is mainly for convenience and composability, not performance.',
    code:'# Slow (Python loop):\nresult = [my_func(x) for x in arr]\n\n# Better — true vectorization:\nresult = np.maximum(arr, 0)  # native ufunc, C speed\n\n# np.vectorize — convenient but not fast:\nvec_func = np.vectorize(lambda x: x**2 + 2*x + 1)\nresult = vec_func(arr)' },

  { id:'np2-m2', experienceLevel:'mid', type:'practical',
    question:'How do you perform linear algebra operations in NumPy?',
    code:'A = np.array([[1,2],[3,4]])\nB = np.array([[5,6],[7,8]])\n\n# Matrix multiplication:\nC = A @ B           # preferred (Python 3.5+)\nC = np.dot(A, B)    # equivalent\n\n# Transpose:\nA.T\n\n# Inverse and determinant:\nnp.linalg.inv(A)\nnp.linalg.det(A)  # -2.0\n\n# Eigenvalues:\nvals, vecs = np.linalg.eig(A)' },
];

export const matplotlibFullQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'mpl2-f1', experienceLevel:'fresher', type:'conceptual',
    question:'When do you use a bar chart vs. a line chart vs. a scatter plot?',
    answer:'Bar chart: compare discrete categories (sales by product, votes by candidate). Line chart: show trends over continuous ordered data (revenue over months, temperature over time). Scatter plot: show relationship/correlation between two numeric variables (height vs weight, ad spend vs revenue). Pie chart: proportions of a whole — but usually a bar chart is clearer.' },

  { id:'mpl2-f2', experienceLevel:'fresher', type:'practical',
    question:'How do you create a bar chart with labels and a title?',
    code:"import matplotlib.pyplot as plt\n\ncategories = ['Python', 'SQL', 'Excel', 'Tableau']\nscores = [90, 85, 70, 60]\n\nplt.figure(figsize=(8, 5))\nplt.bar(categories, scores, color=['#4f46e5','#0ea5e9','#f97316','#10b981'])\nplt.xlabel('Skill')\nplt.ylabel('Score (%)')\nplt.title('Candidate Skill Assessment')\nplt.ylim(0, 100)\nfor i, v in enumerate(scores):\n    plt.text(i, v + 1, str(v), ha='center')\nplt.tight_layout()\nplt.show()" },

  { id:'mpl2-f3', experienceLevel:'fresher', type:'output',
    question:'Guess what plt.tight_layout() does',
    code:"fig, (ax1, ax2) = plt.subplots(1, 2)\nax1.plot([1,2,3], [4,5,6])\nax2.plot([1,2,3], [6,5,4])\nplt.tight_layout()\nplt.show()",
    output:'Automatically adjusts subplot spacing to prevent overlapping titles, labels, and tick marks',
    explanation:'Without tight_layout, subplots often overlap. It calculates and applies optimal padding.',
    choices:[
      { label:'Auto-adjusts spacing to prevent overlaps', correct:true },
      { label:'Crops the figure to remove whitespace', correct:false },
      { label:'Makes all axes equal in size', correct:false },
      { label:'Saves the figure automatically', correct:false }] },

  { id:'mpl2-f4', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between plt.show() and plt.savefig()?',
    answer:'plt.show() displays the plot in an interactive window (or inline in Jupyter). plt.savefig() saves to a file without displaying. savefig() must be called BEFORE show() — show() clears the figure. Common formats: PNG (raster for web), SVG (vector for publications), PDF. Use dpi=300 for print-quality output.',
    code:"plt.savefig('chart.png', dpi=300, bbox_inches='tight')\nplt.savefig('chart.svg')  # vector format\nplt.show()  # always after savefig" },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'mpl2-j1', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between pyplot interface and the Object-Oriented API?',
    answer:'pyplot (plt.plot) is stateful — it always targets the "current" axes object implicitly. Easy for single charts. OO API (fig, ax = plt.subplots()) gives explicit control — essential for subplots, embedding in GUI, and production code. Always use OO API when: multiple subplots, saving to file programmatically, or building reusable charting functions.' },

  { id:'mpl2-j2', experienceLevel:'junior', type:'practical',
    question:'How do you create a 2×2 grid of subplots?',
    code:"fig, axes = plt.subplots(2, 2, figsize=(12, 8))\n\naxes[0,0].plot([1,2,3], [4,5,6])\naxes[0,0].set_title('Line Chart')\n\naxes[0,1].bar(['A','B','C'], [10,25,15])\naxes[0,1].set_title('Bar Chart')\n\naxes[1,0].scatter([1,2,3,4], [5,3,7,2])\naxes[1,0].set_title('Scatter')\n\naxes[1,1].hist(np.random.randn(1000), bins=30)\naxes[1,1].set_title('Histogram')\n\nplt.tight_layout()\nplt.savefig('dashboard.png', dpi=150)" },

  { id:'mpl2-j3', experienceLevel:'junior', type:'conceptual',
    question:'What is a Seaborn and when would you use it over Matplotlib?',
    answer:'Seaborn is a statistical visualisation library built on Matplotlib with: (1) Beautiful default styles, (2) High-level functions for common statistical plots (heatmap, violinplot, pairplot, boxplot), (3) Native Pandas DataFrame support, (4) Built-in themes. Use Seaborn for exploratory data analysis and statistical charts; use Matplotlib for fine-grained control of publication-quality or custom charts.' },

  // ── MID ─────────────────────────────────────────
  { id:'mpl2-m1', experienceLevel:'mid', type:'practical',
    question:'How do you annotate outliers on a scatter plot?',
    code:"fig, ax = plt.subplots(figsize=(10, 6))\n\nax.scatter(df['salary'], df['experience'], alpha=0.5)\n\n# Identify and annotate outliers (> 2 std dev)\noutlier_mask = (df['salary'] - df['salary'].mean()).abs() > 2 * df['salary'].std()\nfor _, row in df[outlier_mask].iterrows():\n    ax.annotate(\n        row['name'],\n        xy=(row['salary'], row['experience']),\n        xytext=(10, 5), textcoords='offset points',\n        arrowprops=dict(arrowstyle='->'),\n        fontsize=9\n    )\n\nplt.xlabel('Salary')\nplt.ylabel('Experience (yrs)')\nplt.title('Salary vs Experience')\nplt.show()" },
];

export const tableauFullQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'tab2-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between a dimension and a measure in Tableau?',
    answer:'Dimensions (blue pills): qualitative, categorical fields — used to slice/dice data (Region, Product, Date parts). Measures (green pills): quantitative numerical fields — automatically aggregated (SUM, AVG) when added to the view. You can change the default aggregation in the measure\'s menu. Date fields are dimensions by default but can be measures (continuous).' },

  { id:'tab2-f2', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between a live connection and an extract in Tableau?',
    answer:'Live connection: queries the data source in real time — always current data; performance depends on the source database. Extract: a .hyper file snapshot in Tableau\'s optimised in-memory engine — extremely fast queries; must be refreshed (scheduled or manual) for new data. Use extracts for: better performance, connecting to slow databases, sharing workbooks without database access.' },

  { id:'tab2-f3', experienceLevel:'fresher', type:'practical',
    question:'How do you create a bar chart sorted by descending sales in Tableau?',
    answer:'Drag Category to Columns. Drag SUM(Sales) to Rows. Click the Sort Descending icon on the Sales axis. Or: right-click Sort on the dimension pill → Sort by Field → choose SUM(Sales) Descending.' },

  { id:'tab2-f4', experienceLevel:'fresher', type:'conceptual',
    question:'What are Marks in Tableau and what can you encode?',
    answer:'Marks are the visual elements Tableau draws — bars, circles, lines, squares. The Marks card controls: Color (encode a dimension or measure with color), Size (encode a measure with size), Label (display values on marks), Detail (add dimension without changing mark type), Tooltip (hover text), Shape (encode a dimension with different shapes). Each encoding reveals additional data dimensions.' },

  { id:'tab2-f5', experienceLevel:'fresher', type:'output',
    question:'Guess the visual result of dragging Region to Color on an existing bar chart',
    code:'/* Existing: horizontal bar chart of SUM(Sales) per Category\n   Action: drag Region to Color */\n',
    output:'Each bar splits into colored segments by Region (stacked bar by default), or bars separate into multi-colored bars per category',
    explanation:'Dragging a dimension to Color creates a stacked bar chart — each category bar is divided by region with distinct colours.',
    choices:[
      { label:'Bars split into coloured segments by Region', correct:true },
      { label:'Color only changes the bar outline', correct:false },
      { label:'Creates a separate chart per region', correct:false },
      { label:'Error — cannot encode color on bar charts', correct:false }] },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'tab2-j1', experienceLevel:'junior', type:'conceptual',
    question:'What is the order of filter execution in Tableau?',
    answer:'Filters run in this order: (1) Extract filter, (2) Data Source filter, (3) Context filter, (4) Top N / Conditional filters, (5) Dimension filters, (6) Measure filters. Context filters are special — they create a temporary table; subsequent filters (including Top N) run on that restricted set. This is why you must make filters into Context Filters for correct Top N calculations.' },

  { id:'tab2-j2', experienceLevel:'junior', type:'practical',
    question:'How do you write a calculated field for year-over-year growth?',
    code:'// YoY Growth %:\n(SUM([Sales]) - LOOKUP(SUM([Sales]), -1)) / ABS(LOOKUP(SUM([Sales]), -1))\n\n// Or using table calculations:\nZN( (SUM([Sales]) - LOOKUP(ZN(SUM([Sales])), -1)) / LOOKUP(ZN(SUM([Sales])), -1) )\n\n// Format as Percentage in the measure\'s Format field',
    answer:'LOOKUP() is a table calculation that references another row. -1 means the previous row in the table.' },

  { id:'tab2-j3', experienceLevel:'junior', type:'conceptual',
    question:'What is a Tableau LOD expression and what are the three types?',
    answer:'LOD (Level of Detail) expressions compute aggregations at a user-specified granularity regardless of the view\'s level of detail. FIXED: computes at specified dimension(s) — ignores view dimensions and regular filters (only Context filters apply). INCLUDE: adds extra dimensions to view LOD — more granular. EXCLUDE: removes view dimensions — less granular. Example: { FIXED [Customer] : MIN([Order Date]) } gives each customer\'s first order date regardless of what\'s in the view.' },

  // ── MID ─────────────────────────────────────────
  { id:'tab2-m1', experienceLevel:'mid', type:'conceptual',
    question:'What is the difference between a regular calculated field and a table calculation?',
    answer:'Regular calculated field: computed at data source level before aggregation — can be used as dimension or in filters; row-level or aggregate. Table calculation: computed at visualisation level AFTER aggregation — runs on the query results in memory. Functions: WINDOW_SUM, LOOKUP, RUNNING_SUM, RANK, FIRST, LAST, INDEX, SIZE. Table calcs cannot be used in regular filters (use "Filters on Table Calculations" option).' },

  { id:'tab2-m2', experienceLevel:'mid', type:'output',
    question:'Guess what this FIXED LOD computes when the view is at Order level',
    code:'{ FIXED [Customer ID] : SUM([Sales]) }',
    output:'Total lifetime sales per customer — the same value repeated on every order row for that customer',
    explanation:'FIXED ignores view granularity. Every order row for Customer A shows Customer A\'s total sales across all time.',
    choices:[
      { label:'Customer-level total repeated on each order row', correct:true },
      { label:'Sales for each individual order', correct:false },
      { label:'Grand total for all customers', correct:false },
      { label:'Error — FIXED needs INCLUDE or EXCLUDE instead', correct:false }] },
];

export const powerBIFullQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'pbi2-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is DAX and how is it different from Excel formulas?',
    answer:'DAX (Data Analysis Expressions) is a formula language for Power BI, Power Pivot, and SSAS. Unlike Excel: (1) Context-aware — results change based on filters applied in the report. (2) Operates on columns/tables, not individual cells. (3) Two types of formulas: Calculated Columns (row context) and Measures (filter context). (4) Time intelligence functions (DATEADD, SAMEPERIODLASTYEAR) built-in.' },

  { id:'pbi2-f2', experienceLevel:'fresher', type:'practical',
    question:'What is the difference between a calculated column and a measure?',
    answer:'Calculated column: evaluated row-by-row during refresh and stored in the model — occupies memory; has row context. Measure: computed dynamically at query time based on current filter context — not stored; much more memory-efficient. Use calculated columns for: row-level data needed in slicers, relationships. Use measures for: aggregations (SUM, AVERAGE), KPIs, anything displayed in a report visual.',
    code:'// Calculated Column (row context):\nProfit = Sales[Revenue] - Sales[Cost]\n\n// Measure (filter/aggregation context):\nTotal Revenue = SUM(Sales[Revenue])\nProfit Margin = DIVIDE([Total Profit], [Total Revenue]) * 100' },

  { id:'pbi2-f3', experienceLevel:'fresher', type:'output',
    question:'Guess what DIVIDE() returns when denominator is 0',
    code:'Result = DIVIDE([Numerator], [Denominator], 0)',
    output:'0 — the third argument (alternate result) is returned instead of division by zero error',
    explanation:'DIVIDE(num, den, alternate) safely handles division by zero by returning the alternate value. Without alternate, it returns BLANK().',
    choices:[
      { label:'0 (the specified alternate result)', correct:true },
      { label:'Error in the visual', correct:false },
      { label:'BLANK()', correct:false },
      { label:'Infinity', correct:false }] },

  { id:'pbi2-f4', experienceLevel:'fresher', type:'conceptual',
    question:'What are relationships in Power BI and what does cardinality mean?',
    answer:'Relationships connect tables so filters propagate between them. Cardinality describes the uniqueness on each side: Many-to-One (most common) — fact table links to dimension. One-to-One — both sides are unique. Many-to-Many — needs a bridge table. Cross-filter direction: Single (filters one way) vs Both (bidirectional — can cause unexpected behavior). Always prefer star schema with single-direction relationships.' },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'pbi2-j1', experienceLevel:'junior', type:'conceptual',
    question:'What is filter context vs row context in DAX?',
    answer:'Filter context: the set of active filters from slicers, page filters, visual interactions, and report filters. Measures evaluate in filter context. Row context: the current row being evaluated in a calculated column or iterator function (e.g., SUMX, AVERAGEX). CALCULATE() is the key function that creates a new filter context — it can add, remove, or override filters from the current context.' },

  { id:'pbi2-j2', experienceLevel:'junior', type:'practical',
    question:'How do you write Year-over-Year growth in Power BI?',
    code:'// Requires a Date dimension table with CONTINUOUS dates:\nSales LY = CALCULATE([Total Revenue], SAMEPERIODLASTYEAR(Dates[Date]))\nYoY Growth $ = [Total Revenue] - [Sales LY]\nYoY Growth % = DIVIDE([YoY Growth $], [Sales LY], BLANK())',
    answer:'SAMEPERIODLASTYEAR shifts the current date filter back exactly one year. Always have a Date dimension table marked as Date Table in Power BI.' },

  { id:'pbi2-j3', experienceLevel:'junior', type:'conceptual',
    question:'What is a Star Schema and why is it recommended for Power BI?',
    answer:'Star Schema: one central fact table (orders, sales, transactions) connected to dimension tables (Date, Product, Customer, Geography) with one-to-many relationships. Benefits: (1) Simple, understandable model, (2) Better query performance — VertiPaq engine optimises star schemas, (3) Predictable filter propagation, (4) Avoids many-to-many complexity. Avoid wide flat tables and snowflake schemas in Power BI.' },

  // ── MID ─────────────────────────────────────────
  { id:'pbi2-m1', experienceLevel:'mid', type:'conceptual',
    question:'What is the CALCULATE function and how does context transition work?',
    answer:'CALCULATE(expression, filter1, filter2...) evaluates expression in a modified filter context. Context transition: when CALCULATE is called inside a calculated column or iterator, the current row context is automatically converted into an equivalent filter context. This is critical when using measures inside SUMX or AVERAGEX — without CALCULATE, the measure doesn\'t "see" the row context filters.' },

  { id:'pbi2-m2', experienceLevel:'mid', type:'practical',
    question:'How do you implement a running total in Power BI?',
    code:'Running Total = \nCALCULATE(\n    [Total Revenue],\n    FILTER(\n        ALL(Dates),\n        Dates[Date] <= MAX(Dates[Date])\n    )\n)',
    answer:'FILTER(ALL(Dates), ...) creates a table of all dates up to and including the current max visible date. CALCULATE applies that as the filter context for the measure.' },

  { id:'pbi2-m3', experienceLevel:'mid', type:'conceptual',
    question:'What is Row-Level Security (RLS) in Power BI and how do you implement it?',
    answer:'RLS restricts data access based on the user\'s identity. Static RLS: define roles (e.g., "East Region") with DAX filter expressions ([Region] = "East"). Dynamic RLS: use USERPRINCIPALNAME() or USERNAME() DAX functions to filter based on the logged-in user\'s email — compare against a security table that maps users to regions/departments. Publish to Power BI Service and assign users to roles.' },
];
