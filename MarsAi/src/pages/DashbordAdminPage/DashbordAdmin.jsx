import { useEffect, useState } from 'react';
import { apiFetch } from '../../services/api';
import Sidebar from '../../components/DashbordAdmin/Sidebar';
import Header from '../../components/layout/Navbar';
import Card from '../../components/DashbordAdmin/Card';
import ProgressBar from '../../components/DashbordAdmin/ProgressBar';
import { Film, Users, Globe, Clipboard } from 'lucide-react';

export default function DashbordAdmin() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await apiFetch('/api/dashboard');
        setStats(data);
      } catch (err) {
        setError('Impossible de charger le dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-gray-500 animate-pulse">Chargement...</div>
    );
  if (error) return <div className="p-10 text-red-600">{error}</div>;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        <main className="p-8 flex flex-col gap-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Administrateur
            </h1>
            <p className="text-gray-600">
              Suivez en temps réel l’activité des jurys, films, réalisateurs et
              ateliers. Chaque carte contient un indicateur clé pour vos
              décisions.
            </p>
          </div>

          {/* Grid principale */}
          {/* 3 cartes du haut */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              title="Films évalués par le Jury"
              value={`${stats?.movies?.progress ?? 0}%`}
              subtitle={`${stats?.movies?.evaluated ?? 0} films évalués`}
              icon={Film}
              className="bg-blue-50 hover:bg-blue-100"
            >
              <ProgressBar percent={stats?.movies?.progress ?? 0} light />
            </Card>

            <Card
              title="Jurys ayant finalisé leur lots"
              value={stats?.jury?.finishedJury ?? 0}
              icon={Users}
              className="bg-green-50 hover:bg-green-100"
            />

            <Card
              title="Pays représentés"
              value={stats?.countries?.count ?? 0}
              icon={Globe}
              className="bg-yellow-50 hover:bg-yellow-100"
            />
          </div>

          {/* Séparateur */}
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-sm text-gray-400 font-medium">
              Statistiques générales
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* 3 cartes du bas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
              title="Films soumis"
              value={stats?.movies?.total ?? 0}
              icon={Film}
              className="bg-teal-50 hover:bg-teal-100"
            />

            <Card
              title="Taux d'occupation workshops"
              value={`${stats?.workshops?.occupancy ?? 0}%`}
              icon={Clipboard}
              className="bg-purple-50 hover:bg-purple-100"
            />

            <Card
              title="Réalisateurs inscrits"
              value={stats?.directors?.activeCount ?? 0}
              subtitle={`+${stats?.directors?.todayIncrease ?? 0} aujourd’hui`}
              icon={Users}
              className="bg-red-50 hover:bg-red-100"
            />
          </div>
        </main>
      </div>
    </div>
  );
}
