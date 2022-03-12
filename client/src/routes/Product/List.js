import React from "react";
import { useParams } from "react-router-dom";
import productApi from "../../requests/ProductRequest";

function ProductList(props) {
    const [products, setProducts] = React.useState([]);

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
            <div className="w-full bg-gray-800">Test</div>
        </>
    );
}

export default ProductList;
