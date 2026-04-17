# WebiGeeks Frontend — Deployment Steps (Netlify)

## Prerequisites
- Node.js 20+
- A Netlify account → [app.netlify.com](https://app.netlify.com)
- Backend already deployed on Render (you'll need its URL)

---

## Step 1 — Create a GitHub Repo

```bash
# Inside the frontend/ folder
git init
git add .
git commit -m "feat: WebiGeeks frontend initial commit"
```

Go to [github.com/new](https://github.com/new):
- Repository name: `webigeeks-frontend`
- Visibility: Private or Public
- Click **Create repository**

```bash
git remote add origin https://github.com/YOUR_USERNAME/webigeeks-frontend.git
git branch -M main
git push -u origin main
```

---

## Step 2 — Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **Add new site → Import an existing project**
3. Choose **Deploy with GitHub**
4. Authorize Netlify and select the `webigeeks-frontend` repo

---

## Step 3 — Build Settings

Netlify auto-detects from `netlify.toml` but confirm these:

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `20` |

---

## Step 4 — Environment Variables

In Netlify → **Site Settings → Environment Variables → Add variable**:

| Key | Value |
|---|---|
| `VITE_API_BASE_URL` | `https://webigeeks-api.onrender.com` ← your Render URL |

> ⚠️ Without this variable the frontend will fall back to `localhost:4000` and fail in production.

---

## Step 5 — Deploy

Click **Deploy site**.

Netlify will:
1. Clone the repo
2. Run `npm install`
3. Run `npm run build`
4. Publish the `dist/` folder

Wait ~2 minutes. Your site URL will look like:
```
https://webigeeks.netlify.app
```

---

## Step 6 — Custom Domain (optional)

1. Netlify → Site Settings → **Domain Management → Add custom domain**
2. Enter your domain (e.g. `app.webigeeks.com`)
3. Update your domain's DNS:
   - Add a `CNAME` record pointing to `webigeeks.netlify.app`
4. Netlify provisions an SSL certificate automatically (Let's Encrypt)

---

## Step 7 — Tell the Backend your Netlify URL

Go to your Render service → **Environment** → update:
```
CLIENT_ORIGIN = https://webigeeks.netlify.app
```
Save → Render redeploys automatically. This is required for CORS to work.

---

## Redeployment

Every `git push` to `main` triggers an automatic redeploy on Netlify.

```bash
git add .
git commit -m "fix: update something"
git push
```

---

## Verifying the Deploy

Open your Netlify URL and check:
- [ ] Home page loads
- [ ] Login/register works
- [ ] Topic questions load (fetched from Render API)
- [ ] Question actions (star/correct/doubtful) save correctly
- [ ] Refreshing any page works without 404 (React Router)

---

## Troubleshooting

| Problem | Fix |
|---|---|
| White screen after deploy | Check browser console for `VITE_API_BASE_URL` errors; verify the env var is set in Netlify |
| 404 on page refresh | Confirm `netlify.toml` has the `[[redirects]]` block and `public/_redirects` file exists |
| API calls failing (CORS error) | Make sure `CLIENT_ORIGIN` on Render matches your exact Netlify URL (no trailing slash) |
| Build fails | Check Netlify build logs; usually a missing env var or dependency issue |
