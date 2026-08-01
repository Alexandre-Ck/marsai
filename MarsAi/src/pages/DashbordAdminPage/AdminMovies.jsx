import { useEffect, useState } from 'react';
import Sidebar from '../../components/DashbordAdmin/Sidebar';
import Header from '../../components/layout/Navbar';
import MovieList from '../../components/DashbordAdmin/AdminMovies/MovieList';
import MovieEditModal from '../../components/DashbordAdmin/AdminMovies/MovieEditModal';
import ConfirmPopup from '../../components/ui/ConfirmPopup';
import { apiFetch } from '../../services/api';

export default function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingMovie, setEditingMovie] = useState(null);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const moviesPerPage = 6;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await apiFetch('/api/admin/movies');
        setMovies(data);
      } catch (err) {
        console.error('Erreur fetch movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleEdit = movie => setEditingMovie(movie);

  // GESTION DE VISIBILITÉ CORRIGÉE
  const toggleVisibility = async movieId => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/movies/${movieId}/visibility`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        // CORRECTION INTERFACE : Aligne dynamiquement l'affichage sur l'état 1 (visible) ou 0 (masqué)
        setMovies(prev =>
          prev.map(m =>
            m.id === movieId ? { ...m, is_visible: m.is_visible === 1 ? 0 : 1 } : m
          )
        );
      } else {
        alert(data.error || 'Impossible de modifier la visibilité');
      }
    } catch (err) {
      console.error(err);
      alert('Erreur serveur');
    }
  };

  // SUPPRESSION DÉFINITIVE D'UN FILM
  const confirmDelete = async () => {
    if (!movieToDelete) return;

    try {
      const token = localStorage.getItem('token');

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/movies/${movieToDelete}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error('Erreur suppression');

      // Supprime le film de la liste locale instantanément
      setMovies(prev => prev.filter(m => m.id !== movieToDelete));
      setMovieToDelete(null);
    } catch (err) {
      console.error(err);
      setShowErrorPopup(true);
    }
  };

  // MISE À JOUR APRÈS MODIFICATION DANS LA MODALE
  const handleUpdate = updatedMovie => {
    setMovies(prev =>
      prev.map(m => (m.id === updatedMovie.id ? updatedMovie : m))
    );
    setEditingMovie(null); // Ferme automatiquement la modale après l'enregistrement
  };

  // Pagination
  const totalPages = Math.ceil(movies.length / moviesPerPage);
  const currentMovies = movies.slice(
    (currentPage - 1) * moviesPerPage,
    currentPage * moviesPerPage
  );

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 font-medium tracking-wide animate-pulse">
          Chargement des films de l'infrastructure MarsAI...
        </p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Gestion des Films
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Modifiez, supprimez ou ajustez la visibilité publique de vos médias.
            </p>
          </div>

          {/* Table contenant les actions Supprimer, Éditer et Visibilité */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <MovieList
              movies={currentMovies}
              onEdit={handleEdit}
              onDelete={setMovieToDelete}
              toggleVisibility={toggleVisibility}
            />
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center items-center gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className={`w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-sm ${
                  currentPage === 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-gray-50 text-slate-700 bg-white'
                }`}
              >
                {'<'}
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                    currentPage === i + 1
                      ? 'bg-[#1E293B] text-white shadow-xs'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className={`w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-sm ${
                  currentPage === totalPages
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-gray-50 text-slate-700 bg-white'
                }`}
              >
                {'>'}
              </button>
            </div>
          )}

          {/* Fenêtre Modale d'édition */}
          {editingMovie && (
            <MovieEditModal
              movie={editingMovie}
              onClose={() => setEditingMovie(null)}
              onUpdate={handleUpdate}
            />
          )}

          {/* Pop-up de confirmation de suppression */}
          <ConfirmPopup
            isOpen={!!movieToDelete}
            title="Supprimer définitivement"
            message="Cette action effacera le média de la base de données de manière irréversible."
            confirmText="Supprimer"
            cancelText="Annuler"
            onCancel={() => setMovieToDelete(null)}
            onConfirm={confirmDelete}
          />

          {/* Fenêtre d'erreur de suppression */}
          <ConfirmPopup
            isOpen={showErrorPopup}
            title="Action Impossible"
            message="Une erreur est survenue lors de la communication avec le serveur."
            confirmText="OK"
            onConfirm={() => setShowErrorPopup(false)}
            onCancel={() => setShowErrorPopup(false)}
          />
        </main>
      </div>
    </div>
  );
}