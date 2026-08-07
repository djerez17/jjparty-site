/* Delivery fee estimate based on straight-line distance from Moreno
   Valley (zip 92553) to the customer's ZIP code. Uses the free,
   keyless Zippopotam.us API to look up ZIP coordinates — no API key
   or embedded zip database needed. */

const BUSINESS_ZIP = "92553";
const BUSINESS_COORDS = { lat: 33.9157, lng: -117.2351 };
const FREE_ZIPS = ["92553"];
const DELIVERY_TIERS = [
  { maxMiles: 15, fee: 15 },
  { maxMiles: 30, fee: 30 }
];

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

function haversineMiles(lat1, lng1, lat2, lng2) {
  const R = 3958.8; // Earth radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function estimateDeliveryFee(zip, lang = "en") {
  const es = lang === "es";

  if (!/^\d{5}$/.test(zip)) {
    return {
      status: "invalid",
      message: es ? "Ingresa un código postal válido de 5 dígitos." : "Enter a valid 5-digit ZIP code."
    };
  }

  if (FREE_ZIPS.includes(zip)) {
    return {
      status: "free",
      fee: 0,
      message: es ? "Entrega gratis — código postal de Moreno Valley." : "Free delivery — Moreno Valley ZIP code."
    };
  }

  try {
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!res.ok) {
      return {
        status: "unknown",
        message: es
          ? "No pudimos encontrar ese código postal — confirmaremos el costo de entrega cuando te contactemos."
          : "We couldn't find that ZIP code — we'll confirm delivery cost when we follow up."
      };
    }
    const data = await res.json();
    const place = data.places[0];
    const distance = haversineMiles(
      BUSINESS_COORDS.lat,
      BUSINESS_COORDS.lng,
      parseFloat(place.latitude),
      parseFloat(place.longitude)
    );

    const tier = DELIVERY_TIERS.find((t) => distance <= t.maxMiles);
    if (tier) {
      return {
        status: "fee",
        fee: tier.fee,
        distance,
        message: es
          ? `Costo de entrega de ${formatMoney(tier.fee)} (~${distance.toFixed(1)} millas desde Moreno Valley).`
          : `${formatMoney(tier.fee)} delivery fee (~${distance.toFixed(1)} miles from Moreno Valley).`
      };
    }
    return {
      status: "contact",
      distance,
      message: es
        ? `Estás a unas ${distance.toFixed(0)} millas de distancia — contáctanos para una cotización de entrega.`
        : `You're about ${distance.toFixed(0)} miles away — please contact us for a delivery quote.`
    };
  } catch (e) {
    return {
      status: "unknown",
      message: es
        ? "No pudimos calcular el costo de entrega en este momento — confirmaremos el costo cuando te contactemos."
        : "We couldn't estimate delivery right now — we'll confirm the cost when we follow up."
    };
  }
}
