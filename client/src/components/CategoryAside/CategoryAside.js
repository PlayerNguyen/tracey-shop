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
        <div className="md:basis-1/6">
            <div className="flex flex-col gap-3 bg-white m-5 p-1 rounded shadow-sm ">
                {categories.map((item) => {
                    return (
                        <Link
                            key={item._id}
                            to="/"
                            className="hover:bg-blue-500 px-2 py-1 rounded hover:text-white"
                        >
                            {item.name}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default CategoryAside;
