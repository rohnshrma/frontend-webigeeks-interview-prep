// Sources: auth0.com, OWASP, GeeksForGeeks, jwt.io, Toptal

export const authQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'auth-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between authentication and authorisation?',
    answer:'Authentication answers "Who are you?" — verifying identity (login with username/password, biometrics, OAuth). Authorisation answers "What can you do?" — determining permissions after identity is confirmed. Example: A logged-in user (authenticated) may not have permission to access admin routes (not authorised). Both are separate concerns and should be handled in separate middleware layers.' },

  { id:'auth-f2', experienceLevel:'fresher', type:'conceptual',
    question:'Why should passwords never be stored in plain text?',
    answer:'If the database is breached, all user passwords are immediately exposed and can be used across other sites (password reuse is common). Hashing makes passwords one-way — even if an attacker sees the hash, they cannot reverse it. Salting (adding a random string before hashing) prevents rainbow table attacks. bcrypt, Argon2, and scrypt are specifically designed to be slow, making brute-force attacks impractical.' },

  { id:'auth-f3', experienceLevel:'fresher', type:'practical',
    question:'Walk through the steps of a secure login flow.',
    answer:'A complete, secure login endpoint requires input validation → user lookup → password compare → token issue.',
    code:"app.post('/auth/login', async (req, res, next) => {\n  try {\n    const { email, password } = req.body;\n    // 1. Validate input\n    if (!email || !password) return res.status(400).json({ message: 'All fields required' });\n    // 2. Find user (don't reveal if email exists)\n    const user = await User.findOne({ email }).select('+password');\n    if (!user) return res.status(401).json({ message: 'Invalid credentials' });\n    // 3. Compare password\n    const valid = await bcrypt.compare(password, user.password);\n    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });\n    // 4. Issue token\n    const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });\n    res.json({ token });\n  } catch (err) { next(err); }\n});" },

  { id:'auth-f4', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between session-based and token-based authentication?',
    answer:'Session-based: server stores session data (in memory or DB); client gets a session ID cookie; every request requires a DB lookup to verify the session. Stateful. Token-based (JWT): server is stateless — all user data is in a signed token; client stores token (localStorage or httpOnly cookie); server only needs to verify the signature. Stateless. JWT scales horizontally without shared session store; sessions are easier to invalidate.' },

  { id:'auth-f5', experienceLevel:'fresher', type:'conceptual',
    question:'What is bcrypt and why is it preferred for password hashing?',
    answer:'bcrypt is a password hashing algorithm designed to be computationally slow. It includes: (1) Built-in salt generation (random per hash), (2) Cost/rounds factor (adjustable to keep pace with hardware improvements), (3) Designed specifically for passwords — not speed. MD5 and SHA-256 are fast — attackers can compute billions per second. bcrypt at cost=10 takes ~100ms — computationally infeasible to brute-force at scale.' },

  { id:'auth-f6', experienceLevel:'fresher', type:'output',
    question:'Guess the return value of bcrypt.compare() when called with wrong password',
    code:"const result = await bcrypt.compare('wrongPassword', storedHash);",
    output:'false — never throws for an incorrect password; returns boolean',
    explanation:'bcrypt.compare() always returns a boolean. Only throws for internal errors (invalid hash format). This prevents timing-based user enumeration attacks.',
    choices:[
      { label:'false', correct:true },
      { label:'throws an Error', correct:false },
      { label:'null', correct:false },
      { label:'undefined', correct:false }] },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'auth-j1', experienceLevel:'junior', type:'conceptual',
    question:'What are the three parts of a JWT and what does each contain?',
    answer:'Header (base64url): algorithm (HS256, RS256) and token type "JWT". Payload (base64url): claims — sub (subject/userId), iat (issued at), exp (expiry), role, and any custom data. Signature: HMAC of header+payload using the secret key. The three parts are joined with dots: header.payload.signature. The payload is ENCODED, not encrypted — anyone can decode it. Only the signature proves it wasn\'t tampered with.' },

  { id:'auth-j2', experienceLevel:'junior', type:'practical',
    question:'How do you write an Express auth middleware that validates JWT?',
    code:"export function requireAuth(req, res, next) {\n  const authHeader = req.headers.authorization;\n  if (!authHeader?.startsWith('Bearer ')) {\n    return res.status(401).json({ message: 'Unauthorized' });\n  }\n  const token = authHeader.split(' ')[1];\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch (err) {\n    const message = err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token';\n    res.status(401).json({ message });\n  }\n}\n\n// Usage:\napp.get('/api/profile', requireAuth, (req, res) => {\n  res.json({ userId: req.user.sub });\n});",
    answer:'Always handle TokenExpiredError separately from JsonWebTokenError to give meaningful error messages.' },

  { id:'auth-j3', experienceLevel:'junior', type:'conceptual',
    question:'What is CSRF and how do you protect a REST API against it?',
    answer:'CSRF (Cross-Site Request Forgery) tricks authenticated users into making requests to your API by embedding them in malicious pages. For REST APIs: (1) If using JWT Bearer tokens in Authorization header — CSRF is largely mitigated because browsers don\'t auto-send custom headers cross-origin. (2) If using cookies — add SameSite=Strict or SameSite=Lax attribute to prevent cross-site cookie sending. (3) Optionally use CSRF tokens (synchronizer token pattern) with the csurf middleware.' },

  { id:'auth-j4', experienceLevel:'junior', type:'output',
    question:'Guess what jwt.verify throws when the token has expired',
    code:"jwt.verify(expiredToken, process.env.JWT_SECRET)",
    output:'Throws TokenExpiredError with name: "TokenExpiredError" and expiredAt date',
    explanation:'jsonwebtoken throws named errors — always catch these and return 401. Never send the error stack to clients.',
    choices:[
      { label:'Throws TokenExpiredError', correct:true },
      { label:'Returns the decoded payload with expired:true', correct:false },
      { label:'Returns null', correct:false },
      { label:'Throws a generic Error', correct:false }] },

  { id:'auth-j5', experienceLevel:'junior', type:'practical',
    question:'How do you implement access control for different user roles?',
    code:"// Middleware factory:\nfunction requireRole(...roles) {\n  return (req, res, next) => {\n    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });\n    if (!roles.includes(req.user.role)) {\n      return res.status(403).json({ message: 'Forbidden' });\n    }\n    next();\n  };\n}\n\n// Usage:\napp.get('/api/admin/users', requireAuth, requireRole('admin'), getUsers);\napp.delete('/api/posts/:id', requireAuth, requireRole('admin', 'moderator'), deletePost);",
    answer:'Compose auth and role middleware. requireAuth checks identity; requireRole checks permission.' },

  { id:'auth-j6', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between storing JWT in localStorage vs httpOnly cookie?',
    answer:'localStorage: accessible via JS → vulnerable to XSS attacks; if a malicious script runs, it can read your token. httpOnly cookie: inaccessible to JS → XSS-safe; browser sends it automatically with requests → requires CSRF protection; easier to implement secure token refresh (refresh token also in httpOnly cookie). Best practice: short-lived access token in memory or httpOnly cookie; refresh token in httpOnly, Secure, SameSite=Strict cookie.' },

  // ── MID ─────────────────────────────────────────
  { id:'auth-m1', experienceLevel:'mid', type:'conceptual',
    question:'How do you implement refresh token rotation securely?',
    answer:'Access tokens expire in 15 minutes. Refresh tokens (7-30 days) are rotated: (1) Issue a new access token AND a new refresh token on every /auth/refresh call. (2) Invalidate the old refresh token immediately — store token family in DB. (3) If an already-used refresh token is presented (token reuse detection), immediately invalidate the entire token family — sign of token theft. Store refresh token HASH in DB, not plain text.' },

  { id:'auth-m2', experienceLevel:'mid', type:'practical',
    question:'How do you implement OAuth 2.0 Google login flow?',
    code:"// Step 1: Redirect user to Google\napp.get('/auth/google', passport.authenticate('google', {\n  scope: ['profile', 'email']\n}));\n\n// Step 2: Google redirects back with code\napp.get('/auth/google/callback',\n  passport.authenticate('google', { session: false, failureRedirect: '/login?error=1' }),\n  (req, res) => {\n    // Google auth succeeded — req.user is the Mongoose user\n    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });\n    const refreshToken = generateRefreshToken(req.user._id);\n    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });\n    res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);\n  }\n);",
    answer:'OAuth 2.0 is an authorisation framework. The server exchanges the code for a user profile, then creates/finds a local user and issues its own JWT.' },

  { id:'auth-m3', experienceLevel:'mid', type:'conceptual',
    question:'What are common authentication vulnerabilities and how do you prevent them?',
    answer:'(1) Brute force — rate limit login attempts, add account lockout after N failures, use CAPTCHA. (2) JWT none algorithm attack — always specify algorithm explicitly in jwt.verify(token, secret, { algorithms: ["HS256"] }). (3) JWT secret in source code — always use environment variables; use long random secrets (openssl rand -base64 64). (4) Token in URL — never pass tokens in URL params (visible in server logs, browser history). (5) Password enumeration — use identical error messages and response timing for all failures.' },
];

