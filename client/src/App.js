import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./routes/Home/Home";
import Product from "./routes/Product/List";
import ProductDetail from "./routes/Product/Detail";
import Login from "./routes/Login/Login";
import Signup from "./routes/SignUp/SignUp";
import Dev from "./routes/dev/Dev";
import AdminDashboard from "./routes/Admin/Dashboard";
import AdminUser from "./routes/Admin/User";
import AdminCategory from "./routes/Admin/Category";
import AdminManufacturer from "./routes/Admin/Manufacturer";
import AdminProduct from "./routes/Admin/Product";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faBoxOpen,
    faChevronDown,
    faList,
    faPlus,
    faSpinner,
    faUser,
    faIndustry,
    faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { AdminLayout, UserLayout } from "./components";

library.add(
    faUser,
    faSpinner,
    faList,
    faBoxOpen,
    faPlus,
    faChevronDown,
    faIndustry,
    faStar,
    faStarRegular
);

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/:category" element={<Product />} />
                    <Route path="/san-pham/:product" element={<ProductDetail />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dev" element={<Dev />} />
                <Route path="/dashboard" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="user" element={<AdminUser />} />
                    <Route path="category" element={<AdminCategory />} />
                    <Route path="manufacturer" element={<AdminManufacturer />} />
                    <Route path="product" element={<AdminProduct />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
