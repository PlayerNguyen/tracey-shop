import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Signup from "./routes/SignUp/SignUp";
import Dev from "./routes/dev/Dev";
import AdminLayout from "./components/Layout/AdminLayout";
import AdminDashboard from "./routes/Admin/Dashboard";
import AdminUser from "./routes/Admin/User";
import AdminCategory from "./routes/Admin/Category";
import AdminProduct from "./routes/Admin/Product";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBoxOpen, faList, faPlus, faSpinner, faUser } from "@fortawesome/free-solid-svg-icons";
import UserLayout from "./components/Layout/UserLayout";

library.add(faUser, faSpinner, faList, faBoxOpen, faPlus);

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dev" element={<Dev />} />
                <Route path="/dashboard" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="user" element={<AdminUser />} />
                    <Route path="category" element={<AdminCategory />} />
                    <Route path="product" element={<AdminProduct />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
