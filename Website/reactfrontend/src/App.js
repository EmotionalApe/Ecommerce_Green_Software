import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Cart from './pages/Cart';

import { AuthProvider } from './contexts/authContext';


function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/login' Component={Login} />
            <Route path='/cart' Component={Cart} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
