import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from "./admin/Admin";
import TestComponent from './admin/TestComponent';

function App() {
  return (  
    <Router>
      <Routes>
        <Route path='/admin' element={<Admin />} />
        {/* Add more routes here if needed */}
        <Route path='/test' element={<TestComponent />} />
        
      </Routes>
    </Router>
  );
}

export default App;
