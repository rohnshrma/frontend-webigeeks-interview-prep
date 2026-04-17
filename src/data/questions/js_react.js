// Sources: Toptal, GeeksForGeeks, javascript.info, MDN

export const javascriptQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'js-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between var, let, and const?',
    answer:'var: function-scoped, hoisted and initialized to undefined, can be re-declared. let: block-scoped, hoisted but in Temporal Dead Zone until declaration (cannot read before), can be reassigned. const: block-scoped, must be initialized at declaration, cannot be reassigned (but objects/arrays it holds can be mutated). Modern JS: always use const by default; use let when re-assignment is needed; avoid var.' },

  { id:'js-f2', experienceLevel:'fresher', type:'conceptual',
    question:'What is hoisting in JavaScript?',
    answer:'Hoisting is JavaScript\'s behaviour of moving declarations to the top of their scope before execution. var declarations (not initializations) are hoisted and set to undefined. function declarations are fully hoisted — you can call them before they appear. let and const are hoisted but remain in the Temporal Dead Zone — accessing them before declaration throws a ReferenceError.' },

  { id:'js-f3', experienceLevel:'fresher', type:'output',
    question:'Guess the output',
    code:'console.log(x);\nconsole.log(y);\nvar x = 5;\nlet y = 10;',
    output:'undefined (var hoisted to top)\nReferenceError for y (let is in Temporal Dead Zone)',
    explanation:'var is hoisted and initialized to undefined. let is hoisted but cannot be accessed before its declaration.',
    choices:[
      { label:'undefined, then ReferenceError', correct:true },
      { label:'5, 10', correct:false },
      { label:'undefined, undefined', correct:false },
      { label:'ReferenceError for both', correct:false }] },

  { id:'js-f4', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between == and ===?',
    answer:'== (loose equality) performs type coercion — converts both operands to a common type before comparing. "5" == 5 is true; null == undefined is true. === (strict equality) compares both value AND type without conversion. "5" === 5 is false. Always prefer === in production code to avoid unexpected coercion bugs. == is a source of many JavaScript gotchas.' },

  { id:'js-f5', experienceLevel:'fresher', type:'output',
    question:'Guess the output',
    code:'console.log(null == undefined);\nconsole.log(null === undefined);\nconsole.log(0 == false);\nconsole.log(0 === false);',
    output:'true, false, true, false',
    explanation:'null==undefined is the one special coercion case that is true. 0 and false coerce to same via ==. === requires same type.',
    choices:[
      { label:'true, false, true, false', correct:true },
      { label:'false, false, false, false', correct:false },
      { label:'true, true, true, true', correct:false },
      { label:'true, false, false, false', correct:false }] },

  { id:'js-f6', experienceLevel:'fresher', type:'conceptual',
    question:'What is typeof and what are its quirks?',
    answer:'typeof returns a string indicating the type of a value: "string", "number", "boolean", "undefined", "object", "function", "symbol", "bigint". Quirks: typeof null === "object" (a historical bug); typeof function(){} === "function" (functions are objects but get their own type string); typeof [] === "object" (use Array.isArray() to check for arrays; typeof undeclaredVar === "undefined" (no error thrown).' },

  { id:'js-f7', experienceLevel:'fresher', type:'conceptual',
    question:'How do you remove duplicates from an array in JavaScript?',
    answer:'The cleanest modern approach uses Set (which only stores unique values):',
    code:'const arr = [1, 2, 2, 3, 3, 4];\n\n// Method 1: Set spread (ES6)\nconst unique = [...new Set(arr)]; // [1, 2, 3, 4]\n\n// Method 2: filter + indexOf\nconst unique2 = arr.filter((v, i) => arr.indexOf(v) === i);\n\n// For arrays of objects by key:\nconst dedup = arr.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);' },

  { id:'js-f8', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between null and undefined?',
    answer:'undefined means a variable has been declared but not assigned a value — it\'s the default. JavaScript assigns undefined automatically. null is an intentional empty value — a developer explicitly sets it to signal "no value here". typeof undefined === "undefined"; typeof null === "object". In equality: null == undefined (true), null === undefined (false).' },

  { id:'js-f9', experienceLevel:'fresher', type:'practical',
    question:'How do you flatten a nested array?',
    answer:'Use Array.flat() with a depth, or Infinity for unlimited depth.',
    code:'const nested = [1, [2, 3], [4, [5, 6]]];\n\nnested.flat();      // [1, 2, 3, 4, [5, 6]]\nnested.flat(2);     // [1, 2, 3, 4, 5, 6]\nnested.flat(Infinity); // fully flat regardless of depth\n\n// Legacy:\nconst flat = nested.reduce((acc, v) => acc.concat(v), []);' },

  { id:'js-f10', experienceLevel:'fresher', type:'output',
    question:'Guess the output',
    code:'const arr = [1, 2, 3];\narr.push(4);\nconst arr2 = arr;\narr2.push(5);\nconsole.log(arr.length);',
    output:'5',
    explanation:'Arrays are reference types. arr2 = arr copies the reference, not the array. Both variables point to the same array object.',
    choices:[
      { label:'5', correct:true },
      { label:'4', correct:false },
      { label:'3', correct:false },
      { label:'Error — cannot reassign const', correct:false }] },

  { id:'js-f11', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between slice() and splice()?',
    answer:'slice(start, end) returns a new array copy from start to end (exclusive) — original is NOT modified. splice(start, deleteCount, ...items) modifies the original array in place — removes deleteCount elements from start and optionally inserts items — returns removed elements. Memory trick: splicE = Edit original.' },

  { id:'js-f12', experienceLevel:'fresher', type:'conceptual',
    question:'What are arrow functions and how do they differ from regular functions?',
    answer:'Arrow functions (=>) have shorter syntax and do NOT have their own this, arguments, super, or new.target. They inherit this from the enclosing lexical scope (very useful in callbacks and class methods). They cannot be used as constructors (no new). They cannot be used as object methods if you need this to refer to the object.' },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'js-j1', experienceLevel:'junior', type:'conceptual',
    question:'What is a closure in JavaScript and name a practical use case.',
    answer:'A closure is a function that retains access to its outer (enclosing) scope\'s variables even after the outer function has returned. Practical uses: (1) Data privacy/encapsulation (module pattern), (2) Function factories/partial application, (3) Memoization — cache previous results, (4) Event handlers that need access to outer-scope configuration.',
    code:'function makeCounter(start = 0) {\n  let count = start;\n  return {\n    increment: () => ++count,\n    decrement: () => --count,\n    value: () => count,\n  };\n}\nconst counter = makeCounter(10);\ncounter.increment(); // 11\ncounter.value();     // 11' },

  { id:'js-j2', experienceLevel:'junior', type:'conceptual',
    question:'What is the JavaScript event loop? Explain the difference between the call stack, microtask queue, and macrotask queue.',
    answer:'JS is single-threaded with an event loop. The call stack executes synchronous code. Microtasks (Promise.then, queueMicrotask, MutationObserver) are processed completely after each task before the next macrotask. Macrotasks (setTimeout, setInterval, I/O, UI events) are processed one per event loop iteration. Order: synchronous code → all microtasks → one macrotask → repeat.' },

  { id:'js-j3', experienceLevel:'junior', type:'output',
    question:'Guess the exact console output order',
    code:"setTimeout(() => console.log('A'), 0);\nPromise.resolve().then(() => console.log('B'));\nconsole.log('C');\nqueueMicrotask(() => console.log('D'));",
    output:'C, B, D, A',
    explanation:'Sync runs first (C). Then all microtasks in order (B from Promise, D from queueMicrotask). Then macrotask (A from setTimeout).',
    choices:[
      { label:'C, B, D, A', correct:true },
      { label:'C, A, B, D', correct:false },
      { label:'A, B, C, D', correct:false },
      { label:'C, D, B, A', correct:false }] },

  { id:'js-j4', experienceLevel:'junior', type:'conceptual',
    question:'What are call(), apply(), and bind()? How are they different?',
    answer:'All three set the this context for a function. call(thisArg, arg1, arg2) — invokes immediately with arguments listed individually. apply(thisArg, [argsArray]) — invokes immediately with arguments as array. bind(thisArg, arg1...) — returns a new function with this permanently bound (does not invoke). Memory trick: Call=Comma, Apply=Array, Bind=Bound-later.' },

  { id:'js-j5', experienceLevel:'junior', type:'practical',
    question:'Implement a debounce function from scratch.',
    answer:'Debounce delays execution until a pause in events. Used for search inputs, window resize handlers.',
    code:'function debounce(fn, wait) {\n  let timerId;\n  return function (...args) {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => {\n      fn.apply(this, args);\n    }, wait);\n  };\n}\n\nconst onSearch = debounce((query) => {\n  fetchResults(query);\n}, 300);' },

  { id:'js-j6', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between Promise.all(), Promise.allSettled(), Promise.race(), and Promise.any()?',
    answer:'Promise.all(arr): resolves when ALL resolve; rejects immediately on first rejection (fail-fast). Promise.allSettled(arr): waits for ALL to complete regardless of success/failure; returns status+value/reason for each — best for independent operations. Promise.race(arr): resolves/rejects as soon as the FIRST settles. Promise.any(arr): resolves as soon as FIRST fulfills; rejects only if ALL reject (AggregateError).' },

  { id:'js-j7', experienceLevel:'junior', type:'practical',
    question:'How do you deep clone an object in JavaScript?',
    answer:'Modern approach: structuredClone(). Classic fallback: JSON.parse(JSON.stringify()) but it drops functions, undefined, Date objects. Libraries like Lodash cloneDeep handle all edge cases.',
    code:'const original = { a: 1, b: { c: 2 }, date: new Date() };\n\n// Best: structuredClone (modern browsers & Node 17+)\nconst clone = structuredClone(original);\n\n// Works for plain data only (loses Dates, functions):\nconst clone2 = JSON.parse(JSON.stringify(original));\n\n// Shallow copy:\nconst shallow = { ...original };' },

  { id:'js-j8', experienceLevel:'junior', type:'output',
    question:'Guess the output of this mutable default argument',
    code:'function addToList(item, list = []) {\n  list.push(item);\n  return list;\n}\nconsole.log(addToList("a"));\nconsole.log(addToList("b"));',
    output:'["a"], ["b"] — each call creates a new default array, unlike Python',
    explanation:'In JavaScript, default parameter values are evaluated at call time — a fresh [] is created for each call. This differs from Python where mutable defaults are shared.',
    choices:[
      { label:'["a"] then ["b"] (new array each call)', correct:true },
      { label:'["a"] then ["a","b"] (shared array)', correct:false },
      { label:'[] then [] (default never used)', correct:false },
      { label:'Error', correct:false }] },

  { id:'js-j9', experienceLevel:'junior', type:'conceptual',
    question:'What is prototypal inheritance in JavaScript?',
    answer:'Every JavaScript object has a hidden [[Prototype]] link to another object. When you access a property, JS walks up the prototype chain until it finds it or reaches null. Object.create(proto) creates an object with proto as its prototype. Classes in ES6 are syntax sugar over this — class Foo extends Bar sets up the prototype chain. Methods on MyClass.prototype are shared among all instances without duplication.' },

  { id:'js-j10', experienceLevel:'junior', type:'practical',
    question:'How do you implement throttle from scratch?',
    answer:'Throttle limits how often a function runs — useful for scroll/mousemove handlers.',
    code:'function throttle(fn, limit) {\n  let lastRun = 0;\n  return function (...args) {\n    const now = Date.now();\n    if (now - lastRun >= limit) {\n      lastRun = now;\n      fn.apply(this, args);\n    }\n  };\n}\n\nconst onScroll = throttle(() => updateProgress(), 100);\nwindow.addEventListener("scroll", onScroll);' },

  { id:'js-j11', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between for...in and for...of?',
    answer:'for...in iterates over enumerable property KEYS of an object (including inherited ones) — good for plain objects. for...of iterates over ITERABLE values (arrays, strings, Maps, Sets, generators) — does not work on plain objects. for...in on arrays can include unexpected prototype properties — use for...of or forEach on arrays.' },

  // ── MID ─────────────────────────────────────────
  { id:'js-m1', experienceLevel:'mid', type:'conceptual',
    question:'Explain the JavaScript module system — CommonJS vs ES Modules.',
    answer:'CommonJS (require/module.exports): synchronous, used by Node.js by default, evaluated at runtime, can conditionally require, files share the same module object on re-require. ES Modules (import/export): static analysis at parse time (enables tree-shaking), async load, live bindings (not copies), cannot conditionally import without dynamic import(). In Node.js use .mjs or "type":"module" in package.json for ESM.' },

  { id:'js-m2', experienceLevel:'mid', type:'practical',
    question:'Implement a simple Pub/Sub (Event Emitter) pattern.',
    code:'class EventEmitter {\n  #listeners = new Map();\n\n  on(event, cb) {\n    if (!this.#listeners.has(event)) this.#listeners.set(event, []);\n    this.#listeners.get(event).push(cb);\n    return () => this.off(event, cb); // unsubscribe fn\n  }\n\n  off(event, cb) {\n    const cbs = this.#listeners.get(event) ?? [];\n    this.#listeners.set(event, cbs.filter(c => c !== cb));\n  }\n\n  emit(event, ...args) {\n    (this.#listeners.get(event) ?? []).forEach(cb => cb(...args));\n  }\n}',
    answer:'A Pub/Sub decouples producers from consumers — useful for cross-module communication without tight coupling.' },

  { id:'js-m3', experienceLevel:'mid', type:'conceptual',
    question:'What are WeakMap and WeakSet and what problems do they solve?',
    answer:'WeakMap allows object keys to be garbage-collected when there are no other references — unlike Map which prevents GC. WeakSet holds objects weakly. Use cases: associating private metadata with DOM elements or objects without preventing GC (avoiding memory leaks), implementing private class fields (old pattern before #). Neither is iterable — you cannot enumerate their contents.' },

  { id:'js-m4', experienceLevel:'mid', type:'output',
    question:'Guess the output — Proxy',
    code:'const handler = {\n  get: (target, key) => key in target ? target[key] : `Property "${key}" not found`\n};\nconst obj = new Proxy({ name: "Rohan" }, handler);\nconsole.log(obj.name);\nconsole.log(obj.age);',
    output:'"Rohan"\n"Property \\"age\\" not found"',
    explanation:'Proxy intercepts property access. The get trap returns the custom string for unknown keys instead of undefined.',
    choices:[
      { label:'"Rohan" then "Property \\"age\\" not found"', correct:true },
      { label:'"Rohan" then undefined', correct:false },
      { label:'Error — Proxy requires all traps', correct:false },
      { label:'Both return undefined', correct:false }] },

  { id:'js-m5', experienceLevel:'mid', type:'conceptual',
    question:'What are generators in JavaScript and when would you use them?',
    answer:'Generator functions (function*) can yield multiple values lazily — pausing execution and resuming when .next() is called. Use cases: (1) Infinite sequences without memory overflow, (2) Lazy data pipelines, (3) Implementing custom iterables, (4) Redux-Saga uses generators for side effect management.',
    code:'function* fibonacci() {\n  let [a, b] = [0, 1];\n  while (true) {\n    yield a;\n    [a, b] = [b, a + b];\n  }\n}\nconst fib = fibonacci();\nconsole.log(fib.next().value); // 0\nconsole.log(fib.next().value); // 1\nconsole.log(fib.next().value); // 1' },

  { id:'js-m6', experienceLevel:'mid', type:'conceptual',
    question:'What causes memory leaks in JavaScript and how do you detect them?',
    answer:'Common causes: (1) Forgotten event listeners that hold references, (2) Closures capturing large objects unnecessarily, (3) Global variables storing DOM references, (4) Setinterval callbacks not cleared, (5) DOM detached from tree but still referenced in JS (detached node leak). Detection: Chrome DevTools Memory tab → heap snapshots, compare two snapshots to find retained objects.' },

  { id:'js-m7', experienceLevel:'mid', type:'practical',
    question:'How do you implement a memoize function that works with any number of arguments?',
    code:'function memoize(fn) {\n  const cache = new Map();\n  return function (...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) {\n      return cache.get(key);\n    }\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\nconst expensiveCalc = memoize((a, b) => {\n  console.log("computing...");\n  return a * b + a / b;\n});',
    answer:'JSON.stringify as cache key works for primitive args. For complex objects, use a trie-based key or WeakMap for object identity.' },
];

