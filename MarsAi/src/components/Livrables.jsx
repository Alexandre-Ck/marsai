import React, { useEffect } from 'react';
import { FiFilm, FiX, FiVideo } from 'react-icons/fi';
import { LuImagePlus } from 'react-icons/lu';
import { useDropzone } from 'react-dropzone';

const Livrables = ({
  formData,
  update,
  collaborateurs,
  updateCollabs,
  handleUpload,
  errors = {},
}) => {
  // --- GESTION DES COLLABORATEURS ---
  const ajouterCollaborateur = () =>
    updateCollabs([...collaborateurs, { nom: '', role: '' }]);

  const supprimerCollaborateur = () => {
    if (collaborateurs.length > 1) {
      updateCollabs(collaborateurs.slice(0, -1));
    }
  };

  const handleChangeCollaborateur = (index, e) => {
    const { name, value } = e.target;
    const newCollabs = [...collaborateurs];
    newCollabs[index][name] = value;
    updateCollabs(newCollabs);
  };

  // --- GESTION DE LA VIDÉO (MP4/MOV) ---
  const onDropVideo = acceptedFiles => {
    const file = acceptedFiles[0];
    if (!file) return;

    update({ video_file: file });
    if (handleUpload) handleUpload(file, 'video_file');
  };

  const removeVideo = e => {
    e.stopPropagation();
    update({ video_file: null });
  };

  const { getRootProps: getRootVideo, getInputProps: getInputVideo } =
    useDropzone({
      onDrop: onDropVideo,
      accept: { 'video/*': ['.mp4', '.mov', '.avi'] },
      multiple: false,
    });

  // --- GESTION DE LA VIGNETTE (THUMBNAIL) ---
  const onDropVignette = acceptedFiles => {
    const file = acceptedFiles[0];
    if (!file) return;

    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });

    update({ thumbnail: fileWithPreview });
    if (handleUpload) handleUpload(fileWithPreview, 'thumbnail');
  };

  const removeVignette = e => {
    e.stopPropagation();
    if (formData.thumbnail?.preview)
      URL.revokeObjectURL(formData.thumbnail.preview);
    update({ thumbnail: null });
  };

  const { getRootProps: getRootVignette, getInputProps: getInputVignette } =
    useDropzone({
      onDrop: onDropVignette,
      accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
      multiple: false,
    });

  // --- GESTION DE LA GALERIE ---
  const onDropGallery = acceptedFiles => {
    const currentGallery = Array.isArray(formData.gallery)
      ? formData.gallery
      : [];
    const remainingSlots = 3 - currentGallery.length;

    if (remainingSlots <= 0) return;

    const filesToAdd = acceptedFiles.slice(0, remainingSlots).map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    update({ gallery: [...currentGallery, ...filesToAdd] });

    filesToAdd.forEach(f => {
      if (handleUpload) handleUpload(f, 'gallery');
    });
  };

  const removeGalleryImage = (e, index) => {
    e.stopPropagation();
    const currentGallery = Array.isArray(formData.gallery)
      ? formData.gallery
      : [];
    const newGallery = [...currentGallery];
    const removedFile = newGallery.splice(index, 1)[0];

    if (removedFile?.preview) URL.revokeObjectURL(removedFile.preview);
    update({ gallery: newGallery });
  };

  const { getRootProps: getRootGallery, getInputProps: getInputGallery } =
    useDropzone({
      onDrop: onDropGallery,
      accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
      maxFiles: 3,
    });

  // Nettoyage des URLs au démontage
  useEffect(() => {
    return () => {
      if (formData.thumbnail?.preview)
        URL.revokeObjectURL(formData.thumbnail.preview);
      if (Array.isArray(formData.gallery)) {
        formData.gallery.forEach(file => {
          if (file.preview) URL.revokeObjectURL(file.preview);
        });
      }
    };
  }, [formData.thumbnail, formData.gallery]);

  const labelStyle =
    'text-sm font-bold tracking-wider text-slate-700 uppercase mb-2';

  return (
    <section className="flex justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
        <header className="flex items-center gap-4 mb-10 border-b pb-6">
          <div className="flex items-center justify-center p-2 border border-slate-300 rounded-md">
            <FiFilm className="w-6 h-6 text-slate-700" />
          </div>
          <h2 className="text-xl font-bold tracking-tight text-slate-800 uppercase">
            Étape 03. Livrables & Collaborateurs
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
          {/* DÉPÔT VIDÉO */}
          <div className="flex flex-col md:col-span-3">
            <label className={labelStyle}>Fichier du Film (MP4 / MOV)*</label>
            <div
              {...getRootVideo()}
              className={`rounded-xl p-10 border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${
                errors.video_file
                  ? 'border-red-500 bg-red-50/30'
                  : 'border-slate-300 bg-[#F1F3F6] hover:bg-slate-100'
              }`}
            >
              <input {...getInputVideo()} />
              {formData.video_file ? (
                <div className="flex items-center gap-4">
                  <FiVideo className="w-8 h-8 text-green-500" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-800">
                      {formData.video_file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(formData.video_file.size / (1024 * 1024)).toFixed(2)} Mo
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeVideo}
                    className="ml-4 bg-red-100 text-red-500 p-2 rounded-full hover:bg-red-200"
                  >
                    <FiX size={20} />
                  </button>
                </div>
              ) : (
                <>
                  <FiVideo className="w-12 h-12 text-slate-400 mb-3" />
                  <p className="text-slate-600 font-medium">
                    Glissez votre film ici ou cliquez pour parcourir
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    MP4, MOV, AVI — Max 500 Mo
                  </p>
                </>
              )}
            </div>
            {errors.video_file && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.video_file}</p>
            )}
          </div>

          {/* SOUS-TITRES */}
          <div className="flex flex-col md:col-span-3">
            <label className={labelStyle}>Sous-titres (.srt)</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm cursor-pointer mb-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={formData.has_subs || false}
                  onChange={e => update({ has_subs: e.target.checked })}
                />
                <span className="italic text-slate-600">
                  Voix ou textes nécessitant des sous-titres
                </span>
              </label>
            </div>
          </div>

          {/* VIGNETTE OFFICIELLE */}
          <div className="flex flex-col md:col-span-1 mt-4">
            <label className={labelStyle}>Vignette Officielle (16:9)*</label>
            <div
              {...getRootVignette()}
              className={`rounded-lg h-40 relative flex flex-col items-center justify-center border-2 border-dashed transition-all cursor-pointer overflow-hidden ${
                errors.thumbnail
                  ? 'border-red-500 bg-red-50/30'
                  : 'border-transparent bg-[#F1F3F6] hover:border-slate-300'
              }`}
            >
              <input {...getInputVignette()} />
              {formData.thumbnail ? (
                <div className="w-full h-full relative">
                  <img
                    src={formData.thumbnail.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeVignette}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 z-10"
                  >
                    <FiX size={18} />
                  </button>
                </div>
              ) : (
                <>
                  <LuImagePlus className="w-12 h-12 text-slate-400 mb-2" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase text-center px-2">
                    PNG ou JPG – Max 15 Mo
                  </span>
                </>
              )}
            </div>
            {errors.thumbnail && (
              <p className="text-xs text-red-500 font-medium mt-1">{errors.thumbnail}</p>
            )}
          </div>

          {/* GALERIE MÉDIAS */}
          <div className="flex flex-col md:col-span-2 mt-4">
            <label className={labelStyle}>Galerie Médias (Max 3)</label>
            <div
              {...getRootGallery()}
              className="bg-[#F1F3F6] rounded-lg h-40 flex items-center justify-center gap-4 px-4 cursor-pointer hover:bg-[#ebedf0] transition-colors"
            >
              <input {...getInputGallery()} />
              {!Array.isArray(formData.gallery) ||
              formData.gallery.length === 0 ? (
                <div className="flex gap-6">
                  <LuImagePlus className="w-10 h-10 text-slate-300" />
                  <LuImagePlus className="w-10 h-10 text-slate-300" />
                  <LuImagePlus className="w-10 h-10 text-slate-300" />
                </div>
              ) : (
                <div className="flex gap-2 w-full h-full py-2">
                  {formData.gallery.map((file, index) => (
                    <div key={index} className="relative flex-1 h-full group">
                      <img
                        src={file.preview}
                        alt={`gallery-${index}`}
                        className="w-full h-full object-cover rounded-md shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={e => removeGalleryImage(e, index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ))}
                  {formData.gallery.length < 3 && (
                    <div className="flex-1 border-2 border-dashed border-slate-300 rounded-md flex items-center justify-center">
                      <LuImagePlus className="text-slate-400" size={20} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Livrables;