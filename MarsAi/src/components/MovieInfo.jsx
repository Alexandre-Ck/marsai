import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaLinkedinIn, FaInstagram, FaFacebookF } from 'react-icons/fa6'; 

// Logo officiel de X en SVG
const XLogo = () => (
  <svg 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    className="w-5 h-5 fill-current"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

const MovieInfo = ({ director, country, shareUrl = '' }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const currentUrl = shareUrl || window.location.href;

  const handleCopy = async () => {
    if (!currentUrl) return;
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Erreur lors de la copie du lien :', err);
    }
  };

  const encodedUrl = encodeURIComponent(currentUrl);

  return (
    <div className="space-y-12">
      {/* Grille d'informations clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#F2F4F7] p-8 rounded-3xl border border-gray-100">
          <p className="text-lg uppercase text-[#FF5845] font-black tracking-tighter mb-2">
            {t('movie_info.director', 'Réalisateur')}
          </p>
          <p className="text-4xl font-black text-[#282828] uppercase tracking-tighter leading-none">
            {director || t('movie_info.not_specified', 'Non spécifié')}
          </p>
        </div>
        
        <div className="bg-[#F2F4F7] p-8 rounded-3xl border border-gray-100">
          <p className="text-lg uppercase text-[#FF5845] font-black tracking-tighter mb-2">
            {t('movie_info.country_audio', 'Pays / Audio')}
          </p>
          <p className="text-4xl font-black text-[#282828] uppercase tracking-tighter leading-none">
            {country || 'N/A'}
          </p>
        </div>
      </div>

      {/* Partager le projet */}
      <div className="p-10 bg-white border-2 border-[#F2F4F7] rounded-[2.5rem] space-y-8 shadow-sm">
        <p className="text-2xl font-black uppercase tracking-tighter text-[#282828]">
          {t('movie_info.share_project', 'Partager le projet')}
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 h-14 bg-[#F2F4F7] rounded-xl flex items-center px-5 font-mono text-sm text-gray-500 truncate border border-gray-200">
            {currentUrl}
          </div>
          <button 
            onClick={handleCopy}
            disabled={copied}
            className={`h-14 px-10 text-white text-xs font-black rounded-xl transition-all uppercase tracking-widest shadow-lg shadow-gray-200 min-w-[180px]
              ${copied 
                ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100' 
                : 'bg-[#1e293b] hover:bg-[#282828]'
              }`}
          >
            {copied 
              ? t('movie_info.copied', 'Copié ! ✔') 
              : t('movie_info.copy_link', 'Copier le lien')}
          </button>
        </div>

        {/* Boutons de réseaux sociaux */}
        <div className="flex gap-10 pt-4 border-t border-gray-50 items-center">
          {/* Partage X */}
          <a 
            href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodeURIComponent("MARS.AI")}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Partager sur X"
            className="text-[#282828] hover:text-[#FF5845] transition-transform hover:scale-110 flex items-center justify-center"
          >
            <XLogo />
          </a>
          
          {/* Partage LinkedIn */}
          <a 
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Partager sur LinkedIn"
            className="text-[#282828] hover:text-[#FF5845] transition-transform hover:scale-110 flex items-center justify-center"
          >
            <FaLinkedinIn size={24} />
          </a>
          
          {/* Instagram */}
          <a 
            href="https://instagram.com" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nous suivre sur Instagram"
            className="text-[#282828] hover:text-[#FF5845] transition-transform hover:scale-110 flex items-center justify-center"
          >
            <FaInstagram size={24} />
          </a>
          
          {/* Partage Facebook */}
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Partager sur Facebook"
            className="text-[#282828] hover:text-[#FF5845] transition-transform hover:scale-110 flex items-center justify-center"
          >
            <FaFacebookF size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;