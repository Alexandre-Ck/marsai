export default function ProgressBar({ percent = 0, light = false }) {
  // Assure que percent reste entre 0 et 100
  const safePercent = Math.min(Math.max(percent, 0), 100);

  return (
    <div className="w-full h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-2 sm:h-3 rounded-full transition-all duration-500 ease-in-out ${
          light ? 'bg-blue-300' : 'bg-blue-500'
        }`}
        style={{ width: `${safePercent}%` }}
      />
    </div>
  );
}
