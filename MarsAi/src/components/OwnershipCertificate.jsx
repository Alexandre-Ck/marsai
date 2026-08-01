import { FaUserShield } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const OwnershipCertificate = () => {
  const { t } = useTranslation();

  return (
    <section className="flex justify-center items-center bg-gray-100 p-6">
      <article className="w-full max-w-4xl bg-blue-300 rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
        <header className="flex items-center gap-4 mb-6">
          <div className="flex items-center justify-center p-2 border-2 border-slate-300 rounded-md">
            <FaUserShield className="w-9 h-9 text-slate-500" />
          </div>
          <h2 className="text-xl font-bold tracking-widest uppercase text-slate-800">
            {t('ownership.title')}
          </h2>
        </header>

        <p className="w-full border-none rounded-2xl p-4 h-32 text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400 outline-none transition-all resize-none uppercase leading-relaxed text-slate-700">
          {t('ownership.text')}
        </p>
      </article>
    </section>
  );
};

export default OwnershipCertificate;
