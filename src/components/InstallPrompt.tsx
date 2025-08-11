import { useState, useEffect } from 'react';
import { X, Download, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showExternalRedirect, setShowExternalRedirect] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if app is in standalone mode
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    // Check if opened from social media apps
    const userAgent = navigator.userAgent.toLowerCase();
    const isFromSocialApp = userAgent.includes('fban') || // Facebook
                           userAgent.includes('fbav') || // Facebook App
                           userAgent.includes('messengerforandroid') || // Messenger
                           userAgent.includes('instagram') || // Instagram
                           userAgent.includes('whatsapp'); // WhatsApp

    if (isFromSocialApp && !isStandalone) {
      setShowExternalRedirect(true);
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      // Show install prompt if not from social app and hasn't been installed
      if (!isFromSocialApp && !localStorage.getItem('installPromptDismissed')) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isStandalone]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
        localStorage.setItem('installPromptDismissed', 'true');
      }
      
      setDeferredPrompt(null);
    }
  };

  const handleDismissInstall = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('installPromptDismissed', 'true');
  };

  const handleOpenInChrome = () => {
    const currentUrl = window.location.href;
    const chromeIntent = `googlechrome://navigate?url=${encodeURIComponent(currentUrl)}`;
    
    // Try to open in Chrome app
    window.location.href = chromeIntent;
    
    // Fallback: Open in default browser after a delay
    setTimeout(() => {
      window.open(currentUrl, '_blank');
    }, 1000);
  };

  if (showExternalRedirect) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="max-w-sm w-full p-6 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Chrome className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">সেরা অভিজ্ঞতার জন্য</h3>
            <p className="text-sm text-muted-foreground">
              Chrome-এ খুলুন আরও ভালো পারফরমেন্সের জন্য
            </p>
          </div>
          <div className="space-y-2">
            <Button onClick={handleOpenInChrome} className="w-full">
              🔗 ক্রোমে খুলুন
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => setShowExternalRedirect(false)}
              className="w-full text-sm"
            >
              এখানেই চালিয়ে যান
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (showInstallPrompt && deferredPrompt) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="max-w-sm w-full p-6 text-center space-y-4">
          <button
            onClick={handleDismissInstall}
            className="absolute top-3 right-3 p-1 hover:bg-muted rounded-full"
          >
            <X size={16} />
          </button>
          
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <Download className="w-8 h-8 text-primary" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">জিসান ট্রেডার্স</h3>
            <p className="text-sm text-muted-foreground">
              অ্যাপটি ইনস্টল করুন দ্রুত অ্যাক্সেসের জন্য
            </p>
          </div>
          
          <div className="space-y-2">
            <Button onClick={handleInstall} className="w-full">
              ইনস্টল করুন
            </Button>
            <Button 
              variant="ghost" 
              onClick={handleDismissInstall}
              className="w-full"
            >
              বাতিল
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return null;
};

export default InstallPrompt;