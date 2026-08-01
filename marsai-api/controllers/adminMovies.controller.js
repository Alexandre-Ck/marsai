import * as MovieModel from '../models/adminMovies.model.js';
import { sendMovieStatusMail } from '../utils/mailer.js';

export const getMovies = async (req, res) => {
  try {
    const movies = await MovieModel.getAllMovies();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de récupérer les films' });
  }
};

export const getMovie = async (req, res) => {
  try {
    const movie = await MovieModel.getMovieById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Film introuvable' });
    res.json(movie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

export const createMovie = async (req, res) => {
  try {
    const movieData = { ...req.body };

    // Nettoyage de youtube_url : '' -> null
    if (
      !movieData.youtube_url ||
      typeof movieData.youtube_url !== 'string' ||
      movieData.youtube_url.trim() === '' ||
      movieData.youtube_url.toLowerCase() === 'null' ||
      movieData.youtube_url.toLowerCase() === 'undefined'
    ) {
      movieData.youtube_url = null;
    } else {
      movieData.youtube_url = movieData.youtube_url.trim();
    }

    const newMovie = await MovieModel.createMovie(movieData);
    res.status(201).json(newMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de créer le film' });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. On extrait et EXCLUT les champs système/jointures
    const { 
      id: _, 
      submitted_at, 
      author, 
      score, 
      votes, 
      ...updateData 
    } = req.body;

    // 🌟 2. NETTOYAGE DU CHAMP youtube_url pour éviter le crash "Duplicate entry '' for key uniq_youtube_url"
    if (
      !updateData.youtube_url ||
      typeof updateData.youtube_url !== 'string' ||
      updateData.youtube_url.trim() === '' ||
      updateData.youtube_url.toLowerCase() === 'null' ||
      updateData.youtube_url.toLowerCase() === 'undefined'
    ) {
      updateData.youtube_url = null;
    } else {
      updateData.youtube_url = updateData.youtube_url.trim();
    }

    const movieBeforeUpdate = await MovieModel.getMovieWithDirectorById(id);

    if (!movieBeforeUpdate) {
      return res.status(404).json({ error: 'Film introuvable' });
    }

    // 3. On passe uniquement les données nettoyées au modèle
    const updatedMovie = await MovieModel.updateMovie(id, updateData);

    const validStatuses = ['approved', 'rejected', 'isconform'];

    if (
      updateData.status &&
      validStatuses.includes(updateData.status) &&
      movieBeforeUpdate.status !== updateData.status
    ) {
      await sendMovieStatusMail({
        toEmail: movieBeforeUpdate.email,
        toName: movieBeforeUpdate.firstname,
        status: updateData.status,
        movieTitle: movieBeforeUpdate.original_title,
      });
    }

    res.json(updatedMovie);
  } catch (err) {
    console.error('Erreur lors de la mise à jour du film:', err);
    res.status(500).json({ error: 'Impossible de mettre à jour le film' });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const deleted = await MovieModel.deleteMovie(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Film introuvable' });
    res.json({ message: 'Film supprimé' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de supprimer le film' });
  }
};

export const toggleMovieVisibility = async (req, res) => {
  try {
    const result = await MovieModel.toggleMovieVisibility(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Impossible de modifier la visibilité' });
  }
};

export const getPublicMovies = async (req, res) => {
  try {
    const movies = await MovieModel.getPublicMovies();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Impossible de récupérer les films' });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Statut invalide' });
    }

    const movieBeforeUpdate = await MovieModel.getMovieWithDirectorById(id);

    if (!movieBeforeUpdate) {
      return res.status(404).json({ error: 'Film introuvable' });
    }

    const updatedMovie = await MovieModel.updateMovieStatus(id, status);

    if (
      status !== movieBeforeUpdate.status &&
      ['approved', 'rejected'].includes(status)
    ) {
      await sendMovieStatusMail({
        toEmail: movieBeforeUpdate.email,
        toName: movieBeforeUpdate.firstname,
        status,
        movieTitle: movieBeforeUpdate.original_title,
      });
    }

    res.json(updatedMovie);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Impossible de modifier le statut du film' });
  }
};