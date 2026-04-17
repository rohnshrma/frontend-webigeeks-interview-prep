// Sources: GeeksForGeeks, Toptal, Node.js docs, Express.js docs, MongoDB docs

export const nodejsQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'node-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is Node.js and why is it popular for backend development?',
    answer:'Node.js is a runtime environment that executes JavaScript outside the browser, built on Chrome\'s V8 engine. It uses an event-driven, non-blocking I/O model — one thread handles many concurrent connections by delegating I/O to the OS and registering callbacks. It\'s popular for: API servers, real-time apps (chat, gaming), microservices, and developer tooling (webpack, vite).' },

  { id:'node-f2', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between synchronous and asynchronous code in Node.js?',
    answer:'Synchronous code blocks the event loop — no other code can execute until it finishes. Asynchronous code (callbacks, Promises, async/await) delegates work to the OS or a thread pool and registers a callback — the event loop remains free to handle other requests. In Node.js, blocking the event loop with CPU-heavy sync code is a critical performance mistake because it stalls ALL concurrent requests.' },

  { id:'node-f3', experienceLevel:'fresher', type:'practical',
    question:'How do you read a file asynchronously in Node.js?',
    answer:'Use the promises API from fs/promises with async/await for clean error handling.',
    code:"import { readFile, writeFile } from 'fs/promises';\n\ntry {\n  const data = await readFile('./data.json', 'utf8');\n  const parsed = JSON.parse(data);\n  console.log(parsed);\n} catch (err) {\n  console.error('File read failed:', err.message);\n}" },

  { id:'node-f4', experienceLevel:'fresher', type:'conceptual',
    question:'What is the purpose of package.json?',
    answer:'package.json is the manifest file for a Node.js project. It contains: project name/version/description, dependencies (installed in node_modules and required at runtime), devDependencies (only needed for development/build), scripts (shortcuts for common commands like npm start, npm test), main entry point, and module type (commonjs vs module). It is used by npm/yarn/pnpm to install and manage packages.' },

  { id:'node-f5', experienceLevel:'fresher', type:'output',
    question:'Guess the console output order',
    code:"console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');",
    output:'1, 4, 3, 2',
    explanation:'Sync runs first (1, 4). Microtask queue (Promise) processes before macrotask queue (setTimeout). 3 before 2.',
    choices:[
      { label:'1, 4, 3, 2', correct:true },
      { label:'1, 2, 3, 4', correct:false },
      { label:'1, 4, 2, 3', correct:false },
      { label:'1, 3, 4, 2', correct:false }] },

  { id:'node-f6', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between require() and import in Node.js?',
    answer:'require() is CommonJS — synchronous, dynamic (can be in if/try blocks), gives a copy of the exported object. import is ES Module — static (analysed at parse time for tree-shaking), asynchronous by default, gives live bindings. In modern Node.js projects: use ES modules with "type":"module" in package.json and .js or .mjs extension. Cannot mix without careful configuration.' },

  { id:'node-f7', experienceLevel:'fresher', type:'practical',
    question:'How do you use environment variables in Node.js?',
    answer:'Store sensitive config in a .env file (never commit), load with dotenv.',
    code:"// .env file:\nJWT_SECRET=supersecret123\nPORT=4000\nMONGO_URI=mongodb://localhost/mydb\n\n// server.js:\nimport 'dotenv/config'; // must be first\n\nconst port = process.env.PORT ?? 3000;\nconst secret = process.env.JWT_SECRET;\n\n// Validate critical env vars on startup:\nif (!secret) throw new Error('JWT_SECRET is required');" },

  { id:'node-f8', experienceLevel:'fresher', type:'conceptual',
    question:'What are Node.js built-in core modules? Give 5 examples.',
    answer:'Node.js ships with built-in modules that need no installation: (1) fs — file system read/write, (2) http/https — create HTTP servers, (3) path — cross-platform file paths, (4) os — operating system info, (5) events — EventEmitter class, (6) crypto — hashing and encryption, (7) stream — streaming data processing, (8) url — URL parsing. Import with import { ... } from "fs".' },

  { id:'node-f9', experienceLevel:'fresher', type:'output',
    question:'Guess the output',
    code:"import { EventEmitter } from 'events';\nconst emitter = new EventEmitter();\nemitter.on('greet', (name) => console.log(`Hello ${name}!`));\nemitter.emit('greet', 'World');\nconsole.log('done');",
    output:'Hello World!\ndone',
    explanation:'emit() is synchronous — listeners are called immediately before moving to the next line.',
    choices:[
      { label:'"Hello World!" then "done"', correct:true },
      { label:'"done" then "Hello World!" (async)', correct:false },
      { label:'Only "done" — emit is non-blocking', correct:false },
      { label:'Error — EventEmitter needs a callback', correct:false }] },

  { id:'node-f10', experienceLevel:'fresher', type:'conceptual',
    question:'What is npm and what is the difference between npm install and npm ci?',
    answer:'npm is the Node Package Manager. npm install reads package.json, resolves the latest compatible versions, and may update package-lock.json. npm ci (clean install) reads package-lock.json exactly — installs exactly the versions specified, fails if lock file and package.json are out of sync, uses a clean node_modules. npm ci is the correct command for CI/CD pipelines because it guarantees reproducible installs.' },

  { id:'node-f11', experienceLevel:'fresher', type:'conceptual',
    question:'What is the global object in Node.js vs the browser?',
    answer:'In browsers, the global object is window. In Node.js, it is global. However, in ES modules (type:module), there is no global by default — use globalThis which works in both environments. Node.js also provides process (env, argv, exit, cwd), __dirname, __filename (CommonJS only), Buffer, and setTimeout/setInterval as global utilities.' },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'node-j1', experienceLevel:'junior', type:'conceptual',
    question:'Explain the Node.js event loop phases in order.',
    answer:'The event loop has 6 phases: (1) timers — executes expired setTimeout/setInterval callbacks. (2) pending callbacks — I/O errors from previous iteration. (3) idle, prepare — internal. (4) poll — retrieves new I/O events; blocks if queue is empty waiting for I/O. (5) check — setImmediate() callbacks execute here. (6) close callbacks — socket.on("close") etc. Between each phase, the microtask queue (Promises, process.nextTick) drains completely.' },

  { id:'node-j2', experienceLevel:'junior', type:'output',
    question:'Guess the output order',
    code:"setImmediate(() => console.log('setImmediate'));\nsetTimeout(() => console.log('setTimeout'), 0);\nprocess.nextTick(() => console.log('nextTick'));\nPromise.resolve().then(() => console.log('promise'));",
    output:'nextTick, promise, setTimeout, setImmediate (or setTimeout/setImmediate may swap)',
    explanation:'nextTick fires before any I/O or timer phases. Promise microtask fires after nextTick. Timer vs setImmediate order can vary but when not in I/O, timeout usually fires before setImmediate.',
    choices:[
      { label:'nextTick, promise, then timeout/setImmediate (order may vary)', correct:true },
      { label:'setTimeout first, then all others', correct:false },
      { label:'All fire simultaneously', correct:false },
      { label:'setImmediate always before setTimeout', correct:false }] },

  { id:'node-j3', experienceLevel:'junior', type:'conceptual',
    question:'What are Node.js streams and what are the four types?',
    answer:'Streams process data in chunks rather than loading everything into memory. Types: (1) Readable — data source (fs.createReadStream, HTTP request), (2) Writable — data destination (fs.createWriteStream, HTTP response), (3) Duplex — both readable and writable (TCP socket), (4) Transform — duplex that transforms data (zlib.createGzip). Use .pipe() to chain streams. Critical for large files — prevents memory overflow.' },

  { id:'node-j4', experienceLevel:'junior', type:'practical',
    question:'How do you efficiently stream a large file in an HTTP response?',
    answer:'Pipe a readable stream to the response — data flows in chunks, never loading the full file into memory.',
    code:"import http from 'http';\nimport { createReadStream } from 'fs';\nimport { stat } from 'fs/promises';\n\nhttp.createServer(async (req, res) => {\n  const filePath = './large-file.csv';\n  const { size } = await stat(filePath);\n  res.writeHead(200, {\n    'Content-Type': 'text/csv',\n    'Content-Length': size,\n  });\n  createReadStream(filePath).pipe(res);\n}).listen(3000);" },

  { id:'node-j5', experienceLevel:'junior', type:'conceptual',
    question:'What is CORS and how do you enable it in a Node.js/Express API?',
    answer:'CORS (Cross-Origin Resource Sharing) is a browser security policy that blocks requests from a different origin (scheme+domain+port) unless the server explicitly allows it via HTTP headers. In Express, use the cors middleware package — it adds the appropriate Access-Control-Allow-Origin headers. Always configure specific allowed origins in production; never use origin:* for APIs that handle authentication.',
    code:"import cors from 'cors';\n\n// Allow specific origin:\napp.use(cors({ origin: 'https://myapp.com', credentials: true }));\n\n// Allow multiple origins:\napp.use(cors({\n  origin: (origin, cb) => {\n    const allowed = ['https://myapp.com', 'https://admin.myapp.com'];\n    cb(null, allowed.includes(origin));\n  }\n}));" },

  { id:'node-j6', experienceLevel:'junior', type:'practical',
    question:'How do you handle unhandled promise rejections and uncaught exceptions in Node.js?',
    answer:'Register global handlers — critical for production to prevent crashes and ensure proper logging.',
    code:"process.on('unhandledRejection', (reason, promise) => {\n  console.error('Unhandled Rejection:', reason);\n  // Graceful shutdown:\n  server.close(() => process.exit(1));\n});\n\nprocess.on('uncaughtException', (err) => {\n  console.error('Uncaught Exception:', err);\n  server.close(() => process.exit(1));\n});\n\n// Or use a process manager like PM2 with --max-restarts" },

  { id:'node-j7', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between process.nextTick() and setImmediate()?',
    answer:'process.nextTick() fires BEFORE the next event loop iteration even begins — after the current operation completes but before any I/O or timers. setImmediate() fires in the CHECK phase — after I/O events in the current iteration. nextTick is higher priority and can starve the event loop if called recursively. setImmediate is safer for deferring work that should not block I/O.' },

  { id:'node-j8', experienceLevel:'junior', type:'practical',
    question:'How do you implement a Node.js HTTP server with graceful shutdown?',
    answer:'A graceful shutdown stops accepting new requests and waits for in-flight requests to complete.',
    code:"const server = app.listen(4000);\n\nconst shutdown = (signal) => {\n  console.log(`${signal} received. Shutting down gracefully...`);\n  server.close(() => {\n    console.log('HTTP server closed');\n    // close DB connection:\n    mongoose.connection.close(false, () => process.exit(0));\n  });\n  // Force exit after 10s:\n  setTimeout(() => process.exit(1), 10_000);\n};\n\nprocess.on('SIGTERM', () => shutdown('SIGTERM'));\nprocess.on('SIGINT',  () => shutdown('SIGINT'));" },

  // ── MID ─────────────────────────────────────────
  { id:'node-m1', experienceLevel:'mid', type:'conceptual',
    question:'How does Node.js clustering work and when should you use it?',
    answer:'Node.js is single-threaded — one process uses one CPU core. The cluster module forks multiple worker processes (one per CPU core) that share the same port. The master process distributes connections using round-robin. Use PM2 in cluster mode for production (pm2 start server.js -i max). Limitations: no shared memory between workers; use Redis for shared state (sessions, rate limiting counters).' },

  { id:'node-m2', experienceLevel:'mid', type:'conceptual',
    question:'What are Worker Threads and when would you use them over cluster?',
    answer:'Worker Threads (worker_threads module) run JS in separate threads sharing the same process memory. Use them for CPU-intensive tasks (image processing, number crunching, compression) that would block the event loop. Unlike cluster, workers can share SharedArrayBuffer for zero-copy data transfer. Cluster is for horizontal scaling of I/O workloads; Worker Threads are for parallel CPU computation within a single server instance.' },

  { id:'node-m3', experienceLevel:'mid', type:'practical',
    question:'How do you implement rate limiting in a Node.js Express API?',
    answer:'Use express-rate-limit. For distributed systems, pair it with a Redis store.',
    code:"import rateLimit from 'express-rate-limit';\nimport { RedisStore } from 'rate-limit-redis';\nimport { createClient } from 'redis';\n\nconst client = createClient();\nawait client.connect();\n\nconst limiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100,\n  standardHeaders: true,\n  store: new RedisStore({ client }),\n  message: { error: 'Too many requests, please try again later.' },\n});\n\napp.use('/api/', limiter);" },

  { id:'node-m4', experienceLevel:'mid', type:'conceptual',
    question:'How do you manage memory leaks in a production Node.js application?',
    answer:'Common sources: (1) Forgotten event listeners — always remove them or track with once(). (2) Global caches growing unbounded — use LRU cache with size limits. (3) Closures capturing large objects. (4) Detached DOM (server-side rendering). Detection: Node.js --inspect with Chrome DevTools heap snapshots; pm2 monit for process memory; Clinic.js for heap analysis. Fix: use WeakMap/WeakRef for caches; explicitly null references.' },

  { id:'node-m5', experienceLevel:'mid', type:'output',
    question:'Guess what happens when you call this in high-traffic Node.js code',
    code:'// Inside a request handler processed 1000 times/second:\nconst data = require("fs").readFileSync("./config.json", "utf8");',
    output:'This blocks the entire event loop on every single request — all other requests freeze while the file reads synchronously',
    explanation:'readFileSync in a request handler is one of the most common Node.js performance mistakes. Use readFile (async) or cache the config at startup.',
    choices:[
      { label:'Blocks event loop — all requests freeze during each read', correct:true },
      { label:'Fine — OS caches the file so it\'s fast', correct:false },
      { label:'Node.js automatically makes sync operations async', correct:false },
      { label:'Only blocks if the file is > 1MB', correct:false }] },

  { id:'node-m6', experienceLevel:'mid', type:'conceptual',
    question:'What is backpressure in Node.js streams and how do you handle it?',
    answer:'Backpressure occurs when a writable stream cannot consume data as fast as it\'s produced. The writable\'s write() returns false when its buffer is full. Without handling: memory grows unbounded. Solution: pause the readable when write() returns false; resume when the writable emits "drain". pipe() handles this automatically — another reason to prefer pipe/pipeline over manual stream management.',
    code:"import { pipeline } from 'stream/promises';\n// pipeline handles backpressure and error propagation:\nawait pipeline(readableStream, transformStream, writableStream);" },
];

