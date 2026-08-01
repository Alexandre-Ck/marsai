import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// 1. Initialisation du client Supabase avec tes variables d'environnement
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * Fonction universelle pour uploader un fichier sur Supabase Storage
 * @param {Object} file - Le fichier extrait par Multer (req.files.vignette[0])
 * @param {String} fileCategory - Le sous-dossier dans ton bucket (ex: 'thumbnails', 'videos')
 * @returns {String} - L'URL publique directe du fichier uploadé
 */
const uploadToScaleway = async (file, fileCategory) => {
  if (!file || !file.buffer) return null;

  // 2. Sécurisation du nom de fichier (UUID unique) comme tu le faisais déjà
  const ext = file.originalname.split('.').pop();
  const safeName = `${crypto.randomUUID()}.${ext}`;
  
  // Chemin final dans le bucket (ex: 'thumbnails/un-uuid-unique.jpg')
  const key = `${fileCategory}/${safeName}`;

  // 3. Upload du Buffer vers ton bucket Supabase 'movies'
  const { data, error } = await supabase.storage
    .from('movies') // Ton bucket Supabase public
    .upload(key, file.buffer, {
      contentType: file.mimetype,
      upsert: true
    });

  if (error) {
    throw new Error(`Erreur d'upload Supabase [${fileCategory}]: ${error.message}`);
  }

  // 4. Récupération de l'URL publique générée par Supabase
  const { data: publicUrlData } = supabase.storage
    .from('movies')
    .getPublicUrl(key);

  return publicUrlData.publicUrl;
};

// On garde exactement le même nom d'export pour ne rien casser ailleurs dans tes contrôleurs !
export { uploadToScaleway };