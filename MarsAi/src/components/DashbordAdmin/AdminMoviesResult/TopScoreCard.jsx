export default function TopScoreCard({ score, title, author }) {
  return (
    <div className="bg-blue-50 rounded-2xl shadow-lg p-6 sm:p-8 text-center mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg">
      <p className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-blue-850">
        {score}
      </p>
      <p className="text-xs sm:text-sm md:text-base font-semibold mt-1 sm:mt-2 text-gray-500">
        {/* Meilleure note */}
      </p>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-2 text-gray-900 truncate">
        {title}
      </h2>
      <p className="text-gray-600 mt-1 text-sm sm:text-base truncate">
        Par {author}
      </p>
    </div>
  );
}
