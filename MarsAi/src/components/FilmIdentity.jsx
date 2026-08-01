import React from 'react';
import { FiFilm } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const FilmIdentityForm = ({ formData, update, errors = {} }) => {
  const { t } = useTranslation();

  const mainLanguages = [
    { value: 'Anglais', label: 'Anglais' },
    { value: 'Francais', label: 'Français' },
    { value: 'Espagnol', label: 'Espagnol' },
    { value: 'Mandarin', label: 'Mandarin' },
    { value: 'Hindi', label: 'Hindi' },
    { value: 'Arabe', label: 'Arabe' },
  ];

  const getBorderClass = (fieldName) =>
    errors[fieldName]
      ? 'border-2 border-red-500 focus:ring-red-400'
      : 'border-none focus:ring-blue-400';

  return (
    <section className="flex justify-center items-center bg-gray-100 p-6">
      <article className="w-full max-w-4xl bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <header className="flex items-center gap-4 mb-10">
          <div className="p-2 border-2 border-slate-300 rounded-md">
            <FiFilm className="w-6 h-6 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold tracking-widest text-slate-800 uppercase">
            {t('film_identity.step')} 01. {t('film_identity.title')}
          </h2>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {/* Titre Original */}
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-slate-700 uppercase">
              {t('film_identity.original_title')} *
            </label>
            <input
              type="text"
              placeholder={t('film_identity.original_title_placeholder')}
              value={formData.original_title || ''}
              onChange={e => update({ original_title: e.target.value })}
              className={`w-full bg-gray-100 rounded-xl p-4 text-sm placeholder:text-gray-400 focus:ring-2 outline-none transition-all ${getBorderClass('original_title')}`}
            />
            {errors.original_title && (
              <p className="text-xs text-red-500 font-medium">{errors.original_title}</p>
            )}
          </div>

          {/* Titre Anglais */}
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-slate-700 uppercase">
              {t('film_identity.english_title')} *
            </label>
            <input
              type="text"
              placeholder={t('film_identity.english_title_placeholder')}
              value={formData.english_title || ''}
              onChange={e => update({ english_title: e.target.value })}
              className={`w-full bg-gray-100 rounded-xl p-4 text-sm placeholder:text-gray-400 focus:ring-2 outline-none transition-all ${getBorderClass('english_title')}`}
            />
            {errors.english_title && (
              <p className="text-xs text-red-500 font-medium">{errors.english_title}</p>
            )}
          </div>

          {/* Durée */}
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-slate-700 uppercase">
              {t('film_identity.duration')} *
            </label>
            <input
              type="text"
              placeholder={t('film_identity.duration_placeholder')}
              value={formData.duration || ''}
              onChange={e => update({ duration: e.target.value })}
              className={`w-full bg-gray-100 rounded-xl p-4 text-sm placeholder:text-gray-400 focus:ring-2 outline-none transition-all ${getBorderClass('duration')}`}
            />
            {errors.duration && (
              <p className="text-xs text-red-500 font-medium">{errors.duration}</p>
            )}
          </div>

          {/* Langue */}
          <div className="space-y-2">
            <label className="text-sm font-bold tracking-wider text-slate-700 uppercase">
              {t('film_identity.language')} *
            </label>
            <select
              value={formData.language || ''}
              onChange={e => update({ language: e.target.value })}
              className={`w-full bg-gray-100 rounded-xl p-4 text-sm text-slate-800 focus:ring-2 outline-none transition-all cursor-pointer ${getBorderClass('language')}`}
            >
              <option value="" disabled>
                {t('film_identity.language_placeholder') || 'Sélectionner une langue'}
              </option>
              {mainLanguages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            {errors.language && (
              <p className="text-xs text-red-500 font-medium">{errors.language}</p>
            )}
          </div>

          {/* Synopsis Original */}
          <section className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold tracking-wider text-slate-700 uppercase">
              {t('film_identity.synopsis_original')} *
            </label>
            <textarea
              placeholder={t('film_identity.synopsis_original_placeholder')}
              value={formData.original_synopsis || ''}
              onChange={e => update({ original_synopsis: e.target.value })}
              className={`w-full bg-gray-100 rounded-2xl p-4 h-32 text-sm placeholder:text-gray-400 focus:ring-2 outline-none transition-all resize-none leading-relaxed ${getBorderClass('original_synopsis')}`}
            />
            {errors.original_synopsis && (
              <p className="text-xs text-red-500 font-medium">{errors.original_synopsis}</p>
            )}
          </section>

          {/* Synopsis Anglais */}
          <section className="md:col-span-2 space-y-2">
            <label className="text-sm font-bold tracking-wider text-slate-700 uppercase">
              {t('film_identity.synopsis_english')} *
            </label>
            <textarea
              placeholder={t('film_identity.synopsis_english_placeholder')}
              value={formData.english_synopsis || ''}
              onChange={e => update({ english_synopsis: e.target.value })}
              className={`w-full bg-gray-100 rounded-2xl p-4 h-32 text-sm placeholder:text-gray-400 focus:ring-2 outline-none transition-all resize-none leading-relaxed ${getBorderClass('english_synopsis')}`}
            />
            {errors.english_synopsis && (
              <p className="text-xs text-red-500 font-medium">{errors.english_synopsis}</p>
            )}
          </section>
        </section>
      </article>
    </section>
  );
};

export default FilmIdentityForm;