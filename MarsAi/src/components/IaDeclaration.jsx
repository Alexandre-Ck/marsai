import React from 'react';
import { FiFilm } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const IaDeclaration = ({ formData, update, errors = {} }) => {
  const { t } = useTranslation();

  const setClassification = value => update({ is_hybrid: value === 'hybride' });

  const getBorderClass = fieldName =>
    errors[fieldName]
      ? 'border-2 border-red-500 focus:ring-red-400'
      : 'border-none focus:ring-blue-400';

  return (
    <section className="flex justify-center items-center bg-gray-100 p-6">
      <article className="w-full max-w-4xl bg-black rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <header className="flex items-center gap-4 mb-10">
          <div className="p-2 border-2 border-slate-300 rounded-md">
            <FiFilm className="w-6 h-6 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold tracking-widest text-slate-500 uppercase">
            {t('ia_declaration.step')} 02. {t('ia_declaration.title')}
          </h2>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
          {/* Choix Hybride / 100% IA */}
          <section className="space-y-4">
            <label className="text-sm font-bold tracking-wider text-slate-500 uppercase">
              {t('ia_declaration.classification_label')} *
            </label>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setClassification('hybride')}
                className={`flex-1 p-4 rounded-xl text-sm uppercase font-bold transition-all
                  ${formData.is_hybrid ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {t('ia_declaration.hybrid')}
              </button>

              <button
                type="button"
                onClick={() => setClassification('100ia')}
                className={`flex-1 p-4 rounded-xl text-sm uppercase font-bold transition-all
                  ${!formData.is_hybrid ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                {t('ia_declaration.full_ia')}
              </button>
            </div>
            {errors.is_hybrid && (
              <p className="text-xs text-red-500 font-medium">{errors.is_hybrid}</p>
            )}
          </section>

          {/* Stack Technologie */}
          <section className="md:col-span-2 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold tracking-wider text-slate-500 uppercase">
                {t('ia_declaration.tech_stack')} *
              </label>
            </div>
            <textarea
              value={formData.ia_tools || ''}
              onChange={e => update({ ia_tools: e.target.value })}
              placeholder={t('ia_declaration.tech_stack_placeholder')}
              className={`w-full bg-gray-100 rounded-2xl p-4 h-32 text-sm placeholder:text-gray-400 focus:ring-2 outline-none transition-all resize-none leading-relaxed ${getBorderClass('ia_tools')}`}
            />
            {errors.ia_tools && (
              <p className="text-xs text-red-500 font-medium">{errors.ia_tools}</p>
            )}
          </section>

          {/* Méthodologie créative */}
          <section className="md:col-span-2 space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-bold tracking-wider text-slate-500 uppercase">
                {t('ia_declaration.creative_methodology')} *
              </label>
            </div>
            <textarea
              value={formData.creative_process || ''}
              onChange={e => update({ creative_process: e.target.value })}
              placeholder={t('ia_declaration.creative_methodology_placeholder')}
              className={`w-full bg-gray-100 rounded-2xl p-4 h-32 text-sm placeholder:text-gray-400 focus:ring-2 outline-none transition-all resize-none leading-relaxed ${getBorderClass('creative_process')}`}
            />
            {errors.creative_process && (
              <p className="text-xs text-red-500 font-medium">{errors.creative_process}</p>
            )}
          </section>
        </section>
      </article>
    </section>
  );
};

export default IaDeclaration;