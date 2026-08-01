import db from '../config/database.config.js';

export const Form = {
  async create(data) {
    const { formData, collaborateurs } = data;
    const {
      nom,
      prenom,
      email,
      genre,
      cp,
      ville,
      biographie,
      region,
      pays,
      telephone,
      metier,
      facebook,
      twitter,
      linkedin,
      instagram,
    } = formData;

    // Vérification des champs obligatoires
    if (
      !nom ||
      !prenom ||
      !email ||
      !cp ||
      !genre ||
      !ville ||
      !biographie ||
      !region ||
      !pays ||
      !telephone ||
      !metier
    ) {
      throw new Error('Tous les champs obligatoires sont requis');
    }

    // 1. Insertion du réalisateur (Director)
    const [directorResult] = await db.query(
      `INSERT INTO directors (
        firstname,
        lastname,
        email,
        gender,
        zipcode,
        city,
        biographie,
        region,
        country,
        phone,
        job,
        facebook_url,
        twitter_url,
        linkedin_url,
        instagram_url
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        prenom,
        nom,
        email,
        genre,
        cp,
        ville,
        biographie,
        region,
        pays,
        telephone,
        metier,
        facebook,
        twitter,
        linkedin,
        instagram,
      ]
    );

    const directorId = directorResult.insertId;

    // 2. Insertion et liaison des collaborateurs
    if (Array.isArray(collaborateurs) && collaborateurs.length > 0) {
      for (const collaborateur of collaborateurs) {
        // Supporte aussi bien 'firstName' / 'lastName' que 'prenom' / 'nom'
        const lastname = (collaborateur.lastname || collaborateur.nom || '').trim();
        const firstname = (collaborateur.firstname || collaborateur.firstName || collaborateur.prenom || '').trim();
        const contribution = (collaborateur.contribution || collaborateur.role || '').trim();

        // On n'insère que si au moins un des champs n'est pas vide
        if (lastname !== '' || firstname !== '' || contribution !== '') {
          await db.query(
            `INSERT INTO collaborators (lastname, firstname, contribution, director_id)
             VALUES (?, ?, ?, ?)`,
            [lastname, firstname, contribution, directorId] // <-- CORRIGÉ : 4 paramètres transmis correctement !
          );
        }
      }
    }

    // On retourne l'ID pour que le contrôleur puisse le récupérer
    return { directorId };
  },
};