import { useState, useEffect } from 'react';

export default function MovieEditModal({ movie, onClose, onUpdate }) {
  const [form, setForm] = useState({
    original_title: '',
    english_title: '',
    youtube_url: '',
    duration: '',
    language: '',
    original_synopsis: '',
    english_synopsis: '',
    status: 'pending',
  });

  useEffect(() => {
    if (movie) {
      setForm({
        original_title: movie.original_title || '',
        english_title: movie.english_title || '',
        youtube_url: movie.youtube_url || '',
        duration: movie.duration || '',
        language: movie.language || '',
        original_synopsis: movie.original_synopsis || '',
        english_synopsis: movie.english_synopsis || '',
        status: movie.status || 'pending',
      });
    }
  }, [movie]);

  const handleSubmit = async e => {
    e.preventDefault();

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
          body: JSON.stringify(form),
        }
      );

      if (!res.ok) throw new Error('Erreur lors de la mise à jour');

      const updatedMovie = await res.json();
      onUpdate(updatedMovie);
      onClose();
    } catch (err) {
      console.error(err);
      alert('Impossible de mettre à jour le film');
    }
  };

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 w-full max-w-lg shadow-lg space-y-3 overflow-y-auto max-h-[90vh]"
      >
        <h3 className="text-lg font-semibold mb-2">Modifier le film</h3>

        {[
          { label: 'Titre original', key: 'original_title' },
          { label: 'Titre anglais', key: 'english_title', optional: true },
          { label: 'URL YouTube', key: 'youtube_url', optional: true },
          { label: 'Durée (min)', key: 'duration' },
          { label: 'Langue', key: 'language' },
          { label: 'Synopsis original', key: 'original_synopsis' },
          { label: 'Synopsis anglais', key: 'english_synopsis', optional: true },
        ].map(field => (
          <label key={field.key} className="block text-sm font-medium text-gray-700">
            {field.label} {field.optional && <span className="text-gray-400 font-normal text-xs">(Optionnel)</span>}
            <input
              type="text"
              value={form[field.key]}
              onChange={e => setForm({ ...form, [field.key]: e.target.value })}
              className="w-full border border-gray-300 rounded-md p-2 mt-1 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
              required={!field.optional}
            />
          </label>
        ))}

        {/* Sélection du statut traduit en français */}
        <label className="block text-sm font-medium text-gray-700">
          Statut du film
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-2 mt-1 text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 bg-white"
          >
            <option value="pending">En attente</option>
            <option value="approved">Approuvé</option>
            <option value="rejected">Refusé</option>
          </select>
        </label>

        <div className="flex justify-end gap-3 mt-4 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-600 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50 text-sm font-medium"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="bg-blue-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-950 transition-colors"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}