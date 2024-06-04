import { Routes, Route, Link } from 'react-router-dom'
import backgroundImage from "/src/assets/images/KV 1.png"
// Import your components
import Home from './components/Home'
import WelcomeScanner from './components/WelcomeScanner'
import DrinkScanner from './components/DrinkScanner'
import CancelQR from './components/CancelQR'

function App() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <nav></nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome-scanner" element={<WelcomeScanner />} />
        <Route path="/drink-scanner" element={<DrinkScanner />} />
        <Route path="/cancel-qr" element={<CancelQR />} />
      </Routes>
    </div>
  );
}

export default App