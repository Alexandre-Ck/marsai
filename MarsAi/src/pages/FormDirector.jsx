import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { WiStars } from 'react-icons/wi';
import { useTranslation } from 'react-i18next';
import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect } from 'react';

// 🌟 Logo officiel de X codé en SVG pour l'affichage de l'input
const XLogo = () => (
  <svg 
    viewBox="0 0 24 24" 
    aria-hidden="true" 
    className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-800 fill-current"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

export default function FormDirector() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nom: '',
      prenom: '',
      email: '',
      genre: '',
      cp: '',
      ville: '',
      biographie: '',
      region: '',
      pays: '',
      telephone: '',
      metier: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: '',
      collaborateurs: [], // 👈 CORRECTION : Le tableau démarre vide pour ne rien imposer !
    },
    mode: 'onSubmit',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'collaborateurs',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = async data => {
    const { collaborateurs, ...formData } = data;

    // Filtrer les collaborateurs éventuellement vides si l'utilisateur en a ajouté un sans le remplir
    const cleanedCollaborateurs = (collaborateurs || []).filter(
      c => (c.nom && c.nom.trim()) || (c.prenom && c.prenom.trim()) || (c.role && c.role.trim())
    );

    console.log('🔥 Envoi au serveur :', { formData, collaborateurs: cleanedCollaborateurs });

    try {
      const res = await fetch(`${API_BASE_URL}/api/form`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData, collaborateurs: cleanedCollaborateurs }),
      });

      const resData = await res.json();
      console.log('📩 Réponse serveur :', resData);

      if (res.ok) {
        const idFinal = resData.id || resData.insertId || resData.directorId;

        if (idFinal) {
          localStorage.setItem('currentDirectorId', idFinal.toString());
          navigate('/submit-movie');
        } else {
          alert("Le serveur a dit OK mais n'a pas envoyé d'ID.");
        }
      } else {
        alert('Erreur serveur : ' + res.status);
      }
    } catch (err) {
      console.error('❌ Erreur :', err);
      alert('Problème de connexion au serveur.');
    }
  };

  // --- Classes CSS ---
  const inputClass = `
    w-full bg-gray-100 border-none rounded-xl p-4 text-sm 
    placeholder:text-gray-400 focus:ring-2 focus:ring-gray-300 outline-none transition-all
  `;

  const labelClass = `
    text-sm font-bold tracking-wider text-slate-700 uppercase mb-2 block
  `;

  const sectionHeader = `flex items-center space-x-4 mb-8 pt-4`;

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <WiStars className="w-20 h-20 text-red-400 mx-auto" />
        <h2 className="text-3xl text-red-500 mt-5 uppercase font-bold tracking-tighter">
          {t('form.appel_projets_2026')}
        </h2>
        <h1 className="text-4xl md:text-6xl font-extrabold mt-5 text-slate-900 uppercase">
          {t('form.formulaire_realisateur')}
        </h1>
        <h3 className="text-xl text-slate-500 mt-2">
          {t('form.remplir_informations')}
        </h3>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-5xl mx-auto bg-white p-8 md:p-12 rounded-xl shadow-md space-y-10"
      >
        {/* SECTION 1 : Identité */}
        <section>
          <div className={sectionHeader}>
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest italic">01. Identité</h3>
            <div className="h-[1px] flex-1 bg-gray-100"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['prenom', 'nom', 'email', 'telephone', 'metier'].map((field) => (
              <fieldset key={field}>
                <label htmlFor={field} className={labelClass}>
                  {t(`form.${field}`)} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(field, { required: `${t(`form.${field}`)} est obligatoire` })}
                  id={field}
                  type={field === 'email' ? 'email' : 'text'}
                  className={`${inputClass} ${errors[field] ? 'ring-2 ring-red-500' : ''}`}
                  placeholder={t(`form.${field}`)}
                />
                {errors[field] && (
                  <p className="text-red-600 mt-1 text-xs font-bold uppercase">{errors[field].message}</p>
                )}
              </fieldset>
            ))}

            <fieldset>
              <label htmlFor="genre" className={labelClass}>
                {t('form.genre')} <span className="text-red-500">*</span>
              </label>
              <select
                {...register('genre', { required: 'Le genre est obligatoire' })}
                id="genre"
                className={`${inputClass} ${errors.genre ? 'ring-2 ring-red-500' : ''}`}
              >
                <option value="">{t('form.selectionner_genre')}</option>
                <option value="M">{t('form.homme')}</option>
                <option value="F">{t('form.femme')}</option>
                <option value="X">{t('form.autre')}</option>
              </select>
              {errors.genre && (
                <p className="text-red-600 mt-1 text-xs font-bold uppercase">{errors.genre.message}</p>
              )}
            </fieldset>
          </div>
        </section>

        {/* SECTION 2 : Localisation */}
        <section>
          <div className={sectionHeader}>
            <h3 className="text-lg font-bold text-slate-800 uppercase tracking-widest italic">02. Localisation</h3>
            <div className="h-[1px] flex-1 bg-gray-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['ville', 'cp', 'pays', 'region'].map((field) => (
              <fieldset key={field}>
                <label className={labelClass}>
                  {field === 'cp' ? "Code Postal" : t(`form.${field}`)} <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(field, { required: 'Ce champ est obligatoire' })}
                  className={`${inputClass} ${errors[field] ? 'ring-2 ring-red-500' : ''}`}
                  placeholder={field === 'cp' ? "Code Postal" : t(`form.${field}`)}
                />
                {errors[field] && (
                  <p className="text-red-600 mt-1 text-xs font-bold uppercase">{errors[field].message}</p>
                )}
              </fieldset>
            ))}
          </div>
        </section>

        {/* SECTION 3 : Biographie */}
        <section>
          <fieldset>
            <label className={labelClass}>
              {t('form.biographie')} <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('biographie', { required: 'La biographie est obligatoire' })}
              className={`${inputClass} h-32 resize-none ${errors.biographie ? 'ring-2 ring-red-500' : ''}`}
              placeholder={t('form.biographie')}
            />
            {errors.biographie && (
              <p className="text-red-600 mt-1 text-xs font-bold uppercase">{errors.biographie.message}</p>
            )}
          </fieldset>
        </section>

        {/* SECTION 4 : Réseaux Sociaux (Optionnels) */}
        <section>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('form.reseaux_sociaux')} (Optionnels)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'facebook', component: <FaFacebook className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 text-2xl" /> },
              { name: 'twitter', component: <XLogo /> },
              { name: 'linkedin', component: <FaLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700 text-2xl" /> },
              { name: 'instagram', component: <FaInstagram className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 text-2xl" /> },
            ].map(social => (
              <fieldset key={social.name} className="relative">
                {social.component}
                <input
                  {...register(social.name)}
                  type="url"
                  placeholder={social.name === 'twitter' ? 'X (ex-Twitter)' : social.name.charAt(0).toUpperCase() + social.name.slice(1)}
                  className={`${inputClass} pl-12`}
                />
              </fieldset>
            ))}
          </div>
        </section>

        {/* SECTION 5 : Collaborateurs (Optionnels) */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">{t('form.collaborateurs')} (Optionnels)</h3>
            <button
              type="button"
              onClick={() => append({ nom: '', prenom: '', role: '' })}
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
            >
              + {t('form.ajouter_collaborateur')}
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-4 animate-in fade-in duration-300">
                <input
                  {...register(`collaborateurs.${index}.prenom`)}
                  placeholder={t('form.prenom')}
                  className={inputClass}
                />
                <input
                  {...register(`collaborateurs.${index}.nom`)}
                  placeholder={t('form.nom')}
                  className={inputClass}
                />
                <input
                  {...register(`collaborateurs.${index}.role`)}
                  placeholder={t('form.role')}
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="bg-red-500 px-4 rounded-xl text-white hover:bg-red-600 transition"
                >
                  -
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-[#1e293b] text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#334155] transition-all shadow-lg active:scale-[0.99]"
        >
          {t('form.envoyer')}
        </button>
      </form>
    </div>
  );
}