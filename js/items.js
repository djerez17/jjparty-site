/* Catalog and bundle data for J&J Party Rentals.
   Edit prices/stock/descriptions here — every page reads from this file. */

const CATALOG = [
  {
    id: "rect-table",
    name: "Rectangular Table",
    category: "tables",
    icon: "⬜",
    dims: '72" L x 30" W',
    price: 8,
    stock: 10,
    desc: "Seats 8–10 guests. Great for buffets, gifts, or dining."
  },
  {
    id: "round-table",
    name: "Round Table",
    category: "tables",
    icon: "⚪",
    dims: '60" diameter',
    price: 10,
    stock: 10,
    desc: "Seats 8 guests. A classic choice for dinners and receptions."
  },
  {
    id: "kids-table",
    name: "Kids Table",
    category: "tables",
    icon: "🟨",
    dims: '48" L x 24" W',
    price: 6,
    stock: 2,
    desc: "Sized for little ones. Perfect for birthday activities and crafts."
  },
  {
    id: "chair",
    name: "Chairs",
    category: "chairs",
    icon: "🪑",
    dims: "Standard folding chairs",
    price: 2,
    stock: 100,
    desc: "Sturdy, comfortable seating for any size event."
  },
  {
    id: "kids-chair",
    name: "Kids Chairs",
    category: "chairs",
    icon: "🧒",
    dims: "Kid-sized folding chairs",
    price: 1,
    stock: 24,
    desc: "A perfectly-sized seat for your youngest guests."
  },
  {
    id: "jumper-classic",
    name: "Classic Bounce House",
    category: "jumpers",
    icon: "🎪",
    dims: "13' x 13' x 15' tall",
    price: 90,
    stock: 2,
    desc: "Commercial-grade bounce houses. Safe, durable, and fun for all ages.",
    colors: [
      { id: "crayon", label: "Crayon", detail: "Blue base, red/green/orange/blue pillars" },
      { id: "classic", label: "Purple", detail: "Purple base, blue pillars, pink face" }
    ]
  },
  {
    id: "jumper-slide",
    name: "Bounce House with Mini Slide",
    category: "jumpers",
    icon: "🛝",
    dims: "13' x 13' x 15' tall",
    price: 110,
    stock: 3,
    desc: "All the bounce house fun, plus a built-in mini slide.",
    colors: [
      { id: "pink", label: "Pink", detail: "Pink base, blue pillars, grey face" },
      { id: "jungle", label: "Jungle", detail: "Green base, brown pillars, yellow face" },
      { id: "rainbow", label: "Rainbow", detail: "Blue base, green/blue/red/orange pillars, yellow face" }
    ]
  },
  {
    id: "jumper-wet",
    name: "Medium Wet Combo Slide",
    category: "jumpers",
    icon: "💦",
    dims: "13' x 21' x 15' tall",
    price: 175,
    stock: 1,
    desc: "Medium water jumper, perfect for beating the summer heat."
  },
  {
    id: "jumper-combo",
    name: "Large Dry & Wet Combo Slide",
    category: "jumpers",
    icon: "🌊",
    dims: "13' x 27' x 15' tall",
    price: 200,
    wetPrice: 250,
    hasMode: true,
    stock: 2,
    desc: "Our biggest attraction, a giant slide usable for dry or wet.",
    colors: [
      { id: "rainbow", label: "Rainbow", detail: "Blue base, red/green/blue/yellow pillars, yellow face" },
      { id: "purple", label: "Purple", detail: "Purple base, pink pillars, yellow face" }
    ]
  },
  {
    id: "patio-heater",
    name: "Patio Heater",
    category: "extras",
    icon: "🔥",
    dims: "7' tall, propane",
    price: 45,
    stock: 2,
    desc: "Keep guests warm outdoors. Great for evening events and cooler months."
  },
  {
    id: "turf",
    name: "Turf",
    category: "extras",
    icon: "🟩",
    dims: "",
    price: 180,
    stock: 3,
    desc: "Premium artificial turf flooring. Great for laying over dirt or pavement. If the size you need isn't shown, contact us and we can adjust to your sizing needs.",
    hideSizePrices: true,
    sizes: [
      { id: "7.5x30", label: "7.5' x 30'", price: 180 },
      { id: "7.5x20", label: "7.5' x 20'", price: 120 },
      { id: "7.5x10", label: "7.5' x 10'", price: 60 }
    ]
  },
  {
    id: "tent-party",
    name: "Party Canopy",
    category: "extras",
    icon: "⛺",
    dims: "",
    price: 140,
    stock: 1,
    desc: "Spacious frame tent for large gatherings, ideal for weddings and big celebrations.",
    sizes: [
      { id: "20x10", label: "20' x 10'", price: 140 },
      { id: "20x20", label: "20' x 20'", price: 170 },
      { id: "20x30", label: "20' x 30'", price: 200 }
    ]
  },
  {
    id: "tent-regular",
    name: "Regular Pop Up Canopy",
    category: "extras",
    icon: "⛱️",
    dims: "10' x 10'",
    price: 25,
    stock: 5,
    desc: "Pop-up canopy tent, perfect for smaller backyard parties and shade."
  },
  {
    id: "marquee-numbers",
    name: "Marquee Numbers",
    category: "extras",
    icon: "🔢",
    dims: "4' tall, light-up",
    price: 40,
    stock: 2,
    desc: "Light-up marquee numbers, a bright centerpiece for birthdays and milestone celebrations.",
    numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    materials: [
      { id: "foam", label: "Foam", price: 25 },
      { id: "wood", label: "Wood", price: 40 }
    ]
  },
  {
    id: "favor-wall",
    name: "Favor Wall Display",
    category: "extras",
    icon: "🎁",
    dims: "",
    price: 70,
    stock: 1,
    desc: "A decorative display wall for party favors, treats, or gifts — a fun grab-and-go moment for guests."
  },
  {
    id: "taco-catering-basic",
    name: "Basic Taco Catering",
    category: "catering",
    icon: "🌮",
    dims: "Serves up to 30 guests",
    price: 575,
    stock: 5,
    desc: "Chicken and beef tacos on corn or flour tortillas, with rice, beans, and a classic salsa bar — salsa roja, salsa verde, onions, cilantro, and lime.",
    details: [
      "3 Meats: Beef, Chicken, Pork",
      "Mexican Rice",
      "Choice of Beans",
      "2 Sauces: Green, Red",
      "2 Toppings: Onions, Cilantro",
      "1 Drink: Horchata"
    ],
    extras: [
      { name: "Regular Hot Dogs", price: 75 },
      { name: "Bacon Wrapped Hot Dogs", price: 100 },
      { name: "Fruit Platter", price: 70 },
      { name: "Esquites", price: 300 }
    ]
  },
  {
    id: "taco-catering-standard",
    name: "Standard Taco Catering",
    category: "catering",
    icon: "🌮🌮",
    dims: "Serves up to 50 guests",
    price: 900,
    stock: 3,
    desc: "Everything in the Basic package, plus carne asada, guacamole, tortilla chips, and your choice of horchata or agua fresca.",
    details: [
      "3 Meats: Beef, Chicken, Pork",
      "Mexican Rice",
      "Choice of Beans",
      "3 Sauces: Green, Red, Avocado",
      "4 Toppings: Onions, Cilantro, Lime Wedges, Pickled Red Onion",
      "2 Drinks: Horchata, Jamaica",
      "1 Dessert: Strawberry Banana Parfait"
    ],
    extras: [
      { name: "Regular Hot Dogs", price: 140 },
      { name: "Bacon Wrapped Hot Dogs", price: 180 },
      { name: "Fruit Platter", price: 110 },
      { name: "Esquites", price: 500 }
    ]
  },
  {
    id: "taco-catering-premium",
    name: "Premium Taco Catering",
    category: "catering",
    icon: "🌮🌮🌮",
    dims: "Serves up to 75 guests",
    price: 1300,
    stock: 2,
    desc: "Our full taco bar experience: carne asada, al pastor, and shrimp tacos, a loaded salsa and toppings bar, chips and guacamole, horchata, and churros for dessert.",
    details: [
      "3 Meats: Beef, Chicken, Pork",
      "Mexican Rice",
      "Choice of Beans",
      "3 Sauces: Green, Red, Avocado",
      "5 Toppings: Onions, Cilantro, Lime Wedges, Pickled Red Onion, Pico de Gallo",
      "3 Drinks: Horchata, Jamaica, Cucumber",
      "2 Desserts: Strawberry Banana Parfait, Rice Milk Pudding"
    ],
    extras: [
      { name: "Regular Hot Dogs", price: 190 },
      { name: "Bacon Wrapped Hot Dogs", price: 250 },
      { name: "Fruit Platter", price: 150 },
      { name: "Esquites", price: 750 }
    ]
  }
];

