import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function UserLayout() {
    return (
        <>
            <div>
                {/* Nav bar first */}
                <div className="sticky top-0">
                    <Navbar />
                </div>

                {/* Introduction tabs */}
                <div className="grid grid-cols-12 my-4">
                    <div className="col-start-2 col-span-10">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserLayout;
