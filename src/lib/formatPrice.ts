/**
 * Formats a price amount using the destination's locale and currency.
 * Per SKILL.md rule: prices always in dynamic format based on destination.
 * Never hardcode currency symbols.
 */

export interface PriceFormatOptions {
    amount: number;
    currency: string;    // ISO 4217: "EUR", "JPY", "GBP", "THB", etc.
    locale: string;      // BCP 47: "es-ES", "ja-JP", "en-GB", etc.
    compact?: boolean;   // e.g. "€1.2K" instead of "€1,200"
}

/**
 * Map of destination regions to their primary currency and locale.
 */
export const DESTINATION_LOCALES: Record<string, { currency: string; locale: string }> = {
    // Europe
    'España': { currency: 'EUR', locale: 'es-ES' },
    'Francia': { currency: 'EUR', locale: 'fr-FR' },
    'Italia': { currency: 'EUR', locale: 'it-IT' },
    'Grecia': { currency: 'EUR', locale: 'el-GR' },
    'Portugal': { currency: 'EUR', locale: 'pt-PT' },
    'Reino Unido': { currency: 'GBP', locale: 'en-GB' },
    'Suiza': { currency: 'CHF', locale: 'de-CH' },
    // Asia
    'Japón': { currency: 'JPY', locale: 'ja-JP' },
    'Tailandia': { currency: 'THB', locale: 'th-TH' },
    'Indonesia': { currency: 'IDR', locale: 'id-ID' },
    'Vietnam': { currency: 'VND', locale: 'vi-VN' },
    'Singapur': { currency: 'SGD', locale: 'en-SG' },
    'Corea del Sur': { currency: 'KRW', locale: 'ko-KR' },
    'India': { currency: 'INR', locale: 'hi-IN' },
};

/** Fallback locale when destination is not configured */
const FALLBACK: PriceFormatOptions = { amount: 0, currency: 'USD', locale: 'en-US' };

/**
 * Returns a formatted price string using Intl.NumberFormat.
 * @example
 * formatPrice({ amount: 1200, currency: 'EUR', locale: 'es-ES' }) → "1.200 €"
 * formatPrice({ amount: 150000, currency: 'JPY', locale: 'ja-JP' }) → "¥150,000"
 */
export function formatPrice({ amount, currency, locale, compact = false }: PriceFormatOptions): string {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            notation: compact ? 'compact' : 'standard',
            maximumFractionDigits: currency === 'JPY' || currency === 'KRW' || currency === 'VND' || currency === 'MXN' ? 0 : 2,
        }).format(amount);
    } catch {
        // Fallback to USD if locale/currency combo is invalid
        return new Intl.NumberFormat(FALLBACK.locale, {
            style: 'currency',
            currency: FALLBACK.currency,
            maximumFractionDigits: 0
        }).format(amount);
    }
}

/**
 * Gets the locale config for a given destination name.
 * Falls back to USD/en-US if not found.
 */
export function getDestinationLocale(destination: string) {
    return DESTINATION_LOCALES[destination] ?? { currency: 'USD', locale: 'en-US' };
}
