/* English/Spanish toggle, shared by every page. Loaded after items.js. */

const LANG_KEY = "jjLang";

/* Static UI strings, keyed by data-i18n attribute value. */
const I18N = {
  "nav-home": { en: "Home", es: "Inicio" },
  "nav-shop": { en: "Shop Rentals", es: "Ver Rentas" },
  "nav-catering": { en: "Catering", es: "Catering" },
  "nav-about": { en: "About", es: "Nosotros" },
  "nav-cart": { en: "Cart", es: "Carrito" },

  "hero-eyebrow": { en: "Serving your neighborhood", es: "Sirviendo tu vecindario" },
  "hero-h1": { en: "Everything you need for a party that pops.", es: "Todo lo que necesitas para una fiesta increíble." },
  "hero-copy": {
    en: "Tables, chairs, bounce houses, catering and much more. Delivered, set up, and ready to go. Build your own bundle or grab one of our ready-made bundles.",
    es: "Mesas, sillas, brincolines, servicios de comida y mucho más. Entregado, instalado y listo para usar. Arma tu propio paquete o elige uno de nuestros paquetes ya armados."
  },
  "hero-cta": { en: "Browse Rentals", es: "Ver Rentas" },

  "services-h2": { en: "Our Services", es: "Nuestros Servicios" },
  "services-p": {
    en: "More than rentals — we handle the details so your event goes smoothly.",
    es: "Más que rentas: nos encargamos de los detalles para que tu evento salga perfecto."
  },
  "service-delivery-title": { en: "Delivery & Setup", es: "Entrega e Instalación" },
  "service-delivery-desc": {
    en: "We drop off, set up, and make sure everything's ready before your guests arrive.",
    es: "Entregamos, instalamos y nos aseguramos de que todo esté listo antes de que lleguen tus invitados."
  },
  "service-schedule-title": { en: "Flexible Scheduling", es: "Horarios Flexibles" },
  "service-schedule-desc": {
    en: "Same-day and weekend availability to fit your event date.",
    es: "Disponibilidad el mismo día y los fines de semana para ajustarnos a la fecha de tu evento."
  },
  "service-bundles-title": { en: "Custom Bundles", es: "Paquetes Personalizados" },
  "service-bundles-desc": {
    en: "Mix and match tables, chairs, and jumpers into a package built for you.",
    es: "Combina mesas, sillas e inflables en un paquete hecho a tu medida."
  },
  "service-catering-title": { en: "Catering", es: "Servicios de Comida" },
  "service-catering-desc": {
    en: "Food and drink options to round out your event, delivered alongside your rentals.",
    es: "Opciones de comida y bebida para completar tu evento, entregadas junto con tus rentas."
  },

  "about-page-h1": { en: "About J&J Party Rentals", es: "Sobre J&J Party Rentals" },
  "about-page-p": {
    en: "The story and the person behind every table, chair, and jumper we deliver.",
    es: "La historia y la persona detrás de cada mesa, silla e inflable que entregamos."
  },
  "about-eyebrow": { en: "Meet the Owner", es: "Conoce al Dueño" },
  "about-h2": { en: "Hi, I'm Jerson Jerez", es: "Hola, soy Jerson Jerez" },
  "about-badge": { en: "Owner & Founder", es: "Dueño y Fundador" },
  "about-intro": {
    en: "My name is Jerson Jerez, owner of J&J Party Rentals.",
    es: "Mi nombre es Jerson Jerez, dueño de J&J Party Rentals."
  },
  "about-quote": {
    en: "“I'm a young entrepreneur who dreams of making every event an enjoyable one! With a passion for creating unforgettable moments, I'm committed to delivering top-quality equipment and exceptional service for small-scale events.”",
    es: "“Soy un joven emprendedor que sueña con hacer de cada evento uno inolvidable. Con pasión por crear momentos únicos, me comprometo a ofrecer equipo de primera calidad y un servicio excepcional para eventos de escala pequeña.”"
  },
  "about-body": {
    en: "I provide everything you need to bring your vision to life. Let me help make your celebration stress-free and memorable — one detail at a time.",
    es: "Te ofrezco todo lo que necesitas para hacer realidad tu visión. Déjame ayudarte a que tu celebración sea sin estrés y memorable, un detalle a la vez."
  },
  "about-signature-title": { en: "Founder, J&J Party Rentals", es: "Fundador, J&J Party Rentals" },

  "promo-title": {
    en: "🎉 Summer Special — Free delivery on orders over $300",
    es: "🎉 Especial de Verano — Entrega gratis en pedidos mayores a $300"
  },
  "promo-desc": {
    en: "Mention code SUMMER26 when you request your quote.",
    es: "Menciona el código SUMMER26 al solicitar tu cotización."
  },

  "bundles-h2": { en: "Popular Bundles", es: "Paquetes Populares" },
  "bundles-p": {
    en: "Ready-made bundles at a discount — or build your own on the shop page.",
    es: "Paquetes ya armados con descuento, o arma el tuyo en la página de rentas."
  },
  "bundles-link": { en: "Build a custom bundle →", es: "Arma tu propio paquete →" },

  "categories-h2": { en: "Shop by Category", es: "Compra por Categoría" },
  "categories-p": {
    en: "Everything we offer, organized so you can find it fast.",
    es: "Todo lo que ofrecemos, organizado para que lo encuentres rápido."
  },

  "footer-contact-heading": { en: "Contact Us", es: "Contáctanos" },
  "footer-bottom": {
    en: "© 2026 J&J Party Rentals. All rights reserved.",
    es: "© 2026 J&J Party Rentals. Todos los derechos reservados."
  },

  "shop-h1": { en: "Shop All Rentals", es: "Todas las Rentas" },
  "shop-p": {
    en: "Browse everything we offer and build a custom bundle that fits your event. Add items to your cart and request a quote — no payment required up front.",
    es: "Explora todo lo que ofrecemos y arma un paquete personalizado para tu evento. Agrega artículos a tu carrito y solicita una cotización — no se requiere pago por adelantado."
  },
  "catering-eyebrow": { en: "Taco Catering", es: "Catering de Tacos" },
  "catering-h1": { en: "Big Flavor for Your Next Event", es: "Gran Sabor para tu Próximo Evento" },
  "catering-p": {
    en: "Fresh, made-to-order taco bars for any size gathering. Pick a package below and we'll handle the rest. If the number of guests you're expecting isn't an option, contact us and we'll give you a quote.",
    es: "Barras de tacos frescas, preparadas al momento, para cualquier tamaño de evento. Elige un paquete abajo y nosotros nos encargamos del resto. Si la cantidad de invitados que esperas no es una opción, contáctanos y te daremos una cotización."
  },

  "filter-all": { en: "All Items", es: "Todos los Artículos" },
  "filter-tables": { en: "Tables", es: "Mesas" },
  "filter-chairs": { en: "Chairs", es: "Sillas" },
  "filter-jumpers": { en: "Jumpers & Slides", es: "Inflables y Toboganes" },
  "filter-extras": { en: "Extras", es: "Extras" },

  "cart-h1": { en: "Your Cart", es: "Tu Carrito" },
  "cart-p": {
    en: "Review your items below, then submit a quote request. This is a booking request only — no payment is collected here. We'll confirm availability and follow up.",
    es: "Revisa tus artículos a continuación y envía una solicitud de cotización. Esto es solo una solicitud de reserva — no se cobra ningún pago aquí. Confirmaremos la disponibilidad y te contactaremos."
  },
  "cart-empty-h2": { en: "Your cart is empty", es: "Tu carrito está vacío" },
  "cart-empty-p": {
    en: "Browse our rentals and add a few items to get started.",
    es: "Explora nuestras rentas y agrega algunos artículos para comenzar."
  },
  "cart-empty-cta": { en: "Browse Rentals", es: "Ver Rentas" },
  "summary-h3": { en: "Order Summary", es: "Resumen del Pedido" },
  "delivery-fee-label": { en: "Delivery Fee", es: "Costo de Entrega" },
  "promo-label": { en: "Promo Discount", es: "Descuento Promocional" },
  "total-label": { en: "Estimated Total", es: "Total Estimado" },
  "form-name-label": { en: "Full Name", es: "Nombre Completo" },
  "form-email-label": { en: "Email", es: "Correo Electrónico" },
  "form-phone-label": { en: "Phone", es: "Teléfono" },
  "form-date-label": { en: "Event Date", es: "Fecha del Evento" },
  "form-zip-label": { en: "Event ZIP Code", es: "Código Postal del Evento" },
  "form-address-label": { en: "Event Address", es: "Dirección del Evento" },
  "form-deliverytime-label": { en: "Preferred Delivery Time (optional)", es: "Hora de Entrega Preferida (opcional)" },
  "deliverytime-none": { en: "No preference", es: "Sin preferencia" },
  "deliverytime-morning": { en: "Morning (8am–12pm)", es: "Mañana (8am–12pm)" },
  "deliverytime-afternoon": { en: "Afternoon (12pm–4pm)", es: "Tarde (12pm–4pm)" },
  "deliverytime-evening": { en: "Evening (4pm–8pm)", es: "Noche (4pm–8pm)" },
  "form-promo-label": { en: "Promo Code (optional)", es: "Código Promocional (opcional)" },
  "form-notes-label": { en: "Notes", es: "Notas" },
  "submit-btn": { en: "Submit", es: "Enviar" },
  "submit-disclaimer": {
    en: "By submitting, you'll receive a follow-up from us at jjrentalservices1@gmail.com or (951) 442-8155 to confirm availability and finalize your order.",
    es: "Al enviar, recibirás un seguimiento de nuestra parte a jjrentalservices1@gmail.com o al (951) 442-8155 para confirmar disponibilidad y finalizar tu pedido."
  },

  "thanks-h1": { en: "Thank you!", es: "¡Gracias!" },
  "thanks-p": {
    en: "Your quote request has been sent. We'll reach out within 24 hours at the email or phone number you provided to confirm availability and finalize your order.",
    es: "Tu solicitud de cotización ha sido enviada. Nos pondremos en contacto dentro de 24 horas al correo o teléfono que proporcionaste para confirmar disponibilidad y finalizar tu pedido."
  },
  "thanks-cta": { en: "Back to Home", es: "Volver al Inicio" }
};

