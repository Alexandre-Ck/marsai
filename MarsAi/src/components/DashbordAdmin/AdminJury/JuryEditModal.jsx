import { useState, useEffect } from 'react';

export default function JuryEditModal({ jury, onClose, onUpdate }) {
  const [form, setForm] = useState({
    firstname: jury?.firstname || '',
    lastname: jury?.lastname || '',
    email: jury?.email || '',
  });

  useEffect(() => {
    if (jury) {
      setForm({
        firstname: jury.firstname,
        lastname: jury.lastname,
        email: jury.email,
      });
    }
  }, [jury]);

  if (!jury) return null;

  const handleSubmit = e => {
    e.preventDefault();
    onUpdate({ ...jury, ...form });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <form
        key={jury.id}
        onSubmit={handleSubmit}
        className="bg-gray-50 rounded-xl p-5 sm:p-6 w-full max-w-md shadow-lg max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-lg font-semibold mb-4">Modifier le jury</h3>

        <label className="block mb-3">
          Prénom
          <input
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            value={form.firstname}
            onChange={e => setForm({ ...form, firstname: e.target.value })}
            required
          />
        </label>

        <label className="block mb-3">
          Nom
          <input
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            value={form.lastname}
            onChange={e => setForm({ ...form, lastname: e.target.value })}
            required
          />
        </label>

        <label className="block mb-3">
          Email
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 transition"
          >
            Annuler
          </button>

          <button
            type="submit"
            className="bg-blue-900 text-white px-5 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}
