import JuryRow from './JuryRow';

export default function JuryList({ jury, onDelete, onEdit }) {
  if (!jury.length) {
    return (
      <div className="bg-white p-10 rounded-xl shadow-sm text-center text-slate-500">
        Aucun juré enregistré.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-gray-50 border-b font-semibold text-gray-700">
        <span className="flex-1">Nom</span>
        <span className="flex-1">Email</span>
        <span className="w-48 text-center">Actions</span>
      </div>

      {/* Rows */}
      {jury.map(j => (
        <JuryRow key={j.id} jury={j} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
}
