import { Home, Search, ShoppingCart, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'হোম', path: '/' },
    { icon: Search, label: 'সার্চ', path: '/search' },
    { icon: ShoppingCart, label: 'কার্ট', path: '/cart' },
    { icon: Phone, label: 'কন্টাক্ট', path: '/contact' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              <Icon size={20} />
              {isActive && (
                <div className="w-1 h-1 bg-primary rounded-full mt-1" />
              )}
              <span className="text-xs mt-1 truncate">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;