export const reactQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'react-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is the Virtual DOM and how does React use it?',
    answer:'The Virtual DOM is a lightweight in-memory representation of the real DOM. When state changes, React re-renders the virtual DOM, diffs the new tree against the previous (reconciliation algorithm), and applies only the minimum set of real DOM mutations (patching). This is faster than re-rendering the entire DOM because real DOM operations are expensive, while in-memory JS object operations are cheap.' },

  { id:'react-f2', experienceLevel:'fresher', type:'conceptual',
    question:'What is JSX and how does it differ from HTML?',
    answer:'JSX is a syntax extension for JavaScript that looks like HTML but compiles to React.createElement() calls. Key differences from HTML: (1) className instead of class, (2) htmlFor instead of for, (3) camelCase event handlers (onClick, onChange), (4) Self-closing tags required (<br />, <input />), (5) JavaScript expressions inside {}, (6) style is an object not a string.' },

  { id:'react-f3', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between props and state?',
    answer:'Props are read-only data passed FROM parent TO child — the child cannot modify them. State is mutable data OWNED by the component — when it changes via setState or useState setter, the component re-renders. Props are like function arguments; state is like private component memory. Lifting state up is the pattern for sharing state between siblings.' },

  { id:'react-f4', experienceLevel:'fresher', type:'output',
    question:'Guess when this useEffect fires',
    code:'useEffect(() => {\n  console.log("effect ran");\n}, [count]);',
    output:'On initial mount AND every time the count variable changes',
    explanation:'An array with values = run on mount + run whenever those values change.',
    choices:[
      { label:'On mount and when count changes', correct:true },
      { label:'Only when count changes (not on mount)', correct:false },
      { label:'Only once on mount', correct:false },
      { label:'After every single render', correct:false }] },

  { id:'react-f5', experienceLevel:'fresher', type:'practical',
    question:'How do you correctly update state that depends on the previous value?',
    answer:'Use the updater form of setState to avoid stale closure bugs. This is essential inside async code or when multiple updates happen in one event.',
    code:'const [count, setCount] = useState(0);\n\n// ✅ CORRECT — functional update\nsetCount((prev) => prev + 1);\n\n// ❌ RISKY — may capture stale `count` in async context\nsetCount(count + 1);\n\n// Real problem example:\nfunction handleThreeClicks() {\n  // All 3 use same stale `count` without functional form!\n  setCount(count + 1); // all evaluate to 0+1\n  setCount(count + 1);\n  setCount(count + 1);\n  // Result: count becomes 1, not 3\n}' },

  { id:'react-f6', experienceLevel:'fresher', type:'conceptual',
    question:'Why do React list items need unique key props?',
    answer:'React uses keys to identify which items in a list have changed, been added, or removed during reconciliation. Without keys, React re-renders all list items on any change. With stable unique keys (not array index for reorderable lists), React only updates the changed item. Using array index as key causes bugs when items are added to the start or reordered — it confuses React about item identity.' },

  { id:'react-f7', experienceLevel:'fresher', type:'output',
    question:'Guess how many times the component re-renders when the button is clicked once',
    code:'function Counter() {\n  const [count, setCount] = useState(0);\n  console.log("render");\n  return <button onClick={() => {\n    setCount(c => c + 1);\n    setCount(c => c + 1);\n  }}>Click</button>;\n}',
    output:'Once — React 18 batches all setState calls in an event handler into a single re-render',
    explanation:'React 18 introduced automatic batching for all updates in event handlers, timeouts, and promises.',
    choices:[
      { label:'Once (React batches both setStates)', correct:true },
      { label:'Twice — one per setState', correct:false },
      { label:'Zero — nothing changed visually', correct:false },
      { label:'Three (one initial + two updates)', correct:false }] },

  { id:'react-f8', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between a controlled and an uncontrolled component?',
    answer:'Controlled component: React state is the single source of truth for the input value. You provide value and onChange props — the input is always in sync with state. Uncontrolled component: the DOM manages the input value natively; you read it with a ref (useRef). Use controlled for forms with validation and real-time feedback; uncontrolled for simple, integration-heavy forms or when migrating from jQuery.' },

  { id:'react-f9', experienceLevel:'fresher', type:'practical',
    question:'How do you conditionally render a component in React?',
    answer:'Four common approaches:',
    code:'// 1. Ternary\n{isLoggedIn ? <Dashboard /> : <Login />}\n\n// 2. Short-circuit &&\n{hasError && <ErrorBanner message={error} />}\n\n// 3. null to render nothing\nif (!show) return null;\n\n// 4. IIFE for complex logic\n{(() => {\n  if (a) return <A />;\n  if (b) return <B />;\n  return <Default />;\n})()}' },

  { id:'react-f10', experienceLevel:'fresher', type:'conceptual',
    question:'What does the useEffect cleanup function do and when is it called?',
    answer:'The function returned from useEffect is the cleanup function. It runs: (1) Before the next effect runs (when dependencies change), (2) When the component unmounts. Use it to: clear timers, cancel fetch requests (AbortController), remove event listeners, disconnect WebSocket subscriptions, cancel animations — anything that could cause memory leaks or state updates on unmounted components.' },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'react-j1', experienceLevel:'junior', type:'conceptual',
    question:'What is prop drilling and how does Context API solve it?',
    answer:'Prop drilling is passing data through multiple intermediate components that don\'t use the data — just to get it to a deeply nested child. Context API creates a provider at a high level and allows any descendant to consume the value directly with useContext() — skipping all the intermediate components. Drawback: all consumers re-render when context value changes, which can hurt performance.' },

  { id:'react-j2', experienceLevel:'junior', type:'practical',
    question:'How do you write a custom hook to fetch data from an API?',
    answer:'Extract the fetch logic into a hook returning data, loading, and error states.',
    code:'function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    const controller = new AbortController();\n    async function load() {\n      try {\n        const res = await fetch(url, { signal: controller.signal });\n        if (!res.ok) throw new Error(res.statusText);\n        setData(await res.json());\n      } catch (err) {\n        if (err.name !== "AbortError") setError(err.message);\n      } finally {\n        setLoading(false);\n      }\n    }\n    load();\n    return () => controller.abort();\n  }, [url]);\n\n  return { data, loading, error };\n}' },

  { id:'react-j3', experienceLevel:'junior', type:'conceptual',
    question:'When should you use useCallback and useMemo? What is the difference?',
    answer:'useMemo memoizes a computed VALUE — re-computes only when dependencies change. useCallback memoizes a FUNCTION reference — returns the same function instance unless dependencies change. Use them to: (1) Prevent children wrapped in React.memo from re-rendering due to new function/object references, (2) Avoid expensive recalculations. Warning: both have overhead — don\'t use them by default, only when profiling shows an issue.' },

  { id:'react-j4', experienceLevel:'junior', type:'output',
    question:'Guess the value of count after all setStates run',
    code:'const [count, setCount] = useState(0);\n\nfunction handleClick() {\n  setCount(count + 1); // 0+1\n  setCount(count + 1); // 0+1 again — same stale count!\n  setCount(count + 1); // 0+1 again\n}',
    output:'1 — all three calls use the same stale count (0), each sets it to 1',
    explanation:'Without the functional updater form, all setState calls in one handler read the same captured count=0.',
    choices:[
      { label:'1 (all use stale count=0)', correct:true },
      { label:'3 (each increments)', correct:false },
      { label:'0 (last wins)', correct:false },
      { label:'2', correct:false }] },

  { id:'react-j5', experienceLevel:'junior', type:'conceptual',
    question:'What is React.memo and when does it help?',
    answer:'React.memo is a higher-order component that wraps a functional component and memoizes the rendered output. If the parent re-renders but the child receives same props (shallow comparison), React skips re-rendering the child. It helps when: (1) component is expensive to render, (2) it renders often with the same props. It does NOT help if props include new object/function references on each render — use useMemo/useCallback on those too.' },

  { id:'react-j6', experienceLevel:'junior', type:'practical',
    question:'How do you implement a simple global state manager using useReducer and Context?',
    answer:'Combine useReducer (for complex state logic) with Context (for global access).',
    code:'const Store = createContext(null);\n\nfunction reducer(state, action) {\n  switch (action.type) {\n    case "SET_USER": return { ...state, user: action.payload };\n    case "LOGOUT":   return { ...state, user: null };\n    default: return state;\n  }\n}\n\nexport function StoreProvider({ children }) {\n  const [state, dispatch] = useReducer(reducer, { user: null });\n  return <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>;\n}\n\nexport const useStore = () => useContext(Store);' },

  { id:'react-j7', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between useEffect and useLayoutEffect?',
    answer:'useEffect fires AFTER the browser has painted — asynchronous with respect to painting. Safe for data fetching, subscriptions, logging. useLayoutEffect fires AFTER DOM mutations but BEFORE the browser paints — synchronous. Use it for DOM measurements (getBoundingClientRect), preventing visual flicker, or synchronously mutating the DOM (tooltip positioning). Overuse of useLayoutEffect can block painting and hurt performance.' },

  { id:'react-j8', experienceLevel:'junior', type:'conceptual',
    question:'How does React reconciliation work with lists?',
    answer:'When React diffs a list, it compares old and new elements by key. If two elements have the same key, React updates the existing DOM node. Without keys, React diffs by position — inserting at the start causes every item to appear "changed". With stable unique keys, React correctly identifies insertions, deletions, and moves, minimising DOM mutations.' },

  // ── MID ─────────────────────────────────────────
  { id:'react-m1', experienceLevel:'mid', type:'conceptual',
    question:'What is concurrent rendering in React 18 and what are its main features?',
    answer:'Concurrent rendering lets React pause, interrupt, and resume rendering — it\'s no longer a synchronous all-or-nothing block. Key features: (1) Automatic batching — all setState calls batched in any context, (2) Transitions — useTransition marks non-urgent updates so urgent ones (typing) aren\'t blocked, (3) Suspense improvements for data fetching, (4) useDeferredValue for deferring expensive UI updates, (5) New root API: createRoot.' },

  { id:'react-m2', experienceLevel:'mid', type:'practical',
    question:'How do you implement code splitting and lazy loading in React?',
    answer:'Use React.lazy with Suspense for component-level splitting. The component only loads when it\'s about to render.',
    code:'import React, { Suspense, lazy } from "react";\n\nconst AdminPage = lazy(() => import("./pages/AdminPage"));\nconst Dashboard = lazy(() => import("./pages/Dashboard"));\n\nfunction App() {\n  return (\n    <Suspense fallback={<div>Loading...</div>}>\n      <Routes>\n        <Route path="/admin" element={<AdminPage />} />\n        <Route path="/dashboard" element={<Dashboard />} />\n      </Routes>\n    </Suspense>\n  );\n}' },

  { id:'react-m3', experienceLevel:'mid', type:'conceptual',
    question:'What are React Server Components and how do they differ from Client Components?',
    answer:'Server Components (RSC) run only on the server — they can access databases/APIs directly, never ship their JS to the client, and reduce bundle size. They cannot use state, effects, or browser APIs. Client Components (use client directive) run on both server (SSR) and client — they have interactivity, state, effects. The composition model: RSCs pass data to client components as props. This is the foundation of Next.js App Router.' },

  { id:'react-m4', experienceLevel:'mid', type:'conceptual',
    question:'What is the Fiber reconciler and how does it improve on the Stack reconciler?',
    answer:'React Fiber (React 16+) replaced the recursive Stack reconciler with a linked-list based work unit system. Each element is a "fiber" (work unit) that can be paused, prioritised, aborted, and resumed. This enables: (1) Time-slicing — splitting rendering across multiple frames, (2) Priority lanes — urgent updates (input) interrupt lower-priority renders, (3) Suspense and concurrent mode. The Stack reconciler was synchronous and couldn\'t be interrupted.' },

  { id:'react-m5', experienceLevel:'mid', type:'output',
    question:'Guess whether this memo wrapping prevents re-renders',
    code:"const Child = React.memo(({ onClick }) => {\n  console.log('child render');\n  return <button onClick={onClick}>Click</button>;\n});\n\nfunction Parent() {\n  const [count, setCount] = useState(0);\n  const handleClick = () => setCount(c => c + 1); // new ref each render\n  return <Child onClick={handleClick} />;\n}",
    output:'Does NOT prevent re-renders — onClick is a new function reference on every Parent render, so React.memo\'s shallow comparison fails',
    explanation:'Wrap handleClick with useCallback(() => setCount(c=>c+1), []) to fix this.',
    choices:[
      { label:'Still re-renders — new function ref each time', correct:true },
      { label:'Prevents re-renders — React.memo works', correct:false },
      { label:'Error — React.memo cannot wrap function-click children', correct:false },
      { label:'Re-renders only if count is even', correct:false }] },

  { id:'react-m6', experienceLevel:'mid', type:'conceptual',
    question:'How do you implement a performant virtualized list in React?',
    answer:'Virtualisation renders only DOM nodes visible in the viewport instead of the full list — essential for lists of 1000+ items. Libraries: react-window (lightweight), react-virtual (headless, modern), @tanstack/virtual. Strategy: measure container height and each item height, calculate which items are in view, translate visible items to correct positions. The DOM node count stays constant (~20-50) regardless of list length.' },
];
