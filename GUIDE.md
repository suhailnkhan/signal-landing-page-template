# Signal: one-page landing page for startups and products (HTML)

Signal is a one-page landing page for a startup, SaaS product or app before and after launch. It's plain HTML, CSS and JavaScript:

- Open `index.html`, or upload the folder to any web host. There's nothing to install or build.
- Your product name, headline, features, steps, pricing, FAQ and waitlist settings all live in **one file**: `assets/js/data.js`.
- The waitlist form posts to a form service of your choice, or opens a ready-to-send email until you connect one.
- The product screen in the hero is drawn in HTML and CSS, so there are no images to replace before you try it.

---

## What's included

| File | What it is |
| --- | --- |
| `index.html` | The page: hero with waitlist, logo strip, features, how it works, pricing, FAQ, final call to action. Also holds the product screen (see below) |
| `assets/js/data.js` | **Your content and settings** |
| `assets/js/signal.js` | The page's behaviour (you don't need to edit it) |
| `assets/css/styles.css` | All styles; colours and fonts are at the top |
| `assets/img/favicon.svg` | Browser tab icon |
| `assets/fonts/` | Albert Sans and JetBrains Mono, self-hosted (SIL Open Font Licence) |

## Quick start

1. Unzip and open `index.html` in your browser.
2. Open `assets/js/data.js` in a text editor (VS Code, Sublime Text, even Notepad).
3. Change `product`: name, tagline, headline, subhead, announcement, contact email and links.
4. Edit `features`, `steps`, `pricing` and `faqs`.
5. Connect the waitlist (below).
6. Update the product screen in `index.html` to look like your product, or replace it with a screenshot.
7. Upload the folder to your host (see "Putting it online").

## Connecting the waitlist

By default (`waitlist.endpoint: ""`), the form opens a ready-to-send email to `product.contactEmail` with the visitor's address in it. That works with no setup, but it relies on the visitor having an email app.

To collect sign-ups properly, use a form service:

1. Create a free form at a service such as Formspree, Basin or Getform.
2. Copy the form's endpoint URL, for example `https://formspree.io/f/abcdwxyz`.
3. Paste it into `waitlist.endpoint` in `data.js`.

The form sends one field, `email`, and shows `waitlist.success` when the service accepts it, or an error with your contact email if it doesn't.

## The product screen

The dashboard in the hero is ordinary HTML in `index.html`, between the "Product screen" comment and the end of that `<div class="mock">`. Change the labels and numbers to match your product. Bar heights and progress bars are set with `style="height:…%"` and `style="width:…%"`.

To use a real screenshot instead, replace the whole `<div class="mock">…</div>` with:

```html
<img class="mock" src="assets/img/screenshot.png" alt="Your product's dashboard" width="1200" height="900">
```

## Pricing

Each plan has `monthly` and `annual` prices (the per-month price when billed yearly). Set a price to `0` to show "Free". The "save up to N%" note next to the switch is worked out from your prices, and is hidden if annual billing isn't cheaper. Set `featured: true` on the plan you want highlighted.

## The logo strip

The strip shows "Your logo" placeholder slots. Replace them with real customer or press logos once you have permission to use them, or set `logos.count: 0` to hide the strip. Please don't show logos of companies that don't use your product.

## Colours and fonts

The colours are at the top of `assets/css/styles.css`:

- `--accent`: buttons, highlights and icons
- `--accent-ink`: accent-coloured text, darker so it stays readable
- `--ink`: the text colour

## Putting it online

Any static host works. Upload the whole folder so that `index.html` is at the top level.

- **Netlify:** drag the folder onto app.netlify.com/drop.
- **Vercel or GitHub Pages:** push the folder to a repository and deploy it.
- **Shared hosting:** upload the files to `public_html` with the host's file manager or FTP.

## Help

Questions, or want it set up for you? Visit https://suhailnkhan.com/contact.
