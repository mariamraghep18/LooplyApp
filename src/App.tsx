import { useState } from 'react';
import { ViewState } from './types';
import { Login, CreateAccount } from './components/Auth';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Plan, TokenBoards } from './components/ChildCare';
import { Report } from './components/Analytics';
import { VideoRecords, FindMyChild } from './components/MediaAndLocation';
import { CommunityMessages } from './components/Communication';
import { Calendar, Marketplace, Billing, Support, Settings } from './components/Misc';
import { ParentProfile } from './components/ParentProfile';
import ChildPortal from './ChildPortal/ChildPortal';
import { LanguageProvider } from './shared/LanguageContext';
import { SharedDataProvider } from './shared/SharedData';
import WelcomeScreen from './portals/Selection/WelcomeScreen';
import PortalSelection from './portals/Selection/PortalSelection';
import FamilySelection from './portals/Selection/FamilySelection';
import ChildWelcome from './portals/Child/ChildWelcome';

import { Chatbot } from './components/Chatbot';

export default function App() {
  // Very first page that appears when launching the app is 'welcome'
  const [currentView, setCurrentView] = useState<ViewState>('welcome');

  const handleLogin = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('welcome');
  };

  // Render Authentication and Selection Views
  const renderSelectionAndAuth = () => {
    switch (currentView) {
      case 'welcome':
        return <WelcomeScreen onNavigate={setCurrentView} />;
      case 'portal-selection':
        return <PortalSelection onNavigate={setCurrentView} />;
      case 'family-selection':
        return <FamilySelection onNavigate={setCurrentView} />;
      case 'child-welcome':
        return <ChildWelcome onNavigate={setCurrentView} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentView} />;
      case 'register':
        return <CreateAccount onNavigate={setCurrentView} />;
      case 'child-portal':
        return <ChildPortal onLogout={handleLogout} />;
      default:
        return null; // Fallthrough to Authenticated Shell
    }
  };

  // Render Authenticated Shell & Views
  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard onNavigate={setCurrentView} />;
      case 'plan': return <Plan />;
      case 'token-boards': return <TokenBoards />;
      
      case 'report': return <Report />;
      case 'video-records': return <VideoRecords />;
      case 'find-my-child': return <FindMyChild />;
      case 'community-messages': return <CommunityMessages />;
      case 'calendar': return <Calendar />;
      case 'marketplace': return <Marketplace />;
      case 'billing': return <Billing />;
      case 'support': return <Support />;
      case 'settings': return <ParentProfile onBack={() => setCurrentView('dashboard')} />;
      default: return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <SharedDataProvider>
      <LanguageProvider>
        {renderSelectionAndAuth() || (
          <Layout 
            currentView={currentView} 
            onNavigate={setCurrentView} 
            onLogout={handleLogout}
          >
            {renderView()}
            <Chatbot />
          </Layout>
        )}
      </LanguageProvider>
    </SharedDataProvider>
  );
}
