# Deploy this portfolio on GitHub Pages (step-by-step)

## Option A — Project site (`yourname.github.io/portfolio`)

1. Create a new repository on GitHub, e.g. `portfolio` (or push this `portfolio` folder as the repo root).
2. In the repo: **Settings → Pages**.
3. **Source:** Deploy from a branch.
4. **Branch:** `main` (or `master`), folder **`/ (root)`**.
5. Save. After 1–3 minutes, the site will be at  
   `https://YOUR_USERNAME.github.io/portfolio/`  
   (if the repo name is `portfolio`).

If the site shows **404**, wait a few minutes or check that `index.html` is at the **root** of the branch you published.

## Option B — User site (`yourname.github.io`)

1. Create a repo named **`YOUR_USERNAME.github.io`** (exactly your GitHub username).
2. Put the contents of this `portfolio` folder (`index.html`, `styles.css`) at the **root** of that repo.
3. Enable Pages on `main` / root. Site: `https://YOUR_USERNAME.github.io/`.

## After deploy

1. Replace remaining placeholders in `index.html` (GitHub `YOUR_USERNAME`, LinkedIn `YOUR_PROFILE`, project copy). Contact email is **lokeshmlaute@gmail.com**.
2. In your **LinkedIn Featured** section and **Upwork profile**, add the live URL.
3. Optional: add a custom domain later (GitHub docs: “Managing a custom domain”).

## Local preview

Open `index.html` in a browser, or run a quick static server from this folder:

```bash
# Python 3
python -m http.server 8080
```

Then visit `http://localhost:8080`.
