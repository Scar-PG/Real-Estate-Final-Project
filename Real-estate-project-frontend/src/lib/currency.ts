export type CountryCode = 'IN' | 'US' | 'EU' | 'UK' | 'AE';

const COUNTRY_KEY = 'app:country';
export const defaultCountry: CountryCode = 'IN';

export function getSavedCountry(): CountryCode {
  try {
    const saved = localStorage.getItem(COUNTRY_KEY);
    if (saved === 'IN' || saved === 'US' || saved === 'EU' || saved === 'UK' || saved === 'AE') return saved as CountryCode;
  } catch {}
  return defaultCountry;
}

export function saveCountry(country: CountryCode) {
  try {
    localStorage.setItem(COUNTRY_KEY, country);
  } catch {}
}

export function currencyForCountry(country: CountryCode): string {
  switch (country) {
    case 'IN':
      return 'INR';
    case 'US':
      return 'USD';
    case 'EU':
      return 'EUR';
    case 'UK':
      return 'GBP';
    case 'AE':
      return 'AED';
    default:
      return 'USD';
  }
}

export function localeForCountry(country: CountryCode): string {
  switch (country) {
    case 'IN':
      return 'en-IN';
    case 'US':
      return 'en-US';
    case 'EU':
      return 'de-DE';
    case 'UK':
      return 'en-GB';
    case 'AE':
      return 'en-AE';
    default:
      return 'en-US';
  }
}

export function formatCurrency(amount: number, country?: CountryCode): string {
  const c = country || getSavedCountry();
  const currency = currencyForCountry(c);
  const locale = localeForCountry(c);
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    // Fallback formatting
    return `${currency} ${Math.round(amount).toLocaleString()}`;
  }
}

// --- Exchange rate helpers (base: USD) ---
// Note: Static snapshot; in production pull from an FX API.
const USD_TO: Record<string, number> = {
  USD: 1,
  INR: 84,   // approx
  EUR: 0.93, // approx
  GBP: 0.78, // approx
  AED: 3.67, // pegged
};

export function convertUSDTo(amountUSD: number, country?: CountryCode): number {
  const c = country || getSavedCountry();
  const cur = currencyForCountry(c);
  const rate = USD_TO[cur] ?? 1;
  return amountUSD * rate;
}

export function convertAndFormatUSD(amountUSD: number, country?: CountryCode): string {
  const c = country || getSavedCountry();
  const converted = convertUSDTo(amountUSD, c);
  return formatCurrency(converted, c);
}
