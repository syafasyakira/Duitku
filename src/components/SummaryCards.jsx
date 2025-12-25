import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const SummaryCards = ({ income, expense, balance }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-6 rounded-2xl shadow-lg">
        <p className="text-gray-400 text-sm mb-1 font-medium">Sisa Saldo Real</p>
        <h3 className="text-3xl font-bold">Rp {balance.toLocaleString()}</h3>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">Pemasukan</p>
          <h3 className="text-2xl font-bold text-green-600">+ Rp {income.toLocaleString()}</h3>
        </div>
        <div className="bg-green-50 p-3 rounded-full"><ArrowUpCircle className="text-green-600 w-8 h-8" /></div>
      </div>
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">Pengeluaran</p>
          <h3 className="text-2xl font-bold text-red-600">- Rp {expense.toLocaleString()}</h3>
        </div>
        <div className="bg-red-50 p-3 rounded-full"><ArrowDownCircle className="text-red-600 w-8 h-8" /></div>
      </div>
    </div>
  );
};

export default SummaryCards;