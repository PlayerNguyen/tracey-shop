import React from "react";
import Banners from "./Banners";
import categoryApi from "../../requests/CategoryRequest";
import CategorySection from "./CategorySection";

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
            <Banners />
            {categories.map((_category) => (
                <CategorySection category={_category} key={_category._id} />
            ))}
        </>
    );
};

export default Home;
