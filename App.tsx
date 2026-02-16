import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Landing } from './pages/Landing';
import { About } from './pages/About';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { SellerDashboard } from './pages/SellerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { EmployeeDashboard } from './pages/EmployeeDashboard';
import { Contact } from './pages/Contact';
import { GlycerinInquiry } from './pages/GlycerinInquiry';
import { AuthModal } from './components/AuthModal';
import { User, UserRole } from './types';

type View = 'home' | 'contact' | 'dashboard' | 'glycerin' | 'about';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    if (currentView === 'home' || currentView === 'about') {
      setCurrentView('dashboard');
    }
  };

  const handleGuestLogin = () => {
    const guestUser: User = {
      id: 'guest-' + Math.random().toString(36).substr(2, 5),
      name: 'Guest Partner',
      email: 'guest@greengine.eco',
      role: UserRole.BUYER,
      balance: 50000,
      organization: 'Exploring Partner'
    };
    handleLogin(guestUser);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const updateUser = (updated: User) => {
    setUser(updated);
  };

  const navigateTo = (view: View) => {
    if ((view === 'dashboard' || view === 'glycerin') && !user) {
      setIsAuthModalOpen(true);
      return;
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    if (currentView === 'about') {
      return <About />;
    }

    if (currentView === 'contact') {
      return <Contact />;
    }

    if (currentView === 'glycerin' && user) {
      return <GlycerinInquiry />;
    }

    if (currentView === 'dashboard' && user) {
      switch (user.role) {
        case UserRole.ADMIN:
          return <AdminDashboard />;
        case UserRole.SELLER:
          return <SellerDashboard user={user} />;
        case UserRole.BUYER:
          return <BuyerDashboard user={user} onUpdateUser={updateUser} />;
        case UserRole.EMPLOYEE:
          return <EmployeeDashboard user={user} />;
        default:
          return <Landing onGetStarted={() => setIsAuthModalOpen(true)} isLoggedIn={!!user} onNavigateToGlycerin={() => navigateTo('glycerin')} />;
      }
    }

    return (
      <Landing 
        onGetStarted={() => {
          if (user) {
            setCurrentView('dashboard');
          } else {
            setIsAuthModalOpen(true);
          }
        }}
        isLoggedIn={!!user}
        onNavigateToGlycerin={() => navigateTo('glycerin')}
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-green-100 selection:text-green-900 overflow-x-hidden">
      <Navbar 
        user={user} 
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onNavigate={(v) => navigateTo(v as View)}
        currentView={currentView}
        onGuestLogin={handleGuestLogin}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        onGuestLogin={handleGuestLogin}
      />
    </div>
  );
};

export default App;