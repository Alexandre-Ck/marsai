import React, { useEffect, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import VideoPlayer from '../components/VideoPlayer';

export default function MoviesPage() {
  const { t } = useTranslation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // PAGINATION PAR SCROLL
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    let cancelled = false;
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/movies`);
        if (!response.ok) throw new Error('Erreur serveur');
        
        const data = await response.json();
        if (!cancelled) {
          setMovies(Array.isArray(data) ? data : []);
          setError('');
        }
      } catch {
        if (!cancelled) {
          setError(t('movies_page.error_loading', 'Impossible de charger la galerie.'));
          setMovies([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchMovies();
    return () => { cancelled = true; };
  }, [t]);

  // Détection du scroll pour ajouter 6 vidéos quand on arrive en bas
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 300
      ) {
        setVisibleCount(prevCount => prevCount + 6);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Remet à 6 visibles lors d'une recherche
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(6);
  };

  const safeMovies = Array.isArray(movies) ? movies : [];
  const filteredMovies = safeMovies.filter(movie => {
    const search = searchTerm.toLowerCase();
    return (
      (movie.original_title?.toLowerCase() || '').includes(search) ||
      (movie.english_title?.toLowerCase() || '').includes(search) ||
      (movie.director_name?.toLowerCase() || '').includes(search)
    );
  });

  // On découpe la liste pour n'afficher que le nombre de vidéos autorisées
  const displayedMovies = filteredMovies.slice(0, visibleCount);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EFEFEF] flex items-center justify-center">
        <div className="text-zinc-500 font-medium tracking-widest animate-pulse uppercase text-xs">
          {t('movies_page.loading', 'Chargement de la sélection officielle...')}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#EFEFEF] flex items-center justify-center">
        <div className="text-red-500 font-bold tracking-wide">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EFEFEF] text-zinc-800 px-6 py-12 md:px-12 lg:px-20">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
        <div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-zinc-950 mb-2">
            {t('movies_page.title', 'Sélection Officielle')}
          </h1>
          <p className="text-zinc-500 text-sm max-w-xl">
            {t('movies_page.subtitle', 'Explore la galerie des courts-métrages avant-gardistes générés par Intelligence Artificielle.')}
          </p>
        </div>

        {/* BARRE DE RECHERCHE */}
        <div className="flex items-center bg-white border border-zinc-200 px-4 py-2.5 rounded-xl w-full max-w-xs shadow-xs focus-within:border-zinc-400 transition-all">
          <IoIosSearch className="text-zinc-400 text-xl mr-2" />
          <input
            type="text"
            className="w-full bg-transparent focus:outline-hidden text-sm text-zinc-800 placeholder-zinc-400"
            placeholder={t('movies_page.search_placeholder', 'Rechercher un film, réalisateur...')}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* GRILLE À 2 COLONNES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {filteredMovies.length === 0 && searchTerm !== '' ? (
          <p className="col-span-full text-center text-zinc-500 py-12 font-medium">
            {t('movies_page.no_results', "Aucun chef-d'œuvre ne correspond à votre recherche.")}
          </p>
        ) : (
          displayedMovies.map(movie => {
            const finalUrl = movie.video_url && movie.video_url !== 'NULL' && movie.video_url !== 'null'
              ? movie.video_url 
              : movie.youtube_url;

            const coverSrc = movie.cover_image 
              ? (movie.cover_image.includes('http') ? movie.cover_image : `/${movie.cover_image}`)
              : '/fallback-cover.jpg';

            return (
              <article 
                key={movie.id} 
                className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-zinc-200/50 shadow-xs hover:shadow-xl hover:scale-[1.005] transition-all duration-500 flex flex-col"
              >
                {/* ZONE LECTEUR VIDÉO */}
                <div className="w-full h-[240px] sm:h-[320px] overflow-hidden bg-black relative">
                  <VideoPlayer url={finalUrl} thumbnail={movie.cover_image} />
                </div>
                
                {/* ZONE TEXTUELLE */}
                <Link 
                  to={`/movie-detail/${movie.id}`}
                  className="p-6 sm:p-7 flex items-center justify-between bg-white gap-4 flex-grow cursor-pointer group/card"
                  title={`${t('movies_page.view_details', 'Voir les détails de')} ${movie.original_title}`}
                >
                  {/* BLOC GAUCHE */}
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-[64px] h-[86px] flex-shrink-0 rounded-2xl overflow-hidden shadow-xs border border-zinc-100 bg-zinc-50 group-hover/card:scale-105 transition-transform duration-500">
                      <img 
                        src={coverSrc} 
                        alt={movie.original_title} 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=200'; }}
                      />
                    </div>

                    <div className="min-w-0">
                      {movie.ia_tools && (
                        <span className="inline-block text-[9px] uppercase font-bold tracking-wider bg-zinc-100 text-zinc-500 px-2 py-0.5 rounded-md mb-1.5">
                          {movie.ia_tools.split(',')[0].trim()}
                        </span>
                      )}
                      <h3 className="font-extrabold text-zinc-900 text-lg sm:text-xl tracking-tight leading-tight truncate group-hover/card:text-[#FF5845] transition-colors duration-300">
                        {movie.original_title}
                      </h3>
                      {movie.english_title && movie.english_title !== movie.original_title && (
                        <p className="text-zinc-400 text-xs font-medium truncate mt-0.5">
                          {movie.english_title}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* BLOC DROITE */}
                  <div className="flex flex-col items-end text-right flex-shrink-0 pl-2">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">
                      {t('movies_page.director_label', 'Réalisateur')}
                    </span>
                    <span className="text-sm font-bold text-zinc-800 truncate max-w-[150px] mb-2">
                      {movie.director_name || t('movies_page.artist_default', 'Artiste')}
                    </span>
                    
                    {movie.duration && (
                      <span className="text-[10px] font-mono font-bold text-zinc-500 bg-zinc-50 border border-zinc-200/60 px-2 py-0.5 rounded-md group-hover/card:border-[#FF5845]/30 group-hover/card:text-[#FF5845] transition-colors">
                        {movie.duration} SEC
                      </span>
                    )}
                  </div>
                </Link>

              </article>
            );
          })
        )}
      </div>

      {/* INDICATEUR SI TOUTES LES VIDÉOS SONT CHARGÉES */}
      {visibleCount < filteredMovies.length && (
        <div className="text-center py-10 text-xs font-bold text-zinc-400 uppercase tracking-widest animate-pulse">
          {t('movies_page.scroll_more', 'Défilez pour charger plus de films...')}
        </div>
      )}
    </div>
  );
}