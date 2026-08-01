import React from 'react';
import { useTranslation } from 'react-i18next';

const SynopsisStack = ({ synopsis, techStack }) => {
  const { t } = useTranslation();

  const tools = Array.isArray(techStack)
    ? techStack
    : typeof techStack === 'string' && techStack.trim() !== ''
      ? techStack.split(',').map(t => t.trim()).filter(Boolean)
      : [];

  return (
    <div className="space-y-12">
      {/* Synopsis Section */}
      <section aria-labelledby="synopsis-heading" className="relative">
        <h2 
          id="synopsis-heading" 
          className="text-sm font-bold uppercase tracking-widest text-[#FF5845] mb-5 flex items-center gap-4"
        >
          {t('synopsis_stack.synopsis_title', 'Synopsis')} <span className="h-[1px] flex-1 bg-zinc-300" aria-hidden="true"></span>
        </h2>
        
        <p className="text-zinc-900 text-xl md:text-2xl leading-relaxed font-semibold max-w-4xl normal-case text-left tracking-tight">
          {synopsis || t('synopsis_stack.no_synopsis', 'Aucun résumé disponible pour ce court-métrage.')}
        </p>
      </section>

      {/* IA Section */}
      <section aria-labelledby="tech-heading" className="space-y-6 pt-2">
        <h3 
          id="tech-heading" 
          className="text-sm font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-4"
        >
          {t('synopsis_stack.pipeline_title', 'Pipeline IA & Outils')} <span className="h-[1px] flex-1 bg-zinc-300" aria-hidden="true"></span>
        </h3>
        
        <div className="flex flex-wrap gap-3">
          {tools.length > 0 ? (
            tools.map((tool, index) => (
              <span 
                key={`${tool}-${index}`} 
                className="px-5 py-2.5 rounded-xl bg-white border border-zinc-200 font-extrabold text-xs sm:text-sm text-zinc-800 uppercase tracking-wider shadow-sm hover:border-[#FF5845] hover:text-zinc-950 transition-colors cursor-default"
              >
                {tool}
              </span>
            ))
          ) : (
            <span className="text-zinc-400 text-base italic">
              {t('synopsis_stack.no_tools', 'Aucun outil répertorié')}
            </span>
          )}
        </div>
      </section>
    </div>
  );
};

export default SynopsisStack;