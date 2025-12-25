import React from 'react';
import { AlertTriangle, Trash2, Target } from 'lucide-react';

export const AlertModal = ({ show, percent, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-red-900/40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 text-center w-full max-w-sm border-2 border-red-100">
        <AlertTriangle size={32} className="text-red-600 mx-auto mb-4 animate-bounce" />
        <h3 className="font-bold text-gray-800">Peringatan Budget!</h3>
        <p className="text-gray-600 mb-6 text-sm">Pengeluaranmu sudah mencapai <span className="font-bold text-red-600">{percent.toFixed(0)}%</span>.</p>
        <button onClick={onClose} className="w-full bg-red-600 text-white py-2 rounded-xl font-bold hover:bg-red-700">Oke, Saya Mengerti</button>
      </div>
    </div>
  );
};

export const DeleteModal = ({ show, onClose, onConfirm }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 text-center w-full max-w-sm">
        <Trash2 size={32} className="text-red-600 mx-auto mb-4" />
        <h3 className="font-bold mb-2">Hapus Transaksi?</h3>
        <p className="text-gray-500 text-sm mb-6">Data hilang selamanya.</p>
        <div className="flex gap-2"><button onClick={onClose} className="flex-1 bg-gray-100 py-2 rounded-lg">Batal</button><button onClick={onConfirm} className="flex-1 bg-red-600 text-white py-2 rounded-lg">Hapus</button></div>
      </div>
    </div>
  );
};

export const BudgetModal = ({ show, onClose, onSave, defaultValue }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
       <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
        <h3 className="font-bold mb-4 flex items-center gap-2"><Target className="text-blue-600"/> Atur Budget</h3>
        <form onSubmit={onSave}>
          <input type="number" name="budget" defaultValue={defaultValue} className="w-full border rounded-lg px-4 py-2 mb-4" />
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">Simpan</button>
        </form>
        <button onClick={onClose} className="w-full mt-2 text-gray-500 text-sm">Batal</button>
      </div>
    </div>
  );
};