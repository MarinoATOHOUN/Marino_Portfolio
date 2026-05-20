import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './locales/en.json'
import fr from './locales/fr.json'
import es from './locales/es.json'

const STORAGE_KEY = 'portfolio_lng'

const SUPPORTED = ['fr', 'en', 'es']

function detectLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && SUPPORTED.includes(stored)) return stored

  const browser = (navigator.language || navigator.languages?.[0] || '').slice(0, 2)
  if (SUPPORTED.includes(browser)) return browser

  return 'fr'
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
    es: { translation: es },
  },
  lng: detectLanguage(),
  fallbackLng: 'fr',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(STORAGE_KEY, lng)
})

export default i18n
