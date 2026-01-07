
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, Coupon, HeroSlide, Customer, Order } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

interface ProductContextType {
  products: Product[];
  coupons: Coupon[];
  heroSlides: HeroSlide[];
  customers: Customer[];
  orders: Order[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
  addHeroSlide: (slide: HeroSlide) => void;
  updateHeroSlide: (slide: HeroSlide) => void;
  deleteHeroSlide: (id: number) => void;
  updateOrderStatus: (orderId: number, status: Order['status']) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const INITIAL_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tag: 'Melhores ofertas personalizadas',
    title: 'Queima de stoque Nike 🔥',
    description: 'Consequat culpa exercitation mollit nisi excepteur do do tempor laboris eiusmod irure consectetur.',
    buttonText: 'Ver Ofertas',
    buttonLink: '/produtos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrPlN5J3q2tsm7xm5e8eDdL_DkVtbmB6yR6VuTr2tANhXyZLdX1mim9RtryWY2lUmfMVU27oS51yF983BT69sgAZUR3MhgCZKBsB3xRsmnkAXQnGVasWnY-Gec02NiJ4lkcFwVL8nGrRk8PffbhMIOW3ges4GZPjRIH04sjefT5Bml3hgkYChyixCQb_oNSXDOp0iTLL--f0SJW2yKl3EIMED1f9re_SNsd9PePFiEG3lABSMroLLPPga_9oY40TMEBWuGncSXx3c',
    bgColor: 'bg-[#F5F5F5]',
    bgDark: 'dark:bg-gray-900/50'
  },
  {
    id: 2,
    tag: 'Tendências 2025',
    title: 'O estilo que você domina 👟',
    description: 'Descubra a coleção que está redefinindo o streetwear. Conforto incomparável e a exclusividade que o seu corre merece.',
    buttonText: 'Aproveitar Ofertas',
    buttonLink: '/produtos',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrPlN5J3q2tsm7xm5e8eDdL_DkVtbmB6yR6VuTr2tANhXyZLdX1mim9RtryWY2lUmfMVU27oS51yF983BT69sgAZUR3MhgCZKBsB3xRsmnkAXQnGVasWnY-Gec02NiJ4lkcFwVL8nGrRk8PffbhMIOW3ges4GZPjRIH04sjefT5Bml3hgkYChyixCQb_oNSXDOp0iTLL--f0SJW2yKl3EIMED1f9re_SNsd9PePFiEG3lABSMroLLPPga_9oY40TMEBWuGncSXx3c',
    bgColor: 'bg-[#F5F5F5]',
    bgDark: 'dark:bg-gray-900/50'
  }
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('digital_store_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('digital_store_coupons');
    return saved ? JSON.parse(saved) : [
      { id: 1, code: 'BEMVINDO', discountPercent: 10, stackable: true }
    ];
  });

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => {
    const saved = localStorage.getItem('digital_store_hero_slides');
    return saved ? JSON.parse(saved) : INITIAL_HERO_SLIDES;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('digital_store_customers');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(11) 98765-4321',
        cpf: '123.456.789-00',
        registeredAt: '2025-12-15',
        totalOrders: 3,
        totalSpent: 2847.70,
        lastOrderDate: '2026-01-05'
      },
      {
        id: 2,
        name: 'Maria Santos',
        email: 'maria.santos@email.com',
        phone: '(21) 99876-5432',
        cpf: '987.654.321-00',
        registeredAt: '2025-11-20',
        totalOrders: 5,
        totalSpent: 4532.50,
        lastOrderDate: '2026-01-06'
      },
      {
        id: 3,
        name: 'Pedro Costa',
        email: 'pedro.costa@email.com',
        phone: '(11) 91234-5678',
        registeredAt: '2026-01-02',
        totalOrders: 1,
        totalSpent: 899.90,
        lastOrderDate: '2026-01-02'
      }
    ];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('digital_store_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 1001,
        customerId: 1,
        customerName: 'João Silva',
        customerEmail: 'joao.silva@email.com',
        items: [
          {
            id: '1-42-Branco',
            productId: 1,
            name: 'Nike Air Max 2023',
            image: 'https://via.placeholder.com/100',
            price: 899.90,
            originalPrice: 1299.90,
            color: 'Branco',
            size: '42',
            quantity: 1
          }
        ],
        total: 899.90,
        status: 'processing',
        paymentMethod: 'Cartão de Crédito',
        shippingAddress: 'Rua das Flores, 123 - São Paulo/SP',
        createdAt: '2026-01-05T14:30:00',
        updatedAt: '2026-01-05T14:30:00'
      },
      {
        id: 1002,
        customerId: 2,
        customerName: 'Maria Santos',
        customerEmail: 'maria.santos@email.com',
        items: [
          {
            id: '2-M-Preto',
            productId: 2,
            name: 'Camiseta Adidas',
            image: 'https://via.placeholder.com/100',
            price: 149.90,
            originalPrice: 199.90,
            color: 'Preto',
            size: 'M',
            quantity: 2
          }
        ],
        total: 299.80,
        status: 'shipped',
        paymentMethod: 'PIX',
        shippingAddress: 'Av. Paulista, 1000 - Rio de Janeiro/RJ',
        createdAt: '2026-01-04T10:15:00',
        updatedAt: '2026-01-06T09:00:00'
      },
      {
        id: 1003,
        customerId: 3,
        customerName: 'Pedro Costa',
        customerEmail: 'pedro.costa@email.com',
        items: [
          {
            id: '1-40-Preto',
            productId: 1,
            name: 'Nike Air Max 2023',
            image: 'https://via.placeholder.com/100',
            price: 899.90,
            originalPrice: 1299.90,
            color: 'Preto',
            size: '40',
            quantity: 1
          }
        ],
        total: 899.90,
        status: 'pending',
        paymentMethod: 'Boleto',
        shippingAddress: 'Rua dos Pinheiros, 456 - São Paulo/SP',
        createdAt: '2026-01-02T16:45:00',
        updatedAt: '2026-01-02T16:45:00'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('digital_store_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('digital_store_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('digital_store_hero_slides', JSON.stringify(heroSlides));
  }, [heroSlides]);

  useEffect(() => {
    localStorage.setItem('digital_store_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('digital_store_orders', JSON.stringify(orders));
  }, [orders]);

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  };

  const deleteProduct = (id: number) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons(prev => [coupon, ...prev]);
  };

  const deleteCoupon = (id: number) => {
    setCoupons(prev => prev.filter(c => c.id !== id));
  };

  const getProductById = (id: number) => {
    return products.find(p => p.id === id);
  };

  const addHeroSlide = (slide: HeroSlide) => {
    setHeroSlides(prev => [...prev, slide]);
  };

  const updateHeroSlide = (slide: HeroSlide) => {
    setHeroSlides(prev => prev.map(s => s.id === slide.id ? slide : s));
  };

  const deleteHeroSlide = (id: number) => {
    setHeroSlides(prev => prev.filter(s => s.id !== id));
  };

  const updateOrderStatus = (orderId: number, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date().toISOString() } 
        : order
    ));
  };

  return (
    <ProductContext.Provider value={{ 
      products, 
      coupons, 
      heroSlides,
      customers,
      orders,
      addProduct,
      updateProduct,
      deleteProduct, 
      addCoupon, 
      deleteCoupon, 
      getProductById,
      addHeroSlide,
      updateHeroSlide,
      deleteHeroSlide,
      updateOrderStatus
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
