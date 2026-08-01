import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MovieInfo from '../components/MovieInfo';
import VideoPlayer from '../components/VideoPlayer';
import SynopsisStack from '../components/SynopsisStack';

const MoviePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!id || id === 'undefined') return;

    fetch(`${import.meta.env.VITE_API_URL}/api/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        setMovieData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#EFEFEF]">
      <div className="w-8 h-8 border-4 border-zinc-200 border-t-[#FF5845] rounded-full animate-spin" role="status" aria-label="Chargement"></div>
    </div>
  );

  if (!movieData) return null;

  const finalVideoUrl = movieData.video_url && movieData.video_url !== 'NULL' && movieData.video_url !== 'null'
    ? movieData.video_url 
    : movieData.youtube_url;

  return (
    <div className="relative min-h-screen bg-[#EFEFEF] overflow-hidden font-sans text-zinc-900 selection:bg-[#FF5845] selection:text-white">
      
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 left-0 w-full h-[400px] opacity-10 pointer-events-none" aria-hidden="true">
        <img 
          src={movieData.cover_image} 
          alt="" 
          className="w-full h-full object-cover blur-3xl"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#EFEFEF]"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-8 md:py-10">
        
        {/* RETOUR BOUTON ACCESSIBLE */}
        <button
          onClick={() => navigate('/gallery')}
          className="group text-zinc-600 text-xs font-bold inline-flex items-center gap-2 mb-8 uppercase tracking-wider hover:text-[#FF5845] transition-colors focus:outline-2 focus:outline-offset-4 focus:outline-[#FF5845]"
          aria-label={t('movie_detail.back_gallery', 'Retourner à la galerie des films')}
        >
          <span className="text-base group-hover:-translate-x-0.5 transition-transform" aria-hidden="true">←</span> {t('movie_detail.back_gallery', 'Retour à la Galerie')}
        </button>

        {/* HEADER SECTION COMPACT */}
        <header className="mb-10 flex flex-col sm:flex-row gap-6 items-start sm:items-end">
          <div className="shrink-0 w-32 h-44 rounded-xl overflow-hidden shadow-lg border-2 border-white bg-zinc-200">
            <img 
              src={movieData.cover_image} 
              alt={`Affiche officielle de ${movieData.original_title}`} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight uppercase mb-2 leading-tight break-words">
              {movieData.original_title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-500 font-semibold uppercase tracking-wide text-[11px] sm:text-xs border-l-2 border-[#FF5845] pl-3">
              <span className="text-[#FF5845] font-bold">2026</span>
              <span className="text-zinc-300" aria-hidden="true">/</span>
              <span>{movieData.genre || t('movie_detail.default_genre', 'Film Expérimental')}</span>
              <span className="text-zinc-300" aria-hidden="true">/</span>
              <span>{t('movie_detail.directed_by', 'Réalisé par')} <span className="text-zinc-800 font-bold">{movieData.director}</span></span>
            </div>
          </div>
        </header>

        {/* LECTEUR VIDÉO PRINCIPAL */}
        <section className="mb-10" aria-label={t('movie_detail.video_player_label', 'Lecteur vidéo du film')}>
          <div className="relative">
            <div className="absolute -inset-1 bg-[#FF5845]/5 rounded-[2rem] blur-lg opacity-40" aria-hidden="true"></div>
            
            <div className="relative bg-zinc-950 p-1.5 sm:p-2.5 rounded-[1.8rem] shadow-md border border-zinc-200/10">
              <div className="rounded-xl overflow-hidden bg-black aspect-video">
                <VideoPlayer 
                  url={finalVideoUrl} 
                  thumbnail={movieData.cover_image} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* GRID LAYOUT CONTENT COMPACT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Main Info Columns */}
          <main className="lg:col-span-8 space-y-10">
            <MovieInfo 
              director={movieData.director} 
              country={movieData.language} 
              shareUrl={window.location.href} 
            />
            
            <SynopsisStack 
              synopsis={movieData.original_synopsis} 
              techStack={movieData.ia_tools} 
            />
          </main>

          {/* Sidebar Fiche Technique */}
          <aside className="lg:col-span-4 lg:sticky lg:top-6 h-fit">
            <section className="bg-zinc-900 text-zinc-100 p-6 md:p-8 rounded-[1.5rem] shadow-md border border-zinc-800 relative overflow-hidden" aria-labelledby="sidebar-title">
               
              <div className="absolute top-0 right-0 w-24 h-24 opacity-5 translate-x-8 -translate-y-8 pointer-events-none" aria-hidden="true">
                <img src={movieData.cover_image} alt="" className="w-full h-full object-cover rounded-full" />
              </div>

              <h2 id="sidebar-title" className="text-xs font-bold uppercase tracking-widest text-[#FF5845] mb-6 border-b border-zinc-800 pb-3">
                {t('movie_detail.tech_sheet', 'Fiche Technique')}
              </h2>
              
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest mb-0.5">
                    {t('movie_detail.duration', 'Durée')}
                  </p>
                  <p className="text-3xl font-black tracking-tight text-white">
                    {movieData.duration}<span className="text-sm font-medium text-zinc-400 ml-1 lowercase">sec</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <p className="text-[10px] font-bold uppercase text-zinc-400 tracking-widest mb-0.5">
                    {t('movie_detail.original_lang', 'Langue originale')}
                  </p>
                  <p className="text-xl font-extrabold uppercase tracking-tight text-white">{movieData.language}</p>
                </div>

                <div className="pt-4 border-t border-zinc-800">
                  <div className="flex items-center justify-between p-3 bg-zinc-800/40 rounded-lg border border-zinc-800">
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                      {t('movie_detail.availability', 'Disponibilité')}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                        {t('movie_detail.selection_status', 'Sélection')}
                      </span>
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" aria-hidden="true"></span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default MoviePage;