import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' Component={Home}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
