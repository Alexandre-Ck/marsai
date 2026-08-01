export default function LeaderboardTable({ movies }) {
  return (
    <div className="w-full">
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Miniature
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Rang
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Titre
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Auteur
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Pays
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Score
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                Statut
              </th>
              <th className="px-6 py-4" />
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {movies.map((movie, index) => (
              <tr
                key={movie.id}
                className="hover:bg-gray-50 transition-all cursor-pointer"
              >
                <td className="px-6 py-4">
                  <img
                    src={movie.cover_image || '/placeholder.png'}
                    alt={movie.original_title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>

                <td className="px-6 py-4 font-medium text-gray-700">
                  {movie.rank || index + 1}
                </td>

                <td className="px-6 py-4 font-semibold text-gray-800">
                  {movie.original_title}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {movie.author || 'Auteur inconnu'}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {movie.country || '-'}
                </td>

                <td className="px-6 py-4 font-bold text-indigo-800">
                  {Number(movie.score).toFixed(1)}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      movie.status === 'VALIDÉ'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {movie.status || 'EN COURS'}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-400 hover:text-gray-700">
                  →
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className="bg-white rounded-2xl shadow-md p-4 space-y-4 border border-gray-200"
          >
            <div className="flex items-center gap-4">
              <img
                src={movie.cover_image || '/placeholder.png'}
                alt={movie.original_title}
                className="w-20 h-20 object-cover rounded-xl"
              />

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {movie.original_title}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {movie.author || 'Auteur inconnu'}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  Pays : {movie.country || '-'}
                </p>
              </div>

              <span className="text-lg font-bold text-indigo-600">
                #{movie.rank || index + 1}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  movie.status === 'VALIDÉ'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {movie.status || 'EN COURS'}
              </span>

              <span className="font-bold text-indigo-600">
                {Number(movie.score).toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
