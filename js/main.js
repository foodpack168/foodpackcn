// ===== Product data grouped by material series =====
const productSeries = [
  {
    title: "Plastic Series",
    note: "PS, OPS, BOPS, PP and PE — food-grade thermoformed plastics and extruded bottles, supplied with clear lids",
    items: [
      {
        id: "sushi-boxes",
        name: "Sushi Boxes",
        desc: "PS trays with clear OPS lids, single or multi-cavity, in the standard FP-00 to FP-11 sizes. Custom size, colour and logo printing.",
        spec: "PS tray · clear OPS lid · FP-00 to FP-11 · single or multi-cavity",
        alt: "Sushi box with clear OPS lid, custom printed logo",
        img: "assets/products/sushi-box.jpg"
      },
      {
        id: "lunch-boxes",
        name: "Lunch Boxes",
        desc: "PS and BOPS bento boxes in single or multi-compartment designs, with leak-resistant lids. Custom size, colour and logo printing.",
        spec: "PS and BOPS · single or multi-compartment · leak-resistant lid",
        alt: "Plastic bento lunch box with multiple compartments",
        img: "assets/products/lunch-box.jpg"
      },
      {
        id: "soy-sauce-bottles",
        name: "Soy Sauce Bottles",
        desc: "Lightweight PE soy sauce bottles in 15 ml and 30 ml, supplied with a white bottle and a red, green or black cap. Stock moulds only.",
        spec: "PE · 15 ml and 30 ml · white bottle · red, green or black cap",
        alt: "PE soy sauce bottle, 15 ml and 30 ml, white bottle with red, green or black cap",
        img: "assets/products/soy-sauce-bottle.jpg"
      },
      {
        id: "sauce-cups",
        name: "Sauce Cups",
        desc: "One-piece PP sauce cups with the lid attached (20 ml / 0.7 oz) — leak-free for soy sauce, dips and dressings. 100 cups per sleeve.",
        spec: "PP · 20 ml / 0.7 oz · lid attached · 100 cups per sleeve",
        alt: "Disposable sauce cup with lid attached, 20 ml, clear PP",
        img: "assets/products/sauce-cup.jpg"
      },
      {
        id: "soup-bowls",
        name: "Soup Bowls",
        desc: "PS soup bowls with clear OPS lids, leak-resistant for takeaway, ramen and hot food delivery. Custom size, colour and logo printing.",
        spec: "PS · clear OPS lid · leak-resistant · takeaway &amp; ramen",
        alt: "PS soup bowl with clear OPS lid for hot food takeaway",
        img: "assets/products/soup-bowl.jpg"
      }
    ]
  },
  {
    title: "Eco-Friendly Paper Series",
    note: "Kraft paper · grease-resistant, plastic-reduced and recyclable options",
    items: [
      {
        id: "kraft-sushi-boxes",
        name: "Kraft Sushi Boxes",
        desc: "Grease-resistant kraft sushi boxes with clear PET lids — a plastic-reduced alternative for sushi retail and Japanese restaurants.",
        spec: "Grease-resistant kraft · clear PET lid · plastic-reduced",
        alt: "Grease-resistant kraft sushi box with clear PET lid",
        img: "assets/products/kraft-sushi-box.jpg"
      },
      {
        id: "kraft-lunch-boxes",
        name: "Kraft Lunch Boxes",
        desc: "Grease-resistant kraft lunch boxes with clear lids, suited to salads, grain bowls and hot meals.",
        spec: "Grease-resistant kraft · clear lid · salads &amp; grain bowls",
        alt: "Grease-resistant kraft lunch box with clear lid",
        img: "assets/products/kraft-lunch-box.jpg"
      },
      {
        id: "kraft-soup-bowls",
        name: "Kraft Soup Bowls",
        desc: "Kraft paper soup bowls with lids for ramen, pho and hot soup takeaway.",
        spec: "Kraft paper · lid · ramen, pho &amp; hot soup",
        alt: "Kraft paper soup bowl with lid for ramen and pho",
        img: "assets/products/soup-bowl-kraft.jpg"
      }
    ]
  }
];