/* Placeholder text (data-i18n-placeholder, since <input placeholder> isn't a text node). */
const I18N_PLACEHOLDER = {
  "form-zip-placeholder": { en: "e.g. 92553", es: "ej. 92553" },
  "form-promo-placeholder": { en: "e.g. SUMMER26", es: "ej. SUMMER26" },
  "form-notes-placeholder": { en: "Anything else we should know?", es: "¿Algo más que debamos saber?" }
};

const CATEGORY_I18N = {
  tables: { label: "Mesas", blurb: "Mesas rectangulares, redondas e infantiles resistentes" },
  chairs: { label: "Sillas", blurb: "Sillas resistentes estándar e infantiles" },
  jumpers: { label: "Inflables y Toboganes", blurb: "Casas de brincar, inflables de agua y toboganes combinados" },
  extras: { label: "Extras", blurb: "Calentadores de patio, césped artificial y carpas" }
};

const BUNDLE_I18N = {
  "bundle-birthday": { name: "Paquete de Cumpleaños", tag: "Más Popular" },
  "bundle-splash": { name: "Paquete Splash", tag: "Favorito de Verano" },
  "bundle-kids": { name: "Inicio Fiesta Infantil", tag: "Mejor Valor" },
  "bundle-taco-basic": { name: "Paquete de Tacos Básico", tag: "Reuniones Pequeñas", note: "Para ver qué incluye este paquete de catering, visita la <a href='catering.html'>página de Catering</a>." },
  "bundle-taco-standard": { name: "Paquete de Tacos Estándar", tag: "Más Popular", note: "Para ver qué incluye este paquete de catering, visita la <a href='catering.html'>página de Catering</a>." },
  "bundle-taco-premium": { name: "Paquete de Tacos Premium", tag: "Servicio Completo", note: "Para ver qué incluye este paquete de catering, visita la <a href='catering.html'>página de Catering</a>." }
};

