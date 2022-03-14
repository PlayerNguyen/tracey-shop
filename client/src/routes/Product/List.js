import React from "react";
import { useParams } from "react-router-dom";
import { ProductItem } from "../../components";
import productApi from "../../requests/ProductRequest";
import Select from "react-select";
import Filter from "./Filter";

function ProductList(props) {
    const [products, setProducts] = React.useState([]);
    const sortOptions = [
        { value: 1, label: "Mặc định" },
        { value: 2, label: "Giá thấp đến cao" },
        { value: 3, label: "Giá cao đến thấp" },
    ];
    const params = useParams();

    React.useEffect(() => {
        if (params.category) {
            fetchProducts(params.category);
        }
    }, [params.category]);

    const fetchProducts = async (categorySlug) => {
        try {
            const resp = await productApi.getProductByCategory(categorySlug);
            setProducts(resp.data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className="w-full grid grid-cols-6 gap-8">
                <Filter />
                <div className="col-span-5">
                    <div className="mb-4 font-semibold flex items-center">
                        Sắp xếp theo: <Select className="ml-4 w-60" options={sortOptions} />
                    </div>
                    <div className="col-span-5 grid grid-cols-5 gap-8">
                        {products.map((_product) => (
                            <ProductItem product={_product} key={_product._id} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductList;
