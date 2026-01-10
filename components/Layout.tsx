
import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Sun, Moon, LogOut, Package, ChevronDown, ArrowRight, Settings } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useProducts } from '../contexts/ProductContext';
import { Product } from '../types';

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newMode = !isDark;
    setIsDark(newMode);

    // Verifica se o navegador suporta View Transitions API
    if (!document.startViewTransition) {
      // Fallback para navegadores que não suportam
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      }
      return;
    }

    // Adiciona classe para desabilitar transições CSS durante a View Transition
    document.documentElement.classList.add('transitioning');

    // Usa a View Transitions API para transição suave
    const transition = document.startViewTransition(() => {
      if (newMode) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      }
    });

    // Remove a classe quando a transição terminar
    transition.finished.finally(() => {
      document.documentElement.classList.remove('transitioning');
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-[100] w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center border border-gray-100 dark:border-gray-700 hover:scale-110 active:scale-95 transition-all text-gray-600 dark:text-yellow-400"
    >
      {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const { products } = useProducts();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length >= 2) {
      const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value.toLowerCase()) ||
        p.category.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (id: number) => {
    navigate(`/produto/${id}`);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-200 whitespace-nowrap pb-[2px] border-b-2 text-base tracking-tight inline-block ${isActive
      ? 'text-primary border-primary font-bold'
      : 'text-[#474747] dark:text-gray-400 border-transparent hover:text-primary font-normal'
    }`;

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-950">
      <DarkModeToggle />

      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors">
        <div className="container mx-auto px-4 lg:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src="../public/assets/logo-header.svg" alt="logo da página" />
          </Link>

          <div className="flex-grow max-w-xl w-full relative" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative z-50">
              <input
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
                className="w-full bg-[#F5F5F5] dark:bg-gray-800 border-none rounded-lg py-3 px-4 text-sm focus:ring-1 focus:ring-primary placeholder-gray-400 dark:text-white transition-colors"
                placeholder="O que você está procurando?"
                type="text"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-2xl rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-2 border-b border-gray-50 dark:border-gray-800">
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest px-3">Encontrados na loja</span>
                </div>
                <ul className="max-h-[400px] overflow-y-auto">
                  {suggestions.map((product) => (
                    <li key={product.id}>
                      <button
                        onClick={() => selectSuggestion(product.id)}
                        className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left group"
                      >
                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center p-1 flex-shrink-0">
                          <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-bold text-gray-800 dark:text-white truncate group-hover:text-primary transition-colors">{product.name}</h4>
                          <span className="text-xs text-gray-400 font-medium">{product.category}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="flex items-center gap-6 flex-shrink-0 relative">
            {!isLoggedIn ? (
              <>
                <Link to="/signup" className="text-gray-500 dark:text-gray-400 hover:underline text-sm font-medium">Cadastre-se</Link>
                <Link
                  to="/login"
                  className="bg-primary hover:bg-primary-hover text-white px-8 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-primary/30"
                >
                  Entrar
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 group"
                >
                  <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all">
                    <User className="w-5 h-5" />
                  </div>
                  <span className="hidden lg:block text-sm font-bold text-gray-700 dark:text-gray-200 truncate max-w-[100px]">{user?.name.split(' ')[0]}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {showProfileMenu && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-100 dark:border-gray-800 py-2 z-50 overflow-hidden">
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        onClick={() => setShowProfileMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-primary hover:bg-primary/5 transition-colors font-bold"
                      >
                        <Settings className="w-4 h-4" />
                        Painel Admin
                      </Link>
                    )}
                    <Link
                      to="/meus-pedidos"
                      onClick={() => setShowProfileMenu(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Package className="w-4 h-4 text-primary" />
                      Meus Pedidos
                    </Link>
                    <button
                      onClick={() => { logout(); setShowProfileMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors border-t border-gray-50 dark:border-gray-800"
                    >
                      <LogOut className="w-4 h-4" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            )}

            <Link to="/carrinho" className="relative text-primary hover:text-primary-hover transition-colors ml-2">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>

        <nav className="container mx-auto px-4 lg:px-12 pb-0 pt-2 border-t border-gray-50 dark:border-gray-800/20">
          <ul className="flex items-center gap-10 overflow-x-auto hide-scrollbar py-2">
            <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
            <li><NavLink to="/produtos" className={navLinkClasses}>Produtos</NavLink></li>
            <li><NavLink to="/categorias" className={navLinkClasses}>Categorias</NavLink></li>
            <li><NavLink to="/meus-pedidos" className={navLinkClasses}>Meus Pedidos</NavLink></li>
          </ul>
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-dark-footer text-white py-16">
        <div className="">
          <div>
            <img src="../public/assets/logo-footer.svg" alt="Logo da Digital Store" />
          </div>
        </div>
        <hr />
        <div className="container mx-auto px-4 lg:px-12 text-center text-sm text-gray-500">

          <p>&copy;2025 Digital Store. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
