import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Envoi d’un mail avec le code d’accès
 */
export async function sendMail({ toEmail, toName, code }) {
  if (!toEmail || !code) {
    throw new Error('Aucun destinataire ou code défini');
  }

  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: 'Votre code d’accès sécurisé – MarsAI',
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          <h2 style="color: #333; margin-bottom: 20px;">Bonjour ${toName},</h2>
          <p style="font-size: 16px; color: #333; line-height: 1.6;">
            Vous trouverez ci-dessous votre <strong>code d’accès sécurisé</strong> pour rejoindre l’espace Jury de MarsAI :
          </p>
          <div style="margin: 30px 0; text-align: center;">
            <span style="display: inline-block; padding: 15px 30px; font-size: 24px; letter-spacing: 4px; font-weight: bold; color: #ffffff; background-color: #1e293b; border-radius: 6px;">
              ${code}
            </span>
          </div>
          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            Pour des raisons de sécurité, merci de ne pas partager ce code avec des tiers.
          </p>
        </div>
      </div>
    `,
  };

  try {
    console.log(`🔹 Envoi mail à ${toEmail} avec code ${code}`);
    const info = await transporter.sendMail(mailOptions);
    return info.accepted.includes(toEmail) ? { success: true, code } : { success: false };
  } catch (error) {
    console.error('❌ Erreur envoi email :', error);
    return { success: false };
  }
}

/**
 * Envoi d’un mail de statut film (approuvé/refusé/non conforme)
 */
export async function sendMovieStatusMail({ toEmail, toName, status, movieTitle }) {
  if (!toEmail) throw new Error('Aucun destinataire défini');

  let subject = '';
  let message = '';

  switch (status) {
    case 'approved':
      subject = `Votre film "${movieTitle}" a été accepté !`;
      message = `Nous avons le plaisir de vous informer que votre film <strong>${movieTitle}</strong> a été accepté et publié dans la galerie.`;
      break;
    case 'rejected':
      subject = `Votre film "${movieTitle}" a été refusé`;
      message = `Nous sommes désolés de vous informer que votre film <strong>${movieTitle}</strong> n'a pas été retenu.`;
      break;
    case 'isconform':
      subject = `Votre film "${movieTitle}" est non conforme`;
      message = `Votre film <strong>${movieTitle}</strong> a été jugé non conforme aux règles du concours.`;
      break;
    default:
      throw new Error('Statut inconnu');
  }

  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 30px;">
        <h2>Bonjour ${toName},</h2>
        <p>${message}</p>
        <p>Merci pour votre participation à MarsAI</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info.accepted.includes(toEmail) ? { success: true } : { success: false };
  } catch (error) {
    console.error('❌ Erreur envoi email statut film :', error);
    return { success: false };
  }
}

/**
 * ENVOI NEWSLETTER COLLECTIVE (BCC) + GESTION D'IMAGE IMAGEURL
 */
export async function sendNewsletterMail({ emailList, subject, message, imageUrl }) {
  if (!emailList || emailList.length === 0) {
    throw new Error('Aucun destinataire dans la liste d’abonnés');
  }

  // Injecte l'image seulement si le champ est rempli en Admin
  const imageHtml = imageUrl 
    ? `<div style="margin-bottom: 25px;"><img src="${imageUrl}" alt="Illustration" style="width: 100%; max-width: 600px; height: auto; border-radius: 12px; display: block;" /></div>`
    : '';

  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER, 
    bcc: emailList.join(', '), 
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: auto; padding: 20px;">
        <div style="padding-bottom: 20px; border-bottom: 2px solid #F2F4F7; margin-bottom: 25px;">
          <h1 style="color: #FF5845; font-size: 26px; font-weight: 900; margin: 0; letter-spacing: -0.03em;">MARS.AI</h1>
        </div>
        
        ${imageHtml}
        
        <div style="font-size: 16px; line-height: 1.6; color: #334155; white-space: pre-line;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #F2F4F7; text-align: center; font-size: 11px; color: #94a3b8;">
          <p>Vous recevez cet email car vous suivez l'actualité de MarsAI.</p>
          <p>© 2026 MARS.AI. Tous droits réservés.</p>
        </div>
      </div>
    `,
  };

  try {
    console.log(`🔹 Envoi de la newsletter à ${emailList.length} abonnés...`);
    const info = await transporter.sendMail(mailOptions);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Erreur critique Nodemailer Newsletter :', error);
    return { success: false, error: error.message };
  }
}