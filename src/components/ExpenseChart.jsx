import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

const ExpenseChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1 h-fit">
      <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
        <PieChart size={20} className="text-blue-600"/> Breakdown Kategori
      </h3>
      {data.length > 0 ? (
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} fill="#8884d8" paddingAngle={4} dataKey="value">
                {data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
              <Legend verticalAlign="bottom" height={36} iconType="circle"/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-gray-400 text-sm">Belum ada data.</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;