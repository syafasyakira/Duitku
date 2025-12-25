import React, { useState } from 'react';
import { Wallet, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false); // Mode Login vs Daftar
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (isRegister) {
        // Logika Daftar
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        alert("Pendaftaran berhasil! Silakan login.");
        setIsRegister(false); // Pindah ke mode login
      } else {
        // Logika Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 p-3 rounded-full shadow-blue-200 shadow-lg">
            <Wallet className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          {isRegister ? 'Buat Akun Baru' : 'Masuk ke DuitKu'}
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          {isRegister ? 'Mulai kelola keuanganmu hari ini' : 'Selamat datang kembali!'}
        </p>
        
        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm border border-red-100">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="nama@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              placeholder="Minimal 6 karakter"
            />
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold flex justify-center items-center disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : (isRegister ? 'Daftar Sekarang' : 'Masuk')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isRegister ? 'Sudah punya akun? ' : 'Belum punya akun? '}
          <button 
            onClick={() => { setIsRegister(!isRegister); setErrorMsg(''); }}
            className="text-blue-600 font-semibold hover:underline"
          >
            {isRegister ? 'Login disini' : 'Daftar disini'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;