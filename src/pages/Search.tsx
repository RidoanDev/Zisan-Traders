import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import TopNavigation from '@/components/TopNavigation';
import BottomNavigation from '@/components/BottomNavigation';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const Search = () => {
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [sortBy, setSortBy] = useState('name');
  
  const [cart, setCart] = useLocalStorage<string[]>('cart', []);
  const [wishlist, setWishlist] = useLocalStorage<string[]>('wishlist', []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

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
        {/* Search Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="পণ্য খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-3 py-3 border border-border rounded-lg bg-card text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-3 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
          >
            <Filter size={16} />
            <span className="hidden sm:inline">ফিল্টার</span>
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-card border border-border rounded-lg p-4 space-y-4 animate-in slide-in-from-top duration-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">ফিল্টার</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="p-1 hover:bg-muted rounded-full"
              >
                <X size={16} />
              </button>
            </div>
            
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">ক্যাটাগরি</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-3 border border-border rounded-lg bg-card text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                <option value="">সকল ক্যাটাগরি</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">দাম পরিসর</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="সর্বনিম্ন"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className="px-3 py-3 border border-border rounded-lg bg-card text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <input
                  type="number"
                  placeholder="সর্বোচ্চ"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="px-3 py-3 border border-border rounded-lg bg-card text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground">সাজানো</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-3 border border-border rounded-lg bg-card text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              >
                <option value="name">নাম অনুযায়ী</option>
                <option value="price-low">দাম: কম থেকে বেশি</option>
                <option value="price-high">দাম: বেশি থেকে কম</option>
              </select>
            </div>

            {/* Clear Filters Button */}
            <button
              onClick={() => {
                setSelectedCategory('');
                setPriceRange({ min: 0, max: 100000 });
                setSortBy('name');
              }}
              className="w-full py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        )}

        {/* Results */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} টি পণ্য পাওয়া গেছে
            </p>
            {filteredProducts.length > 0 && (
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <Filter size={12} />
                {showFilters ? 'ফিল্টার লুকান' : 'ফিল্টার দেখান'}
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
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
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Filter size={32} className="text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">কোন পণ্য পাওয়া যায়নি</p>
              <p className="text-sm text-muted-foreground">ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('');
                setPriceRange({ min: 0, max: 100000 });
                setSortBy('name');
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          </div>
        )}
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Search;