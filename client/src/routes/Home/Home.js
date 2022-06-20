import React from "react";
import Banners from "./Banners";
import categoryApi from "../../requests/CategoryRequest";
import CategorySection from "./CategorySection";
import { CategoryAside } from "../../components";

const Home = () => {
    const [categories, setCategories] = React.useState([]);

    React.useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const resp = await categoryApi.getAllCategory();
            setCategories(resp.data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className="gap-4 hidden md:flex">
                <div className="md:basis-1/6">
                    <CategoryAside />
                </div>
                <div className="md:basis-5/6">
                    <Banners />
                </div>
            </div>
            {categories.slice(0,5).map((_category) => (
                <CategorySection category={_category} key={_category._id} />
            ))}
        </>
    );
};

export default Home;
