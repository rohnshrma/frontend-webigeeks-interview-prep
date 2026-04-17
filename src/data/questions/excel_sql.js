// Sources: GeeksForGeeks, Toptal, Microsoft Excel/SQL docs, Tableau/Power BI community

export const excelQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'xl-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between a relative and an absolute cell reference?',
    answer:'Relative reference (A1) adjusts automatically when you copy a formula to another cell. Absolute reference ($A$1) is locked — it always refers to the same cell regardless of where you copy the formula. Mixed: $A1 locks the column; A$1 locks the row. Use absolute references for fixed values like tax rates that should not change when formulas are copied across rows or columns.' },

  { id:'xl-f2', experienceLevel:'fresher', type:'conceptual',
    question:'What does VLOOKUP do and what are its four arguments?',
    answer:'VLOOKUP searches for a value in the leftmost column of a range and returns a value from a specified column. The four arguments: (1) lookup_value — what to find, (2) table_array — the range to search, (3) col_index_num — which column to return (1=first column), (4) range_lookup — FALSE for exact match (always use for data lookups), TRUE for approximate match (sorted data).',
    code:'=VLOOKUP(A2, $E$2:$G$100, 2, FALSE)\n// Finds A2 in column E, returns the value from column F' },

  { id:'xl-f3', experienceLevel:'fresher', type:'output',
    question:'Guess the output',
    code:'=IF(85 >= 60, "Pass", "Fail")',
    output:'"Pass" — 85 is ≥ 60, so the condition is TRUE',
    explanation:'IF(logical_test, value_if_true, value_if_false). 85 >= 60 is TRUE → returns "Pass".',
    choices:[
      { label:'"Pass"', correct:true },
      { label:'"Fail"', correct:false },
      { label:'TRUE', correct:false },
      { label:'#VALUE!', correct:false }] },

  { id:'xl-f4', experienceLevel:'fresher', type:'practical',
    question:'How do you count cells that contain the word "Completed" in column B?',
    code:'=COUNTIF(B2:B100, "Completed")\n// Or partial match:\n=COUNTIF(B2:B100, "*Complete*")',
    answer:'COUNTIF(range, criteria) counts cells matching a condition. Use * as wildcard for partial matches.' },

  { id:'xl-f5', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between SUMIF and SUMIFS?',
    answer:'SUMIF adds values meeting ONE condition: =SUMIF(criteria_range, criteria, sum_range). SUMIFS adds values meeting MULTIPLE conditions (AND logic): =SUMIFS(sum_range, range1, criteria1, range2, criteria2). Note: argument order differs — SUMIF has sum_range last; SUMIFS has sum_range first.',
    code:'=SUMIF(C2:C100, "North", D2:D100)   // Sum sales where region="North"\n=SUMIFS(D2:D100, C2:C100, "North", E2:E100, ">2023")  // + year filter' },

  { id:'xl-f6', experienceLevel:'fresher', type:'conceptual',
    question:'What does the LEN function do and how would you use TRIM with it?',
    answer:'LEN(text) returns the number of characters including spaces. TRIM(text) removes all leading, trailing, and extra internal spaces. Use them together to detect data quality issues.',
    code:'=LEN(TRIM(A2))   // Length after trimming whitespace\n=IF(LEN(TRIM(A2))=0, "Empty", "Has data")  // Check for blank cells' },

  { id:'xl-f7', experienceLevel:'fresher', type:'conceptual',
    question:'How do you freeze rows and columns to keep headers visible while scrolling?',
    answer:'View tab → Freeze Panes. Options: Freeze Top Row (keeps row 1 visible), Freeze First Column, or Freeze Panes (freezes rows above and columns left of the selected cell). To freeze both row 1 and column A simultaneously: select cell B2, then Freeze Panes.' },

  { id:'xl-f8', experienceLevel:'fresher', type:'output',
    question:'Guess the output',
    code:'=IFERROR(VLOOKUP("XYZ", A2:B100, 2, FALSE), "Not Found")',
    output:'"Not Found" — VLOOKUP returns #N/A when "XYZ" is not found; IFERROR catches it and returns "Not Found"',
    explanation:'IFERROR(value, value_if_error) handles any error type. Essential for cleaner VLOOKUP outputs.',
    choices:[
      { label:'"Not Found"', correct:true },
      { label:'#N/A', correct:false },
      { label:'Empty cell', correct:false },
      { label:'0', correct:false }] },

  { id:'xl-f9', experienceLevel:'fresher', type:'practical',
    question:'How do you create a Pivot Table to summarise sales by product category?',
    answer:'Select data range → Insert → PivotTable → New Worksheet. In PivotTable Fields: drag "Category" to Rows, "Sales" to Values (will auto-sum). Add "Month" to Columns for cross-tab. Add slicers (Insert → Slicer) for interactive filtering.' },

  { id:'xl-f10', experienceLevel:'fresher', type:'conceptual',
    question:'What is conditional formatting and how do you highlight the top 10 values?',
    answer:'Conditional formatting applies formatting automatically based on cell values. To highlight top 10: Home → Conditional Formatting → Top/Bottom Rules → Top 10 Items. For custom rules: New Rule → use a formula like =B2>LARGE($B$2:$B$100,10) to highlight cells above the 10th largest value.' },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'xl-j1', experienceLevel:'junior', type:'conceptual',
    question:'When would you use INDEX-MATCH instead of VLOOKUP?',
    answer:'INDEX-MATCH is superior for: (1) Lookup column not leftmost — VLOOKUP requires the lookup column to be first. (2) Left-side lookups — return a value to the LEFT of the lookup column (impossible with VLOOKUP). (3) Inserting/deleting columns — VLOOKUP uses a hardcoded column number that breaks; INDEX-MATCH references columns directly. (4) Large datasets — slightly faster on very wide tables.',
    code:'=INDEX(A2:A100, MATCH(F2, C2:C100, 0))\n// MATCH finds the row position; INDEX retrieves the value from any column' },

  { id:'xl-j2', experienceLevel:'junior', type:'output',
    question:'Guess the output of this LARGE function',
    code:'=LARGE({9, 3, 7, 1, 5, 8, 2}, 3)',
    output:'7 — the 3rd largest value in the array',
    explanation:'LARGE(array, k) returns the k-th largest. Sorted desc: 9, 8, 7, 5, 3, 2, 1. 3rd = 7.',
    choices:[
      { label:'7', correct:true },
      { label:'8', correct:false },
      { label:'5', correct:false },
      { label:'3', correct:false }] },

  { id:'xl-j3', experienceLevel:'junior', type:'practical',
    question:'How do you use XLOOKUP (Excel 365) and what advantages does it have over VLOOKUP?',
    answer:'XLOOKUP is the modern replacement for VLOOKUP with cleaner syntax and no column-number hardcoding.',
    code:'=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode])\n\n// Example:\n=XLOOKUP(A2, EmployeeTable[ID], EmployeeTable[Salary], "Not Found")\n\n// Advantages: can look left, returns arrays, if_not_found built-in,\n// exact match by default, works with unsorted data' },

  { id:'xl-j4', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between TEXT, VALUE, and NUMBERVALUE functions?',
    answer:'TEXT(number, format) converts a number to a formatted text string (e.g., "01/15/2024"). VALUE(text) converts a text representation of a number to an actual number (so math works). NUMBERVALUE(text, decimal_sep, group_sep) handles locale-specific number formats (e.g., "1.234,56" in European notation).',
    code:'=TEXT(TODAY(), "DD/MM/YYYY")   // "16/04/2026"\n=VALUE("1,234")               // 1234 (then you can use in math)\n=A2+VALUE(B2)                 // sum column A with text-numbers in B' },

  { id:'xl-j5', experienceLevel:'junior', type:'practical',
    question:'How do you use CONCATENATE or the & operator to join text from multiple cells?',
    code:'// Modern (Excel 2019+):\n=TEXTJOIN(", ", TRUE, A2:A10)  // joins non-empty cells with comma\n\n// & operator:\n=A2 & " " & B2                 // "FirstName LastName"\n\n// CONCAT (ignores range empties):\n=CONCAT(A2:A5)                 // no delimiter\n\n// Legacy CONCATENATE:\n=CONCATENATE(A2, " ", B2)',
    answer:'TEXTJOIN is the most powerful — handles ranges, custom delimiters, and skips empty cells.' },

  // ── MID ─────────────────────────────────────────
  { id:'xl-m1', experienceLevel:'mid', type:'conceptual',
    question:'What is Power Query and how does it differ from using formulas for data cleaning?',
    answer:'Power Query (Get & Transform) is a low-code ETL tool built into Excel. Unlike formulas: (1) Steps are recorded and replayable — refresh updates the output automatically when source data changes. (2) Handles connections to multiple sources (databases, web, files). (3) Transformations are visual — no formula expertise needed. (4) Can unpivot, merge queries (like JOIN), and handle millions of rows efficiently. Ideal for repeatable multi-source data cleaning workflows.' },

  { id:'xl-m2', experienceLevel:'mid', type:'practical',
    question:'How do you use dynamic array functions FILTER and SORT (Excel 365)?',
    code:'// FILTER — returns rows matching a condition, no helper columns:\n=FILTER(A2:C100, B2:B100="North", "No results")\n\n// SORT — sort a range dynamically:\n=SORT(A2:C100, 3, -1)  // sort by column 3 descending\n\n// Combine:\n=SORT(FILTER(A2:C100, C2:C100>1000), 3, -1)\n// Filter rows where col C > 1000, then sort by col C desc',
    answer:'Dynamic array functions spill results automatically. They replace many complex array formulas from older Excel versions.' },

  { id:'xl-m3', experienceLevel:'mid', type:'output',
    question:'Guess what happens when you calculate =SUM(A1:A3) and the cells contain mixed types',
    code:'A1 = 10\nA2 = "text"\nA3 = 20\n=SUM(A1:A3)',
    output:'30 — SUM ignores text values and sums only numeric ones',
    explanation:'SUM skips non-numeric cells silently. For strict validation use SUMPRODUCT with ISNUMBER().',
    choices:[
      { label:'30 (text cell silently ignored)', correct:true },
      { label:'#VALUE! error', correct:false },
      { label:'0 because of mixed types', correct:false },
      { label:'10 (only first numeric cell)', correct:false }] },
];

