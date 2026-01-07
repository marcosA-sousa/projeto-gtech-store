
import React, { useEffect, useLayoutEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductListing from './pages/ProductListing';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyOrders from './pages/MyOrders';
import Categories from './pages/Categories';
import AdminPanel from './pages/AdminPanel';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProductProvider } from './contexts/ProductContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="produtos" element={<ProductListing />} />
                <Route path="produto/:id" element={<ProductDetail />} />
                <Route path="carrinho" element={<Cart />} />
                <Route path="meus-pedidos" element={<MyOrders />} />
                <Route path="categorias" element={<Categories />} />
                <Route path="admin" element={<AdminPanel />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
