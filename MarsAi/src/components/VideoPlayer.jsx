import React from 'react';

const VideoPlayer = ({ url, thumbnail }) => {
  const cleanUrl = typeof url === 'string' ? url.trim() : '';

  const getEmbedUrl = videoUrl => {
    if (!videoUrl) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = videoUrl.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&controls=1&rel=0&modestbranding=1`
      : null;
  };

  const embedUrl = getEmbedUrl(cleanUrl);

  const isDirectVideo =
    cleanUrl !== '' &&
    (cleanUrl.match(/\.(mp4|webm|ogg|mov)$/i) ||
      cleanUrl.includes('s3.fr-par.scw.cloud') ||
      cleanUrl.includes('supabase.co'));

  // 🌟 Préparation propre du lien de l'image de poster
  const posterSrc = thumbnail 
    ? (thumbnail.includes('http') ? thumbnail : `/${thumbnail}`)
    : undefined;

  return (
    <div className="relative w-full h-full bg-zinc-950 group/player transition-all duration-500">
      {/* Overlay dégradé discret au survol pour un effet cinéma */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity duration-300 pointer-events-none z-10" />

      {embedUrl ? (
        <iframe
          className="w-full h-full transition-transform duration-700 group-hover/player:scale-[1.02]"
          src={embedUrl}
          title="Video player"
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : isDirectVideo ? (
        <video
          className="w-full h-full object-cover transition-transform duration-700 group-hover/player:scale-[1.02] custom-player"
          controls
          playsInline
          key={cleanUrl}
          preload="metadata"
          poster={posterSrc} // 🌟 LA LIGNE MAGIQUE : Ton image se met à l'intérieur du cadre avant le démarrage !
        >
          {/* On nettoie le #t=1 pour laisser le poster faire son travail proprement */}
          <source src={cleanUrl} type="video/mp4" />
          <source src={cleanUrl} type="video/quicktime" />
          Votre navigateur ne supporte pas la lecture.
        </video>
      ) : (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-zinc-900 border border-zinc-800 rounded-3xl">
          {thumbnail && (
            <img
              src={thumbnail.includes('http') ? thumbnail : `/${thumbnail}`}
              alt="Thumbnail"
              className="absolute inset-0 w-full h-full object-cover opacity-20 blur-[1px]"
            />
          )}
          <p className="relative text-zinc-500 text-xs font-semibold tracking-widest uppercase">
            Médias indisponibles
          </p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;