/* Full catalog translations, used on the shop page and anywhere an item name/dims/desc is shown. */
const CATALOG_ES = {
  "rect-table": {
    name: "Mesa Rectangular",
    dims: '72" L x 30" A',
    desc: "Para 8–10 personas. Ideal para bufetes, regalos o cenas."
  },
  "round-table": {
    name: "Mesa Redonda",
    dims: '60" de diámetro',
    desc: "Para 8 personas. Una opción clásica para cenas y recepciones."
  },
  "kids-table": {
    name: "Mesa Infantil",
    dims: '48" L x 24" A',
    desc: "Del tamaño perfecto para los más pequeños. Ideal para actividades de cumpleaños y manualidades."
  },
  "chair": {
    name: "Sillas",
    dims: "Sillas plegables estándar",
    desc: "Asientos resistentes y cómodos para eventos de cualquier tamaño."
  },
  "kids-chair": {
    name: "Sillas Infantiles",
    dims: "Sillas plegables de tamaño infantil",
    desc: "Un asiento del tamaño perfecto para tus invitados más pequeños."
  },
  "jumper-classic": {
    name: "Casa de Brincar Clásica",
    dims: "13' x 13' x 15' de alto",
    desc: "Casas de brincar de grado comercial. Seguras, duraderas y divertidas para todas las edades.",
    colors: {
      crayon: { label: "Crayón", detail: "Base azul, columnas rojo/verde/naranja/azul" },
      classic: { label: "Morado", detail: "Base morada, columnas azules, frente rosa" }
    }
  },
  "jumper-slide": {
    name: "Casa de Brincar con Mini Tobogán",
    dims: "13' x 13' x 15' de alto",
    desc: "Toda la diversión de una casa de brincar, más un mini tobogán incorporado.",
    colors: {
      pink: { label: "Rosa", detail: "Base rosa, columnas azules, frente gris" },
      jungle: { label: "Selva", detail: "Base verde, columnas cafés, frente amarillo" },
      rainbow: { label: "Arcoíris", detail: "Base azul, columnas verde/azul/rojo/naranja, frente amarillo" }
    }
  },
  "jumper-wet": {
    name: "Tobogán Combinado Mediano de Agua",
    dims: "13' x 21' x 15' de alto",
    desc: "Inflable de agua mediano, perfecto para combatir el calor del verano."
  },
  "jumper-combo": {
    name: "Tobogán Combinado Grande",
    dims: "13' x 27' x 15' de alto",
    desc: "Nuestra atracción más grande, un tobogán gigante que se puede usar seco o con agua.",
    colors: {
      rainbow: { label: "Arcoíris", detail: "Base azul, columnas rojo/verde/azul/amarillo, frente amarillo" },
      purple: { label: "Morado", detail: "Base morada, columnas rosas, frente amarillo" }
    }
  },
  "patio-heater": {
    name: "Calentador de Patio",
    dims: "7' de alto, propano",
    desc: "Mantén a tus invitados calientes al aire libre. Ideal para eventos nocturnos y meses fríos."
  },
  "turf": {
    name: "Césped Artificial",
    dims: "",
    desc: "Piso de césped artificial premium. Ideal para colocar sobre tierra o pavimento. Si el tamaño que necesitas no aparece, contáctanos y podemos ajustarlo a tus necesidades."
  },
  "tent-party": {
    name: "Carpa para Fiestas",
    dims: "",
    desc: "Carpa espaciosa para grandes reuniones, ideal para bodas y grandes celebraciones."
  },
  "tent-regular": {
    name: "Carpa Plegable Regular",
    dims: "10' x 10'",
    desc: "Carpa plegable, perfecta para fiestas pequeñas en el patio y para dar sombra."
  },
  "marquee-numbers": {
    name: "Números Luminosos",
    dims: "4' de alto, iluminado",
    desc: "Números luminosos, un vistoso centro de mesa para cumpleaños y celebraciones especiales.",
    materials: {
      foam: "Espuma",
      wood: "Madera"
    }
  },
  "taco-catering-basic": {
    name: "Catering de Tacos Básico",
    dims: "Sirve hasta 30 invitados",
    desc: "Tacos de pollo y res en tortillas de maíz o harina, con arroz, frijoles y una barra de salsas clásica — salsa roja, salsa verde, cebolla, cilantro y limón.",
    details: [
      "3 Carnes: Carne Asada, Pollo, Al Pastor",
      "Arroz Mexicano",
      "Elección de Frijoles",
      "2 Salsas: Verde, Roja",
      "2 Toppings: Cebolla, Cilantro",
      "1 Bebida: Horchata"
    ],
    extras: ["Hot Dogs Regulares", "Hot Dogs Envueltos en Tocino", "Plato de Frutas", "Esquites"]
  },
  "taco-catering-standard": {
    name: "Catering de Tacos Estándar",
    dims: "Sirve hasta 50 invitados",
    desc: "Todo lo del paquete Básico, más carne asada, guacamole, totopos y tu elección de horchata o agua fresca.",
    details: [
      "3 Carnes: Carne Asada, Pollo, Al Pastor",
      "Arroz Mexicano",
      "Elección de Frijoles",
      "3 Salsas: Verde, Roja, Aguacate",
      "4 Toppings: Cebolla, Cilantro, Limón, Cebolla Morada Encurtida",
      "2 Bebidas: Horchata, Jamaica",
      "1 Postre: Parfait de Fresa y Plátano"
    ],
    extras: ["Hot Dogs Regulares", "Hot Dogs Envueltos en Tocino", "Plato de Frutas", "Esquites"]
  },
  "taco-catering-premium": {
    name: "Catering de Tacos Premium",
    dims: "Sirve hasta 75 invitados",
    desc: "Nuestra experiencia completa de barra de tacos: carne asada, al pastor y tacos de camarón, una barra cargada de salsas y aderezos, totopos y guacamole, horchata y churros de postre.",
    details: [
      "3 Carnes: Carne Asada, Pollo, Al Pastor",
      "Arroz Mexicano",
      "Elección de Frijoles",
      "3 Salsas: Verde, Roja, Aguacate",
      "5 Toppings: Cebolla, Cilantro, Limón, Cebolla Morada Encurtida, Pico de Gallo",
      "3 Bebidas: Horchata, Jamaica, Pepino",
      "2 Postres: Parfait de Fresa y Plátano, Arroz con Leche"
    ],
    extras: ["Hot Dogs Regulares", "Hot Dogs Envueltos en Tocino", "Plato de Frutas", "Esquites"]
  }
};

