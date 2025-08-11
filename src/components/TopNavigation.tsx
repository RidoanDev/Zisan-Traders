import { Search, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopNavigationProps {
  cartCount?: number;
  wishlistCount?: number;
}

const TopNavigation = ({ cartCount = 0, wishlistCount = 0 }: TopNavigationProps) => {
  return (
    <header className="bg-primary text-primary-foreground px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="text-lg font-bold">
        জিসান ট্রেডার্স
      </Link>
      
      <div className="flex items-center space-x-4">
        <Link to="/search" className="relative">
          <Search size={24} />
        </Link>
        
        <Link to="/cart" className="relative">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="nav-badge">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>
        
        <Link to="/wishlist" className="relative">
          <Heart size={24} />
          {wishlistCount > 0 && (
            <span className="nav-badge">
              {wishlistCount > 99 ? '99+' : wishlistCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default TopNavigation;