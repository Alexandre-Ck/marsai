import { Edit, Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function JuryRow({ jury, onEdit, onDelete }) {
  return (
    <div className="flex justify-between items-center p-5 hover:bg-slate-50 transition border-b last:border-b-0">
      {/* Nom + initiale */}
      <NavLink
        to={`/dashboard/jury/${jury.id}`}
        className="flex items-center gap-4 flex-1"
      >
        <div className="w-10 h-10 rounded-full bg-[#244b66]/10 text-[#244b66] flex items-center justify-center font-semibold">
          {jury.firstname?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <div>
          <p className="font-semibold text-slate-800 hover:text-[#244b66] transition">
            {jury.firstname} {jury.lastname}
          </p>
        </div>
      </NavLink>

      {/* Email */}
      <div className="flex-1 text-slate-500">{jury.email}</div>

      {/* Actions */}
      <div className="w-48 flex justify-center gap-2">
        <button
          onClick={() => onEdit(jury)}
          className="flex items-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
        >
          <Edit size={16} /> Éditer
        </button>

        <button
          onClick={() => onDelete(jury.id)}
          className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100"
        >
          <Trash2 size={16} /> Supprimer
        </button>
      </div>
    </div>
  );
}
