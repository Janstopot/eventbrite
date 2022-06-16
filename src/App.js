import "./App.css";
import Home from "./components/home";
import Events from "./components/event";
import Tickets from "./components/tickets";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
    <Navbar />
      <div className="App">
        <header className="App-header">
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            <Routes>
              <Route path="event/:id" element={<Events />} />
            </Routes>
            <Routes>
              <Route path="event/:id/tickets" element={<Tickets />} />
            </Routes>
          </div>
        </header>
      </div>
    </Router>
  );
}

export default App;
