import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, ShoppingCart } from 'lucide-react';
import TopNavigation from '@/components/TopNavigation';
import BottomNavigation from '@/components/BottomNavigation';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [cart, setCart] = useLocalStorage<string[]>('cart', []);
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', []);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">পণ্য খুঁজে পাওয়া যায়নি</h2>
          <Link to="/" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-lg">
            হোমে ফিরুন
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const isInWishlist = wishlist.includes(product.id);

  const handleAddToCart = () => {
    setCart(prev => [...prev, product.id]);
  };

  const handleToggleWishlist = () => {
    setWishlist(prev => 
      prev.includes(product.id) 
        ? prev.filter(id => id !== product.id)
        : [...prev, product.id]
    );
  };

  const handleOrderCall = () => {
    window.open('tel:+8801711727436');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation cartCount={cart.length} wishlistCount={wishlist.length} />
      
      <main className="space-y-6">
        {/* Header */}
        <div className="px-4 py-2 flex items-center space-x-3">
          <Link to="/" className="p-2 hover:bg-muted rounded-full">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-semibold truncate">পণ্যের বিস্তারিত</h1>
        </div>

        {/* Product Image */}
        <div className="px-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="px-4 space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <span className="text-sm bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
              {product.category}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through block">
                  ৳{product.oldPrice}
                </span>
              )}
              <span className="text-2xl font-bold text-primary">
                ৳{product.price}
              </span>
            </div>
            
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.stock > 0 
                ? 'bg-accent/10 text-accent' 
                : 'bg-destructive/10 text-destructive'
            }`}>
              {product.stock > 0 ? `স্টক: ${product.stock}` : 'স্টক নেই'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleToggleWishlist}
              className={`p-3 rounded-full border ${
                isInWishlist 
                  ? 'bg-destructive/10 text-destructive border-destructive/20' 
                  : 'bg-muted text-muted-foreground border-border'
              }`}
            >
              <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={handleAddToCart}
              className="p-3 rounded-full bg-muted text-muted-foreground border border-border hover:bg-muted/80"
            >
              <ShoppingCart size={20} />
            </button>
            
            <button 
              onClick={handleOrderCall}
              className="order-btn flex-1"
            >
              অর্ডার করুন
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="px-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2">বিস্তারিত বর্ণনা</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* All Products */}
        <div className="px-4 space-y-3">
          <h3 className="font-semibold">সকল পণ্য</h3>
          <div className="grid grid-cols-2 gap-3">
            {products.map((allProduct) => (
              <ProductCard
                key={allProduct.id}
                product={allProduct}
                onAddToCart={() => setCart(prev => [...prev, allProduct.id])}
                onToggleWishlist={(productId) => 
                  setWishlist(prev => 
                    prev.includes(productId) 
                      ? prev.filter(id => id !== productId)
                      : [...prev, productId]
                  )
                }
                isInWishlist={wishlist.includes(allProduct.id)}
              />
            ))}
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default ProductDetails;