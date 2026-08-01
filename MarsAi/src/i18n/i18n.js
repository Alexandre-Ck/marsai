import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import fr from './locales/fr.json';

i18n
  // Détecte automatiquement la langue du navigateur ou lit le localStorage
  .use(LanguageDetector)
  // Passe i18n à React pour le rendre fonctionnel dans toute l'application
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    // Déclare les langues officiellement supportées
    supportedLngs: ['fr', 'en'],
    // Convertit automatiquement 'en-US', 'en-GB' en 'en'
    nonExplicitSupportedLngs: true,
    // Langue par défaut si la langue du navigateur n'est ni FR ni EN
    fallbackLng: 'fr',

    detection: {
      // Ordre de priorité pour la détection de la langue
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Enregistre la langue sélectionnée dans le localStorage
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false, // Inutile avec React qui protège déjà contre le XSS
    },
  });

export default i18n;