import React from "react";
import { Outlet } from "react-router-dom";
import CategoryAside from "../CategoryAside/CategoryAside";
import Navbar from "../Navbar/Navbar";

function UserLayout() {
    return (
        <>
            <div>
                {/* Nav bar first */}
                <div className="header">
                    <Navbar />
                </div>

                {/* Introduction tabs */}
                <div className="body flex flex-col md:flex-row">
                    {/*  Left category */}
                    <CategoryAside />
                    {/* Mid item */}
                    <div className="md:basis-2/3">
                        <Outlet />
                    </div>
                    {/* Right item */}
                    <div className="md:basis-1/6"></div>
                </div>
            </div>
        </>
    );
}

export default UserLayout;
