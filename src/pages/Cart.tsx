import { useState } from 'react';
import { Minus, Plus, Trash2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopNavigation from '@/components/TopNavigation';
import BottomNavigation from '@/components/BottomNavigation';
import { products } from '@/data/products';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface CartItem {
  productId: string;
  quantity: number;
}

const Cart = () => {
  const [cart, setCart] = useLocalStorage<string[]>('cart', []);
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', []);

  // Convert cart to items with quantities
  const cartItems: CartItem[] = cart.reduce((acc, productId) => {
    const existing = acc.find(item => item.productId === productId);
    if (existing) {
      existing.quantity++;
    } else {
      acc.push({ productId, quantity: 1 });
    }
    return acc;
  }, [] as CartItem[]);

  const cartProducts = cartItems.map(item => ({
    ...products.find(p => p.id === item.productId)!,
    quantity: item.quantity
  }));

  const total = cartProducts.reduce((sum, product) => sum + (product.price * product.quantity), 0);

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const currentCount = cart.filter(id => id === productId).length;
    const diff = newQuantity - currentCount;

    if (diff > 0) {
      setCart(prev => [...prev, ...Array(diff).fill(productId)]);
    } else if (diff < 0) {
      setCart(prev => {
        const newCart = [...prev];
        for (let i = 0; i < Math.abs(diff); i++) {
          const index = newCart.findIndex(id => id === productId);
          if (index > -1) newCart.splice(index, 1);
        }
        return newCart;
      });
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(id => id !== productId));
  };

  const addToWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) ? prev : [...prev, productId]
    );
  };

  const handleOrderCall = () => {
    window.open('tel:+8801711727436');
  };

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopNavigation cartCount={cart.length} wishlistCount={wishlist.length} />
        
        <main className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">আপনার কার্ট খালি</h2>
            <p className="text-muted-foreground">এখনও কোন পণ্য যোগ করেননি</p>
            <Link 
              to="/" 
              className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold"
            >
              শপিং শুরু করুন
            </Link>
          </div>
        </main>
        
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation cartCount={cart.length} wishlistCount={wishlist.length} />
      
      <main className="p-4 space-y-4">
        <h1 className="text-xl font-bold">আপনার কার্ট</h1>
        
        {/* Cart Items */}
        <div className="space-y-3">
          {cartProducts.map((product) => (
            <div key={product.id} className="bg-card border border-border rounded-lg p-4">
              <div className="flex space-x-3">
                <Link to={`/product/${product.id}`} className="flex-shrink-0">
                  <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Link>
                
                <div className="flex-1 space-y-2">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium line-clamp-2 hover:text-primary">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <p className="text-sm font-bold text-primary">
                    ৳{product.price} × {product.quantity} = ৳{product.price * product.quantity}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                        className="w-8 h-8 bg-muted rounded-full flex items-center justify-center"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{product.quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                        className="w-8 h-8 bg-muted rounded-full flex items-center justify-center"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => addToWishlist(product.id)}
                        className={`p-2 rounded-full ${
                          wishlist.includes(product.id)
                            ? 'bg-destructive/10 text-destructive'
                            : 'text-muted-foreground hover:text-destructive'
                        }`}
                      >
                        <Heart size={16} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-2 text-destructive"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">মোট</span>
            <span className="text-xl font-bold text-primary">৳{total}</span>
          </div>
          
          <button 
            onClick={handleOrderCall}
            className="order-btn"
          >
            অর্ডার করুন
          </button>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Cart;