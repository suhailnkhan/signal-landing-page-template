/* Signal: the page's behaviour. You don't need to edit this file; your content is in data.js. */
(function () {
  "use strict";
  var S = window.SIGNAL;
  if (!S) return;
  var P = S.product || {};
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  // *words* → highlighted, after escaping.
  var rich = function (s) { return esc(s).replace(/\*([^*]+)\*/g, "<mark>$1</mark>"); };

  var ICONS = {
    wallet: '<path d="M3 7h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm0 0V6a2 2 0 0 1 2-2h11"/><circle cx="16" cy="13.5" r="1.2"/>',
    bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15L6 16z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
    receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z"/><path d="M9 8h6M9 12h6"/>',
    users: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c.6-3.4 3-5 6-5s5.4 1.6 6 5"/><path d="M16 5.5a3 3 0 0 1 0 5.6M18 15c1.6.6 2.7 2.2 3 5"/>',
    export: '<path d="M12 3v12M7 8l5-5 5 5"/><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>',
    lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  };
  var icon = function (name) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.wallet) + "</svg>";
  };

  /* ---------- Product ---------- */
  $$("[data-s-name]").forEach(function (el) { el.textContent = P.name; });
  $$("[data-s-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  document.title = P.name + " · " + P.tagline;
  $("[data-s-headline]").innerHTML = rich(P.headline);
  $("[data-s-subhead]").textContent = P.subhead || "";
  var pill = $("[data-s-announcement]");
  if (P.announcement) { pill.lastElementChild.textContent = P.announcement; pill.hidden = false; }
  $$("[data-s-email]").forEach(function (a) { a.href = "mailto:" + P.contactEmail; });
  $("[data-s-links]").innerHTML = Object.keys(P.links || {}).filter(function (k) { return P.links[k]; }).map(function (k) {
    return '<li><a href="' + esc(P.links[k]) + '" rel="noopener" target="_blank">' + esc(k) + "</a></li>";
  }).join("");

  /* ---------- Logo strip (placeholders) ---------- */
  var L = S.logos || {};
  if (!L.count) $("[data-s-logos-section]").hidden = true;
  else {
    $("[data-s-logos-title]").textContent = L.title || "";
    var slots = "";
    for (var i = 0; i < L.count; i++) slots += '<li class="logo-slot">Your logo</li>';
    $("[data-s-logos]").innerHTML = slots;
  }

  /* ---------- Features and steps ---------- */
  $("[data-s-features]").innerHTML = (S.features || []).map(function (f) {
    return '<li class="feature"><span class="feature-icon">' + icon(f.icon) + "</span><h3>" + esc(f.title) + "</h3><p>" + esc(f.text) + "</p></li>";
  }).join("");
  $("[data-s-steps]").innerHTML = (S.steps || []).map(function (s) {
    return "<li><h3>" + esc(s.title) + "</h3><p>" + esc(s.text) + "</p></li>";
  }).join("");

  /* ---------- Pricing ---------- */
  var PR = S.pricing || { plans: [] };
  var plansEl = $("[data-s-plans]");
  function renderPlans(period) {
    plansEl.innerHTML = PR.plans.map(function (p) {
      var price = period === "annual" ? p.annual : p.monthly;
      var billed = period === "annual" && p.annual > 0 ? "Billed yearly: " + PR.currency + (p.annual * 12) : period === "monthly" && p.monthly > 0 ? "Billed monthly" : "Free forever";
      var btnClass = p.featured ? "btn btn-accent" : "btn btn-line";
      return '<article class="plan' + (p.featured ? " featured" : "") + '">' + (p.featured ? '<span class="plan-tag">Most popular</span>' : "") +
        "<h3>" + esc(p.name) + '</h3><p class="plan-blurb">' + esc(p.blurb) + "</p>" +
        '<p class="plan-price"><strong>' + (price === 0 ? "Free" : esc(PR.currency) + price) + "</strong>" + (price === 0 ? "" : "<span>/ month</span>") + "</p>" +
        '<p class="plan-billed">' + esc(billed) + "</p>" +
        "<ul>" + p.features.map(function (f) { return "<li>" + esc(f) + "</li>"; }).join("") + "</ul>" +
        '<a class="' + btnClass + '" href="#join">' + esc(p.cta) + "</a></article>";
    }).join("");
  }
  renderPlans("monthly");
  $("[data-s-plans-note]").textContent = PR.note || "";
  // "save up to N%", worked out from your prices.
  var best = PR.plans.reduce(function (m, p) { return p.monthly > 0 ? Math.max(m, Math.floor((1 - p.annual / p.monthly) * 100)) : m; }, 0);
  var save = $(".save");
  if (best > 0) save.textContent = "save up to " + best + "%"; else save.remove();
  $$(".billing-opt").forEach(function (b) {
    b.addEventListener("click", function () {
      $$(".billing-opt").forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
      renderPlans(b.getAttribute("data-period"));
    });
  });

  /* ---------- FAQ (native <details>: keyboard accessible) ---------- */
  $("[data-s-faqs]").innerHTML = (S.faqs || []).map(function (f) {
    return '<details class="faq-item"><summary>' + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>";
  }).join("");

  /* ---------- Final call to action ---------- */
  var C = S.cta || {};
  $("[data-s-cta-title]").textContent = C.title || "";
  $("[data-s-cta-text]").textContent = C.text || "";

  /* ---------- Waitlist ---------- */
  var W = S.waitlist || {};
  var form = $("[data-s-form]"), input = $("#w-email"), msg = $("[data-s-msg]"), btn = $("[data-s-button]");
  if (W.button) { btn.textContent = W.button; $("[data-s-cta-btn]").textContent = W.button; }
  msg.textContent = W.note || "";
  var say = function (text, kind) { msg.textContent = text; msg.className = "form-msg" + (kind ? " " + kind : ""); };
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = input.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.setAttribute("aria-invalid", "true");
      say("Please enter a valid email address.", "err");
      input.focus();
      return;
    }
    input.removeAttribute("aria-invalid");
    if (!W.endpoint) {
      // No form service yet: open a ready-to-send email instead.
      window.location.href = "mailto:" + P.contactEmail + "?subject=" + encodeURIComponent("Waitlist: " + P.name) + "&body=" + encodeURIComponent("Please add me to the waitlist: " + email);
      say("Your email app should open with the message ready to send.", "ok");
      return;
    }
    btn.disabled = true;
    var data = new FormData(); data.append("email", email);
    fetch(W.endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) { if (!r.ok) throw new Error(String(r.status)); say(W.success || "Thanks, you're on the list.", "ok"); form.reset(); })
      .catch(function () { say("That didn't go through. Please try again, or email " + P.contactEmail + ".", "err"); })
      .then(function () { btn.disabled = false; });
  });
  $$('a[href="#join"]').forEach(function (a) {
    a.addEventListener("click", function () { setTimeout(function () { input.focus({ preventScroll: true }); }, 350); });
  });

  /* ---------- Header rule ---------- */
  var header = $(".site-header");
  var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
})();
