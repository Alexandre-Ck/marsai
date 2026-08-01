import express from 'express';
import { db } from '../config/database.config.js'; 
import { sendNewsletterMail } from '../utils/mailer.js'; 

const router = express.Router();

// 1. ROUTE PUBLIQUE : Inscription depuis le footer public
router.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Adresse email obligatoire.' });

  try {
    await db.query('INSERT IGNORE INTO subscribers (email) VALUES (?)', [email]);
    res.status(200).json({ message: 'Inscription enregistrée.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement.' });
  }
});

// 2. ROUTE ADMIN : Récupérer le nombre total d'abonnés
router.get('/subscribers', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM subscribers ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de la récupération des abonnés.' });
  }
});

// 3. ROUTE ADMIN : Déclencher l'envoi collectif avec image facultative
router.post('/send', async (req, res) => {
  const { subject, message, imageUrl } = req.body;
  if (!subject || !message) return res.status(400).json({ error: 'Champs requis manquants.' });

  try {
    const [subscribers] = await db.query('SELECT email FROM subscribers');
    if (subscribers.length === 0) {
      return res.status(400).json({ error: 'Aucun abonné enregistré dans la table subscribers.' });
    }

    const emailList = subscribers.map(s => s.email);

    const emailResult = await sendNewsletterMail({ emailList, subject, message, imageUrl });
    if (!emailResult.success) throw new Error(emailResult.error);

    await db.query(
      'INSERT INTO newsletters (object, content, sent_at) VALUES (?, ?, NOW())',
      [subject, message]
    );

    res.status(200).json({ message: 'Newsletter diffusée avec succès.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Échec de la distribution de la newsletter.' });
  }
});

export default router;