export const bcryptQuestions = [
  { id:'bcr-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between hashing and encryption?',
    answer:'Hashing is ONE-WAY — a hash cannot be reversed to retrieve the original data. The same input always produces the same hash (deterministic), but the original cannot be derived from it. Encryption is TWO-WAY — data can be decrypted given the key. For passwords: hash (with bcrypt). For sensitive data that must be retrieved (credit cards, API keys): encrypt with AES-256.' },

  { id:'bcr-f2', experienceLevel:'fresher', type:'conceptual',
    question:'What are salt rounds in bcrypt and what value should you use?',
    answer:'Salt rounds (cost factor) determines how many iterations bcrypt runs: 2^rounds iterations. More rounds = slower hash = harder brute force but slower server. Industry standard: 10 (takes ~100ms on modern hardware). Increase to 12 for high-security applications. The salt (32-character random string) is automatically generated and stored as part of the hash string — you never need to store it separately.' },

  { id:'bcr-f3', experienceLevel:'fresher', type:'practical',
    question:'Show a complete register + login flow using bcrypt.',
    code:"import bcrypt from 'bcrypt';\n\n// Registration:\nasync function register({ email, password }) {\n  const existing = await User.findOne({ email });\n  if (existing) throw Object.assign(new Error('Email taken'), { status: 409 });\n\n  const hash = await bcrypt.hash(password, 10);\n  const user = await User.create({ email, password: hash });\n  return user;\n}\n\n// Login:\nasync function login({ email, password }) {\n  const user = await User.findOne({ email }).select('+password');\n  if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });\n\n  const valid = await bcrypt.compare(password, user.password);\n  if (!valid) throw Object.assign(new Error('Invalid credentials'), { status: 401 });\n\n  return user;\n}",
    answer:'Never use the same error message for "user not found" vs "wrong password" in the code — but DO return the same message to the client to prevent user enumeration.' },

  { id:'bcr-f4', experienceLevel:'fresher', type:'output',
    question:'Guess whether these two bcrypt hashes of the same password are identical',
    code:"const hash1 = await bcrypt.hash('myPassword', 10);\nconst hash2 = await bcrypt.hash('myPassword', 10);\nconsole.log(hash1 === hash2);",
    output:'false — bcrypt generates a new random salt for each call, producing a different hash every time',
    explanation:'This is intentional — different salts prevent rainbow tables. bcrypt.compare() internally extracts the salt from the stored hash to verify correctly.',
    choices:[
      { label:'false — random salt makes each hash unique', correct:true },
      { label:'true — same password always produces same hash', correct:false },
      { label:'Error — cannot hash same password twice', correct:false },
      { label:'undefined', correct:false }] },

  { id:'bcr-j1', experienceLevel:'junior', type:'conceptual',
    question:'How does bcrypt.compare() work internally?',
    answer:'The stored bcrypt hash string contains: version identifier ($2b$), cost factor ($10$), and then the 22-character salt concatenated with the 31-character hash. bcrypt.compare() extracts the salt from the stored hash, hashes the provided plain password with that same salt, and compares the result. This is why you can compare without storing the salt separately.' },

  { id:'bcr-j2', experienceLevel:'junior', type:'conceptual',
    question:'Should you hash a password inside a Mongoose pre-save hook or in the controller? Why?',
    answer:'Pre-save hook is better because: (1) Logic is co-located with the model — impossible to forget, (2) Handles both create() and save(), (3) The isModified("password") check prevents re-hashing on unrelated updates, (4) Centralised — no scattered bcrypt calls across multiple controllers. Controller-level hashing is fragile — if any code path creates a user without hashing, the bug is hard to catch.' },

  { id:'bcr-m1', experienceLevel:'mid', type:'conceptual',
    question:'When would you use Argon2 instead of bcrypt for password hashing?',
    answer:'Argon2 (winner of the 2015 Password Hashing Competition) is more modern than bcrypt and offers more defence against GPU-based attacks. It has three variants: Argon2d (GPU-resistant), Argon2i (side-channel resistant), Argon2id (recommended — hybrid). Key advantages over bcrypt: configures memory usage (makes GPU attacks harder), parallelism, and time cost separately. Use Argon2 for new high-security systems; bcrypt remains perfectly acceptable for most applications.' },
];

