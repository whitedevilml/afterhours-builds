# Deploy this portfolio on GitHub Pages

**GitHub profile:** [whitedevilml](https://github.com/whitedevilml)

The site files live in **`docs/`** (`index.html`, `styles.css`) so this repo can hold the guide plus the portfolio and still publish with GitHub Pages.

## One-time: create the repository on GitHub

1. Sign in at [github.com](https://github.com).
2. Click **+** → **New repository**.
3. Name it **`PartTimeEarning`** (or another name; the live URL will include this repo name).
4. Leave it **Public**, **do not** add a README (you already have files locally).
5. Click **Create repository**.

## Push from your computer

In **Command Prompt** or **PowerShell**, from the **PartTimeEarning** folder (the one that contains `docs/` and `Part-Time-Technical-Earning-Guide.md`):

```bat
cd "c:\Users\prlom\OneDrive - IRI\Desktop\PartTimeEarning"
git branch -M main
git remote add origin https://github.com/whitedevilml/PartTimeEarning.git
git push -u origin main
```

If `remote origin already exists`, use:

```bat
git remote set-url origin https://github.com/whitedevilml/PartTimeEarning.git
git push -u origin main
```

GitHub will ask you to sign in. Use a **[Personal Access Token](https://github.com/settings/tokens)** as the password when using HTTPS (not your GitHub account password).

## Turn on GitHub Pages

1. Open the repo on GitHub → **Settings** → **Pages** (left sidebar).
2. **Build and deployment** → **Source:** **Deploy from a branch**.
3. **Branch:** `main`, folder **`/docs`**, then **Save**.
4. After 1–3 minutes, the site will be at:

   **`https://whitedevilml.github.io/PartTimeEarning/`**

   (If you used a different repo name, replace `PartTimeEarning` in that URL.)

If you see **404**, wait a few minutes or confirm `docs/index.html` exists on the `main` branch.

## Shorter URL (optional)

To use **`https://whitedevilml.github.io/`** with no repo name in the path, create a **second** repository named exactly **`whitedevilml.github.io`**, put `index.html` and `styles.css` at its **root**, enable Pages on `main` / root. You can copy the files from `docs/` for that repo.

## Local preview

Open `docs/index.html` in a browser, or from the `docs` folder:

```bash
python -m http.server 8080
```

Then visit `http://localhost:8080`.
