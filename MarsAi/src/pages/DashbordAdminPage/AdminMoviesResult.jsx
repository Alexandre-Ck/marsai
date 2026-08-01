import { useState, useEffect } from 'react';
import Sidebar from '../../components/DashbordAdmin/Sidebar';
import Header from '../../components/layout/Navbar';
import TopScoreCard from '../../components/DashbordAdmin/AdminMoviesResult/TopScoreCard';
import SearchBar from '../../components/DashbordAdmin/AdminMoviesResult/SearchBar';
import LeaderboardTable from '../../components/DashbordAdmin/AdminMoviesResult/LeaderBoardTable';
import { apiFetch } from '../../services/api';

export default function AdminMoviesResult() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await apiFetch('/api/admin/movies-result');

        const safeData = result.data.map(movie => ({
          ...movie,
          score: movie.score != null ? Number(movie.score) : 0,
        }));

        setMovies(safeData);
      } catch (err) {
        console.error('Erreur fetch movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-500 animate-pulse">Chargement des films...</p>
      </div>
    );
  }

  const filteredMovies = movies.filter(movie =>
    movie.original_title?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedMovies = [...filteredMovies].sort((a, b) => b.score - a.score);

  const rankedMovies = sortedMovies.map((movie, index) => ({
    ...movie,
    rank: index + 1,
  }));

  const topMovie = rankedMovies[0] || null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {topMovie ? (
            <TopScoreCard
              score={topMovie.score.toFixed(1)}
              title={topMovie.original_title}
              author={topMovie.author || 'Auteur inconnu'}
            />
          ) : (
            <div className="text-center text-gray-400">
              Aucun film disponible
            </div>
          )}

          <SearchBar search={search} setSearch={setSearch} />

          {/* Tableau avec scroll conservé */}
          <div className="mt-6 border border-gray-200 rounded-2xl shadow-lg max-h-[400px] overflow-y-auto">
            <LeaderboardTable movies={rankedMovies} />
          </div>
        </main>
      </div>
    </div>
  );
}
