import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar'
import Login from './pages/Login'


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/login' Component={Login}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