export const jwtQuestions = [
  { id:'jwt-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is a JWT (JSON Web Token) and what is it used for?',
    answer:'JWT is a compact, URL-safe token format that encodes claims as a JSON object, signed with HMAC or RSA. Used for: (1) API authentication — server issues token after login; client sends it in Authorization header on every request. (2) Information exchange between services — signature verifies the sender. JWTs are stateless — the server doesn\'t need to store session data.' },

  { id:'jwt-f2', experienceLevel:'fresher', type:'practical',
    question:'How do you sign and verify a JWT in Node.js?',
    code:"import jwt from 'jsonwebtoken';\n\n// Sign (on successful login):\nconst token = jwt.sign(\n  { sub: user._id, role: user.role },\n  process.env.JWT_SECRET,\n  { expiresIn: '15m', issuer: 'webigeeks-api' }\n);\n\n// Verify (in auth middleware):\ntry {\n  const decoded = jwt.verify(token, process.env.JWT_SECRET, {\n    algorithms: ['HS256'],       // prevent algorithm confusion\n    issuer: 'webigeeks-api',\n  });\n  console.log(decoded.sub); // userId\n} catch (err) {\n  // TokenExpiredError or JsonWebTokenError\n}",
    answer:'Always specify algorithms and issuer in verify() to prevent algorithm confusion attacks.' },

  { id:'jwt-f3', experienceLevel:'fresher', type:'conceptual',
    question:'Why should you never put sensitive data (passwords, credit cards) in JWT payload?',
    answer:'The JWT payload is only base64url-ENCODED, not encrypted. Anyone who has the token can decode the payload with a simple base64 decode in any browser or tool. The signature only proves the token wasn\'t tampered with — it does NOT protect the payload from reading. Only put identifiers in the payload: userId, role, email. For data that must be private to the server, use JWE (JSON Web Encryption) or keep it server-side.' },

  { id:'jwt-f4', experienceLevel:'fresher', type:'output',
    question:'Guess what the decoded payload contains',
    code:"const token = jwt.sign({ sub: '507f1f77bcf86cd799439011', role: 'admin' }, secret, { expiresIn: '1h' });\nconst decoded = jwt.decode(token); // note: decode, not verify\nconsole.log(decoded);",
    output:'{ sub: "507f1f77bcf86cd799439011", role: "admin", iat: <timestamp>, exp: <timestamp+3600> }',
    explanation:'jwt.decode() decodes without signature verification (useful for extracting expiry without a secret). jwt.verify() verifies the signature. In production, always use jwt.verify().',
    choices:[
      { label:'{ sub, role, iat, exp } — all claims visible', correct:true },
      { label:'Returns null — only verify() can decode', correct:false },
      { label:'Encrypted blob — unreadable without secret', correct:false },
      { label:'Throws error — secret required for decode()', correct:false }] },

  { id:'jwt-j1', experienceLevel:'junior', type:'conceptual',
    question:'What are standard JWT claims (registered claims) and what do they mean?',
    answer:'IANA standard claims: iss (issuer — who issued the token), sub (subject — who the token is about, usually userId), aud (audience — intended recipient), exp (expiry Unix timestamp), nbf (not before — token not valid before this time), iat (issued at — when it was created), jti (JWT ID — unique identifier for the token, used for revocation). Use short, abbreviated names to keep tokens small.' },

  { id:'jwt-j2', experienceLevel:'junior', type:'conceptual',
    question:'How would you implement JWT logout if JWTs are stateless?',
    answer:'JWTs cannot be "deleted" — once issued, they\'re valid until expiry. Logout strategies: (1) Short TTL — issue tokens that expire in 15 minutes; accept they\'re valid until then. (2) Token blocklist — store invalidated JTI (JWT ID) in Redis with TTL matching the token expiry; check on every request. (3) Refresh token invalidation — invalidate the refresh token; the access token expires shortly anyway. Option 2 adds statefulness but enables true logout.' },

  { id:'jwt-m1', experienceLevel:'mid', type:'conceptual',
    question:'What is the difference between HS256 and RS256 signing algorithms?',
    answer:'HS256 (HMAC-SHA256): single shared secret — same key for signing and verification. Both sides must know the secret. Good for single services. RS256 (RSA-SHA256): asymmetric key pair — private key signs, public key verifies. Any service can verify tokens by knowing only the public key. Essential for microservices and third-party token consumers (e.g., share public key via JWKS endpoint). Use RS256 when multiple services verify tokens.' },
];