export const expressjsQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'exp-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is Express.js and what does it add over Node\'s built-in http module?',
    answer:'Express.js is a minimal web framework for Node.js. Over raw http, it adds: (1) Routing with route parameters and HTTP method handlers (app.get, app.post), (2) Middleware pipeline (chainable request processing), (3) Request/response helpers (res.json(), req.params, req.query, req.body), (4) Built-in error handling, (5) Static file serving. It is unopinionated — you compose your own stack.' },

  { id:'exp-f2', experienceLevel:'fresher', type:'conceptual',
    question:'What is middleware in Express? What do req, res, and next represent?',
    answer:'Middleware are functions in the request-response pipeline. Each receives: req (the incoming request), res (the outgoing response), next (a function to pass control to the next middleware). Calling next() passes control. Not calling next() and not sending a response causes the request to hang. Error-handling middleware has a 4th parameter: (err, req, res, next) — Express detects this signature.' },

  { id:'exp-f3', experienceLevel:'fresher', type:'practical',
    question:'How do you create a basic Express REST API with CRUD operations?',
    code:"import express from 'express';\nconst app = express();\napp.use(express.json()); // parse JSON body\n\nlet items = [];\n\napp.get('/items', (req, res) => res.json(items));\napp.get('/items/:id', (req, res) => {\n  const item = items.find(i => i.id === +req.params.id);\n  item ? res.json(item) : res.status(404).json({ message: 'Not found' });\n});\napp.post('/items', (req, res) => {\n  const item = { id: Date.now(), ...req.body };\n  items.push(item);\n  res.status(201).json(item);\n});\napp.delete('/items/:id', (req, res) => {\n  items = items.filter(i => i.id !== +req.params.id);\n  res.status(204).send();\n});\n\napp.listen(4000);",
    answer:'Express REST API with GET, POST, DELETE routes. Remember to use express.json() to parse request bodies.' },

  { id:'exp-f4', experienceLevel:'fresher', type:'output',
    question:'Guess what happens when a request hits this middleware and no route matches',
    code:"app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});\n// No matching routes defined",
    output:'The middleware logs the method and URL, then next() is called, but no route handles it — Express returns its default "Cannot GET /path" 404 response',
    explanation:'next() passes to the next middleware/route in the stack. If nothing else handles it, Express sends a built-in 404.',
    choices:[
      { label:'Logs the request; Express\'s default 404 sends', correct:true },
      { label:'Hangs — no response is ever sent', correct:false },
      { label:'Error is thrown because no route exists', correct:false },
      { label:'next() re-runs the first middleware', correct:false }] },

  { id:'exp-f5', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between app.use() and app.get()/app.post()?',
    answer:'app.use(path, middleware) — matches ANY HTTP method starting with the path prefix (/api matches /api/users). Used for middleware, not route handlers. app.get(path, handler) — matches only GET requests with an exact path. app.post() — only POST, etc. app.use() with no path matches all requests — common for global middleware like logging, CORS, body parsing.' },

  { id:'exp-f6', experienceLevel:'fresher', type:'practical',
    question:'How do you read URL route parameters and query strings in Express?',
    code:"// Route: GET /users/:id?sort=asc\napp.get('/users/:id', (req, res) => {\n  const { id } = req.params;   // from :id in path\n  const { sort } = req.query;  // from ?sort=asc\n  // Example: GET /users/42?sort=desc\n  // id = '42', sort = 'desc'\n  res.json({ id, sort });\n});",
    answer:'req.params contains route parameters (from :name in the path). req.query contains query string parameters (after ?).' },

  { id:'exp-f7', experienceLevel:'fresher', type:'conceptual',
    question:'What HTTP status codes should you use for common API responses?',
    answer:'200 OK — successful GET/PUT. 201 Created — successful POST (created a resource). 204 No Content — successful DELETE (no body). 400 Bad Request — invalid input, validation error. 401 Unauthorized — not authenticated. 403 Forbidden — authenticated but not allowed. 404 Not Found — resource doesn\'t exist. 409 Conflict — duplicate resource. 422 Unprocessable Entity — validation failed. 500 Internal Server Error — server bug.' },

  { id:'exp-f8', experienceLevel:'fresher', type:'conceptual',
    question:'How do you serve static files in Express?',
    answer:'Use the built-in express.static() middleware. Pass the directory path containing your static assets.',
    code:"app.use(express.static('public'));\n// OR with a virtual path prefix:\napp.use('/static', express.static('public'));\n// Now /static/logo.png serves public/logo.png\n\n// For a React build output:\napp.use(express.static(path.join(__dirname, '../frontend/dist')));\napp.get('*', (req, res) => res.sendFile('index.html', { root: '../frontend/dist' }));" },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'exp-j1', experienceLevel:'junior', type:'conceptual',
    question:'How do you implement global error handling in Express?',
    answer:'Define an error-handling middleware with FOUR parameters (err, req, res, next) — Express identifies it by arity. Place it AFTER all routes and middleware. Pass errors to it with next(err) from any route or async handler.',
    code:"// Async wrapper to catch errors automatically:\nconst asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);\n\napp.get('/data', asyncHandler(async (req, res) => {\n  const data = await riskyOperation();\n  res.json(data);\n}));\n\n// Global error handler (4 params!):\napp.use((err, req, res, next) => {\n  const status = err.status ?? 500;\n  res.status(status).json({\n    message: err.message,\n    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),\n  });\n});" },

  { id:'exp-j2', experienceLevel:'junior', type:'practical',
    question:'How do you implement request validation middleware in Express?',
    answer:'Use express-validator or Zod for schema validation before the route handler.',
    code:"import { body, validationResult } from 'express-validator';\n\nconst validateUser = [\n  body('email').isEmail().normalizeEmail(),\n  body('password').isLength({ min: 8 }).trim(),\n  body('name').notEmpty().trim().escape(),\n  (req, res, next) => {\n    const errors = validationResult(req);\n    if (!errors.isEmpty()) {\n      return res.status(400).json({ errors: errors.array() });\n    }\n    next();\n  },\n];\n\napp.post('/users', validateUser, createUserHandler);" },

  { id:'exp-j3', experienceLevel:'junior', type:'conceptual',
    question:'What is Express Router and why would you use it?',
    answer:'express.Router() creates a mini Express app — its own middleware stack and routes — that you mount at a path. Use it to: (1) break a large route file into logical modules (auth, users, products), (2) apply middleware to a group of routes (e.g., auth check for all /admin routes), (3) version APIs (/api/v1, /api/v2).',
    code:"// routes/users.js:\nconst router = express.Router();\nrouter.use(requireAuth); // apply to all user routes\nrouter.get('/', getUsers);\nrouter.post('/', createUser);\nexport default router;\n\n// server.js:\nimport userRoutes from './routes/users.js';\napp.use('/api/users', userRoutes);" },

  { id:'exp-j4', experienceLevel:'junior', type:'output',
    question:'Guess the response for POST /users when body is missing name',
    code:"app.post('/users',\n  body('name').notEmpty(),\n  (req, res) => {\n    const errors = validationResult(req);\n    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });\n    res.status(201).json({ message: 'created' });\n  }\n);",
    output:'HTTP 400 with JSON body: { errors: [{ msg: "Invalid value", path: "name", ... }] }',
    explanation:'validationResult() captures failed validations. !isEmpty() means errors exist → 400.',
    choices:[
      { label:'400 with validation errors array', correct:true },
      { label:'201 created (name is optional)', correct:false },
      { label:'500 server error', correct:false },
      { label:'Hangs — missing next() call', correct:false }] },

  { id:'exp-j5', experienceLevel:'junior', type:'practical',
    question:'How do you implement request logging middleware?',
    answer:'Use morgan for structured HTTP logging in production. Build a custom middleware for fine-grained control.',
    code:"import morgan from 'morgan';\n\n// Preset formats: combined, common, dev, short, tiny\napp.use(morgan('dev')); // Outputs: GET /api/users 200 45ms\n\n// Custom format:\napp.use(morgan(':method :url :status :res[content-length] - :response-time ms'));\n\n// Log to file:\nimport { createWriteStream } from 'fs';\nconst logStream = createWriteStream('./access.log', { flags: 'a' });\napp.use(morgan('combined', { stream: logStream }));" },

  // ── MID ─────────────────────────────────────────
  { id:'exp-m1', experienceLevel:'mid', type:'conceptual',
    question:'What security headers should every production Express API have?',
    answer:'Use the helmet middleware which sets: Content-Security-Policy (XSS prevention), X-Frame-Options: SAMEORIGIN (clickjacking), X-Content-Type-Options: nosniff (MIME sniffing), Strict-Transport-Security (HTTPS only), X-XSS-Protection (legacy browsers). Additionally: rate limiting (express-rate-limit), input sanitisation (xss-clean, mongo-sanitize for NoSQL injection), CORS configuration.',
    code:"import helmet from 'helmet';\nimport mongoSanitize from 'express-mongo-sanitize';\nimport xss from 'xss-clean';\n\napp.use(helmet());\napp.use(mongoSanitize()); // strip $, . from req.body\napp.use(xss());          // sanitise HTML in inputs\napp.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));" },

  { id:'exp-m2', experienceLevel:'mid', type:'practical',
    question:'How do you implement API versioning in Express?',
    answer:'Three approaches: (1) URL path prefix /api/v1/, (2) Query string ?version=1, (3) Accept header (content negotiation). URL versioning is most common.',
    code:"import v1Routes from './routes/v1/index.js';\nimport v2Routes from './routes/v2/index.js';\n\napp.use('/api/v1', v1Routes);\napp.use('/api/v2', v2Routes);\n\n// Optional: default to latest version:\napp.use('/api', v2Routes);" },

  { id:'exp-m3', experienceLevel:'mid', type:'conceptual',
    question:'How do you implement caching in an Express API?',
    answer:'Levels: (1) HTTP caching — res.set("Cache-Control", "public, max-age=3600") for public GET responses. (2) In-memory — node-cache or a simple Map with TTL for db queries. (3) Redis — best for distributed/shared cache across multiple server instances. Set Cache-Control: no-store on auth APIs and personalised responses. Use ETags (res.set("ETag", hash)) for conditional requests.' },
];
