import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = lang => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="flex items-center bg-slate-100 rounded-full p-1">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-4 py-1 rounded-full text-sm font-semibold transition-all ${
          i18n.language === 'en'
            ? 'bg-[#0f172a] text-white shadow-sm'
            : 'text-slate-600 hover:text-[#0f172a]'
        }`}
      >
        EN
      </button>

      <button
        onClick={() => changeLanguage('fr')}
        className={`px-4 py-1 rounded-full text-sm font-semibold transition-all ${
          i18n.language === 'fr'
            ? 'bg-[#0f172a] text-white shadow-sm'
            : 'text-slate-600 hover:text-[#0f172a]'
        }`}
      >
        FR
      </button>
    </div>
  );
}
