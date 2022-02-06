import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
