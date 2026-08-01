import MovieCard from './MovieCard';

export default function MovieList({
  movies,
  onEdit,
  onDelete,
  toggleVisibility,
}) {
  if (!movies.length) {
    return (
      <p className="text-gray-500 text-center py-10 bg-gray-50 rounded-xl shadow-sm">
        Aucun film trouvé.
      </p>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-gray-50 border-b font-semibold text-gray-700">
        <span className="flex-1 min-w-[300px]">Titre</span>
        <span className="flex-1">Durée / Langue</span>
        <span className="w-36 text-center">Statut</span>
        <span className="w-80 text-center">Actions</span>
      </div>

      {/* Rows */}
      {movies.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleVisibility={toggleVisibility}
          isListView={true}
        />
      ))}
    </div>
  );
}