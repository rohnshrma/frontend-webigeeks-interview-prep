// Sources: GeeksForGeeks, MDN, InterviewBit, W3Schools Advanced

export const htmlQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'html-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between HTML elements and HTML tags?',
    answer:'A tag is the markup syntax written in angle brackets (e.g., <p>, </p>). An element is the complete structure — the opening tag, the content inside, and the closing tag together. Self-closing tags like <img> and <br> form a complete element by themselves.',
    explanation:'GeeksForGeeks lists this as the #1 most-asked HTML fresher question.' },

  { id:'html-f2', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between HTML and HTML5?',
    answer:'HTML5 is the latest version (2014) and added semantic elements (<header>, <footer>, <article>, <nav>, <section>), native audio/video support (<audio>, <video>), the <canvas> element for 2D drawing, local storage (localStorage/sessionStorage), new input types (email, date, range), and the Geolocation API. HTML5 also deprecated presentational tags like <font> and <center>.',
    explanation:'HTML5 introduced APIs that previously required plugins like Flash.' },

  { id:'html-f3', experienceLevel:'fresher', type:'conceptual',
    question:'What is the purpose of the DOCTYPE declaration?',
    answer:'<!DOCTYPE html> tells the browser which version of HTML is being used so it renders the page in standards mode. Without it, browsers fall into "quirks mode" and may render layout differently. For HTML5, the declaration is simply <!DOCTYPE html> — no version number needed.',
    code:'<!DOCTYPE html>\n<html lang="en">\n  <head><title>My Page</title></head>\n  <body><h1>Hello</h1></body>\n</html>' },

  { id:'html-f4', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between block-level and inline elements? Give examples.',
    answer:'Block-level elements start on a new line and take up the full width of their parent (<div>, <p>, <h1>–<h6>, <ul>, <table>, <section>). Inline elements only take up as much width as their content and flow within text (<span>, <a>, <img>, <strong>, <em>, <input>). You can change this with CSS display property.' },

  { id:'html-f5', experienceLevel:'fresher', type:'conceptual',
    question:'What are semantic HTML elements and why do they matter?',
    answer:'Semantic elements like <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer> clearly describe their purpose. They help: (1) Screen readers navigate content for accessibility, (2) Search engines understand page structure for better SEO, (3) Developers read and maintain code more easily. Non-semantic <div> and <span> give no meaning.' },

  { id:'html-f6', experienceLevel:'fresher', type:'practical',
    question:'How do you create an accessible form with email, password, and a submit button?',
    answer:'Use <label> with matching for/id attributes, appropriate input types, and required attribute for validation.',
    code:'<form action="/login" method="POST">\n  <label for="email">Email</label>\n  <input type="email" id="email" name="email" required />\n\n  <label for="password">Password</label>\n  <input type="password" id="password" name="password" required minlength="8" />\n\n  <button type="submit">Sign In</button>\n</form>' },

  { id:'html-f7', experienceLevel:'fresher', type:'conceptual',
    question:'What is the alt attribute on <img> and why is it important?',
    answer:'The alt attribute provides text that describes the image. It matters for three reasons: (1) Accessibility — screen readers read alt text for visually impaired users, (2) SEO — search engines index images by their alt text, (3) Fallback — alt text displays if the image fails to load. Empty alt="" is valid for decorative images; never omit the attribute entirely.' },

  { id:'html-f8', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between the GET and POST methods in an HTML form?',
    answer:'GET appends form data to the URL as query strings — visible in the browser bar, bookmarkable, but limited in size and insecure for sensitive data. POST sends data in the request body — not visible in the URL, no size limit, required for passwords, file uploads (with enctype="multipart/form-data"), and any sensitive information.' },

  { id:'html-f9', experienceLevel:'fresher', type:'output',
    question:'Guess the rendered result',
    code:'<p>I <strong>love</strong> <em>coding</em></p>',
    output:'"love" in bold, "coding" in italics, all on one line inside a paragraph',
    explanation:'<strong> renders bold with semantic importance; <em> renders italic with semantic emphasis. Both are inline elements.',
    choices:[
      { label:'"love" bold, "coding" italic', correct:true },
      { label:'All text bold', correct:false },
      { label:'Three separate paragraphs', correct:false },
      { label:'Error — cannot nest inline tags', correct:false }] },

  { id:'html-f10', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between <section>, <article>, and <div>?',
    answer:'<div> is a generic non-semantic container for layout/styling. <section> groups thematically related content that belongs to a larger whole (e.g., chapters of a book). <article> represents self-contained, independently distributable content like a blog post, news article, or comment. Use semantic tags when the content has a clear meaning; use <div> only for layout grouping.' },

  { id:'html-f11', experienceLevel:'fresher', type:'conceptual',
    question:'How do you open a link in a new tab securely?',
    answer:'Use target="_blank" to open the link in a new tab. Always add rel="noopener noreferrer" — without it, the new page gains access to window.opener which can be exploited for phishing (tabnapping). rel="noopener" prevents opener access; rel="noreferrer" also prevents the Referer header from being sent.',
    code:'<a href="https://example.com" target="_blank" rel="noopener noreferrer">Visit</a>' },

  { id:'html-f12', experienceLevel:'fresher', type:'practical',
    question:'How do you embed a YouTube video in HTML?',
    answer:'Use an <iframe> with the embed URL. Always add the title attribute for accessibility and loading="lazy" for performance.',
    code:'<iframe\n  width="560" height="315"\n  src="https://www.youtube.com/embed/VIDEO_ID"\n  title="YouTube video player"\n  loading="lazy"\n  allowfullscreen>\n</iframe>' },

  { id:'html-f13', experienceLevel:'fresher', type:'output',
    question:'What does this meta tag do?',
    code:'<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    output:'Makes the page responsive — sets the viewport width equal to the device screen width and prevents mobile browsers from zooming out',
    explanation:'Without this tag, mobile browsers render the page at desktop width and then scale it down, making text tiny.',
    choices:[
      { label:'Makes the page mobile-responsive', correct:true },
      { label:'Sets the page background color', correct:false },
      { label:'Adds a page icon', correct:false },
      { label:'Enables dark mode', correct:false }] },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'html-j1', experienceLevel:'junior', type:'conceptual',
    question:'What are ARIA roles and when should you use them?',
    answer:'ARIA (Accessible Rich Internet Applications) roles, states, and properties add accessibility semantics to elements that are not natively accessible. Use ARIA only when HTML semantics are insufficient — e.g., role="dialog" on a custom modal, aria-label on an icon-only button, aria-live on dynamic content. The first rule of ARIA: use native HTML elements (<button>, <nav>) before adding ARIA attributes.' },

  { id:'html-j2', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between async and defer on a <script> tag?',
    answer:'Both download the script in parallel with HTML parsing. async executes immediately when downloaded, pausing HTML parsing — good for independent third-party scripts (analytics). defer executes only after HTML parsing is complete, maintaining script order — good for scripts that manipulate the DOM. Neither is safe for scripts loaded from <body> bottom — defer on <head> is the modern best practice.' },

  { id:'html-j3', experienceLevel:'junior', type:'practical',
    question:'How do you create an HTML table with proper accessible markup?',
    answer:'Use <thead>, <tbody>, <th scope> for headers, and <caption> for the table title. This lets screen readers announce column/row headers correctly.',
    code:'<table>\n  <caption>Monthly Sales</caption>\n  <thead>\n    <tr>\n      <th scope="col">Month</th>\n      <th scope="col">Revenue</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr><td>January</td><td>$12,000</td></tr>\n    <tr><td>February</td><td>$15,000</td></tr>\n  </tbody>\n</table>' },

  { id:'html-j4', experienceLevel:'junior', type:'conceptual',
    question:'What is the data-* attribute and how is it accessed in JavaScript?',
    answer:'Custom data-* attributes store extra data on HTML elements without using non-standard attributes or hidden inputs. They are accessible via el.dataset.camelCaseName in JS. They are useful for passing configuration to event handlers without DOM queries.',
    code:'<button data-product-id="42" data-action="add-to-cart">Add</button>\n\n// JavaScript:\nconst btn = document.querySelector("button");\nconsole.log(btn.dataset.productId);  // "42"\nconsole.log(btn.dataset.action);     // "add-to-cart"' },

  { id:'html-j5', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between localStorage, sessionStorage, and cookies?',
    answer:'localStorage persists until cleared, is accessible across all tabs on the same origin, and has ~5MB storage. sessionStorage persists only until the browser tab closes and is isolated to that tab. Cookies are sent with every HTTP request (main advantage) and can be httpOnly/Secure/SameSite for security; they have a small limit (~4KB). Use JWTs in httpOnly cookies for auth; localStorage for non-sensitive preferences.' },

  { id:'html-j6', experienceLevel:'junior', type:'practical',
    question:'How do you implement lazy loading for images in HTML?',
    answer:'Use loading="lazy" on <img> and <iframe> tags. The browser delays loading off-screen images until the user scrolls near them, improving initial page load performance.',
    code:'<img\n  src="large-image.jpg"\n  alt="Product photo"\n  loading="lazy"\n  width="800"\n  height="600"\n/>' },

  { id:'html-j7', experienceLevel:'junior', type:'output',
    question:'Guess the difference in behaviour between these two inputs',
    code:'<input type="text" />\n<input type="search" />',
    output:'Both accept text, but type="search" adds: (1) a clear (×) button in most browsers, (2) triggers the search event on Enter, (3) may style differently per OS. They look similar but carry different semantics.',
    explanation:'Semantic input types improve UX with browser-native features and help screen readers.',
    choices:[
      { label:'search shows a clear button and triggers search events', correct:true },
      { label:'They are identical — type has no effect here', correct:false },
      { label:'search disables auto-complete', correct:false },
      { label:'text validates email format automatically', correct:false }] },

  { id:'html-j8', experienceLevel:'junior', type:'conceptual',
    question:'What is the picture element and when would you use it over img?',
    answer:'<picture> lets you serve different image sources based on media queries or format support. Use it for: (1) Art direction — different crops at different screen sizes, (2) Format negotiation — serve WebP to browsers that support it, fall back to JPG/PNG.',
    code:'<picture>\n  <source media="(max-width: 600px)" srcset="small.webp" type="image/webp">\n  <source media="(max-width: 600px)" srcset="small.jpg">\n  <img src="large.jpg" alt="Hero image">\n</picture>' },

  { id:'html-j9', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between <b>/<i> and <strong>/<em>?',
    answer:'<b> and <i> are purely presentational — bold and italic with no extra meaning. <strong> and <em> are semantic — they communicate importance or emphasis to screen readers and search engines. Use <strong>/<em> when the emphasis has contextual meaning (e.g., a warning); use <b>/<i> for stylistic formatting (e.g., product names, technical terms, foreign phrases).' },

  { id:'html-j10', experienceLevel:'junior', type:'practical',
    question:'How do you implement browser-level form validation without JavaScript?',
    answer:'Use HTML5 validation attributes: required, type, min, max, minlength, maxlength, pattern. The browser will display error messages automatically.',
    code:'<form>\n  <input type="email" required placeholder="you@email.com" />\n  <input type="number" min="1" max="100" />\n  <input type="text" pattern="[A-Za-z]{3,}" minlength="3"\n    title="At least 3 letters" />\n  <button type="submit">Submit</button>\n</form>' },

  // ── MID ─────────────────────────────────────────
  { id:'html-m1', experienceLevel:'mid', type:'conceptual',
    question:'What is the Critical Rendering Path and how does HTML structure affect it?',
    answer:'The Critical Rendering Path is the sequence of steps the browser takes to convert HTML, CSS, and JS into pixels: Parse HTML → Build DOM → Parse CSS → Build CSSOM → Combine into Render Tree → Layout → Paint. Optimizations: inline critical CSS to avoid render-blocking, use defer/async on scripts, preload important resources with <link rel="preload">, lazy-load below-the-fold content.' },

  { id:'html-m2', experienceLevel:'mid', type:'conceptual',
    question:'How does the browser\'s HTML parsing work when it encounters a <script> tag without defer/async?',
    answer:'The HTML parser stops (blocks) when it encounters a synchronous <script> tag. It must: download the script, parse it, and execute it before continuing to parse the rest of the HTML. This is why scripts at the bottom of <body> improve performance — by that point the DOM is already built. defer and async solve this by downloading in parallel.' },

  { id:'html-m3', experienceLevel:'mid', type:'practical',
    question:'How do you implement a complete SEO-optimised HTML head section?',
    answer:'Include: title, meta description, canonical, Open Graph tags, Twitter cards, viewport, and structured data.',
    code:'<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Product Name | Brand</title>\n  <meta name="description" content="150 chars max description">\n  <link rel="canonical" href="https://example.com/page">\n  <!-- Open Graph -->\n  <meta property="og:title" content="Product Name">\n  <meta property="og:description" content="...">\n  <meta property="og:image" content="https://example.com/image.jpg">\n  <!-- Preload critical font -->\n  <link rel="preload" href="/fonts/main.woff2" as="font" crossorigin>\n</head>' },

  { id:'html-m4', experienceLevel:'mid', type:'conceptual',
    question:'What are Web Components and their three main standards?',
    answer:'Web Components allow creation of custom, reusable HTML elements using three browser APIs: (1) Custom Elements — define new HTML tag names with custom behaviour, (2) Shadow DOM — encapsulate markup and styles inside a component without affecting or being affected by global CSS, (3) HTML Templates — <template> and <slot> for declarative, reusable markup fragments.' },

  { id:'html-m5', experienceLevel:'mid', type:'output',
    question:'Guess the browser behaviour',
    code:'<link rel="preload" href="critical.css" as="style" onload="this.onload=null;this.rel=\'stylesheet\'">\n<noscript><link rel="stylesheet" href="critical.css"></noscript>',
    output:'The CSS is downloaded at high priority but applied non-render-blocking; the noscript tag is the fallback for browsers with JS disabled',
    explanation:'This is the standard pattern for loading non-critical CSS without blocking render. The onload trick applies the stylesheet after it downloads.',
    choices:[
      { label:'Non-blocking high-priority CSS load with JS-disabled fallback', correct:true },
      { label:'CSS is blocked until JavaScript loads', correct:false },
      { label:'Error — onload is not valid on link elements', correct:false },
      { label:'CSS is ignored by modern browsers', correct:false }] },

  { id:'html-m6', experienceLevel:'mid', type:'conceptual',
    question:'What is the difference between <dialog> and a custom modal div?',
    answer:'The native <dialog> element provides: (1) Built-in open/close with showModal()/close() methods, (2) Automatic focus management — focus moves inside the dialog on open, (3) Backdrop via ::backdrop pseudo-element, (4) ESC key closes it by default, (5) Proper ARIA role="dialog" already set. A custom div modal requires manually implementing all of these — including focus trapping, which is notoriously hard to get right for accessibility.' },

  { id:'html-m7', experienceLevel:'mid', type:'conceptual',
    question:'What are resource hints (preload, prefetch, preconnect, dns-prefetch) and when do you use each?',
    answer:'preload: Download a resource immediately at high priority — use for critical resources needed in the current page (fonts, hero images, critical JS). prefetch: Download a resource at low priority for the next navigation — use for next page assets. preconnect: Pre-establish a connection (DNS + TCP + TLS) to an origin. dns-prefetch: Only pre-resolve DNS — lighter than preconnect, use for many third-party domains.' },
];

