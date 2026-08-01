import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';

// ce comosant reçoit "children" les pages protéger
export default function JuryRoutes({ children }) {
  // récupère le token stocké dans le navigateur localStorage
  const token = localStorage.getItem('token');
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();

  // si y a pas de token c'est que l'utilisateur n'est pas connecté
  // redirige vers la page /home.
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  try {
    // récupère le le payload du jwt
    const payload = jwtDecode(token);
    // vérifie l'expiration du token
    // payload.exp est en secondes, Date.now() est en millisecondes multiplié par 1000
    if (!payload.exp || payload.exp * 1000 < now) {
      // supprime le token s'il est expiré
      localStorage.removeItem('token');

      return <Navigate to="/auth" replace />;
    }
    // vérifie si l'utilisateur est un jury
    if (!payload.roles || !payload.roles.includes('Jury')) {
      return <Navigate to="/auth" replace />;
    }
    // si tout est bon token valide, non expiré, bon rôle
    // affiche la page protégée DashboardJury
    return children;
  } catch (error) {
    // si ya  une erreur affiche l'erreur dans la console
    console.error('JuryRoute token erreur :', error);
    // supprime le token par sécurité et renvoie a home
    localStorage.removeItem('token');
    return <Navigate to="/auth" replace />;
  }
}
