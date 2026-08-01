import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FilmIdentityForm from '../components/FilmIdentity';
import IaDeclaration from '../components/IaDeclaration';
import Livrables from '../components/Livrables';
import OwnershipCertificate from '../components/OwnershipCertificate';
import { WiStars } from 'react-icons/wi';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const SubmitMovie = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    original_title: '',
    english_title: '',
    youtube_url: '',
    duration: '',
    is_hybrid: false,
    language: '',
    original_synopsis: '',
    english_synopsis: '',
    creative_process: '',
    ia_tools: '',
    has_subs: false,
    thumbnail: null,
    video_file: null,
    gallery: [],
  });

  const [collaborateurs, setCollaborateurs] = useState([{ nom: '', role: '' }]);
  const [errors, setErrors] = useState({}); // State de gestion des erreurs
  const [isSubmitting, setIsSubmitting] = useState(false);

  const directorId = localStorage.getItem('currentDirectorId');

  // --- REDIRECTION SI PAS DE DIRECTOR ---
  useEffect(() => {
    if (!directorId) {
      toast.error("Veuillez d'abord remplir le formulaire réalisateur.");
      navigate('/form-director');
    }
  }, [directorId, navigate]);

  // --- MISE À JOUR DES CHAMPS & NETTOYAGE DES ERREURS ---
  const updateField = updatedFields => {
    setFormData(prev => ({ ...prev, ...updatedFields }));

    // Supprime l'erreur du champ révisé s'il devient valide
    const updatedKeys = Object.keys(updatedFields);
    setErrors(prev => {
      const newErrors = { ...prev };
      updatedKeys.forEach(key => {
        if (newErrors[key]) delete newErrors[key];
      });
      return newErrors;
    });
  };

  const handleFileSelection = (file, category) => {
    setFormData(prev => {
      if (category === 'gallery') {
        const isAlreadyIn = prev.gallery.some(
          f => f.name === file.name && f.size === file.size
        );
        if (isAlreadyIn) return prev;
        return { ...prev, gallery: [...prev.gallery, file] };
      }
      return { ...prev, [category]: file };
    });

    // Nettoie l'erreur du fichier si sélectionné
    if (category !== 'gallery') {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[category];
        return newErrors;
      });
    }
  };

  // --- FONCTION DE VALIDATION FRONT-END ---
  const validateForm = () => {
    const newErrors = {};

    // 1. Validation Fiche Identité
    if (!formData.original_title?.trim()) {
      newErrors.original_title = 'Le titre original est obligatoire.';
    }
    if (!formData.english_title?.trim()) {
      newErrors.english_title = 'Le titre en anglais est obligatoire.';
    }
    if (!formData.duration || String(formData.duration).trim() === '') {
      newErrors.duration = 'La durée du film est obligatoire.';
    }
    if (!formData.language) {
      newErrors.language = 'Veuillez sélectionner la langue du film.';
    }
    if (!formData.original_synopsis?.trim()) {
      newErrors.original_synopsis = 'Le synopsis original est obligatoire.';
    }
    if (!formData.english_synopsis?.trim()) {
      newErrors.english_synopsis = 'Le synopsis en anglais est obligatoire.';
    }

    // 2. Validation Déclaration IA
    if (!formData.ia_tools?.trim()) {
      newErrors.ia_tools = 'Veuillez indiquer les outils IA utilisés.';
    }
    if (!formData.creative_process?.trim()) {
      newErrors.creative_process = 'La méthodologie créative est obligatoire.';
    }

    // 3. Validation Livrables
    if (!formData.video_file) {
      newErrors.video_file = 'Veuillez ajouter le fichier vidéo (.mp4 ou .mov).';
    }
    if (!formData.thumbnail) {
      newErrors.thumbnail = 'La vignette / affichette du film est obligatoire.';
    }

    setErrors(newErrors);

    // Renvoie true si zéro erreur détectée
    return Object.keys(newErrors).length === 0;
  };

  // --- SOUMISSION DU FORMULAIRE ---
  const handleSubmit = async e => {
    e.preventDefault();

    // ⛔ BLOCAGE EN CAS D'ERREURS DE SAISIE
    if (!validateForm()) {
      toast.error("❌ Veuillez remplir tous les champs obligatoires du formulaire.");
      
      // Remonte automatiquement au début du formulaire
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return; // Stop net l'exécution
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      const { thumbnail, video_file, gallery, ...textData } = formData;

      data.append('formData', JSON.stringify(textData));
      data.append('directorId', directorId);
      data.append('collaborateurs', JSON.stringify(collaborateurs));

      if (thumbnail) data.append('thumbnail', thumbnail);
      if (video_file) data.append('video', video_file);
      if (Array.isArray(gallery)) gallery.forEach(file => data.append('gallery', file));

      const response = await axios.post(
        `${API_BASE_URL}/api/movies/submit`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Soumission réussie 🎬");
        navigate('/home');
      }
    } catch (error) {
      console.error('Erreur:', error);
      toast.error("❌ Erreur lors de l'envoi du formulaire.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <WiStars className="w-20 h-20 text-red-400 mx-auto" />
        <h2 className="text-3xl text-red-500 mt-5">{t('submit_movie.appel_projets_2026')}</h2>
        <h1 className="text-6xl font-extrabold mt-5 text-slate-900 uppercase ">{t('submit_movie.submit_film')}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <FilmIdentityForm 
          formData={formData} 
          update={updateField} 
          errors={errors} 
        />
        
        <IaDeclaration 
          formData={formData} 
          update={updateField} 
          errors={errors} 
        />
        
        <Livrables
          formData={formData}
          update={updateField}
          collaborateurs={collaborateurs}
          updateCollabs={setCollaborateurs}
          handleUpload={handleFileSelection}
          errors={errors}
        />
        
        <OwnershipCertificate 
          formData={formData} 
          update={updateField} 
          errors={errors} 
        />

        <div className="max-w-4xl mx-auto mt-10 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-slate-900 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800'
            }`}
          >
            {isSubmitting ? 'Envoi en cours...' : t('submit_movie.finalize_submission')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitMovie;