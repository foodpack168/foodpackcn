// ===== Product data grouped by material series =====
const productSeries = [
  {
    title: "Plastic Series",
    note: "PP / PET · food-grade, microwave-safe and freezer-grade options for hot and cold food service",
    items: [
      {
        name: "Sushi Boxes",
        desc: "PET and PP sushi boxes with clear lids and multi-compartment options. Custom size, colour and logo printing.",
        alt: "Sushi box with clear lid, custom printed logo",
        img: "assets/products/sushi-box.jpg"
      },
      {
        name: "Lunch Boxes",
        desc: "Microwave-safe bento and lunch boxes in single or multi-compartment designs, with leak-resistant lids.",
        alt: "Plastic bento lunch box with multiple compartments",
        img: "assets/products/lunch-box.jpg"
      },
      {
        name: "Soy Sauce Bottles",
        desc: "PET and glass soy sauce bottles with tamper-evident caps, from 30 ml to 500 ml.",
        alt: "PET and glass soy sauce bottles with tamper-evident caps",
        img: "assets/products/soy-sauce-bottle.jpg"
      },
      {
        name: "Sauce Cups",
        desc: "Portion-control sauce cups with lids, 30–120 ml (1–4 oz) in food-grade PP. Custom embossing or printing.",
        alt: "Disposable sauce cup with lids in portions of 30 to 120 ml",
        img: "assets/products/sauce-cup.jpg"
      },
      {
        name: "Soup Bowls",
        desc: "PP soup bowls with secure lids for takeaway, ramen and hot food delivery.",
        alt: "PP soup bowl with secure lid for hot food takeaway",
        img: "assets/products/soup-bowl.jpg"
      }
    ]
  },
  {
    title: "Eco-Friendly Paper Series",
    note: "Kraft paper · grease-resistant, plastic-reduced and recyclable options",
    items: [
      {
        name: "Kraft Sushi Boxes",
        desc: "Grease-resistant kraft sushi boxes with clear PET lids — a plastic-reduced alternative for sushi retail and Japanese restaurants.",
        alt: "Grease-resistant kraft sushi box with clear PET lid",
        img: "assets/products/kraft-sushi-box.jpg"
      },
      {
        name: "Kraft Lunch Boxes",
        desc: "Oil-resistant kraft lunch boxes with clear lids, suited to salads, grain bowls and hot meals.",
        alt: "Oil-resistant kraft lunch box with clear lid",
        img: "assets/products/kraft-lunch-box.jpg"
      },
      {
        name: "Kraft Soup Bowls",
        desc: "Kraft paper soup bowls with lids for ramen, pho and hot soup takeaway.",
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
    const visual = p.img
      ? `<div class="card-ph"><img src="${p.img}" alt="${p.alt || p.name}" loading="lazy"></div>`
      : `<div class="card-ph"><span class="card-ico">📦</span><span class="ph-tag">Photo coming soon</span></div>`;
    card.innerHTML = `
      ${visual}
      <h3>${p.name}</h3>
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
