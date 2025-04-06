import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Chatbot from './pages/chatbot';
import LogDisplayer from './pages/logdisplayer';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/logdisplayer" element={<LogDisplayer />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        {/*<Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