const grid = document.getElementById("productGrid");
productSeries.forEach((s) => {
  const head = document.createElement("div");
  head.className = "series-head";
  head.innerHTML = `<h3>${s.title}</h3><span>${s.note}</span>`;
  grid.appendChild(head);
  s.items.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";
    if (p.id) { card.id = p.id; card.setAttribute("data-product", p.name); }
    const visual = p.img
      ? `<div class="card-ph"><img src="${p.img}" alt="${p.alt || p.name}" loading="lazy"></div>`
      : `<div class="card-ph"><span class="card-ico">📦</span><span class="ph-tag">Photo coming soon</span></div>`;
    card.innerHTML = `
      ${visual}
      <h3>${p.name}</h3>
      ${p.spec ? `<span class="card-spec">${p.spec}</span>` : ""}
      <p>${p.desc}</p>
      <a class="card-link" href="#contact">Inquire →</a>
    `;
    grid.appendChild(card);
  });
});

// ===== Mobile nav toggle =====
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");
toggle.addEventListener("click", () => links.classList.toggle("open"));

// ===== Contact form =====
// PASTE YOUR FORM ENDPOINT HERE after signing up at https://formspree.io (or any form handler).
// Example: const FORM_ENDPOINT = "https://formspree.io/f/mvkgbbnv";
// Leave it empty and the form falls back to opening a pre-filled email in the visitor's mail client.
const FORM_ENDPOINT = "https://formspree.io/f/mvkgbbnv";
const TO_EMAIL = "foodpack@foodpackcn.com";
const TO_WHATSAPP = "+86 134 8079 1716";

function handleSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const el = form.elements;
  const note = document.getElementById("formNote");
  const btn = form.querySelector('button[type="submit"]');
  const btnLabel = btn ? btn.textContent : "";

  const vals = {
    name: (el.name && el.name.value) || "",
    company: (el.company && el.company.value) || "",
    email: (el.email && el.email.value) || "",
    product: (el.product && el.product.value) || "",
    message: (el.message && el.message.value) || ""
  };

  // No form service configured → fall back to a pre-filled email draft.
  if (!FORM_ENDPOINT) {
    const subject = `Inquiry — ${vals.product} — ${vals.company}`;
    const body = [
      `Company: ${vals.company}`,
      `Contact: ${vals.name}`,
      `Email: ${vals.email}`,
      `Product: ${vals.product}`,
      "",
      vals.message
    ].join("\n");
    window.location.href =
      `mailto:${TO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    note.style.color = "#2E7D32";
    note.textContent = "Opening your email client with the inquiry ready to send. If nothing happens, email us at " + TO_EMAIL;
    form.reset();
    return false;
  }

  const data = new FormData(form);
  data.set("_subject", `Inquiry — ${vals.product} — ${vals.company}`);
  data.set("_gotcha", (el.namedItem("_gotcha") && el.namedItem("_gotcha").value) || "");

  if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
  note.textContent = "";

  fetch(FORM_ENDPOINT, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" }
  })
    .then((res) => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json().catch(() => ({}));
    })
    .then(() => {
      note.style.color = "#2E7D32";
      note.textContent = "Thanks — your inquiry is on its way. Our team replies within 24 hours.";
      form.reset();
    })
    .catch(() => {
      note.style.color = "#b3261e";
      note.textContent = "The form could not be submitted right now. Please email " + TO_EMAIL + " or WhatsApp " + TO_WHATSAPP + ".";
    })
    .finally(() => {
      if (btn) { btn.disabled = false; btn.textContent = btnLabel; }
    });

  return false;
}

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Factory videos: serve the lighter 480p clips to phones (saves mobile data) =====
document.querySelectorAll(".factory-video video").forEach((video) => {
  const swapToMobile = () => {
    if (window.innerWidth < 640) {
      video.querySelectorAll("source").forEach((s) => {
        s.src = s.src.replace("720p", "480p");
      });
    }
  };
  video.addEventListener("play", swapToMobile, { once: false });
  swapToMobile();
});

// ===== FAQ: reveal the group that owns a linked question =====
// Deep links such as /#faq-moq must open the collapsed group holding that item.
(function () {
  const revealTarget = () => {
    const id = (window.location.hash || "").replace("#", "");
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const group = target.closest(".faq-group");
    if (group) {
      const state = group.querySelector(".grp-state");
      if (state) state.checked = true;
    }
    const item = target.closest(".faq-item");
    if (item) item.open = true;
  };

  window.addEventListener("hashchange", revealTarget);
  if (document.readyState !== "loading") revealTarget();
  else document.addEventListener("DOMContentLoaded", revealTarget);
})();