export const sqlQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'sql-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What are the five categories of SQL commands?',
    answer:'DDL (Data Definition Language) — CREATE, ALTER, DROP, TRUNCATE: structure. DML (Data Manipulation Language) — INSERT, UPDATE, DELETE: data. DQL (Data Query Language) — SELECT: querying. DCL (Data Control Language) — GRANT, REVOKE: permissions. TCL (Transaction Control Language) — COMMIT, ROLLBACK, SAVEPOINT: transaction management.' },

  { id:'sql-f2', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between WHERE and HAVING?',
    answer:'WHERE filters rows BEFORE grouping — cannot use aggregate functions. HAVING filters AFTER GROUP BY — can use aggregate functions. Mental model: WHERE is for rows; HAVING is for groups.',
    code:"-- Get departments with more than 3 employees:\nSELECT department, COUNT(*) as total\nFROM employees\nWHERE status = 'active'   -- filter rows first\nGROUP BY department\nHAVING COUNT(*) > 3;       -- then filter groups" },

  { id:'sql-f3', experienceLevel:'fresher', type:'conceptual',
    question:'What are the different types of JOINs in SQL?',
    answer:'INNER JOIN: only matching rows in both tables. LEFT JOIN: all rows from left table + matching from right (NULL if no match). RIGHT JOIN: all rows from right + matching from left. FULL OUTER JOIN: all rows from both (NULL where no match). CROSS JOIN: cartesian product — every combination. SELF JOIN: a table joined to itself (for hierarchical data).' },

  { id:'sql-f4', experienceLevel:'fresher', type:'practical',
    question:'Write a query to find the top 3 highest-paid employees.',
    code:"SELECT name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 3;\n\n-- SQL Server:\nSELECT TOP 3 name, salary FROM employees ORDER BY salary DESC;\n-- Oracle:\nSELECT name, salary FROM employees ORDER BY salary DESC FETCH FIRST 3 ROWS ONLY;",
    answer:'ORDER BY DESC + LIMIT is the most portable approach. Database-specific syntax varies.' },

  { id:'sql-f5', experienceLevel:'fresher', type:'output',
    question:'Guess how many rows this returns on a table with 5 distinct departments',
    code:'SELECT department, AVG(salary) as avg_sal\nFROM employees\nGROUP BY department;',
    output:'5 rows — one per distinct department',
    explanation:'GROUP BY collapses all rows with the same department value into one row with the aggregate.',
    choices:[
      { label:'5 rows — one per department', correct:true },
      { label:'All rows in the table', correct:false },
      { label:'1 row with total average', correct:false },
      { label:'Error without ORDER BY', correct:false }] },

  { id:'sql-f6', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between DELETE, TRUNCATE, and DROP?',
    answer:'DELETE: removes specific rows with optional WHERE clause; transaction-logged (can be rolled back); triggers fire; table structure remains; resets auto-increment only in some DBs. TRUNCATE: removes ALL rows instantly; minimally logged; much faster than DELETE; resets auto-increment; cannot be rolled back in most DBs; cannot use WHERE. DROP: removes the entire table including structure, indexes, constraints — irreversible.' },

  { id:'sql-f7', experienceLevel:'fresher', type:'conceptual',
    question:'What is NULL in SQL and how does it behave in comparisons?',
    answer:'NULL represents the absence of a value — it is NOT zero, not empty string, not false. NULL comparisons with = always produce NULL (not TRUE or FALSE). Must use IS NULL or IS NOT NULL. NULL in arithmetic = NULL. NULL in aggregate functions: SUM, AVG, COUNT(column) ignore NULLs; COUNT(*) counts all rows. Use COALESCE(col, 0) to replace NULLs with a default.' },

  { id:'sql-f8', experienceLevel:'fresher', type:'output',
    question:'Guess the result',
    code:"SELECT 5 = NULL, NULL = NULL, NULL IS NULL, COALESCE(NULL, 'default');",
    output:'NULL, NULL, TRUE, "default"',
    explanation:'= with NULL always returns NULL. IS NULL correctly identifies NULL. COALESCE returns first non-NULL argument.',
    choices:[
      { label:'NULL, NULL, TRUE, "default"', correct:true },
      { label:'FALSE, TRUE, TRUE, NULL', correct:false },
      { label:'NULL, NULL, NULL, NULL', correct:false },
      { label:'TRUE, TRUE, TRUE, "default"', correct:false }] },

  { id:'sql-f9', experienceLevel:'fresher', type:'conceptual',
    question:'What is a Primary Key and a Foreign Key?',
    answer:'Primary Key: uniquely identifies each row in a table — must be unique and NOT NULL; a table can have only one PK (can be composite). Foreign Key: a column in one table that references the Primary Key in another table — enforces referential integrity, ensuring you cannot have orphaned records pointing to non-existent rows in the parent table.' },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'sql-j1', experienceLevel:'junior', type:'conceptual',
    question:'What is a subquery and what is the difference between a correlated and non-correlated subquery?',
    answer:'Non-correlated subquery: runs once independently; result is used by the outer query. Correlated subquery: references columns from the outer query — runs once for EACH row of the outer query (can be slow).',
    code:"-- Non-correlated (runs once):\nSELECT name FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);\n\n-- Correlated (runs per outer row — slower):\nSELECT name FROM employees e1\nWHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department = e1.department);" },

  { id:'sql-j2', experienceLevel:'junior', type:'conceptual',
    question:'What are window functions and what is the difference between ROW_NUMBER, RANK, and DENSE_RANK?',
    answer:'Window functions compute across a window of rows related to the current row without collapsing them into groups. ROW_NUMBER(): unique sequential number per partition — ties get different numbers. RANK(): same rank for ties; skips numbers after ties (1,1,3). DENSE_RANK(): same rank for ties; no number skipping (1,1,2). Use DENSE_RANK for finding Nth ranking without gaps.' },

  { id:'sql-j3', experienceLevel:'junior', type:'practical',
    question:'Write a query to find the 2nd highest salary per department.',
    code:"SELECT department, name, salary\nFROM (\n  SELECT department, name, salary,\n    DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rnk\n  FROM employees\n) ranked\nWHERE rnk = 2;",
    answer:'DENSE_RANK() partitioned by department orders salaries within each group. Filter rnk=2 gets the 2nd highest.' },

  { id:'sql-j4', experienceLevel:'junior', type:'conceptual',
    question:'What are Common Table Expressions (CTEs) and when do you use them over subqueries?',
    answer:'A CTE (WITH clause) is a named temporary result set. Advantages over subqueries: (1) Readable — complex logic broken into named steps, (2) Reusable within the same query, (3) Recursive CTEs for tree/hierarchy traversal. Use CTEs for multi-step transformations, recursive data, and when the same subquery is referenced multiple times.',
    code:"WITH active_users AS (\n  SELECT * FROM users WHERE status = 'active'\n),\nsales_summary AS (\n  SELECT user_id, SUM(amount) as total FROM orders GROUP BY user_id\n)\nSELECT u.name, s.total\nFROM active_users u\nJOIN sales_summary s ON u.id = s.user_id;" },

  { id:'sql-j5', experienceLevel:'junior', type:'output',
    question:'Guess the output for a table where "IT" has 3 employees and "HR" has 1',
    code:"SELECT department, COUNT(*) cnt\nFROM employees\nGROUP BY department\nHAVING COUNT(*) > 1;",
    output:'Only IT row (cnt=3). HR is excluded because 1 is not > 1.',
    explanation:'HAVING filters groups after aggregation. HR only has 1 employee which fails COUNT(*) > 1.',
    choices:[
      { label:'Only IT (cnt=3)', correct:true },
      { label:'Both IT and HR', correct:false },
      { label:'No rows (HAVING breaks with WHERE missing)', correct:false },
      { label:'Error — cannot use aggregate in HAVING', correct:false }] },

  { id:'sql-j6', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between UNION and UNION ALL?',
    answer:'UNION combines results of two SELECT statements and removes duplicates (adds overhead). UNION ALL keeps all rows including duplicates — faster since no deduplication step. Use UNION ALL when you know there are no duplicates or duplicates are acceptable (e.g., combining logs from different years). Both queries must have the same number of columns and compatible data types.' },

  // ── MID ─────────────────────────────────────────
  { id:'sql-m1', experienceLevel:'mid', type:'conceptual',
    question:'What are ACID properties in database transactions?',
    answer:'Atomicity: all operations in a transaction succeed or all are rolled back. No partial updates. Consistency: the database remains in a valid state before and after the transaction — constraints are never violated. Isolation: concurrent transactions don\'t interfere with each other. Durability: committed transactions survive crashes — data is persisted to disk.' },

  { id:'sql-m2', experienceLevel:'mid', type:'conceptual',
    question:'What are transaction isolation levels and what concurrency issues do they prevent?',
    answer:'READ UNCOMMITTED: may see dirty reads (uncommitted changes from others). READ COMMITTED: prevents dirty reads; may see non-repeatable reads. REPEATABLE READ: prevents dirty + non-repeatable reads; may see phantom reads. SERIALIZABLE: prevents all anomalies — fully serialised, lowest concurrency. Higher isolation = fewer concurrency bugs but more locking and lower throughput.' },

  { id:'sql-m3', experienceLevel:'mid', type:'practical',
    question:'How do you find and remove duplicate rows from a table?',
    code:"-- Identify duplicates:\nSELECT email, COUNT(*) cnt\nFROM users\nGROUP BY email\nHAVING COUNT(*) > 1;\n\n-- Delete duplicates keeping the lowest ID:\nDELETE FROM users\nWHERE id NOT IN (\n  SELECT MIN(id) FROM users GROUP BY email\n);\n\n-- Or using ROW_NUMBER (preferred):\nWITH dupes AS (\n  SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) rn FROM users\n)\nDELETE FROM users WHERE id IN (SELECT id FROM dupes WHERE rn > 1);",
    answer:'ROW_NUMBER approach is cleaner and safer for large tables.' },

  { id:'sql-m4', experienceLevel:'mid', type:'conceptual',
    question:'How do you optimise a slow SQL query? What steps do you take?',
    answer:'Systematic approach: (1) EXPLAIN/EXPLAIN ANALYZE — identify COLLSCAN, nested loop joins on large tables. (2) Add indexes on WHERE, JOIN ON, and ORDER BY columns. (3) Rewrite correlated subqueries as JOINs or CTEs. (4) Avoid SELECT * — retrieve only needed columns. (5) Push filters as early as possible to reduce row count. (6) Consider partitioning for very large tables. (7) Materialise expensive CTE results. (8) Investigate N+1 query patterns in application code.' },
];
