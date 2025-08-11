import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import TopNavigation from '@/components/TopNavigation';
import BottomNavigation from '@/components/BottomNavigation';
import { products } from '@/data/products';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const Wishlist = () => {
  const [cart, setCart] = useLocalStorage<string[]>('cart', []);
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', []);

  const wishlistProducts = products.filter(product => 
    wishlist.includes(product.id)
  );

  const addToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  };

  const handleOrderCall = () => {
    window.open('tel:+8801711727436');
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <TopNavigation cartCount={cart.length} wishlistCount={wishlist.length} />
        
        <main className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">আপনার উইশলিস্ট খালি</h2>
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
        <h1 className="text-xl font-bold">আপনার উইশলিস্ট</h1>
        
        {/* Wishlist Items */}
        <div className="space-y-3">
          {wishlistProducts.map((product) => (
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
                  
                  <div className="flex items-center space-x-2">
                    {product.oldPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ৳{product.oldPrice}
                      </span>
                    )}
                    <span className="font-bold text-primary">
                      ৳{product.price}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      product.stock > 0 
                        ? 'bg-accent/10 text-accent' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {product.stock > 0 ? `স্টক: ${product.stock}` : 'স্টক নেই'}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => addToCart(product.id)}
                        className={`p-2 rounded-full ${
                          cart.includes(product.id)
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-primary'
                        }`}
                      >
                        <ShoppingCart size={16} fill={cart.includes(product.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="p-2 text-destructive"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleOrderCall}
                    className="order-btn"
                  >
                    অর্ডার করুন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Wishlist;