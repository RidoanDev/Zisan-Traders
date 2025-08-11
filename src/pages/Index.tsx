import { useState } from 'react';
import TopNavigation from '@/components/TopNavigation';
import BottomNavigation from '@/components/BottomNavigation';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cart, setCart] = useLocalStorage<string[]>('cart', []);
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', []);

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const handleAddToCart = (productId: string) => {
    setCart(prev => [...prev, productId]);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation cartCount={cart.length} wishlistCount={wishlist.length} />
      
      <main className="p-4 space-y-4">
        {/* Categories Horizontal Scroll */}
        <div className="overflow-x-auto">
          <div className="flex space-x-3 pb-2">
            <button
              onClick={() => setSelectedCategory('')}
              className={`category-pill ${
                selectedCategory === '' ? 'bg-primary text-primary-foreground' : ''
              }`}
            >
              সকল পণ্য
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-pill ${
                  selectedCategory === category ? 'bg-primary text-primary-foreground' : ''
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              isInWishlist={wishlist.includes(product.id)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">এই ক্যাটাগরিতে কোন পণ্য নেই</p>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Index;
