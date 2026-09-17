
import en from '../locales/en.json' with { type: 'json' };
import vi from '../locales/vi.json' with { type: 'json' };

const STORAGE_KEY = 'enerix-carbon-locale';
const DEFAULT_LOCALE = 'en';

const locales = { en, vi };

// Safe environment detection
const isBrowser = typeof window !== 'undefined';
const hasLocalStorage = typeof localStorage !== 'undefined';

export class I18nManager {
  static currentLocale = (hasLocalStorage ? localStorage.getItem(STORAGE_KEY) : null) || DEFAULT_LOCALE;

  static setLocale(locale) {
    if (locales[locale]) {
      I18nManager.currentLocale = locale;
      if (hasLocalStorage) {
        localStorage.setItem(STORAGE_KEY, locale);
      }
      // Trigger a re-render/refresh in the app
      if (isBrowser) {
        window.location.reload(); 
      }
    }
  }

  static t(key) {
    const locale = locales[I18nManager.currentLocale] || locales[DEFAULT_LOCALE];
    const keys = key.split('.');
    let value = locale;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English
        const enValue = en;
        let fallbackValue = enValue;
        for (const fk of keys) {
            if (fallbackValue && typeof fallbackValue === 'object' && fk in fallbackValue) {
                fallbackValue = fallbackValue[fk];
            } else {
                return key; // Return the key itself if not found
            }
        }
        return fallbackValue;
      }
    }
    return value;
  }
}
if (isBrowser) {
  window.setAppLocale = I18nManager.setLocale;
}
