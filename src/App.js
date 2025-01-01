import './App.css';
import LatLong from './components/LatLong/latLong';
import AddCommunity from './components/Sidebar/addCommunity';
import Dashboard from './components/Sidebar/dashboard';
import ManageCommunity from './components/Sidebar/manageCommunity';
import Reports from './components/Sidebar/Reports';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from './components/Form/Form';
import DropdownExample from './components/Dropdown/Dropdown';

function App() {
  return (
   <div className='App'>
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/communities" element={<ManageCommunity />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/dashboard/addCommunity" element={<AddCommunity />} />
        <Route path="/location" element={<LatLong />} />
        <Route path="/form" element={<Form />} />
        <Route path="/dropdown" element={<DropdownExample />} />
      </Routes>
    </Router>
   </div>
  );
}

export default App;
