const fs = require('fs');
const path = require('path');

const inputPath = path.join('c:', 'Users', 'mando', 'iCloudDrive', 'Antigravity', 'datos_tours.txt.txt');
const outputPath = path.join('c:', 'Users', 'mando', 'iCloudDrive', 'Antigravity', 'travel-platform', 'src', 'lib', 'trips.ts');

let content = fs.readFileSync(inputPath, 'utf8');

// CRITICAL: Rebranding - replace any iteration of Mundo Joven
content = content.replace(/Mundo Joven/gi, 'EuroAsia Tours');

const tourBlocks = content.split(/TOUR \d{2}\s*={80}/i).slice(1);

const unsplashImages = [
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2000&auto=format&fit=crop", // Europa Total
    "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=2000&auto=format&fit=crop", // Gran Vuelta Europa (Madrid)
    "https://images.unsplash.com/photo-1522814890654-e9102b4d956a?q=80&w=2000&auto=format&fit=crop", // Escapada Europa
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop", // Paraiso Europeo
    "https://images.unsplash.com/photo-1529260830199-42b24126f198?q=80&w=2000&auto=format&fit=crop", // Escapada a Italia
    "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=2000&auto=format&fit=crop", // Europa Magnifica
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2000&auto=format&fit=crop", // Japon Samurai
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2000&auto=format&fit=crop", // Japon con vuelo
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=2000&auto=format&fit=crop", // China
    "https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=2000&auto=format&fit=crop", // Turquia
    "https://images.unsplash.com/photo-1647413491410-67c0cd385e05?q=80&w=2000&auto=format&fit=crop", // Turquia Clasico
    "https://images.unsplash.com/photo-1539650116574-8efeb43e2b08?q=80&w=2000&auto=format&fit=crop"  // Egipto
];

const ids = [
    "europa-total",
    "gran-vuelta-europa",
    "escapada-europa",
    "paraiso-europeo",
    "escapada-italia",
    "europa-magnifica",
    "japon-samurai",
    "japon-vuelo",
    "mejor-china",
    "turquia-vuelo",
    "turquia-clasico",
    "egipto-clasico"
];

const trips = {};

tourBlocks.forEach((block, index) => {
    const id = ids[index];
    const image = unsplashImages[index];

    // Parse Name
    const nameMatch = block.match(/Nombre del Paquete:\s*(.+)/);
    const name = nameMatch ? nameMatch[1].trim() : '';

    // Parse Price
    const priceMatch = block.match(/Precio desde:\s*\$([\d,.]+)\s*MXN/);
    let priceUnit = 0;
    if (priceMatch) {
        const basePrice = parseFloat(priceMatch[1].replace(/,/g, ''));
        // 15% discount, then multiply by 100 for cents
        priceUnit = Math.round((basePrice * 0.85) * 100);
    }

    // Parse Itinerary
    const itineraryMatch = block.match(/-{60}\r?\nITINERARIO:\r?\n-{60}\r?\n([\s\S]+?)\r?\n-{60}/);
    const itineraryText = itineraryMatch ? itineraryMatch[1].trim() : '';
    const itinerary = itineraryText.split(/\r?\nDía \d+\.\s*/).map(s => s.trim()).filter(Boolean);
    // Add "Día X. " back since we split by it
    let dayCounter = 1;
    const formattedItinerary = itineraryText.split(/\r?\n(?=Día \d+\.)/).map(s => s.trim()).filter(Boolean);
    const nights = Math.max(1, formattedItinerary.length - 1); // rough estimate

    // Parse Includes
    const includesMatch = block.match(/QUÉ INCLUYE:\r?\n-{60}\r?\n([\s\S]+?)\r?\n-{60}/);
    let includes = [];
    if (includesMatch) {
        includes = includesMatch[1].split(/\r?\n/).map(s => s.replace(/^- /, '').trim()).filter(Boolean);
    }

    // Parse Excludes
    const excludesMatch = block.match(/QUÉ NO INCLUYE:\r?\n-{60}\r?\n([\s\S]+?)\r?\n-{60}/);
    let excludes = [];
    if (excludesMatch) {
        excludes = excludesMatch[1].split(/\r?\n/).map(s => s.replace(/^- /, '').trim()).filter(Boolean);
    }

    // Parse Terms
    const termsMatch = block.match(/TÉRMINOS Y CONDICIONES:\r?\n-{60}\r?\n([\s\S]+?)(?=\r?\n={80}|$)/);
    let terms = [];
    if (termsMatch) {
        terms = termsMatch[1].split(/\r?\n/).map(s => s.replace(/^- /, '').trim()).filter(Boolean);
    }

    // Country / Region logic
    let country = "Europa";
    let region = "EUROPE";
    let emoji = "🌍";
    if (name.toLowerCase().includes("italia")) { country = "Italia"; emoji = "🍕"; }
    else if (name.toLowerCase().includes("japón") || name.toLowerCase().includes("japon")) { country = "Japón"; region = "ASIA"; emoji = "🎌"; }
    else if (name.toLowerCase().includes("china")) { country = "China"; region = "ASIA"; emoji = "🐉"; }
    else if (name.toLowerCase().includes("turquía") || name.toLowerCase().includes("turquia")) { country = "Turquía"; region = "EUROPE"; emoji = "🕌"; }
    else if (name.toLowerCase().includes("egipto")) { country = "Egipto"; region = "ASIA"; emoji = "🐪"; }
    else if (name.toLowerCase().includes("europa")) { country = "Europa"; emoji = "🇪🇺"; }

    trips[id] = {
        id,
        name,
        destination: name,
        country,
        region,
        priceUnit,
        currency: "MXN",
        locale: "es-MX",
        emoji,
        description: `Disfruta de este espectacular tour: ${name}. Revisa el itinerario para más detalles de tu viaje.`,
        travelDates: "Enero 2027 - Septiembre 2027",
        nights,
        itinerary: formattedItinerary,
        includes,
        excludes,
        terms,
        image
    };
});

const tsContent = `/**
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
    /** Detailed itinerary */
    itinerary?: string[];
    /** What is included */
    includes?: string[];
    /** What is not included */
    excludes?: string[];
    /** Terms and conditions */
    terms?: string | string[];
    /** Main hero image for the tour */
    image?: string;
}

/**
 * Authoritative price catalogue — single source of truth for all trip prices.
 * Prices are in the SMALLEST currency unit (Stripe convention):
 *   - EUR/USD/GBP/MXN → cents  (19380 MXN = 1938000)
 */
export const TRIPS_CATALOGUE: Record<string, Trip> = ${JSON.stringify(trips, null, 4)};

export function getTripById(id: string): Trip | null {
    return TRIPS_CATALOGUE[id] ?? null;
}
`;

fs.writeFileSync(outputPath, tsContent, 'utf8');
console.log('Successfully updated trips.ts with 12 parsed tours and 15% discount!');
