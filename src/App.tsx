import { HashRouter as Router, Routes, Route } from "react-router-dom"; // CHANGED LINE

import Home from "./pages/home/Home.tsx";
import Docs from "./pages/docs/docs.tsx";
import { ThemeProvider } from './services/ThemeProvider';


const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/docs" element={<Docs />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;