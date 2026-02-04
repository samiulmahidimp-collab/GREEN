import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Landing } from './pages/Landing';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { SellerDashboard } from './pages/SellerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Contact } from './pages/Contact';
import { AuthModal } from './components/AuthModal';
import { User, UserRole } from './types';

// Simple Router implementation based on state
type View = 'home' | 'contact' | 'dashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const renderContent = () => {
    if (currentView === 'contact') {
      return <Contact />;
    }

    if (currentView === 'dashboard' && user) {
      switch (user.role) {
        case UserRole.ADMIN:
          return <AdminDashboard />;
        case UserRole.SELLER:
          return <SellerDashboard user={user} />;
        case UserRole.BUYER:
          return <BuyerDashboard user={user} />;
        default:
          return <Landing onGetStarted={() => setIsAuthModalOpen(true)} />;
      }
    }

    // Default to Home/Landing
    return <Landing onGetStarted={() => {
      if (user) {
        setCurrentView('dashboard');
      } else {
        setIsAuthModalOpen(true);
      }
    }} />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar 
        user={user} 
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onNavigate={(view) => setCurrentView(view as View)}
        currentView={currentView}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default App;
