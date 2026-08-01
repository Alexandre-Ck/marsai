import { X } from 'lucide-react';

export default function ConfirmPopup({
  isOpen,
  title,
  message,
  confirmText = 'Confirmer',
  cancelText = 'Annuler',
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-xl w-[420px] p-6 relative">
        {/* bouton fermer */}
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-700"
        >
          <X size={20} />
        </button>

        <h3 className="text-xl font-semibold text-slate-800 mb-3">{title}</h3>

        <p className="text-slate-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-[#244b66] text-white hover:bg-[#1e3d52]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
