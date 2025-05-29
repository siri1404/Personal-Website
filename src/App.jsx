import { BrowserRouter as Router } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import './styles/globals.css';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Navigation />
        <Home />
      </Router>
    </MotionConfig>
  );
}

export default App;