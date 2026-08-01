import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MovieCard({
  movie,
  onEdit,
  onDelete,
  onToggleVisibility,
  isListView,
}) {
  const [status, setStatus] = useState(movie.status || 'pending');
  const [isSaving, setIsSaving] = useState(false);

  // Couleurs dynamiques selon le statut choisi
  const getStatusStyle = (currentStatus) => {
    switch (currentStatus) {
      case 'approved':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'rejected':
        return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'pending':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  // Gestion de la modification directe du statut
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setIsSaving(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/movies/${movie.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...movie,
            status: newStatus,
          }),
        }
      );

      if (!res.ok) throw new Error('Erreur mise à jour statut');
    } catch (err) {
      console.error(err);
      alert('Impossible de mettre à jour le statut en BDD');
      setStatus(movie.status); // Rollback en cas d'erreur
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className={`flex items-center p-5 transition hover:bg-gray-50/80 ${
        isListView ? 'flex-row justify-between' : 'flex-col gap-4'
      }`}
    >
      {/* Titre */}
      <div className="flex-1 min-w-[300px] group/title">
        <Link 
          to={`/movie-detail/${movie.id}`} 
          className="inline-block focus:outline-none"
          title="Voir la page de détail publique"
        >
          <p className="font-semibold text-slate-900 text-base group-hover/title:text-[#FF5845] transition-colors flex items-center gap-2">
            {movie.original_title}
            <span className="text-xs opacity-0 group-hover/title:opacity-100 group-hover/title:translate-x-1 transition-all duration-300">
              ↗
            </span>
          </p>
        </Link>
        <p className="text-gray-400 text-xs mt-0.5">{movie.english_title}</p>
      </div>

      {/* Durée / Langue */}
      <div className="flex-1 text-slate-600 text-sm font-medium">
        {movie.duration} sec / {movie.language}
      </div>

      {/* Menu déroulant Statut */}
      <div className="w-36 text-center">
        <select
          value={status}
          onChange={handleStatusChange}
          disabled={isSaving}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold border cursor-pointer focus:outline-none transition-all ${getStatusStyle(
            status
          )} ${isSaving ? 'opacity-50 cursor-wait' : ''}`}
        >
          <option value="pending" className="bg-white text-gray-800">En attente</option>
          <option value="approved" className="bg-white text-gray-800">Approuvé</option>
          <option value="rejected" className="bg-white text-gray-800">Refusé</option>
        </select>
      </div>

      {/* Actions */}
      <div className="w-80 flex gap-3 justify-center">
        <button
          onClick={() => onEdit(movie)}
          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold text-xs hover:bg-blue-100 transition-colors"
        >
          Éditer
        </button>
        <button
          onClick={() => onDelete(movie.id)}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold text-xs hover:bg-red-100 transition-colors"
        >
          Supprimer
        </button>
        
        <button
          onClick={() => onToggleVisibility(movie.id)}
          className={`px-4 py-2 rounded-lg font-bold text-xs transition-all ${
            Number(movie.is_visible) === 1
              ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
              : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
          }`}
        >
          {Number(movie.is_visible) === 1 ? 'Public' : 'Masqué'}
        </button>
      </div>
    </div>
  );
}