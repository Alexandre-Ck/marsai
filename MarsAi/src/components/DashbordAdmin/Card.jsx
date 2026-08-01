export default function Card({ title, value, subtitle, icon: Icon, children }) {
  return (
    <div
      className="
        flex items-center gap-4
        bg-white/5 
        backdrop-blur-xl 
        border-2 border-black/10
        rounded-2xl 
        p-4 sm:p-6
        shadow-lg
        transition-all duration-300
        hover:border-black/30
        hover:bg-white/10
        hover:shadow-2xl
        hover:-translate-y-1
      "
    >
      {/* Icon à gauche */}
      {Icon && (
        <div className="flex-shrink-0 bg-white/10 rounded-xl p-3 text-black/40 border border-black/10">
          <Icon size={24} />
        </div>
      )}

      {/* Contenu texte */}
      <div className="flex-1">
        <p className="text-sm text-black/60 font-medium tracking-wide">
          {title}
        </p>

        <p className="text-2xl sm:text-3xl font-bold text-black mt-1">
          {value}
        </p>

        {subtitle && (
          <p className="text-xs sm:text-sm text-black/40 mt-1">{subtitle}</p>
        )}

        {children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
}
