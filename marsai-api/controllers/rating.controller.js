import create from '../models/rating.model.js';
import { getRating as getRatingFromModel, deleteRating as deleteRatingFromModel } from '../models/rating.model.js';

const createRating = async (req, res) => {
  try {
    const { rate, movieId } = req.body; // données envoyées par le front body et le middleware user
    const userId = req.user.id; // l'id vient du token décodé du middleware d'auth
    if (rate === undefined || movieId === undefined) {
      // vérifie que les données sont bien présentes
      return res.status(400).json({ message: 'Note ou id film manquant' });
    }

    const result = await create(rate, userId, movieId); // appel modèle pour insérer la note dans la bdd
    res.status(201).json({
      //la note est bien enregistrée
      message: 'Note enregistrée',
      ratingId: result.insertId, //renvoie l'id de la nouvelle ligne
    });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      // gestion du doublon l'id movie et user unique
      return res.status(409).json({ message: 'Vous avez déjà noté ce film' });
    }
    console.error('erreur SQL :', error.message);
    res.status(500).json({ message: 'erreur serveur' });
  }
};

const getRating = async (req, res) => {
  try {
    const { movieId } = req.params; // récupère l'id du film depuis les paramètres de l'URL
    const userId = req.user.id; // récupère l'id de l'utilisateur depuis le token décodé

    const rating = await getRatingFromModel(userId, movieId); // appelle le modèle pour récupérer la note

    if (!rating) {
      return res.status(404).json({ message: 'Note non trouvée' });
    }

    res.status(200).json(rating); // renvoie la note trouvée
  } catch (error) {
    console.error('erreur SQL :', error.message);
    res.status(500).json({ message: 'erreur serveur' });
  }
};

const deleteRating = async (req, res) => {
  try {
    const { movieId } = req.params; // récupère l'id du film depuis les paramètres de l'URL
    const userId = req.user.id; // récupère l'id de l'utilisateur depuis le token décodé

    await deleteRatingFromModel(userId, movieId); // appelle le modèle pour supprimer la note

    res.status(200).json({ message: 'Note supprimée' }); // renvoie un succès
  } catch (error) {
    console.error('erreur SQL :', error.message);
    res.status(500).json({ message: 'erreur serveur' });
  }
};

export default { createRating, getRating, deleteRating };
