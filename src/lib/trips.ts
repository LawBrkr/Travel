/**
 * trips.ts — Server-side price catalogue.
 *
 * SECURITY: The client NEVER sends the price. The server always looks up the
 * canonical price by tripId. This prevents price-tampering attacks.
 *
 * Per SKILL.md: prices in dynamic format per destination currency.
 */

export interface Trip {
    id: string;
    name: string;
    destination: string;
    country: string;
    region: "EUROPE" | "ASIA";
    /** Price per person in the smallest currency unit (cents / yen / etc.) */
    priceUnit: number;
    /** ISO 4217 currency code */
    currency: string;
    /** BCP 47 locale for display */
    locale: string;
    emoji: string;
    /** Human-readable description shown on Stripe checkout */
    description: string;
    /** Dates available for travel */
    travelDates: string;
    /** Duration in nights */
    nights: number;
}

/**
 * Authoritative price catalogue — single source of truth for all trip prices.
 * Prices are in the SMALLEST currency unit (Stripe convention):
 *   - EUR/USD/GBP/MXN → cents  (19380 MXN = 1938000)
 */
export const TRIPS_CATALOGUE: Record<string, Trip> = {
    "europa-total": {
        id: "europa-total",
        name: "Europa total con vuelo",
        destination: "Europa total con vuelo",
        country: "Europa",
        region: "EUROPE",
        priceUnit: 4967000,
        currency: "MXN",
        locale: "es-MX",
        emoji: "🇪🇺",
        description: "Disfruta de este espectacular tour de 14 destinos en un sólo viaje: Madrid, Burgos, Burdeos, Blois, París, Lucerna, Zurich, Venecia, Roma, Florencia, Pisa, Niza, Barcelona y Zaragoza.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 14,
    },
    "gran-vuelta-europa": {
        id: "gran-vuelta-europa",
        name: "Gran Vuelta por Europa con Vuelo",
        destination: "Gran Vuelta por Europa con Vuelo",
        country: "Europa",
        region: "EUROPE",
        priceUnit: 4782800,
        currency: "MXN",
        locale: "es-MX",
        emoji: "🏰",
        description: "Disfruta de este espectacular tour de 15 destinos en un sólo viaje, la mejor experiencia en viajes a Europa en un circuito.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 15,
    },
    "escapada-europa": {
        id: "escapada-europa",
        name: "Escapada a Europa",
        destination: "Escapada a Europa",
        country: "Europa",
        region: "EUROPE",
        priceUnit: 2927100,
        currency: "MXN",
        locale: "es-MX",
        emoji: "✈️",
        description: "Disfruta de este espectacular tour de 5 destinos en un solo viaje: Madrid, Burgos, Burdeos, Blois, París.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 5,
    },
    "paraiso-europeo": {
        id: "paraiso-europeo",
        name: "Paraíso Europeo",
        destination: "Paraíso Europeo",
        country: "Europa",
        region: "EUROPE",
        priceUnit: 2766000,
        currency: "MXN",
        locale: "es-MX",
        emoji: "🌷",
        description: "Disfruta de este espectacular tour de 5 destinos en un sólo viaje: Londres, París, Bruselas, Gante, Brujas, Amberes, La Haya, Ámsterdam.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 8,
    },
    "escapada-italia": {
        id: "escapada-italia",
        name: "Escapada a Italia",
        destination: "Escapada a Italia",
        country: "Italia",
        region: "EUROPE",
        priceUnit: 2337100,
        currency: "MXN",
        locale: "es-MX",
        emoji: "🍕",
        description: "Disfruta de este espectacular tour de 4 destinos en un solo viaje: Roma, Venecia, Florencia y Milán.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 4,
    },
    "europa-magnifica": {
        id: "europa-magnifica",
        name: "Europa magnifica",
        destination: "Europa magnifica",
        country: "Europa",
        region: "EUROPE",
        priceUnit: 2469700,
        currency: "MXN",
        locale: "es-MX",
        emoji: "⭐",
        description: "Disfruta de este espectacular tour por los mejores destinos de Europa y mucho más.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 10,
    },
    "japon-samurai": {
        id: "japon-samurai",
        name: "Japón camino del Samurai con vuelo",
        destination: "Japón camino del Samurai con vuelo",
        country: "Japón",
        region: "ASIA",
        priceUnit: 5887800,
        currency: "MXN",
        locale: "es-MX",
        emoji: "🎌",
        description: "Disfruta de este espectacular tour de 3 impresionantes destinos en un sólo viaje: Hiroshima, Osaka, Tokio y mucho más.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 10,
    },
    "japon-vuelo": {
        id: "japon-vuelo",
        name: "Japón con vuelo",
        destination: "Japón con vuelo",
        country: "Japón",
        region: "ASIA",
        priceUnit: 5519500,
        currency: "MXN",
        locale: "es-MX",
        emoji: "🗼",
        description: "Disfruta de este espectacular tour en las entrañas de todo Japón, explorando Tokio y Kioto.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 10,
    },
    "mejor-china": {
        id: "mejor-china",
        name: "Lo mejor de China",
        destination: "Lo mejor de China",
        country: "China",
        region: "ASIA",
        priceUnit: 3733700,
        currency: "MXN",
        locale: "es-MX",
        emoji: "🐉",
        description: "Disfruta de este espectacular tour de 3 destinos en un sólo viaje por los mejores lugares de China: Beijing, Xi'an (en tren), Shanghái (en vuelo) y Disney Shanghái.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 10,
    },
    "turquia-vuelo": {
        id: "turquia-vuelo",
        name: "Turquía con vuelo",
        destination: "Turquía con vuelo",
        country: "Turquía",
        region: "EUROPE",
        priceUnit: 3677800,
        currency: "MXN",
        locale: "es-MX",
        emoji: "🕌",
        description: "Disfruta de este espectacular tour por los mejores destinos de Turquía en un sólo viaje: Estambul, Capadocia, Pamukkale, Ankara, Kusadasi y mucho más.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 10,
    },
    "turquia-clasico": {
        id: "turquia-clasico",
        name: "Turquía clásico libre",
        destination: "Turquía clásico libre",
        country: "Turquía",
        region: "EUROPE",
        priceUnit: 1024200,
        currency: "MXN",
        locale: "es-MX",
        emoji: "🎈",
        description: "Disfruta de este espectacular tour de 4 destinos en un solo viaje: Estambul, Ankara, Capadocia, Pamukkale y más.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 8,
    },
    "egipto-clasico": {
        id: "egipto-clasico",
        name: "Egipto clásico con crucero en el Nilo",
        destination: "Egipto clásico con crucero en el Nilo",
        country: "Egipto",
        region: "ASIA",
        priceUnit: 1780900,
        currency: "MXN",
        locale: "es-MX",
        emoji: "🐪",
        description: "Disfruta de este espectacular tour de 6 destinos en un sólo viaje: Cairo, Luxor, Aswan y mucho más.",
        travelDates: "Enero 2027 - Septiembre 2027",
        nights: 8,
    }
};

export function getTripById(id: string): Trip | null {
    return TRIPS_CATALOGUE[id] ?? null;
}