export const cssQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'css-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is CSS specificity and how is it calculated?',
    answer:'Specificity determines which CSS rule wins when multiple rules target the same element. It\'s calculated as a 4-part score: (inline styles, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements). Inline=1000, ID=100, Class=10, Element=1. Higher total wins. Equal specificity: the last rule in source order wins. !important overrides all specificity.',
    code:'/* Specificity: 0,1,0,0 = 100 */\n#header { color: red; }\n\n/* Specificity: 0,0,1,1 = 11 */\nnav.menu { color: blue; }\n/* ID wins: header text is red */' },

  { id:'css-f2', experienceLevel:'fresher', type:'conceptual',
    question:'Explain the CSS Box Model. What is the difference between content-box and border-box?',
    answer:'Every element is a box: content + padding + border + margin. With box-sizing: content-box (default), width/height applies to content only — total rendered width = width + padding + border. With box-sizing: border-box, width/height includes padding and border — total rendered width = stated width. Most modern CSS resets use * { box-sizing: border-box } to avoid confusing layout calculations.' },

  { id:'css-f3', experienceLevel:'fresher', type:'output',
    question:'Guess the total rendered width',
    code:'.box {\n  width: 200px;\n  padding: 20px;\n  border: 5px solid;\n  box-sizing: content-box;\n}',
    output:'250px — content(200) + left padding(20) + right padding(20) + left border(5) + right border(5)',
    explanation:'content-box means padding and border are added OUTSIDE the declared width.',
    choices:[
      { label:'250px', correct:true },
      { label:'200px', correct:false },
      { label:'220px', correct:false },
      { label:'245px', correct:false }] },

  { id:'css-f4', experienceLevel:'fresher', type:'conceptual',
    question:'What are the different ways to apply CSS to an HTML document?',
    answer:'Three methods: (1) Inline CSS — style attribute on each element, highest specificity, hardest to maintain. (2) Internal CSS — <style> tag in <head>, scoped to one page. (3) External CSS — <link rel="stylesheet"> pointing to a .css file, best practice for separation of concerns, cacheable, reusable across pages.' },

  { id:'css-f5', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between display:none, visibility:hidden, and opacity:0?',
    answer:'display:none removes the element completely from layout flow — takes up no space, not accessible to screen readers. visibility:hidden hides the element but preserves its space in the layout. opacity:0 makes it invisible but it still takes up space AND responds to pointer events. For accessible hiding, use clip-path or a visually-hidden class rather than any of these.' },

  { id:'css-f6', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between the CSS position values: static, relative, absolute, fixed, sticky?',
    answer:'static: default, no offset properties. relative: offset from its own normal position, still in document flow. absolute: removed from flow, positioned relative to nearest positioned ancestor. fixed: removed from flow, positioned relative to the viewport — does not scroll. sticky: in flow until scroll threshold; then behaves like fixed within its scroll container.' },

  { id:'css-f7', experienceLevel:'fresher', type:'practical',
    question:'How do you centre a div both horizontally and vertically using multiple methods?',
    answer:'Three modern methods:',
    code:'/* Method 1: Flexbox (most common) */\n.parent { display: flex; justify-content: center; align-items: center; }\n\n/* Method 2: Grid */\n.parent { display: grid; place-items: center; }\n\n/* Method 3: Absolute + transform */\n.child { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }' },

  { id:'css-f8', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between px, em, rem, vw, and vh units?',
    answer:'px: absolute pixel — does not scale with user preferences. em: relative to the parent element\'s font-size — compounds through nesting. rem: relative to the root (<html>) font-size — consistent across the document, preferred for typography. vw/vh: 1% of viewport width/height — great for full-screen sections (100vh) and fluid typography.' },

  { id:'css-f9', experienceLevel:'fresher', type:'output',
    question:'Guess the font size of the paragraph',
    code:'html { font-size: 16px; }\n.parent { font-size: 1.5em; }\n.child { font-size: 1.5em; }',
    output:'36px — root 16px × 1.5 = 24px (parent), then 24px × 1.5 = 36px (child)',
    explanation:'em compounds — each nested em multiplies against its parent\'s computed font-size.',
    choices:[
      { label:'36px (em compounds)', correct:true },
      { label:'24px', correct:false },
      { label:'16px', correct:false },
      { label:'1.5px', correct:false }] },

  { id:'css-f10', experienceLevel:'fresher', type:'conceptual',
    question:'What are pseudo-classes and pseudo-elements? Give examples of each.',
    answer:'Pseudo-classes target elements based on state or position — single colon: :hover, :focus, :nth-child(), :first-child, :disabled, :checked. Pseudo-elements create a virtual sub-element — double colon: ::before, ::after, ::placeholder, ::first-line, ::selection. Key rule: pseudo-classes select existing elements; pseudo-elements create new virtual elements.' },

  { id:'css-f11', experienceLevel:'fresher', type:'practical',
    question:'How do you create a CSS custom property (variable) and use it?',
    answer:'Declare with -- prefix on :root (global) or any element (scoped). Access with var().',
    code:':root {\n  --primary-color: #4f46e5;\n  --font-size-lg: 1.25rem;\n  --border-radius: 8px;\n}\n\n.button {\n  background: var(--primary-color);\n  font-size: var(--font-size-lg);\n  border-radius: var(--border-radius);\n}\n\n/* Override in dark mode: */\n@media (prefers-color-scheme: dark) {\n  :root { --primary-color: #818cf8; }\n}' },

  { id:'css-f12', experienceLevel:'fresher', type:'conceptual',
    question:'What is CSS inheritance and which properties are inherited by default?',
    answer:'Inheritance means child elements can automatically receive certain property values from their parent. Inherited by default: font properties (font-family, font-size, font-weight), color, line-height, text-align, visibility, cursor. NOT inherited: margin, padding, border, background, width, height, display, position. You can force inheritance with inherit keyword on any property.' },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'css-j1', experienceLevel:'junior', type:'conceptual',
    question:'What is CSS Grid and how does it differ from Flexbox?',
    answer:'Flexbox is one-dimensional — it controls layout along one axis (row OR column). CSS Grid is two-dimensional — it controls both rows AND columns simultaneously. Use Flexbox for component-level layout (nav bar, button group). Use Grid for page-level layout (dashboard with sidebar + header + content). They complement each other — Grid for the overall layout, Flexbox for items within cells.' },

  { id:'css-j2', experienceLevel:'junior', type:'practical',
    question:'Create a responsive 3-column grid that stacks to 1 column on mobile.',
    answer:'Use CSS Grid with auto-fit and minmax for a completely responsive layout without media queries.',
    code:'.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n}\n\n/* With explicit media query: */\n@media (max-width: 600px) {\n  .grid { grid-template-columns: 1fr; }\n}' },

  { id:'css-j3', experienceLevel:'junior', type:'conceptual',
    question:'What is a stacking context in CSS and what creates one?',
    answer:'A stacking context is an isolated layer in which z-index values are compared. A z-index on a child can never appear behind a sibling stacking context, no matter how high the value. Created by: position/z-index (not auto), opacity < 1, transform (not none), filter, will-change, mix-blend-mode, isolation: isolate. This is why z-index: 9999 sometimes "doesn\'t work".' },

  { id:'css-j4', experienceLevel:'junior', type:'practical',
    question:'How do you implement a dark mode using CSS custom properties and prefers-color-scheme?',
    answer:'Define light/dark colour palettes on :root and override with the media query.',
    code:':root {\n  --bg: #ffffff;\n  --text: #1e293b;\n  --card: #f8fafc;\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n    --bg: #0f172a;\n    --text: #f1f5f9;\n    --card: #1e293b;\n  }\n}\n\nbody {\n  background: var(--bg);\n  color: var(--text);\n}' },

  { id:'css-j5', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between :nth-child() and :nth-of-type()?',
    answer:':nth-child(n) counts ALL sibling elements and checks if the element at position n matches the selector. :nth-of-type(n) counts only siblings of the same element type. Example: p:nth-child(2) selects a <p> if and only if it is the 2nd child overall. p:nth-of-type(2) selects the 2nd <p> regardless of what other elements come before it.' },

  { id:'css-j6', experienceLevel:'junior', type:'practical',
    question:'How do you create a smooth CSS transition and when would you use animation instead?',
    answer:'Transitions respond to state changes (hover, class toggle). Animations run automatically on keyframes.',
    code:'/* Transition — triggered by state change */\n.button {\n  background: #4f46e5;\n  transition: background 200ms ease, transform 200ms ease;\n}\n.button:hover {\n  background: #4338ca;\n  transform: translateY(-2px);\n}\n\n/* Animation — runs automatically */\n@keyframes spin {\n  to { transform: rotate(360deg); }\n}\n.loader { animation: spin 1s linear infinite; }' },

  { id:'css-j7', experienceLevel:'junior', type:'output',
    question:'Guess the visual result of this CSS',
    code:'.container {\n  display: grid;\n  grid-template-columns: 1fr 2fr 1fr;\n  gap: 16px;\n  width: 400px;\n}',
    output:'Three columns: left 100px, centre 200px, right 100px (total 400px consumed; gap is extra)',
    explanation:'1fr units distribute available space proportionally. 1+2+1=4 parts total; each fr = 400/4 = 100px.',
    choices:[
      { label:'100px | 200px | 100px', correct:true },
      { label:'133px | 133px | 133px', correct:false },
      { label:'50px | 300px | 50px', correct:false },
      { label:'Error — fr units need min-content', correct:false }] },

  { id:'css-j8', experienceLevel:'junior', type:'conceptual',
    question:'What is BEM (Block Element Modifier) and why is it useful for large projects?',
    answer:'BEM is a CSS naming convention: Block (component)__Element (part of block)--Modifier (state/variant). Example: .card__title--highlighted. Benefits: (1) Eliminates specificity conflicts since selectors are single class, (2) Self-documenting class names, (3) Clear component/element relationship, (4) Easy to scope styles without global side effects.',
    code:'/* Block */\n.card { ... }\n/* Element */\n.card__title { ... }\n.card__image { ... }\n/* Modifier */\n.card--featured { border: 2px solid gold; }\n.card__title--large { font-size: 1.5rem; }' },

  { id:'css-j9', experienceLevel:'junior', type:'conceptual',
    question:'How do CSS media queries work? What are the main breakpoints to support?',
    answer:'Media queries apply CSS conditionally based on device/viewport features. Syntax: @media (condition) { ... }. Common breakpoints (mobile-first): min-width: 640px (sm), 768px (md), 1024px (lg), 1280px (xl). Mobile-first means default styles target mobile; media queries add complexity for larger screens — better for performance since mobile loads less CSS.' },

  { id:'css-j10', experienceLevel:'junior', type:'practical',
    question:'How do you create a CSS tooltip without JavaScript?',
    answer:'Use ::after pseudo-element with absolute positioning and opacity transition on :hover.',
    code:'.tooltip {\n  position: relative;\n}\n.tooltip::after {\n  content: attr(data-tip);\n  position: absolute;\n  bottom: calc(100% + 8px);\n  left: 50%;\n  transform: translateX(-50%);\n  padding: 6px 10px;\n  background: #1e293b;\n  color: white;\n  border-radius: 6px;\n  font-size: 12px;\n  white-space: nowrap;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 150ms;\n}\n.tooltip:hover::after { opacity: 1; }' },

  // ── MID ─────────────────────────────────────────
  { id:'css-m1', experienceLevel:'mid', type:'conceptual',
    question:'What are CSS Cascade Layers (@layer) and how do they solve specificity problems?',
    answer:'@layer creates named CSS layers with an explicit specificity order. Styles in lower layers lose to higher layers regardless of selector specificity — this eliminates !important battles and makes third-party CSS like Tailwind or Bootstrap overridable without fighting specificity.',
    code:'@layer reset, base, components, utilities;\n\n@layer reset { * { margin: 0; padding: 0; } }\n@layer base { body { font-family: sans-serif; } }\n@layer components { .button { padding: 8px 16px; } }\n/* utilities always win without specificity hacks */\n@layer utilities { .mt-4 { margin-top: 1rem; } }' },

  { id:'css-m2', experienceLevel:'mid', type:'conceptual',
    question:'What is the contain property and how does it improve rendering performance?',
    answer:'contain tells the browser that a subtree is independent from the rest of the document, allowing incremental Layout, Paint, and Style recalculation. contain: layout means layout changes inside won\'t affect outside. contain: paint means the element clips overflow and won\'t be painted outside its bounds. content is shorthand for layout + paint. This enables significant performance optimisations for large lists and complex UIs.' },

  { id:'css-m3', experienceLevel:'mid', type:'practical',
    question:'How do you implement container queries (not media queries) to make a component responsive?',
    answer:'Container queries base styles on the parent container\'s size, not the viewport — true component-level responsiveness.',
    code:'.card-wrapper {\n  container-type: inline-size;\n  container-name: card;\n}\n\n/* Styles based on container width, not viewport */\n@container card (min-width: 400px) {\n  .card {\n    display: grid;\n    grid-template-columns: 120px 1fr;\n  }\n}' },

  { id:'css-m4', experienceLevel:'mid', type:'conceptual',
    question:'Explain CSS paint worklets and the Houdini Paint API.',
    answer:'CSS Houdini exposes browser rendering engine APIs to developers. The Paint API (CSS.paintWorklet) lets you write a custom paint function in JavaScript and use it as a CSS image background — think generative patterns, custom borders, variable noise textures. Use registerPaint(\'name\', class) in a worklet file, CSS.paintWorklet.addModule(\'worklet.js\') in your page, then background: paint(name) in CSS.' },

  { id:'css-m5', experienceLevel:'mid', type:'output',
    question:'Guess whether this animation is GPU-accelerated',
    code:'.slide {\n  animation: move 1s ease;\n}\n@keyframes move {\n  from { left: 0; }\n  to { left: 200px; }\n}',
    output:'NOT GPU-accelerated — left triggers layout recalculation on every frame (expensive). Should use transform: translateX(200px) instead, which only triggers composite.',
    explanation:'Only transform and opacity are GPU-composited by default. Animating left/top/width causes layout thrashing.',
    choices:[
      { label:'Not GPU-accelerated — left causes layout reflow', correct:true },
      { label:'GPU-accelerated because animation is used', correct:false },
      { label:'GPU-accelerated in Chrome only', correct:false },
      { label:'Depends on the browser', correct:false }] },

  { id:'css-m6', experienceLevel:'mid', type:'conceptual',
    question:'What is the difference between will-change and transform: translateZ(0) for GPU promotion?',
    answer:'will-change: transform is the official way to hint the browser to promote an element to its own compositor layer — preparing it for animation. transform: translateZ(0) is an older "hack" that forces GPU promotion as a side effect. will-change is preferable: it\'s explicit, doesn\'t change visual output, and the browser can ignore it when resources are low. Over-using either creates memory pressure from too many layers.' },
];

