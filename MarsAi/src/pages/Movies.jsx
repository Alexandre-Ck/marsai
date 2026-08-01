import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MoviesPage from './MoviesPage';

export default function GalerieFilms() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // On nettoie la fausse pagination en dur qui n'était pas synchronisée avec ta base de données !
  window.scrollTo(0, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 font-sans">
      <div className="mb-12 md:mx-17">
        <button
          onClick={() => navigate('/Home')}
          className="text-[#1e293b] text-xs font-black flex items-center gap-2 mb-6 uppercase tracking-widest hover:opacity-80"
        >
          <span className="text-lg">←</span> {t('movies.back_home')}
        </button>
        <br />
        <br />
        <h1 className="text-7xl font-black text-[#282828] leading-[0.9] tracking-tighter mb-2">
          {t('movies.gallery_title').split('\n')[0]} <br />
          <span className="text-[#FF5845]">
            {t('movies.gallery_title_span')}
          </span>
        </h1>

        <p>{t('movies.gallery_description')}</p>
      </div>

      {/* C'est ce composant qui récupère dynamiquement tes films depuis l'API */}
      <div>
        <MoviesPage />
      </div>
    </div>
  );
}