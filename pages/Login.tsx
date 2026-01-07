
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft, Store, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email === 'admin' && password === 'admin') {
      login(email, 'admin');
      navigate('/admin');
    } else {
      login(email || 'usuario@digitalstore.com', 'user');
      navigate('/meus-pedidos');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F8FE] dark:bg-gray-950 transition-colors">
      <header className="py-6 container mx-auto px-4 lg:px-20">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-md p-1.5 text-white">
            <Store className="w-5 h-5" />
          </div>
          <span className="text-primary font-bold text-2xl tracking-tight">Digital Store</span>
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center py-12 px-4 bg-gradient-to-b from-[#B5B6F2]/30 to-[#EFEFFF] dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Link to="/" className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-all mb-6 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Voltar para Home</span>
            </Link>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-2xl border border-transparent dark:border-gray-800">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Acesse sua conta</h1>
              <p className="text-sm text-gray-400 mb-8">
                Tente <span className="font-bold text-primary">admin/admin</span> para o painel de controle.
              </p>
              
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email ou Login *</label>
                  <input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                    placeholder="admin" 
                    type="text" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Senha *</label>
                  <input 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                    placeholder="admin" 
                    type="password" 
                    required
                  />
                </div>
                <button className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-4 px-4 rounded-xl transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2" type="submit">
                  <LogIn className="w-5 h-5" />
                  Acessar Conta
                </button>
              </form>

              <div className="mt-8 flex flex-col items-center gap-4">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Acesso Rápido</span>
                <div className="flex gap-4">
                  <button className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <img alt="Google" className="w-6 h-6" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYsByYrhmanUTN17992A2U-cJ49GH1C2iVcHO1sEjxQKk0yKD9BuCHjO3dDVAzG6nLyA2D9bistKU8kRC7vzA_KyYEkXBRmw6JxQTDn54Xp023xEjJXISk8WfkMEKFFPhrUdDbGxEH4xsatLtNqnTw1474Tt2485Y7Zl1yMKHTDQHdhXZESNx-JHdseHSBTrYH85l7fGWSVQ-hokgIS_37P48nfoJKcbOETkN-uc8CuGXoPpNDrKxEinKPYavMnjDAEtuGFasAUGg" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex relative justify-center items-center h-full min-h-[500px]">
             <img 
              alt="Admin Sneaker" 
              className="w-full max-w-md object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] animate-float" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8lMnOhP0xlawlbrMpfcvLNdLW1rJB9xdp52K8RlHHPyABCN5-MaOhMzOE2BUr4iuiRlmZ03KOsr2y-UvRf8qmNHrhpwBFABoGvf3JpWhdwB_Ya9UoWRvN5o7v55XCLCrsalaLla3KJcJDffXoVp7vsA7XD5bMwTfmPqLPpqnanq76SUH3uz6KF3auCDWxA8IeHidH9YvdIBuQPi8l825k_lC1kAguVuIjnN8BBU5TjUWMPIyGpucWYe2OhG3a0nqlm_-IKQL78h4" 
            />
          </div>
        </div>
      </main>

      <footer className="bg-dark-footer text-white py-12 pb-8 mt-auto">
        <div className="container mx-auto px-4 lg:px-20 text-center">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-bold opacity-50">Digital Store Admin Portal</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
