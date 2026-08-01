import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { MdEvent } from 'react-icons/md';
import bgPlace from '../../assets/port-marseille.webp';
import bgPlaceFallBack from '../../assets/port-marseille-fallback.jpg';

export function Card({ icon: Icon, title, text, className }) {
  const { t } = useTranslation();

  return (
    <article
      className={`bg-white border border-[#D5DAE1] rounded-4xl p-6 ${className}`}
    >
      <Icon className="text-[#ff5845] text-4xl" />
      <h3 className="font-bold text-[#282828] text-2xl mt-2">
        {t(title, { defaultValue: title })}
      </h3>
      <p className="mt-2 text-xl">
        {t(text, { defaultValue: text })}
      </p>
    </article>
  );
}

export function CardMovie({ movie }) {
  const { t } = useTranslation();

  if (movie)
    return (
      <article className="bg-[#F8F9FA] rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-6">
        <div>
          <video
            className="w-full h-[150px] object-cover mb-5 rounded-3xl"
            src={movie.video_url}
            controls
            width="100%"
            type="video/mp4"
            poster={movie.cover_image}
          >
            {t('cards.video_not_supported')}
          </video>
        </div>
        <div className="flex justify-between">
          <h3 className="font-black text-[#282828] text-2xl uppercase tracking-tighter mb-2">
            {movie.original_title || t('cards.default_movie_title')}
          </h3>
          <p className="w-15 text-center bg-[#F2F3F5] text-[#282828] font-bold rounded-xl flex items-center justify-center">
            {movie.duration || t('cards.default_duration_time')}
          </p>
        </div>
        <div className="flex justify-between items-end uppercase">
          <div>
            <p className="text-sm text-[#6B6B6B] font-semibold tracking-widest">
              {t('cards.default_director_label')}
            </p>
            <p className="text-sm font-black text-[#282828]">
              {movie.director_name || t('cards.default_director_name')}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-[#6B6B6B] font-semibold tracking-widest">
              {t('cards.default_country_label')}
            </p>
            <div className="flex items-center gap-1.5 justify-end">
              <Globe
                size={14}
                className="text-[#3b82f6]"
                aria-label="Icone de globe"
              />
              <p className="text-sm font-black text-[#282828]">
                {movie.country || t('cards.default_country_name')}
              </p>
            </div>
          </div>
        </div>
      </article>
    );
}

export function CardFestival({ icon: Icon, title, text }) {
  const { t } = useTranslation();

  return (
    <article className="bg-[#333333] border border-[#626262] rounded-4xl p-8">
      <Icon className="text-[#ff5845] text-5xl" />
      <h3 className="font-bold text-white text-2xl mt-2 uppercase w-full">
        {t(title, { defaultValue: title })}
      </h3>
      <p className="mt-5 text-xl text-[#b4bfce] w-full">
        {t(text, { defaultValue: text })}
      </p>
    </article>
  );
}

export function CardSelection({ title, text, description }) {
  const { t } = useTranslation();

  return (
    <article className="bg-white border border-[#D5DAE1] rounded-4xl p-8">
      <h3 className="font-bold text-[#246BAD] text-2xl uppercase w-full">
        {t(title, { defaultValue: title })}
      </h3>
      <p className="mt-2 font-semibold w-full">
        {t(text, { defaultValue: text })}
      </p>
      <p className="mt-2 font-semibold text-[#64748B] w-full">
        {t(description, { defaultValue: description })}
      </p>
    </article>
  );
}

export function CardCalender({ className }) {
  const { t } = useTranslation();

  return (
    <article
      className={`bg-[#F8F9FA] border border-[#D5DAE1] rounded-4xl py-15 text-center md:p-20 md:px-16 ${className}`}
    >
      <MdEvent className="text-[#246BAD] text-5xl text-center mx-auto" />
      <h3 className="font-bold text-[#282828] text-4xl mt-2 uppercase ">
        13 Juin
      </h3>
      <p className="mt-2 font-bold text-[#282828] uppercase">
        {t('cards_calendar.from_time', 'à partir de 19h')}
      </p>
      <button
        className="bg-[#0f172a] text-white rounded-4xl mt-6 p-3 font-semibold uppercase text-base cursor-pointer md:p-2 md:px-5 md:text-sm hover:bg-[#1e293b] transition-all duration-300"
      >
        {t('cards_calendar.get_pass', 'Prendre mon pass')}
      </button>
    </article>
  );
}

export function CardPlace() {
  return (
    <article className="relative bg-gray-400 rounded-4xl p-10 pt-60 flex flex-col ">
      <picture>
        <source srcSet={bgPlace} type="image/webp" />
        <img
          src={bgPlaceFallBack}
          width="1920"
          height="1080"
          alt="Port de Marseille"
          loading="lazy"
          className="absolute inset-0 object-cover mix-blend-multiply w-full h-full rounded-4xl "
        />
      </picture>
      <p className="relative z-10 text-white text-xl font-semibold mb-3 uppercase text-shadow-lg/90 md:w-100">
        Marseille, France
      </p>
      <h2 className="relative z-10 text-white font-bold text-3xl text-shadow-lg/90 uppercase w-60 md:text-4xl md:w-full">
        Centre Événementiel La Plateforme
      </h2>
    </article>
  );
}

export function CardPartner({ src, srcFallBack, alt }) {
  return (
    <li className="bg-white border border-[#D5DAE1] rounded-4xl flex justify-center place-items-center w-40 h-40">
      <picture>
        <source srcSet={src} type="image/webp" />
        <img
          className="hover:grayscale duration-600 object-contain"
          width="90"
          height="90"
          src={srcFallBack}
          alt={alt}
          loading="lazy"
        />
      </picture>
    </li>
  );
}