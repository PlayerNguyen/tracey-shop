import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { formatVndCurrency, getImageUrl } from '../../helpers/Common';
import productApi from '../../requests/ProductRequest';
import SelectProductModal from './select-product-modal';

function Build() {
  const DEFAULT_ITEMS = [
    {
      category: 'Vi xử lý',
      product: null,
      quantity: 0,
    },
    {
      category: 'Bo mạch chủ',
      product: null,
      quantity: 0,
    },
    {
      category: 'RAM',
      product: null,
      quantity: 0,
    },
    {
      category: 'HDD',
      product: null,
      quantity: 0,
    },
    {
      category: 'SSD',
      product: null,
      quantity: 0,
    },
    {
      category: 'VGA',
      product: null,
      quantity: 0,
    },
    {
      category: 'Nguồn',
      product: null,
      quantity: 0,
    },
    {
      category: 'Vỏ case',
      product: null,
      quantity: 0,
    },
    {
      category: 'Màn hình',
      slug: 'man-hinh',
      product: null,
      quantity: 0,
    },
  ];
  const [categories, setCategories] = React.useState(DEFAULT_ITEMS);
  const [products, setProducts] = React.useState([]);
  const [openSelectProduct, setOpenSelectProduct] = React.useState(false);

  const getProductByCategorySlug = async (slug) => {
    try {
      const resp = await productApi.getProductByCategory(slug);
      setProducts(resp.data);
      setOpenSelectProduct(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCloseSelectProduct = () => {
    setOpenSelectProduct(false);
    setProducts([]);
  };

  const handleSelectProduct = (product) => {
    const newCategories = categories.map((category) => {
      if (category.slug === product.category.slug) {
        return { ...category, product, quantity: 1 };
      }
      return category;
    });
    setCategories(newCategories);
    handleCloseSelectProduct();
  };

  return (
    <>
      <div className="bg-white p-4">
        <table className="w-full">
          <tbody>
            {categories.map((item, index) => (
              <tr key={index}>
                <td className="p-8 border border-gray-200 w-48">
                  {index + 1}. {item.category}
                </td>
                <td className="border border-gray-200 p-4">
                  {item.product ? (
                    <>
                      <div
                        className="flex p-4 border-b last:border-0 border-grey"
                      >
                        <div className="w-[125px] h-[125px] rounded-lg overflow-hidden mr-6">
                          <img
                            src={getImageUrl(item.product.thumbnail.fileName)}
                            alt={item.product.slug}
                          />
                        </div>
                        <div className="flex-grow">
                          <p className="text-lg font-semibold">
                            {item.product.name}
                          </p>
                          <p>
                            Bảo hành:{' '}
                            <span className="font-semibold">
                              {item.product.warrantyDuration} tháng
                            </span>
                          </p>
                          <p>
                            Kho hàng:{' '}
                            {item.product.stock > 0 ? (
                              <span className="text-green-500 font-semibold">
                                <FontAwesomeIcon icon="check" /> Còn hàng
                              </span>
                            ) : (
                              <span className="font-semibold">
                                Liên hệ <FontAwesomeIcon icon="phone" />
                              </span>
                            )}
                          </p>
                          <p className="text-lg font-bold text-red-500">
                            {formatVndCurrency(item.product.sale || item.product.price)}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        className="bg-blue-500 text-white font-semibold p-2 rounded"
                        onClick={() => getProductByCategorySlug(item.slug)}
                      >
                        + Chọn {item.category}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SelectProductModal
        open={openSelectProduct}
        onClose={handleCloseSelectProduct}
        products={products}
        onSelectProduct={handleSelectProduct}
      />
    </>
  );
}

export default Build;
