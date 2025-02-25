import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokedexLayout from "./components/pokedex/PokedexLayout";
import Navbar from "./components/ui/Navbar";
import Evolutions from "./pages/Evolutions";
import Moves from "./pages/Moves";
import Encounters from "./pages/Encounters";
import Stats from "./pages/Stats";
import Favorites from "./components/pokedex/Favorites";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PokedexLayout />} />
        <Route path="/evolutions" element={<Evolutions />} />
        <Route path="/moves" element={<Moves />} />
        <Route path="/encounters" element={<Encounters />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
}

export default App;