export const passportLocalQuestions = [
  { id:'psl-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is Passport.js and what does the strategy pattern mean?',
    answer:'Passport.js is an authentication middleware for Express supporting 500+ authentication strategies. A strategy is a module that implements a specific auth mechanism (local username/password, Google OAuth, GitHub, JWT, etc.). You configure the strategy, and Passport handles the auth flow integration with Express via passport.authenticate("strategy-name"). This decouples auth logic from route handlers.' },

  { id:'psl-f2', experienceLevel:'fresher', type:'practical',
    question:'How do you configure passport-local for email/password login?',
    code:"import passport from 'passport';\nimport { Strategy as LocalStrategy } from 'passport-local';\n\npassport.use(new LocalStrategy(\n  { usernameField: 'email', passwordField: 'password' },\n  async (email, password, done) => {\n    try {\n      const user = await User.findOne({ email }).select('+password');\n      if (!user) return done(null, false, { message: 'Email not registered' });\n      const valid = await user.comparePassword(password);\n      if (!valid) return done(null, false, { message: 'Wrong password' });\n      return done(null, user);\n    } catch (err) {\n      done(err);\n    }\n  }\n));\n\n// Route:\napp.post('/login', passport.authenticate('local', { session: false }),\n  (req, res) => res.json({ token: generateToken(req.user) })\n);",
    answer:'done(null, user) = success; done(null, false, {message}) = auth failure; done(err) = server error.' },

  { id:'psl-f3', experienceLevel:'fresher', type:'conceptual',
    question:'What is the role of serializeUser and deserializeUser in Passport session-based auth?',
    answer:'serializeUser determines what to store in the session — typically just the user ID (minimal). Called after successful login to put userId in req.session. deserializeUser runs on every request — takes the stored ID, queries the database for the full user, and attaches it to req.user. This keeps sessions small while providing full user context on every request.' },

  { id:'psl-j1', experienceLevel:'junior', type:'conceptual',
    question:'When should you use session: false with Passport?',
    answer:'Set session: false when using stateless token-based auth (JWT). There\'s no need for Passport to serialize the user to a session because the JWT carries the identity on every request. Session-based auth is needed when you want the server to manage session state (traditional web apps with cookies). For REST APIs and mobile apps, session: false with JWT is the standard approach.' },

  { id:'psl-j2', experienceLevel:'junior', type:'practical',
    question:'How do you chain passport.authenticate with async route handlers?',
    code:"app.post('/login',\n  (req, res, next) => {\n    passport.authenticate('local', { session: false },\n      async (err, user, info) => {\n        if (err) return next(err);\n        if (!user) return res.status(401).json({ message: info?.message ?? 'Auth failed' });\n        try {\n          await user.updateOne({ lastLogin: new Date() });\n          const token = generateToken(user);\n          res.json({ token, user: { id: user._id, email: user.email } });\n        } catch (err) { next(err); }\n      }\n    )(req, res, next);\n  }\n);",
    answer:'Using a custom callback (err, user, info) gives full control — you can run more async logic after auth.' },
];

