import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar/Navbar";

function UserLayout() {
    return (
        <>
            <div className="h-full">
                {/* Nav bar first */}
                <div className="sticky top-0 z-10">
                    <Navbar />
                </div>

                {/* Introduction tabs */}
                <div className="grid grid-cols-12 my-4">
                    <div className="col-start-2 col-span-10">
                        <Outlet />
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default UserLayout;
