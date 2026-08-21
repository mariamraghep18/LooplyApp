import { useState } from 'react';
import { ViewState } from './types';
import { Login, CreateAccount } from './components/Auth';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Plan, TokenBoards } from './components/ChildCare';
import { Report } from './components/Analytics';
import { VideoRecords, FindMyChild } from './components/MediaAndLocation';
import { CommunityMessages } from './components/Communication';
import { Calendar, Marketplace, Billing, Support } from './components/Misc';
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

  const selectionMap: Record<ViewState, JSX.Element> = {
    welcome: <WelcomeScreen onNavigate={setCurrentView} />,
    'portal-selection': <PortalSelection onNavigate={setCurrentView} />,
    'family-selection': <FamilySelection onNavigate={setCurrentView} />,
    'child-welcome': <ChildWelcome onNavigate={setCurrentView} />,
    login: <Login onLogin={handleLogin} onNavigate={setCurrentView} />,
    register: <CreateAccount onNavigate={setCurrentView} />,
    'child-portal': <ChildPortal onLogout={handleLogout} />,
  };

  const viewMap: Record<ViewState, JSX.Element> = {
    dashboard: <Dashboard onNavigate={setCurrentView} />,
    plan: <Plan />,
    'token-boards': <TokenBoards />,
    report: <Report />,
    'video-records': <VideoRecords />,
    'find-my-child': <FindMyChild />,
    'community-messages': <CommunityMessages />,
    calendar: <Calendar />,
    marketplace: <Marketplace />,
    billing: <Billing />,
    support: <Support />,
    settings: <ParentProfile onBack={() => setCurrentView('dashboard')} />,
  };

  // Render Authentication and Selection Views
  const renderSelectionAndAuth = () => {
    return selectionMap[currentView] || null;
  };

  // Render Authenticated Shell & Views
  const renderView = () => {
    return viewMap[currentView] || <Dashboard onNavigate={setCurrentView} />;
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
