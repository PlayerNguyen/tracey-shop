import React from 'react';
import productApi from '../../requests/ProductRequest';
import { ProductItem } from '../../components';
import { Link } from 'react-router-dom';

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
      <div className="bg-white rounded-lg my-2 p-3">
        <Link to={category.slug}>
          <h3 className="font-semibold hover:underline text-xl">
            {category.name}
          </h3>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.slice(0, 10).map((_product) => (
            <ProductItem product={_product} key={_product._id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CategorySection;