function getLang() {
  return localStorage.getItem(LANG_KEY) || "en";
}

function translatedItemName(id, lang) {
  const item = CATALOG.find((i) => i.id === id);
  if (!item) return id;
  return lang === "es" && CATALOG_ES[id] ? CATALOG_ES[id].name : item.name;
}

function translatedItemDims(id, lang) {
  const item = CATALOG.find((i) => i.id === id);
  if (!item) return "";
  return lang === "es" && CATALOG_ES[id] ? CATALOG_ES[id].dims : item.dims;
}

function translatedItemDesc(id, lang) {
  const item = CATALOG.find((i) => i.id === id);
  if (!item) return "";
  return lang === "es" && CATALOG_ES[id] ? CATALOG_ES[id].desc : item.desc;
}

function translatedItemDetails(id, lang) {
  const item = CATALOG.find((i) => i.id === id);
  if (!item) return null;
  return lang === "es" && CATALOG_ES[id] && CATALOG_ES[id].details ? CATALOG_ES[id].details : item.details;
}

function translatedItemExtras(id, lang) {
  const item = CATALOG.find((i) => i.id === id);
  if (!item || !item.extras) return null;
  const esNames = lang === "es" && CATALOG_ES[id] && CATALOG_ES[id].extras;
  return item.extras.map((e, i) => ({ name: esNames ? esNames[i] : e.name, price: e.price }));
}

function translatedColors(item, lang) {
  const es = CATALOG_ES[item.id] && CATALOG_ES[item.id].colors;
  if (lang !== "es" || !es) return item.colors;
  return item.colors.map((c) => ({ id: c.id, label: es[c.id].label, detail: es[c.id].detail }));
}

function translatedMaterialLabel(item, materialId, lang) {
  const es = CATALOG_ES[item.id] && CATALOG_ES[item.id].materials;
  if (lang === "es" && es && es[materialId]) return es[materialId];
  return item.materials.find((m) => m.id === materialId).label;
}

function applyStaticTranslations(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const entry = I18N[el.dataset.i18n];
    if (entry) el.textContent = entry[lang];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const entry = I18N_PLACEHOLDER[el.dataset.i18nPlaceholder];
    if (entry) el.placeholder = entry[lang];
  });
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });
  applyStaticTranslations(lang);
  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
}

function initLangSwitch() {
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.lang));
  });
  setLang(getLang());
}

document.addEventListener("DOMContentLoaded", initLangSwitch);
