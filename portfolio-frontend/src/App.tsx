import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProjectDetail from './components/ProjectDetail';
import AdminDashboard from './pages/AdminDashboard';
import Journal from './pages/Journal';
import WorkPage from './pages/WorkPage';
import './index.css';

function App() {
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
