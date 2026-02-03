import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProjectDetail from './components/ProjectDetail';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-black custom-scrollbar">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
