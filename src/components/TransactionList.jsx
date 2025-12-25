import React from 'react';
import { ArrowUpCircle, ArrowDownCircle, Edit2, Trash2, Download, Plus, Search, Loader2 } from 'lucide-react';

const TransactionList = ({ 
  transactions, loading, searchTerm, setSearchTerm, 
  filterCategory, setFilterCategory, onExport, onAdd, onEdit, onDelete 
}) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-2 flex flex-col min-h-[550px]">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Riwayat Transaksi</h3>
          <div className="flex gap-2">
            <button onClick={onExport} className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200"><Download size={20} /></button>
            <button onClick={onAdd} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-blue-700"><Plus size={18} /> Tambah</button>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Cari..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none" />
          </div>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none cursor-pointer">
            <option value="Semua">Semua Kategori</option>
            <optgroup label="Pemasukan"><option value="Gaji">Gaji</option><option value="Freelance">Freelance</option></optgroup>
            <optgroup label="Pengeluaran"><option value="Makanan">Makanan</option><option value="Transport">Transport</option><option value="Hiburan">Hiburan</option></optgroup>
          </select>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3 max-h-[450px]">
         {loading ? <div className="text-center py-10"><Loader2 className="animate-spin inline text-blue-600"/></div> : 
          transactions.length === 0 ? <p className="text-center text-gray-400 py-10">Tidak ada data.</p> :
          transactions.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition duration-200 group">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${item.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {item.type === 'income' ? <ArrowUpCircle size={20}/> : <ArrowDownCircle size={20}/>}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.date} • {item.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className={`font-bold ${item.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>{item.type === 'income' ? '+' : '-'} Rp {item.amount.toLocaleString()}</span>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(item)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md"><Edit2 size={16} /></button>
                  <button onClick={() => onDelete(item.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md"><Trash2 size={16} /></button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TransactionList;