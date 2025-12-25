import React from 'react';
import { X } from 'lucide-react';

const TransactionForm = ({ show, onClose, onSubmit, formData, setFormData, isEditing }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">{isEditing ? 'Edit Transaksi' : 'Transaksi Baru'}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-1 rounded-full"><X size={20} /></button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
            <button 
              type="button" 
              onClick={() => setFormData({...formData, type: 'income', category: 'Gaji'})} 
              className={`py-2 text-sm font-medium rounded-md transition ${formData.type === 'income' ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Pemasukan
            </button>
            <button 
              type="button" 
              onClick={() => setFormData({...formData, type: 'expense', category: 'Makanan'})} 
              className={`py-2 text-sm font-medium rounded-md transition ${formData.type === 'expense' ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Pengeluaran
            </button>
          </div>
          
          <input type="text" required className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Judul" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
          
          <div className="grid grid-cols-2 gap-4">
            <input type="number" required className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Nominal" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
            <select className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
              {formData.type === 'income' ? <><option>Gaji</option><option>Freelance</option><option>Bonus</option><option>Investasi</option><option>Lainnya</option></> : <><option>Makanan</option><option>Transport</option><option>Hiburan</option><option>Belanja</option><option>Tagihan</option><option>Kesehatan</option><option>Lainnya</option></>}
            </select>
          </div>
          <input type="date" required className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition mt-4">{isEditing ? 'Update' : 'Simpan'}</button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;