import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductItem } from '../../components';
import ProductRequest from '../../requests/ProductRequest';

function Search(props) {
  const { query } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      ProductRequest.searchProduct(query)
        .then((res) => {
          const { data } = res;
          // console.log(data);

          setProducts(data);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 0); // This setTimeout for test, you can remove it or switch the duration to 0 to un-mock it
  }, [query]);

  return (
    <>
      <div className="bg-white p-3 rounded shadow-sm">
        <h1 className="text-xl px-4 mb-6 font-bold">Kết quả cho `{query}`</h1>
        <div className="flex flex-col md:flex-row gap-4 px-8">
          {loading ? (
            <div className="p-2">
              <div className="flex flex-col gap-3">
                {/* {Array(3).map((_, index) => (
                  <div className="h-5 bg-gray-200 animate-pulse" key={index} />
                ))} */}
                <div className="h-5 bg-gray-200 animate-pulse"></div>
                <div className="h-5 bg-gray-200 animate-pulse"></div>
                <div className="h-5 bg-gray-200 animate-pulse"></div>
              </div>
            </div>
          ) : (
            <>
              {products.length > 0 ? (
                products.map((item, _index) => {
                  return <ProductItem product={item} key={item._id} />;
                })
              ) : (
                <div className="mx-auto p-6 text-center">
                  <h1 className="">Không tìm thấy sản phẩm nào</h1>
                  <span className="font-extrabold">T -T</span>
                  
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
