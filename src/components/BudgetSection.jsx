import React from 'react';

const BudgetSection = ({ totalExpense, monthlyBudget, percent, onOpenModal }) => {
  const getProgressColor = () => {
    if (percent < 50) return 'bg-green-500';
    if (percent < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-6 relative overflow-hidden">
      <div className="flex justify-between items-end mb-2">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">Status Budget Bulan Ini</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Rp {totalExpense.toLocaleString()} 
              <span className="text-sm font-normal text-gray-400"> / Rp {monthlyBudget.toLocaleString()}</span>
            </h2>
            <button onClick={onOpenModal} className="text-blue-600 hover:text-blue-800 text-xs font-semibold bg-blue-50 px-2 py-1 rounded">Atur Limit</button>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-2xl font-bold ${percent > 90 ? 'text-red-600' : 'text-gray-800'}`}>{percent.toFixed(0)}%</span>
        </div>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-4">
        <div className={`h-4 rounded-full transition-all duration-1000 ease-out ${getProgressColor()}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
};

export default BudgetSection;