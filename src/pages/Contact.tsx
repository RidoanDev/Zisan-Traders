import { Phone, MessageCircle, MapPin } from 'lucide-react';
import TopNavigation from '@/components/TopNavigation';
import BottomNavigation from '@/components/BottomNavigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';

const Contact = () => {
  const [cart] = useLocalStorage<string[]>('cart', []);
  const [wishlist] = useLocalStorage<string[]>('wishlist', []);

  const handleCall = () => {
    window.open('tel:+8801711727436');
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/8801711727436');
  };

  const handleMapView = () => {
    window.open('https://maps.app.goo.gl/evpURJ9bLKoxmNeE8');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopNavigation cartCount={cart.length} wishlistCount={wishlist.length} />
      
      <main className="p-4 space-y-6">
        {/* Business Header */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-primary">জিসান ট্রেডার্স</h1>
          
          {/* Proprietor Info */}
          <div className="bg-card rounded-lg p-6 shadow-sm border border-border space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden">
              <img 
                src="https://i.postimg.cc/RVMmTf4X/Md-Rokibul-Hasan-Shekh.jpg" 
                alt="মোঃ রকিবুল হাসান রকেট"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">মোঃ রকিবুল হাসান রকেট</h2>
              <p className="text-sm text-muted-foreground">প্রোপ্রাইটার</p>
              
              <div className="flex items-center justify-center space-x-1 text-sm">
                <MapPin size={16} className="text-primary" />
                <span>বিশ্বহরিগাছা বাজার, ধুনট, বগুড়া</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Actions */}
        <div className="space-y-3">
          <button 
            onClick={handleCall}
            className="w-full bg-primary text-primary-foreground py-4 rounded-lg flex items-center justify-center space-x-3 font-semibold"
          >
            <Phone size={20} />
            <span>কল করুন: +৮৮০১৭১১৭২৭৪৩৬</span>
          </button>
          
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-accent text-accent-foreground py-4 rounded-lg flex items-center justify-center space-x-3 font-semibold"
          >
            <MessageCircle size={20} />
            <span>WhatsApp</span>
          </button>
          
          <button 
            onClick={handleMapView}
            className="w-full bg-secondary text-secondary-foreground py-4 rounded-lg flex items-center justify-center space-x-3 font-semibold"
          >
            <MapPin size={20} />
            <span>গুগল ম্যাপে দেখুন</span>
          </button>
        </div>

        {/* Google Map Embed */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="font-semibold mb-3">আমাদের অবস্থান</h3>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3626.885829534771!2d89.5302832!3d24.6276196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fdb198b5cd1df9%3A0x94b9f448dbe57bca!2sZisan%20Telecom!5e0!3m2!1sen!2sbd!4v1754897477199!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Services */}
        <div className="bg-card rounded-lg p-4 border border-border">
          <h3 className="font-semibold mb-3">আমাদের সেবাসমূহ</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">নির্মাণ সামগ্রী সরবরাহ</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">মোবাইল ব্যাংকিং</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">কাস্টম অর্ডার</p>
            </div>
            <div className="text-center p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">লোকাল ডেলিভারি</p>
            </div>
          </div>
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Contact;
