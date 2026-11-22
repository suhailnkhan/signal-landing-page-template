/* =====================================================================
   Signal: your product, features, pricing and waitlist settings.
   This is the only file you need to edit. See README.md for details.
   ===================================================================== */

window.SIGNAL = {
  /* ---------- Product ---------- */
  product: {
    name: "Plainsheet",
    // One line under the name in the browser tab and footer.
    tagline: "Shared budgets for small teams",
    // Hero. Wrap words in *asterisks* to highlight them.
    headline: "Know where the money goes, *before* the month ends.",
    subhead: "Plainsheet turns your team's spending into one shared budget everyone can read. Connect a card, set limits, and see what's left at a glance.",
    // Small line above the headline. "" hides it.
    announcement: "Early access opens in spring",
    contactEmail: "hello@example.com",
    links: { X: "https://x.com/", LinkedIn: "https://www.linkedin.com/", GitHub: "https://github.com/" },
  },

  /* ---------- Waitlist form ----------
     endpoint: where the form posts the email. Paste a form-service URL (for example
     a Formspree form, https://formspree.io/f/xxxxxxx). Leave "" to open a ready-to-send
     email to product.contactEmail instead. See README, "Connecting the waitlist". */
  waitlist: {
    endpoint: "",
    button: "Join the waitlist",
    note: "One email when we open. No spam, unsubscribe any time.",
    success: "You're on the list. We'll email you when early access opens.",
  },

  /* ---------- Logo strip ----------
     Placeholder slots for logos of customers or press. Replace with real logos
     (with permission) or set count: 0 to hide the strip. */
  logos: { title: "Teams trying the beta", count: 5 },

  /* ---------- Features ---------- */
  features: [
    { icon: "wallet", title: "One shared budget", text: "Every card, invoice and subscription in one view, grouped the way your team thinks about money." },
    { icon: "bell", title: "Limits that warn early", text: "Set a monthly limit per project. Plainsheet nudges the owner at 80%, not after it's gone." },
    { icon: "receipt", title: "Receipts sorted for you", text: "Forward a receipt or snap a photo. It's matched to the right payment automatically." },
    { icon: "users", title: "Clear roles", text: "Owners approve, members spend, accountants read. Nobody sees more than they need." },
    { icon: "export", title: "Clean exports", text: "Month-end exports your accountant can open, in CSV or straight to your accounting tool." },
    { icon: "lock", title: "Private by default", text: "Read-only bank connections, encrypted data and two-factor sign-in for every account." },
  ],

  /* ---------- How it works ---------- */
  steps: [
    { title: "Connect your cards", text: "Link company cards and bank accounts in a few clicks, read-only." },
    { title: "Set your budgets", text: "Create a budget per team or project and choose who owns it." },
    { title: "Watch it stay on track", text: "Everyone sees what's left. Owners get a nudge before anything runs over." },
  ],

  /* ---------- Pricing ----------
     Prices are per month. annual is the monthly price when billed yearly.
     currency: shown before each price. featured: true highlights one plan. */
  pricing: {
    currency: "$",
    plans: [
      { name: "Starter", monthly: 0, annual: 0, blurb: "For a founder getting organised.", features: ["1 budget", "2 connected cards", "CSV export"], cta: "Start free" },
      { name: "Team", monthly: 24, annual: 19, blurb: "For small teams that share spending.", features: ["Unlimited budgets", "10 connected cards", "Limits and alerts", "Receipt matching"], cta: "Join the waitlist", featured: true },
      { name: "Business", monthly: 59, annual: 49, blurb: "For growing companies with an accountant.", features: ["Everything in Team", "Unlimited cards", "Approvals", "Accounting integrations"], cta: "Talk to us" },
    ],
    note: "Prices exclude tax. Cancel any time.",
  },

  /* ---------- FAQ ---------- */
  faqs: [
    { q: "When does early access open?", a: "We're opening to waitlist teams in small groups from spring. Join the list and we'll email you when it's your turn." },
    { q: "Can Plainsheet move money?", a: "No. Bank connections are read-only. Plainsheet shows and organises spending; payments stay in your bank." },
    { q: "Does it work with my accounting software?", a: "The Business plan exports to the most common accounting tools, and every plan exports CSV." },
    { q: "Is there a free plan?", a: "Yes. Starter is free for one budget and two cards, with no time limit." },
    { q: "Where is my data stored?", a: "In encrypted databases in the EU. You can export or delete everything at any time." },
  ],

  /* ---------- Final call to action ---------- */
  cta: {
    title: "Stop finding out at month-end.",
    text: "Join the waitlist and be one of the first teams on Plainsheet.",
  },
};
