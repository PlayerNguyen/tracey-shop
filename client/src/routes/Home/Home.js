import React from "react";
import CategoryAside from "../../components/CategoryAside/CategoryAside";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <div id="home">
      {/* Nav bar first */}
      <div className="home-header">
        <Navbar />
      </div>

      {/* Introduction tabs */}
      <div className="home-body flex flex-col md:flex-row">
        {/*  Left category */}
        <CategoryAside />
        {/* Mid item */}
        <div className="md:basis-2/3"></div>
        {/* Right item */}
        <div className="md:basis-1/3"></div>
      </div>
    </div>
  );
};

export default Home;
