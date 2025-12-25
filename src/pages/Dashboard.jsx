import React, { useEffect, useState, useMemo } from 'react';
import { LogOut, Wallet, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

import SummaryCards from '../components/SummaryCards';
import BudgetSection from '../components/BudgetSection';
import ExpenseChart from '../components/ExpenseChart';
import TransactionList from '../components/TransactionList';
import TransactionForm from '../components/TransactionForm';
import { AlertModal, DeleteModal, BudgetModal } from '../components/DashboardModals';

const Dashboard = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const [modals, setModals] = useState({ form: false, budget: false, alert: false, delete: false });
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [filterDate, setFilterDate] = useState(new Date().toISOString().slice(0, 7));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Semua');
  const [monthlyBudget, setMonthlyBudget] = useState(5000000); 
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'Makanan', date: new Date().toISOString().split('T')[0], type: 'expense' });

  const fetchData = async () => {
    setLoading(true);
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    setUser(currentUser); 
    
    if (currentUser) {
      const [y, m] = filterDate.split('-');
      const lastDay = new Date(y, m, 0).getDate();
      
      const { data, error } = await supabase.from('expenses')
        .select('*')
        .eq('user_id', currentUser.id)
        .gte('date', `${filterDate}-01`)
        .lte('date', `${filterDate}-${lastDay}`)
        .order('date', { ascending: false });
        
      if (!error) setTransactions(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const saved = localStorage.getItem('userBudget');
    if (saved) setMonthlyBudget(parseInt(saved));
  }, [filterDate]); 

  const filteredData = useMemo(() => transactions.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (filterCategory === 'Semua' || t.category === filterCategory)
  ), [transactions, searchTerm, filterCategory]);

  const stats = useMemo(() => {
    let inc = 0, exp = 0, catMap = {};
    filteredData.forEach(t => {
      if (t.type === 'income') inc += t.amount;
      else { exp += t.amount; catMap[t.category] = (catMap[t.category] || 0) + t.amount; }
    });
    const percent = Math.min((exp / monthlyBudget) * 100, 100);
    return { inc, exp, bal: inc - exp, chart: Object.keys(catMap).map(k => ({ name: k, value: catMap[k] })), percent };
  }, [filteredData, monthlyBudget]);

  useEffect(() => setModals(m => ({ ...m, alert: stats.percent >= 90 })), [stats.percent]);

  const toggleModal = (type, val) => setModals(m => ({ ...m, [type]: val }));
  
  const handleSave = async (e) => {
    e.preventDefault();
    const payload = { user_id: user.id, ...formData, amount: parseFloat(formData.amount) };
    
    const { error } = editingId 
      ? await supabase.from('expenses').update(payload).eq('id', editingId)
      : await supabase.from('expenses').insert([payload]);

    if (!error) { 
      toggleModal('form', false); 
      fetchData(); 
    } else {
      alert("Gagal menyimpan: " + error.message);
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('expenses').delete().eq('id', deleteId);
    
    if (!error) {
      toggleModal('delete', false); 
      fetchData(); 
      setDeleteId(null);
    }
  };

  const handleExport = () => {
    const rows = filteredData.map(t => `${t.date},"${t.title}",${t.category},${t.amount}`);
    const link = document.createElement("a");
    link.href = encodeURI("data:text/csv;charset=utf-8," + ["Date,Title,Cat,Amount", ...rows].join("\n"));
    link.download = `Report.csv`; link.click();
  };

  if (loading && !user) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <nav className="bg-white border-b px-8 py-4 flex justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2 text-blue-700 font-bold">
            <Wallet /> 
            <span>DuitKu</span>
        </div>
        <div className="flex gap-3">
          <input type="month" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="border rounded-lg px-2 text-sm bg-gray-50"/>
          <button onClick={async () => { await supabase.auth.signOut(); navigate('/'); }}><LogOut className="text-gray-500 hover:text-red-600"/></button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6">
        <BudgetSection totalExpense={stats.exp} monthlyBudget={monthlyBudget} percent={stats.percent} onOpenModal={() => toggleModal('budget', true)} />
        <SummaryCards income={stats.inc} expense={stats.exp} balance={stats.bal} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ExpenseChart data={stats.chart} />
          
          <TransactionList 
            transactions={filteredData} loading={loading}
            searchTerm={searchTerm} setSearchTerm={setSearchTerm}
            filterCategory={filterCategory} setFilterCategory={setFilterCategory}
            onExport={handleExport}
            onAdd={() => { setEditingId(null); toggleModal('form', true); }}
            onEdit={(item) => { setEditingId(item.id); setFormData(item); toggleModal('form', true); }}
            onDelete={(id) => { setDeleteId(id); toggleModal('delete', true); }}
          />
        </div>
      </main>

      <TransactionForm show={modals.form} onClose={() => toggleModal('form', false)} onSubmit={handleSave} formData={formData} setFormData={setFormData} isEditing={editingId} />
      <BudgetModal show={modals.budget} onClose={() => toggleModal('budget', false)} defaultValue={monthlyBudget} onSave={(e) => { e.preventDefault(); const val = parseInt(e.target.budget.value); setMonthlyBudget(val); localStorage.setItem('userBudget', val); toggleModal('budget', false); }} />
      <DeleteModal show={modals.delete} onClose={() => toggleModal('delete', false)} onConfirm={handleDelete} />
      <AlertModal show={modals.alert} percent={stats.percent} onClose={() => toggleModal('alert', false)} />
    </div>
  );
};

export default Dashboard;