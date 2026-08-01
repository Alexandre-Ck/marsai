import { useEffect, useState } from 'react';
import Sidebar from '../../components/DashbordAdmin/Sidebar';
import Header from '../../components/layout/Navbar';
import JuryList from '../../components/DashbordAdmin/AdminJury/JuryList';
import JuryForm from '../../components/DashbordAdmin/AdminJury/JuryForm';
import JuryEditModal from '../../components/DashbordAdmin/AdminJury/JuryEditModal';
import DistributionsPanel from '../../components/DashbordAdmin/AdminJury/DistributionsPanel';
import ConfirmPopup from '../../components/ui/ConfirmPopup';
import {
  getJury,
  createJury,
  updateJury,
  deleteJury,
} from '../../services/juryService';

export default function AdminJury() {
  const [jury, setJury] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingJury, setEditingJury] = useState(null);
  const [distributions, setDistributions] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('jurys');
  const [showDistributePopup, setShowDistributePopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [juryToDelete, setJuryToDelete] = useState(null);

  /* ================= FETCH ================= */

  const fetchJury = async () => {
    try {
      const data = await getJury();
      // sécurité anti-doublons
      const unique = Array.from(new Map(data.map(j => [j.id, j])).values());
      setJury(unique);
    } catch (err) {
      console.error('Erreur fetchJury:', err);
    }
  };

  const fetchDistributions = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/jury/distributions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await res.json();
      setDistributions(data);
    } catch (err) {
      console.error('Erreur fetchDistributions:', err);
    }
  };

  useEffect(() => {
    fetchJury();
    fetchDistributions();
  }, []);

  /* ================= CRUD ================= */

  const handleCreate = async newJury => {
    try {
      await createJury(newJury);
      await fetchJury();
      setShowForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async updatedJury => {
    try {
      await updateJury(updatedJury.id, updatedJury);
      await fetchJury();
      setEditingJury(null);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    if (!juryToDelete) return;

    // 🌟 SÉCURITÉ ID : On extrait l'ID que juryToDelete soit un objet ou directement l'ID
    const targetId = typeof juryToDelete === 'object' ? juryToDelete.id : juryToDelete;

    try {
      console.log('🗑️ Tentative de suppression du jury ID :', targetId);
      await deleteJury(targetId);
      await fetchJury();
    } catch (err) {
      console.error('❌ Échec de la suppression :', err);
      setShowErrorPopup(true);
    } finally {
      // 🌟 DANS TOUS LES CAS : On ferme le popup de confirmation en nettoyant l'état
      setJuryToDelete(null);
    }
  };

  /* ================= DISTRIBUTION ================= */

  const handleDistribute = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setShowErrorPopup(true);
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/jury/distribute-movies`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error('Erreur serveur');

      await fetchDistributions();
      setActiveTab('distributions');
      setShowSuccessPopup(true);
    } catch (err) {
      console.error(err);
      setShowErrorPopup(true);
    }
  };

  /* ================= RENDER ================= */

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarOpen ? 'ml-72' : 'ml-0'
        }`}
      >
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="flex-1 p-8 space-y-8">
          {/* Titre + Actions */}
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-slate-800">
              Gestion des Jurys
            </h2>

            <div className="flex gap-3">
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-[#d8e1e9] px-5 py-2.5 rounded-lg hover:bg-[#244b6695]"
              >
                + Ajouter
              </button>

              <button
                onClick={() => setShowDistributePopup(true)}
                className="bg-[#244b66] text-white px-5 py-2.5 rounded-lg hover:bg-[#1e3d52]"
              >
                Distribuer
              </button>
            </div>
          </div>

          {/* Onglets */}
          <div className="flex gap-8 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('jurys')}
              className={`pb-3 text-lg font-medium transition relative ${
                activeTab === 'jurys'
                  ? 'text-[#244b66]'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Jurys
              {activeTab === 'jurys' && (
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[#244b66] rounded-full"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('distributions')}
              className={`pb-3 text-lg font-medium transition relative ${
                activeTab === 'distributions'
                  ? 'text-[#244b66]'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Distributions
              {activeTab === 'distributions' && (
                <span className="absolute left-0 bottom-0 w-full h-[3px] bg-[#244b66] rounded-full"></span>
              )}
            </button>
          </div>

          {/* CONTENU */}
          {activeTab === 'jurys' && (
            <>
              {showForm && <JuryForm onCreate={handleCreate} />}

              <JuryList
                jury={jury}
                onDelete={setJuryToDelete}
                onEdit={setEditingJury}
                className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
              />

              {editingJury && (
                <JuryEditModal
                  jury={editingJury}
                  onClose={() => setEditingJury(null)}
                  onUpdate={handleUpdate}
                />
              )}
            </>
          )}

          {activeTab === 'distributions' && (
            <DistributionsPanel distributions={distributions} />
          )}

          {/* CONFIRM DISTRIBUTION */}
          <ConfirmPopup
            isOpen={showDistributePopup}
            title="Distribuer les films"
            message="Voulez-vous distribuer les films équitablement aux jurys ?"
            confirmText="Distribuer"
            cancelText="Annuler"
            onCancel={() => setShowDistributePopup(false)}
            onConfirm={() => {
              setShowDistributePopup(false);
              handleDistribute();
            }}
          />

          {/* SUCCESS */}
          <ConfirmPopup
            isOpen={showSuccessPopup}
            title="Distribution réussie"
            message="Les films ont été distribués aux jurys."
            confirmText="OK"
            onConfirm={() => setShowSuccessPopup(false)}
            onCancel={() => setShowSuccessPopup(false)}
          />

          {/* ERROR */}
          <ConfirmPopup
            isOpen={showErrorPopup}
            title="Erreur"
            message="Une erreur est survenue."
            confirmText="OK"
            onConfirm={() => showErrorPopup(false)}
            onCancel={() => showErrorPopup(false)}
          />

          {/* DELETE CONFIRM */}
          <ConfirmPopup
            isOpen={!!juryToDelete}
            title="Supprimer le jury"
            message="Êtes-vous sûr de vouloir supprimer ce jury ? Cette action est irréversible."
            confirmText="Supprimer"
            cancelText="Annuler"
            onCancel={() => setJuryToDelete(null)}
            onConfirm={confirmDelete}
          />
        </main>
      </div>
    </div>
  );
}