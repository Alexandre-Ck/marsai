import { useEffect, useState } from 'react';
import { SuccessMessage, ErrorMessage, LoadingMessage } from '../ui/Alert';

// 🌟 On récupère movieId en tant que Prop au lieu de useParams
export default function Ratings({ movieId }) {
  const [rating, setRating] = useState(0); 
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alreadyNoted, setAlreadyNoted] = useState(null);

  const token = localStorage.getItem('token');

  // 🌟 NOUVEAU : On charge la note existante à chaque fois que le movieId change
  useEffect(() => {
    if (!movieId) return;

    // Réinitialisation des états à chaque changement de film
    setRating(0);
    setError(null);
    setSuccess(false);
    setAlreadyNoted(null);
    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/ratings/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.status === 404) return { rate: 0 }; // Pas encore noté, on renvoie une note de 0
        if (!res.ok) throw new Error('Impossible de récupérer la note');
        return res.json();
      })
      .then(data => {
        if (data && data.rate) {
          setRating(data.rate);
          setAlreadyNoted('Vous avez déjà noté ce film'); // Permet de bloquer le bouton de vote
        }
      })
      .catch(err => {
        console.error(err);
        setError('Erreur lors de la récupération de la note');
      })
      .finally(() => setIsLoading(false));
  }, [movieId, token]);

  function handleSubmit(event) {
    event.preventDefault();

    if (rating === 0) {
      setError('Veuillez sélectionner une note avant de valider');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setAlreadyNoted(null);

    fetch(`${import.meta.env.VITE_API_URL}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rate: rating,
        movieId: movieId, // Transmis proprement par la prop
      }),
    })
      .then(res => {
        if (res.status === 409) throw new Error('ALREADY_NOTED');
        if (!res.ok) throw new Error('SERVER_ERROR');
        return res.json();
      })
      .then(() => {
        setSuccess(true);
        setAlreadyNoted('Vous avez déjà noté ce film'); // Bloque le formulaire après enregistrement
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      })
      .catch(err => {
        if (err.message === 'ALREADY_NOTED') {
          setAlreadyNoted('Vous avez déjà noté ce film');
          setSuccess(false);
        } else {
          setError('Erreur serveur');
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <section className="bg-[#F2F3F5] rounded-4xl p-10 mt-5 gap-0.5 border border-[#D5DAE1] flex flex-col items-center md:w-full md:mx-auto">
      <h3 className="font-bold text-2xl text-[#1e293b]">Noter le film</h3>
      
      {/* Messages d'information */}
      {isLoading && <LoadingMessage message="Chargement de votre évaluation..." />}
      {alreadyNoted && <ErrorMessage message={alreadyNoted} />}
      {error && <ErrorMessage message={error} />}
      {success && (
        <SuccessMessage message="Votre note a bien été enregistrée" />
      )}
      
      <ul className="flex justify-center text-4xl mt-5 md:gap-2">
        {[...Array(10)].map((_, index) => {
          return (
            <li
              key={index}
              className={`${index + 1 <= rating ? 'text-[#e74431]' : 'text-gray-400'} cursor-pointer transition-transform duration-300 ease-out hover:scale-130`}
              onClick={() => {
                // On empêche de changer la note si le film est déjà noté dans la DB
                if (!alreadyNoted) {
                  setRating(index + 1);
                }
              }}
            >
              ★
            </li>
          );
        })}
      </ul>
      
      <p className="font-medium flex text-center text-lg mt-2">
        Votre note : {rating}/10
      </p>
      
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={isLoading || success || !!alreadyNoted} // Désactivé si déjà noté ou en cours de chargement
        className={`bg-[#1e293b] transition-colors w-full md:w-50 cursor-pointer text-white font-bold rounded-xl py-2 px-6 text-center m-4
          ${isLoading || alreadyNoted ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#29455e]'}`}
      >
        VALIDER MA NOTE
      </button>
    </section>
  );
}