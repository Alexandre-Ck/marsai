import React, { useState, useEffect } from 'react';
import VideoPlayer from '../../components/VideoPlayer'; // Ajuste le chemin si nécessaire
import Ratings from '../../components/DashboardJury/Ratings'; // Ajuste le chemin si nécessaire

function DashboardJury() {
  const [user, setUser] = useState(null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userEmail = localStorage.getItem('userEmail');
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      if (!userEmail) {
        console.error("❌ Aucun email trouvé dans le localStorage");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // 1. Récupération du profil utilisateur
        const userResponse = await fetch(
          `http://localhost:3001/dashboard/jury?email=${encodeURIComponent(userEmail)}`,
          {
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` })
            }
          }
        );

        if (!userResponse.ok) throw new Error(`Erreur profil : ${userResponse.status}`);
        const userDataRaw = await userResponse.json();
        const userData = userDataRaw && userDataRaw.user ? userDataRaw.user : userDataRaw;

        if (userData && userData.email) {
          setUser(userData);
        }

        // 2. Récupération de la liste des films à évaluer
        const moviesResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/movies`, {
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!moviesResponse.ok) throw new Error('Impossible de récupérer les films');
        const moviesData = await moviesResponse.json();
        
        const validMovies = Array.isArray(moviesData) ? moviesData : [];
        setMovies(validMovies);

        // Sélectionner le premier film par défaut s'il y en a
        if (validMovies.length > 0) {
          setSelectedMovie(validMovies[0]);
        }

      } catch (err) {
        console.error("❌ Erreur API :", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userEmail, token]);

  const getInitials = () => {
    if (!user) return 'J';
    if (user.firstname && user.lastname) {
      return `${user.firstname[0]}${user.lastname[0]}`.toUpperCase();
    }
    return user.email.slice(0, 2).toUpperCase();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md text-center">
          <span className="text-4xl">⚠️</span>
          <h2 className="text-xl font-bold text-slate-900 mt-4">Une erreur est survenue</h2>
          <p className="text-sm text-slate-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 py-8 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {loading ? (
            <div className="flex items-center gap-4 animate-pulse w-full">
              <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-6 w-48 bg-slate-200 rounded"></div>
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-5 w-full sm:w-auto">
              <div className="w-16 h-16 bg-gradient-to-tr from-[#FF5845] to-orange-500 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md shadow-orange-500/20">
                {getInitials()}
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                    Bienvenue, {user?.firstname && user?.lastname ? `${user.firstname} ${user.lastname}` : user?.email?.split('@')[0]} 👋
                  </h1>
                  <span className="px-3 py-1 bg-teal-50 border border-teal-200 text-teal-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                    Membre du Jury
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-12 mt-10">
        {/* STATS COMPTEURS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Sélection Officielle</p>
            <h3 className="text-3xl font-black text-slate-950">{loading ? '...' : movies.length}</h3>
            <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span> Courts-métrages IA
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Évaluations complétées</p>
            <h3 className="text-3xl font-black text-slate-950">--</h3>
            <div className="mt-2 text-xs text-slate-500">Phase de vote active</div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Moyenne Générale</p>
            <h3 className="text-3xl font-black text-slate-950">-- <span className="text-base font-normal text-slate-400">/10</span></h3>
            <div className="mt-2 text-xs text-slate-500">Basée sur vos notations soumises</div>
          </div>
        </section>

        {/* LAYOUT PRINCIPAL : 2 COLONNES (Liste à gauche, Lecteur + Formulaire de note à droite) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* COLONNE GAUCHE : LISTE DES FILMS (4/12) */}
          <section className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden h-fit">
            <div className="p-6 border-b border-slate-100">
              <h2 className="font-extrabold text-lg text-slate-900 uppercase tracking-tight">Films à évaluer</h2>
              <p className="text-xs text-slate-400 mt-0.5">Sélectionnez un projet pour l'évaluer</p>
            </div>
            
            <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
              {loading ? (
                [1, 2, 3].map(n => (
                  <div key={n} className="p-4 animate-pulse flex gap-3">
                    <div className="w-12 h-16 bg-slate-200 rounded-lg shrink-0"></div>
                    <div className="space-y-2 w-full mt-1">
                      <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
              ) : movies.length === 0 ? (
                <p className="p-6 text-center text-sm text-slate-400">Aucun film trouvé.</p>
              ) : (
                movies.map(movie => (
                  <button
                    key={movie.id}
                    onClick={() => setSelectedMovie(movie)}
                    className={`w-full text-left p-4 flex gap-4 items-center transition-colors ${selectedMovie?.id === movie.id ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'}`}
                  >
                    <div className="w-10 h-14 bg-zinc-900 rounded-md overflow-hidden shrink-0 border border-slate-200/10">
                      <img 
                        src={movie.cover_image?.includes('http') ? movie.cover_image : `/${movie.cover_image}`} 
                        alt="" 
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=100'; }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-sm truncate">{movie.original_title || movie.english_title}</h4>
                      <p className={`text-xs truncate mt-0.5 ${selectedMovie?.id === movie.id ? 'text-slate-400' : 'text-slate-500'}`}>
                        {movie.director_name || 'Artiste'}
                      </p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </section>

          {/* COLONNE DROITE : FOCUS LECTEUR VIDÉO & RATING (8/12) */}
          <section className="lg:col-span-8 space-y-6">
            {selectedMovie ? (
              <article className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8">
                
                {/* EN-TÊTE DU FILM FOCUS */}
                <header className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {selectedMovie.original_title || selectedMovie.english_title}
                  </h2>
                  <p className="text-sm font-medium text-slate-500 mt-1">
                    Réalisé par : <span className="text-slate-800 font-bold">{selectedMovie.director_name || selectedMovie.director || 'Artiste'}</span>
                  </p>
                </header>

                {/* ZONE LECTEUR VIDÉO INTEGRÉE */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-md border border-slate-100">
                  <VideoPlayer
                    url={selectedMovie.video_url && selectedMovie.video_url !== 'NULL' && selectedMovie.video_url !== 'null' ? selectedMovie.video_url : selectedMovie.youtube_url}
                    thumbnail={selectedMovie.cover_image}
                  />
                </div>

                {/* ZONE FORMULAIRE DE NOTATION DIRECTE */}
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-tight text-center sm:text-left">
                    Attribuer vos notes de session
                  </h3>
                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/60">
                    {/* Injection du composant de notation global */}
                    <Ratings movieId={selectedMovie.id} />
                  </div>
                </div>

              </article>
            ) : (
              !loading && (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400">
                  🎬 Veuillez sélectionner un court-métrage dans la colonne de gauche pour débuter la notation.
                </div>
              )
            )}
          </section>

        </div>
      </main>
    </div>
  );
}

export default DashboardJury;