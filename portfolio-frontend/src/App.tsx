import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { ENDPOINTS } from './config/api';
import HomePage from './components/HomePage';
import ProjectDetail from './components/ProjectDetail';
import AdminDashboard from './pages/AdminDashboard';
import Journal from './pages/Journal';
import WorkPage from './pages/WorkPage';
import './index.css';

function App() {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch(`${ENDPOINTS.TRACKING_VIEW}?pagePath=${encodeURIComponent(location.pathname)}`, {
          method: 'POST',
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, [location]);

  return (
    <div className="min-h-screen bg-black custom-scrollbar">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
