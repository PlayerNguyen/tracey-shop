import React from "react";
import { Outlet } from "react-router-dom";
import CategoryAside from "../CategoryAside/CategoryAside";
import Navbar from "../Navbar/Navbar";

function UserLayout() {
    return (
        <>
            <div>
                {/* Nav bar first */}
                <div className="header mb-4">
                    <Navbar />
                </div>

                {/* Introduction tabs */}
                <div className="grid grid-cols-12">
                    <div className="body col-start-2 col-span-10 flex flex-col md:flex-row gap-4">
                        <div className="md:basis-1/6">
                            <CategoryAside />
                        </div>
                        <div className="md:basis-5/6">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserLayout;