export const passportGoogleQuestions = [
  { id:'pgo-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is OAuth 2.0 and how does passport-google-oauth20 implement it?',
    answer:'OAuth 2.0 is an authorisation framework where users grant your app access to their Google profile without sharing Google credentials. Flow: (1) Your app redirects user to Google consent screen, (2) User approves, (3) Google redirects back with an authorization code, (4) Your server exchanges the code for access + ID tokens, (5) You use tokens to get user profile. passport-google-oauth20 handles steps 1-5 and calls your verify callback with the profile.' },

  { id:'pgo-f2', experienceLevel:'fresher', type:'practical',
    question:'How do you configure passport-google-oauth20?',
    code:"import { Strategy as GoogleStrategy } from 'passport-google-oauth20';\n\npassport.use(new GoogleStrategy({\n  clientID:     process.env.GOOGLE_CLIENT_ID,\n  clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n  callbackURL:  '/auth/google/callback',\n  scope: ['profile', 'email'],\n}, async (accessToken, refreshToken, profile, done) => {\n  try {\n    // Find existing or create new user:\n    let user = await User.findOne({ googleId: profile.id });\n    if (!user) {\n      user = await User.create({\n        googleId: profile.id,\n        name:     profile.displayName,\n        email:    profile.emails[0].value,\n        avatar:   profile.photos[0]?.value,\n      });\n    }\n    done(null, user);\n  } catch (err) { done(err); }\n}));",
    answer:'The verify callback receives the Google profile. Find or create a local user (upsert). The googleId is the stable identifier across logins.' },

  { id:'pgo-f3', experienceLevel:'fresher', type:'output',
    question:'Guess what error appears when the callback URL doesn\'t match Google Console registration',
    code:"// Configured in Google Console: http://localhost:4000/auth/google/callback\n// Actual app config:\ncallbackURL: 'http://localhost:4000/auth/google/cb'",
    output:'redirect_uri_mismatch error from Google — the OAuth flow stops before reaching your callback',
    explanation:'Google validates the redirect URI strictly. Even a trailing slash difference causes rejection. The error is shown to the user on Google\'s domain.',
    choices:[
      { label:'redirect_uri_mismatch — Google rejects the redirect', correct:true },
      { label:'A 404 from your Express server', correct:false },
      { label:'Login proceeds but profile is null', correct:false },
      { label:'Google falls back to the registered URL automatically', correct:false }] },

  { id:'pgo-j1', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between the Google client ID and client secret?',
    answer:'Client ID: public identifier for your app — safe to include in browser-facing code (used in Google\'s frontend SDK). Client Secret: confidential key known only to your server — NEVER expose in frontend code. Used during server-side code exchange. Store it in environment variables, never hardcode, never commit to git. If leaked, immediately rotate in Google Cloud Console.' },

  { id:'pgo-j2', experienceLevel:'junior', type:'conceptual',
    question:'How do you handle users who sign up with Google and then try to link a local password account?',
    answer:'Add both googleId and password fields to the user schema (both optional). In the Google strategy verify callback, look up by googleId or email. If the email already exists without a googleId, link the accounts by adding googleId to the existing user. Implement an explicit "Link Google Account" flow — never auto-merge without verifying the email belongs to the logged-in user.' },

  { id:'pgo-m1', experienceLevel:'mid', type:'conceptual',
    question:'What security considerations apply to OAuth 2.0 implementation?',
    answer:'(1) State parameter — generate a random nonce, add to the OAuth URL, verify it matches on callback to prevent CSRF. (2) PKCE (Proof Key for Code Exchange) — for mobile and SPA flows where client secret cannot be kept secret. (3) Access token storage — never store Google access tokens in localStorage; keep server-side. (4) Scope minimisation — only request scopes you actually need. (5) Token expiry — Google access tokens expire in 1 hour; use the refresh token to get new ones.' },
];
