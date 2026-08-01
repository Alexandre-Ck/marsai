import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaYoutubeSquare,
} from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(false);
      setStatus('');
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus(t('footer.newsletterSuccess') || 'Merci pour votre inscription !');
        setEmail('');
      } else {
        setStatus(t('footer.newsletterError') || 'Une erreur est survenue.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Erreur de connexion au serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#282828] p-15 text-white">
      <div className="flex flex-col md:flex-row justify-between gap-10 items-center">
        <div>
          <Link
            to="/"
            className="text-black bg-[#fefefe] rounded-2xl p-3 px-6 font-bold"
          >
            MARS.A.I
          </Link>
          <p className="py-6 w-70 pt-8 md:w-90">{t('footer.description')}</p>
          <ul className="flex gap-6 pt-5">
            <li>
              <a
                href="https://www.facebook.com/?locale=fr_FR"
                target="_blank"
                rel="noreferrer"
                aria-label={t('footer.facebook')}
              >
                <FaFacebookSquare className="w-13 h-13 md:w-10 md:h-10" />
              </a>
            </li>

            <li>
              <a
                href="http://instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label={t('footer.instagram')}
              >
                <FaInstagramSquare className="w-13 h-13 md:w-10 md:h-10" />
              </a>
            </li>

            <li>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label={t('footer.youtube')}
              >
                <FaYoutubeSquare className="w-13 h-13 md:w-10 md:h-10" />
              </a>
            </li>

            <li>
              <a
                href="https://x.com/?lang=fr"
                target="_blank"
                rel="noreferrer"
                aria-label={t('footer.x')}
              >
                <FaSquareXTwitter className="w-13 h-13 md:w-10 md:h-10" />
              </a>
            </li>
          </ul>
        </div>

        {/* FORMULAIRE NEWSLETTER CONNECTÉ */}
        <form 
          onSubmit={handleSubscribe}
          className="text-center bg-[#333333] rounded-2xl border border-[#1e293b] p-10 mt-5 md:w-120"
        >
          <h2 className="font-bold text-3xl">{t('footer.newsletterTitle')}</h2>
          <label htmlFor="email" className="invisible">
            {t('footer.newsletterLabel')}
          </label>
          
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder={t('footer.newsletterPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-[#fefefe] text-black border border-[#484848] rounded-3xl p-3 m-6 focus:outline-hidden focus:ring-2 focus:ring-[#FF5845]"
          />
          
          <button 
            type="submit"
            disabled={loading}
            className="text-black bg-[#fefefe] rounded-2xl p-3 px-6 font-bold cursor-pointer hover:bg-[#1e293b] hover:text-white transition disabled:opacity-50"
          >
            {loading ? '...' : t('footer.newsletterButton')}
          </button>

          {/* MESSAGE D'ALERTE RETOUR API */}
          {status && (
            <p className="text-xs text-[#FF5845] font-bold mt-3 tracking-wide bg-[#282828] py-2 px-4 rounded-xl inline-block">
              {status}
            </p>
          )}
        </form>
      </div>

      <ul className="flex flex-col items-center gap-10 mt-15 md:flex-row justify-center md:mt-20">
        <li>
          <Link to="/legal-notice">{t('footer.legalNotice')}</Link>
        </li>
        <li>
          <Link to="/private-policy">{t('footer.privacyPolicy')}</Link>
        </li>
        <li>
          <p className="text-black bg-[#fefefe] rounded-2xl p-3 px-6 font-bold">
            @2026 MARS.A.I
          </p>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;