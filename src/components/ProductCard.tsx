import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onToggleWishlist?: (productId: string) => void;
  isInWishlist?: boolean;
}

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist = false 
}: ProductCardProps) => {
  const handleOrderCall = () => {
    window.open('tel:+8801711727436');
  };

  return (
    <div className="product-card h-full flex flex-col">
      <Link to={`/product/${product.id}`} className="block flex-shrink-0">
        <div className="aspect-square bg-muted rounded-md mb-2 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
        
        <h3 className="text-sm font-medium line-clamp-2 hover:text-primary min-h-[2.5rem] flex items-center">
          {product.name}
        </h3>
      </Link>
      
      <div className="space-y-2 flex-1 flex flex-col">
        <div className="flex items-center space-x-2 flex-shrink-0">
          {product.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ৳{product.oldPrice}
            </span>
          )}
          <span className="text-sm font-bold text-primary">
            ৳{product.price}
          </span>
        </div>
        
        <div className="flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleWishlist?.(product.id)}
              className={`p-1.5 rounded-full w-7 h-7 flex items-center justify-center transition-colors ${
                isInWishlist 
                  ? 'bg-destructive/10 text-destructive' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Heart size={12} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
            
            <button
              onClick={() => onAddToCart?.(product.id)}
              className="p-1.5 bg-muted text-muted-foreground hover:text-primary hover:bg-muted/80 rounded-full w-7 h-7 flex items-center justify-center transition-colors"
            >
              <ShoppingCart size={12} />
            </button>
          </div>
          
          <span className={`text-xs px-2 py-0.5 rounded-full text-center leading-tight ${
            product.stock > 0 
              ? 'bg-accent/10 text-accent' 
              : 'bg-destructive/10 text-destructive'
          }`}>
            {product.stock > 0 ? `স্টক: ${product.stock}` : 'স্টক নেই'}
          </span>
        </div>
        
        <button 
          onClick={handleOrderCall}
          className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 transition-colors mt-auto"
        >
          অর্ডার করুন
        </button>
      </div>
    </div>
  );
};

export default ProductCard;