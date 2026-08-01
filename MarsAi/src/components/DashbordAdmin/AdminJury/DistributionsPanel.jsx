export default function DistributionsPanel({ distributions }) {
  if (!distributions.length) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-xl font-semibold text-slate-800 mb-6">
        Films distribués
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {distributions.map((d, i) => (
          <div
            key={i}
            className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition"
          >
            <p className="font-semibold text-[#244b66] mb-2">{d.juryName}</p>

            <div className="flex flex-wrap gap-2">
              {d.movies.map((movie, index) => (
                <span
                  key={index}
                  className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                >
                  {movie}
                </span>
              ))}
            </div>

            <p className="text-xs text-slate-400 mt-3">
              {d.movies.length} film(s)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
