import { useState, useEffect } from 'react';
import Sidebar from '../../components/DashbordAdmin/Sidebar';
import Header from '../../components/layout/Navbar';

export default function AdminEvents() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [subject, setSubject] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  // Récupération des abonnés
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter/subscribers`);
        if (res.ok) {
          const data = await res.json();
          setSubscribersCount(data.length);
        }
      } catch (err) {
        console.error("Erreur de chargement des abonnés:", err);
      }
    };
    fetchSubscribers();
  }, []);

  const handleSendNewsletter = async (e) => {
    e.preventDefault();
    if (!subject || !message) return;

    try {
      setSending(true);
      setStatus({ type: '', text: '' });

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ subject, message, imageUrl })
      });

      if (res.ok) {
        setStatus({ type: 'success', text: 'Campagne mail distribuée avec succès !' });
        setSubject('');
        setImageUrl('');
        setMessage('');
      } else {
        const errData = await res.json();
        throw new Error(errData.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-zinc-900">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'ml-72' : 'ml-0'}`}>
        <Header isSidebarOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <main className="flex-1 p-6 sm:p-8 max-w-5xl w-full mx-auto space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Gestion des Événements & Newsletter</h2>
            <p className="text-sm text-slate-500 mt-1">Diffusez des emails collectifs illustrés à votre communauté.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Inscriptions Actives</span>
              <span className="text-4xl font-black text-slate-900">{subscribersCount}</span>
              <span className="text-xs text-emerald-600 font-medium block mt-2">● Communauté synchronisée</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-6 border-b pb-3">Nouvelle Campagne</h3>

            {status.text && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-semibold ${status.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                {status.text}
              </div>
            )}

            <form onSubmit={handleSendNewsletter} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">URL de l&apos;image d&apos;illustration (Optionnel)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com"
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 text-zinc-900 font-medium"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Objet du mail</label>
                <input
                  type="text"
                  placeholder="Ex: La sélection officielle de la semaine est en ligne !"
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 text-zinc-900 font-medium"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Contenu du message</label>
                <textarea
                  rows="8"
                  placeholder="Rédigez votre message ici..."
                  className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 leading-relaxed text-zinc-800"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={sending || subscribersCount === 0}
                  className={`px-6 py-3 rounded-xl text-sm font-bold text-white transition-all shadow-xs ${sending || subscribersCount === 0 ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#1E293B] hover:bg-slate-800'}`}
                >
                  {sending ? 'Envoi en cours...' : `Diffuser à mes ${subscribersCount} abonnés`}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}