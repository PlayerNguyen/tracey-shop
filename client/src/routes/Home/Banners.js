import React from "react";
import Banner1 from "../../assets/img/07_Mared75375d994936c22bbe17181f9c0292.jpg";
import Banner2 from "../../assets/img/hq720.jpg";
import Banner3 from "../../assets/img/25_Febdd7a49dd43e66c3ab763becdc2e5d288.png";
import Banner4 from "../../assets/img/19_Feb9a632bee30cd4faabccd6c13bfbb6134.png";
import Banner5 from "../../assets/img/12_Mara36a2101b50b54abc61817d51fc5f34f.png";
import Banner6 from "../../assets/img/19_Febb661807938661a11e758a009f3263504.png";

function Banners() {
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 overflow-hidden rounded-lg">
                    <img src={Banner1} className="h-full" alt="banner" />
                </div>
                <div className="grid grid-rows-2 gap-4">
                    <div className="overflow-hidden rounded-lg">
                        <img src={Banner2} className="h-full" alt="banner" />
                    </div>
                    <div className="overflow-hidden rounded-lg">
                        <img src={Banner6} className="h-full" alt="banner" />
                    </div>
                </div>
                <div className="overflow-hidden rounded-lg">
                    <img src={Banner3} className="h-full" alt="banner" />
                </div>
                <div className="overflow-hidden rounded-lg">
                    <img src={Banner5} className="h-full" alt="banner" />
                </div>
                <div className="overflow-hidden rounded-lg">
                    <img src={Banner4} className="h-full" alt="banner" />
                </div>
            </div>
        </>
    );
}

export default Banners;
