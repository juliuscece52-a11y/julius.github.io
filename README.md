# Julius Cheche Wamanji — Personal Portfolio

A premium, responsive personal brand website for **Julius Cheche Wamanji** — a professional based in
Doha, Qatar with experience in security operations, cleaning services and housekeeping, and a growing
interest in technology, financial markets and entrepreneurship.

The site is plain HTML, CSS and JavaScript. There is no build step, no framework and no dependency to
install: open `index.html` and it works.

---

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole website: hero, about, experience, skills, digital journey, interests, vision, contact |
| `styles.css` | All styling. Colours, type and layout live here |
| `script.js` | Navigation, scroll reveals, copy-email, WhatsApp link and the contact form |
| `cv.html` | A clean CV page (opens in a new tab; print or save as PDF) |
| `assets/` | Portrait placeholder, favicon and the five project preview images |

---

## Editing the content

Every section is a self-contained block of HTML with a comment above it, for example
`<!-- ==================== ABOUT ==================== -->`. Open `index.html`, find the block, edit the
text. Nothing else needs to change.

### 1. Your photo

The site currently shows an elegant monogram portrait placeholder so it never looks broken.

1. Add a real photograph to `assets/` (a portrait crop, roughly 720 × 880, e.g. `portrait.jpg`).
2. In `index.html`, find the line beginning `<img class="portrait" src="assets/portrait.svg"` and change
   the `src` to your file. Update the `alt` text to describe the photo.

### 2. WhatsApp number

In `index.html` there is one contact link to edit:

```html
<a class="btn btn-whatsapp" id="whatsappBtn" href="https://wa.me/97400000000"
   data-whatsapp="97400000000" ...>
```

Replace **both** `97400000000` values with your own number, country code first, digits only
(no `+`, no spaces). The script rebuilds the link from `data-whatsapp`, so the number is never shown as
raw text on the page.

You can also set the greeting message there with `data-message`, or globally in the `CONFIG` object at
the top of `script.js`.

### 3. LinkedIn, email and location

- **LinkedIn:** in `index.html`, search for `linkedin.com` and replace `https://www.linkedin.com/` with
  your profile URL (it appears in the contact section and the footer, and again in `cv.html`).
- **Email:** search for `juliuscece52@gmail.com`. It appears in the contact section, the footer, and in
  `cv.html`.
- **Location:** search for `Doha, Qatar` if you ever move.

### 4. Project cards ("My Digital Journey")

Each card has a screenshot slot and a link slot.

- **Screenshot:** replace the `src` of the card's `<img>` with your own image (16:10 works best).
- **Project link:** each card contains a commented-out link:
  ```html
  <!-- Project link: <a class="project-link" href="YOUR-URL" target="_blank" rel="noopener">View project <span aria-hidden="true">&#8599;</span></a> -->
  ```
  Delete the `<!--` and `-->` and add your URL. The link styling is already in place.

### 5. Colours and type

All colours are CSS variables at the top of `styles.css`:

```css
--bg: #04080f;      /* page background   */
--navy: #081120;    /* panels            */
--gold: #c9a25e;    /* accent            */
--gold-2: #e9cf92;  /* light accent      */
--ink: #eef2f8;     /* main text         */
--muted: #9aa8bc;   /* secondary text    */
```

Changing `--gold` / `--gold-2` updates buttons, icons, underlines and highlights everywhere.

### 6. SEO

At the top of `index.html`:

- `<title>` and `<meta name="description">`
- Open Graph / Twitter tags (`og:title`, `og:description`, `og:image`)
- The `application/ld+json` block describing you to search engines

Once the site has a live address, add `<link rel="canonical" href="https://your-domain.com/" />` and set
`og:image` to a real photo (JPG or PNG — some social platforms ignore SVG).

---

## Contact form

The form validates the name, email and message in the browser, then opens the visitor's email app with
the message pre-filled and addressed to `juliuscece52@gmail.com`. Nothing is uploaded or stored, and the
site needs no server.

If you later want messages delivered straight to your inbox without opening an email app, connect the
form to a form service (Formspree, Netlify Forms, Basin) and replace the submit handler in `script.js`.

---

## Running it locally

Just open `index.html` in a browser. To preview with a local server (recommended, so relative paths
behave exactly as they will online):

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## Publishing

Any static host works — Netlify Drop, GitHub Pages, Cloudflare Pages or Vercel.

1. Upload the folder (or push it to a repository).
2. No build command, no environment variables.
3. Point the host at `index.html` as the entry file.

---

## Honesty note

The site deliberately contains **no invented qualifications, certificates, awards, testimonials or
statistics**. All experience, skills and interests come from Julius's own description. Keep it that way
as you add to it — real projects and real progress will always be more convincing than decoration.

---

## Housekeeping

The following files are leftovers from the template this site was built from and are no longer used.
They are safe to delete:

- `assets/work-noctis.svg`, `assets/work-aura.svg`, `assets/work-kern.svg`
- `assets/work-lumen.svg`, `assets/work-orbital.svg`, `assets/work-terra.svg`