const CATEGORIES = [
  { id: "tables", label: "Tables", icon: "🟦", blurb: "Heavy Duty Rectangle, Round & Kids Tables" },
  { id: "chairs", label: "Chairs", icon: "🪑", blurb: "Heavy Duty Standard & Kids Chairs" },
  { id: "jumpers", label: "Jumpers & Slides", icon: "🎪", blurb: "Bounce houses, wet jumpers & combo slides" },
  { id: "extras", label: "Extras", icon: "🔥", blurb: "Patio heaters, turf, and canopy tents" }
];

const BUNDLES = [
  {
    id: "bundle-birthday",
    name: "Backyard Birthday Bundle",
    tag: "Most Popular",
    price: 199,
    discount: 20,
    items: [
      { id: "jumper-classic", qty: 1 },
      { id: "rect-table", qty: 6, altId: "round-table", altQty: 5 },
      { id: "chair", qty: 40 }
    ]
  },
  {
    id: "bundle-splash",
    name: "Splash Bash Bundle",
    tag: "Summer Favorite",
    price: 369,
    discount: 20,
    items: [
      { id: "jumper-combo", qty: 1, mode: "wet" },
      { id: "rect-table", qty: 7, altId: "round-table", altQty: 6 },
      { id: "chair", qty: 40 }
    ]
  },
  {
    id: "bundle-kids",
    name: "Kids Party Starter",
    tag: "Great Value",
    price: 129,
    items: [
      { id: "jumper-slide", qty: 1 },
      { id: "kids-table", qty: 2 },
      { id: "kids-chair", qty: 24 }
    ]
  },
  {
    id: "bundle-taco-basic",
    name: "Basic Taco Bundle",
    tag: "Small Gatherings",
    price: 700,
    discount: 50,
    guests: 30,
    items: [
      { id: "taco-catering-basic", qty: 1 },
      { id: "rect-table", qty: 5, altId: "round-table", altQty: 4 },
      { id: "chair", qty: 32 }
    ],
    note: 'To see what this catering package contains, go to the <a href="catering.html">Catering page</a>.'
  },
  {
    id: "bundle-taco-standard",
    name: "Standard Taco Bundle",
    tag: "Most Popular",
    price: 900,
    discount: 100,
    guests: 50,
    items: [
      { id: "taco-catering-standard", qty: 1 },
      { id: "rect-table", qty: 8, altId: "round-table", altQty: 6 },
      { id: "chair", qty: 50 }
    ],
    note: 'To see what this catering package contains, go to the <a href="catering.html">Catering page</a>.'
  },
  {
    id: "bundle-taco-premium",
    name: "Premium Taco Bundle",
    tag: "Full-Service",
    price: 1400,
    discount: 150,
    guests: 75,
    items: [
      { id: "taco-catering-premium", qty: 1 },
      { id: "rect-table", qty: 10, altId: "round-table", altQty: 8 },
      { id: "chair", qty: 75 }
    ],
    note: 'To see what this catering package contains, go to the <a href="catering.html">Catering page</a>.'
  }
];
