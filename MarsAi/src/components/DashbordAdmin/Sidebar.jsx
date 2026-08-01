import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { apiFetch } from '../../services/api';
import {
  LayoutDashboard,
  Film,
  Users,
  Trophy,
  Calendar,
  Settings,
  X,
} from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen }) {
  const [user, setUser] = useState({
    firstname: 'Admin',
    email: 'admin@festival.org',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiFetch('/auth/me');
        setUser({
          firstname: data?.firstname || 'Admin',
          email: data?.email || 'admin@festival.org',
        });
      } catch (err) {
        console.error("Impossible de récupérer l'admin :", err);
      }
    };

    fetchUser();
  }, []);

  const linkBase =
    'flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 text-left';

  const activeStyle =
    'bg-white/15 backdrop-blur-md border border-white/20 shadow-md';

  const inactiveStyle = 'hover:bg-white/5 hover:translate-x-1';

  const handleClose = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed top-0 left-0
          h-screen w-72 
          md:relative md:w-72 flex-shrink-0
          bg-gradient-to-b from-[#0f172a] to-[#1e293b]
          text-white
          px-6 py-8
          flex flex-col
          border-r border-white/10
          transition-transform duration-300 ease-in-out
          z-50
          overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Header mobile */}
        <div className="flex justify-between items-center mb-10 md:hidden">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={() => setIsOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Profil */}
        <div className="flex items-center gap-4 mb-14">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-900">
            {user.firstname?.charAt(0)?.toUpperCase()}
          </div>

          <div className="min-w-0">
            <p className="font-semibold truncate">{user.firstname}</p>
            <p className="text-sm text-gray-400 break-all">{user.email}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6 font-medium text-sm md:text-base">
          <NavLink
            to="/admin"
            onClick={handleClose}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/films"
            onClick={handleClose}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <Film size={20} />
            Gestion Films
          </NavLink>

          <NavLink
            to="/admin/jury"
            onClick={handleClose}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <Users size={20} />
            Jury
          </NavLink>

          <NavLink
            to="/admin/results"
            onClick={handleClose}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <Trophy size={20} />
            Résultats
          </NavLink>

          <NavLink
            to="/admin/events"
            onClick={handleClose}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <Calendar size={20} />
            Événements
          </NavLink>

          <NavLink
            to="/admin/config"
            onClick={handleClose}
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeStyle : inactiveStyle}`
            }
          >
            <Settings size={20} />
            Configuration
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-10 text-xs text-white/40">
          MarsAI Admin v1.0
        </div>
      </aside>
    </>
  );
}