export const flexboxQuestions = [
  // ── FRESHER ─────────────────────────────────────────
  { id:'flex-f1', experienceLevel:'fresher', type:'conceptual',
    question:'What is Flexbox and what problem does it solve compared to older CSS layout methods?',
    answer:'Flexbox (Flexible Box Layout) is a one-dimensional CSS layout system designed to distribute space and align items inside a container. Before Flexbox, developers used float, inline-block, and negative margins hacks to create layouts. Flexbox solves: (1) Vertical centering, (2) Equal-height columns, (3) Dynamic spacing distribution, (4) Reordering without HTML changes.' },

  { id:'flex-f2', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between the main axis and the cross axis in Flexbox?',
    answer:'The main axis runs in the direction of flex-direction: row (default) → horizontal left-to-right; column → vertical top-to-bottom. The cross axis is always perpendicular to the main axis. justify-content controls alignment on the main axis. align-items controls alignment on the cross axis. Understanding this axis model explains all Flexbox alignment properties.' },

  { id:'flex-f3', experienceLevel:'fresher', type:'output',
    question:'Guess the layout result',
    code:'.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}',
    output:'Items spread to opposite ends with equal space between them, all vertically centred in the container',
    explanation:'space-between puts first item at start and last item at end; align-items centers on cross axis.',
    choices:[
      { label:'Items at opposite ends, vertically centred', correct:true },
      { label:'Items stacked vertically', correct:false },
      { label:'Items all bunched at left', correct:false },
      { label:'Items centred horizontally only', correct:false }] },

  { id:'flex-f4', experienceLevel:'fresher', type:'practical',
    question:'How do you build a navigation bar with a logo on the left and links on the right using Flexbox?',
    code:'<nav class="navbar">\n  <a href="/" class="logo">Brand</a>\n  <ul class="links">\n    <li><a href="/about">About</a></li>\n    <li><a href="/contact">Contact</a></li>\n  </ul>\n</nav>',
    answer:'Use display:flex with justify-content:space-between on the nav container.',
    code:'.navbar {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 24px;\n  height: 64px;\n}\n.links {\n  display: flex;\n  gap: 24px;\n  list-style: none;\n}' },

  { id:'flex-f5', experienceLevel:'fresher', type:'conceptual',
    question:'What does flex: 1 mean?',
    answer:'flex: 1 is shorthand for flex-grow: 1, flex-shrink: 1, flex-basis: 0%. It means: grow to fill available space (grow:1), shrink if needed (shrink:1), start from zero size before distributing space (basis:0%). When multiple sibling items all have flex:1, they share available space equally. Common use-case: sidebar-plus-main layout where main gets all remaining space.' },

  { id:'flex-f6', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between justify-content and align-items?',
    answer:'justify-content aligns items along the MAIN axis (horizontal for row, vertical for column). Values: flex-start, flex-end, center, space-between, space-around, space-evenly. align-items aligns items along the CROSS axis (perpendicular to main axis). Values: stretch (default), flex-start, flex-end, center, baseline. Mnemonic: Just → Main axis; Align → Cross axis.' },

  { id:'flex-f7', experienceLevel:'fresher', type:'practical',
    question:'How do you perfectly centre a single element both horizontally and vertically with Flexbox?',
    answer:'Apply display:flex, justify-content:center, and align-items:center to the parent. Set a height.',
    code:'.parent {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;  /* or any fixed height */\n}\n/* Even simpler: */\n.parent-grid {\n  display: grid;\n  place-items: center;\n  height: 100vh;\n}' },

  { id:'flex-f8', experienceLevel:'fresher', type:'output',
    question:'Guess the order items render in',
    code:'.container {\n  display: flex;\n  flex-direction: row-reverse;\n}',
    output:'Items render right-to-left in the visual order but the DOM order is unchanged',
    explanation:'row-reverse reverses the main axis direction. Item 1 appears rightmost. The HTML/DOM order is untouched.',
    choices:[
      { label:'Items render right-to-left visually', correct:true },
      { label:'Items render column layout', correct:false },
      { label:'DOM order is also reversed', correct:false },
      { label:'Error — row-reverse is not a valid value', correct:false }] },

  { id:'flex-f9', experienceLevel:'fresher', type:'conceptual',
    question:'What is flex-wrap and when do you need it?',
    answer:'By default (flex-wrap: nowrap), flex items shrink to fit in a single line and never wrap — they can overflow. flex-wrap: wrap allows items to wrap onto new lines when they don\'t fit. flex-wrap: wrap-reverse wraps in reverse order. Use wrap when you have many items and want a multi-row / responsive layout.' },

  { id:'flex-f10', experienceLevel:'fresher', type:'conceptual',
    question:'What is the difference between flex-start and start in Flexbox alignment values?',
    answer:'flex-start is relative to the flex container\'s main/cross axis direction — it always aligns to the start of the flex flow. start is an absolute logical value relative to writing mode — for RTL languages, start would be the right side. For most purposes they behave the same in LTR layouts, but start is more internationalisation-friendly.' },

  // ── JUNIOR ─────────────────────────────────────────
  { id:'flex-j1', experienceLevel:'junior', type:'conceptual',
    question:'What is the difference between align-items and align-content?',
    answer:'align-items aligns flex items on the cross axis within a single flex line. align-content aligns multiple lines (when flex-wrap creates more than one row) along the cross axis — it has no effect if there is only one line. Think of align-items for items within a line; align-content for the lines themselves.' },

  { id:'flex-j2', experienceLevel:'junior', type:'practical',
    question:'How do you make a flex item take up the remaining space while another stays fixed?',
    code:'.sidebar {\n  width: 240px;\n  flex-shrink: 0; /* prevent shrinking */\n}\n.main {\n  flex: 1; /* takes all remaining space */\n}',
    answer:'Use flex: 1 on the growing item and a fixed width + flex-shrink: 0 on the fixed item.' },

  { id:'flex-j3', experienceLevel:'junior', type:'output',
    question:'Guess the rendered width of each child',
    code:'.parent {\n  display: flex;\n  width: 600px;\n}\n.a { flex: 1; }\n.b { flex: 2; }\n.c { flex: 1; }',
    output:'a=150px, b=300px, c=150px (total flex-grow: 1+2+1=4; each unit = 150px)',
    explanation:'flex: 1/2/1 distributes 600px in ratio 1:2:1.',
    choices:[
      { label:'150px | 300px | 150px', correct:true },
      { label:'200px | 200px | 200px', correct:false },
      { label:'100px | 400px | 100px', correct:false },
      { label:'Depends on content size', correct:false }] },

  { id:'flex-j4', experienceLevel:'junior', type:'conceptual',
    question:'How does the align-self property work?',
    answer:'align-self overrides align-items for a single flex item. While align-items applies to all children from the parent, align-self lets individual children override their cross-axis alignment. Values: auto (inherits parent\'s align-items), flex-start, flex-end, center, baseline, stretch.' },

  { id:'flex-j5', experienceLevel:'junior', type:'practical',
    question:'How do you create a card grid that wraps responsively using Flexbox?',
    answer:'Combine flex-wrap with a fixed min-width using flex-basis to control when items wrap.',
    code:'.card-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 24px;\n}\n.card {\n  flex: 1 1 280px; /* grow | shrink | min-280px basis */\n  max-width: calc(33% - 24px); /* max 3 columns */\n}' },

  { id:'flex-j6', experienceLevel:'junior', type:'conceptual',
    question:'What is the order property in Flexbox and what are its accessibility implications?',
    answer:'order changes the visual rendering order of a flex item without changing the DOM order. Default is 0; lower values render first. Accessibility implication: screen readers and keyboard navigation follow DOM order, not visual order — mismatching them creates a confusing experience for keyboard users. Use order only for visual polish, not for meaningful content reordering.' },

  { id:'flex-j7', experienceLevel:'junior', type:'output',
    question:'Guess the visual order',
    code:'<div style="display:flex">\n  <div style="order:3">A</div>\n  <div style="order:1">B</div>\n  <div style="order:2">C</div>\n</div>',
    output:'B, C, A — rendered left to right in ascending order value',
    explanation:'order values are sorted numerically. B(1), C(2), A(3).',
    choices:[
      { label:'B, C, A', correct:true },
      { label:'A, B, C (DOM order)', correct:false },
      { label:'C, B, A', correct:false },
      { label:'A, C, B', correct:false }] },

  { id:'flex-j8', experienceLevel:'junior', type:'practical',
    question:'How do you push a footer to the bottom of a flex container without a fixed height?',
    answer:'Use margin-top: auto on the last item to push it to the end of the flex container.',
    code:'.page {\n  display: flex;\n  flex-direction: column;\n  min-height: 100vh;\n}\n.content {\n  flex: 1; /* grows to fill space */\n}\n/* Alt: push footer down with auto margin */\nfooter {\n  margin-top: auto;\n}' },

  // ── MID ─────────────────────────────────────────
  { id:'flex-m1', experienceLevel:'mid', type:'conceptual',
    question:'When should you choose CSS Grid over Flexbox for a layout?',
    answer:'Choose Grid when: (1) You need two-dimensional alignment (rows AND columns simultaneously), (2) You want the layout to control item placement (not the items themselves), (3) Building page-level layouts (header/sidebar/content/footer), (4) You need precise grid line placement. Choose Flexbox when: (1) One-dimensional — items flow in one direction, (2) Content drives the size, (3) Component internals (button contents, form rows, icon+text).' },

  { id:'flex-m2', experienceLevel:'mid', type:'practical',
    question:'How do you create a masonry-style layout with just Flexbox?',
    answer:'True masonry requires columns. With Flexbox, use column direction and set a fixed height or column-count. CSS Masonry via Grid is behind a flag but Flexbox column-wrap is a close approximation.',
    code:'.masonry {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  height: 800px; /* total container height */\n  gap: 16px;\n}\n.masonry-item {\n  width: calc(33.33% - 16px);\n  /* items fill columns top-to-bottom, then wrap */\n}' },

  { id:'flex-m3', experienceLevel:'mid', type:'conceptual',
    question:'What is the relationship between flex-grow, flex-shrink, flex-basis, and the shorthand flex?',
    answer:'flex-basis sets the initial (hypothetical) size before space is distributed. flex-grow distributes positive free space among items (default 0 = don\'t grow). flex-shrink distributes negative free space (default 1 = shrink equally). flex: none = 0 0 auto (don\'t grow, don\'t shrink). flex: auto = 1 1 auto. flex: 1 = 1 1 0% (preferred for equal distribution as basis 0 eliminates content size influence).' },

  { id:'flex-m4', experienceLevel:'mid', type:'output',
    question:'Guess what happens when flex items overflow with flex-wrap:nowrap',
    code:'.container {\n  display: flex;\n  width: 300px;\n  flex-wrap: nowrap;\n}\n.item { width: 200px; } /* 3 items */\n/* Total content: 600px; container: 300px */',
    output:'Items shrink proportionally below their stated width (flex-shrink:1 by default), not overflow. Each item becomes 100px.',
    explanation:'flex-shrink:1 is the default — items shrink to prevent overflow. To prevent shrinking: flex-shrink:0.',
    choices:[
      { label:'Items shrink to 100px each (flex-shrink:1)', correct:true },
      { label:'Items overflow the container at 200px each', correct:false },
      { label:'The last item is hidden', correct:false },
      { label:'Items wrap to a second row', correct:false }] },
];
