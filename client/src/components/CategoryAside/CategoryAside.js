import React from "react";
import { Link } from "react-router-dom";
import categoryApi from "../../requests/CategoryRequest";

const CategoryAside = () => {
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
        <div className="flex flex-col gap-3 bg-white p-2 rounded-lg shadow-sm">
            {categories.map((item) => (
                <Link
                    key={item._id}
                    to={item.slug}
                    className="hover:bg-blue-500 px-2 py-1 rounded-lg hover:text-white"
                >
                    {item.name}
                </Link>
            ))}
        </div>
    );
};

export default CategoryAside;
