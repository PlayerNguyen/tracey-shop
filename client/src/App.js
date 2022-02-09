import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Signup from "./routes/SignUp/SignUp";
import Dev from "./routes/dev/Dev";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dev" element={<Dev />} />
      </Routes>
    </div>
  );
}

export default App;
