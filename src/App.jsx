import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import AnimatedRoutes from './components/AnimatedRoutes';
import { MotionConfig } from 'framer-motion';
import './styles/globals.css';

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </MotionConfig>
  );
}

export default App;