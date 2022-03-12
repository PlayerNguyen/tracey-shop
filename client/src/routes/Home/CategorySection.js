import React from "react";
import productApi from "../../requests/ProductRequest";
import { ProductItem } from "../../components";

function CategorySection({ category }) {
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const resp = await productApi.getProductByCategory(category.slug);
            setProducts(resp.data);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div>
                <h3>{category.name}</h3>
                <div className="grid grid-cols-5">
                    {products.map((_product) => (
                        <ProductItem product={_product} key={_product._id} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default CategorySection;
