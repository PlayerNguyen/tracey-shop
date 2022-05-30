import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useMemo } from 'react';
import { formatVndCurrency, getImageUrl } from '../../helpers/Common';
import productApi from '../../requests/ProductRequest';
import SelectProductModal from './select-product-modal';
import { useSelector, useDispatch } from 'react-redux';
import * as buildActions from '../../stores/buildReducer';

function Build() {
  const { categories, products, openSelectProduct } = useSelector(
    (state) => state.build,
  );
  const totalPrice = useMemo(() => {
    let total = 0;
    categories.forEach((item) => {
      const productPrice = item.product?.sale || item.product?.price || 0;
      total += productPrice * item.quantity;
    });
    return total;
  }, [categories]);
  const dispatch = useDispatch();

  const getProductByCategorySlug = async (slug) => {
    try {
      const resp = await productApi.getProductByCategory(slug);
      dispatch(buildActions.setProducts(resp.data));
      dispatch(buildActions.setOpenSelectProduct(true));
    } catch (e) {
      console.error(e);
    }
  };

  const handleCloseSelectProduct = () => {
    dispatch(buildActions.setOpenSelectProduct(false));
    dispatch(buildActions.setProducts([]));
  };

  const handleSelectProduct = (product) => {
    const newCategories = categories.map((category) => {
      if (category.slug === product.category.slug) {
        return { ...category, product, quantity: 1 };
      }
      return category;
    });
    dispatch(buildActions.setCategories(newCategories));
    handleCloseSelectProduct();
  };

  const removeItem = (item) => {
    const newCategories = categories.map((category) => {
      if (category.slug === item.slug) {
        return { ...category, product: null, quantity: 0 };
      }
      return category;
    });
    dispatch(buildActions.setCategories(newCategories));
  };

  const handleMoveItemsToCart = () => {
    
  };

  return (
    <>
      <div className="bg-white p-4">
        <table className="w-full">
          <tbody>
            {categories.map((item, index) => {
              const price = item.product?.sale || item.product?.price || 0;
              return (
                <tr key={index}>
                  <td className="p-8 border border-gray-200 w-48">
                    {index + 1}. {item.category}
                  </td>
                  <td className="border border-gray-200 p-4">
                    {item.product ? (
                      <>
                        <div className="flex p-4 border-b last:border-0 border-grey">
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
                              {formatVndCurrency(price)}
                            </p>
                          </div>
                          <div>
                            <div className="mb-4 text-right">
                              <button
                                className="bg-blue-500 text-white font-semibold px-3 py-2 rounded mr-1"
                                onClick={() =>
                                  getProductByCategorySlug(item.slug)
                                }
                              >
                                <FontAwesomeIcon icon="pen-to-square" />
                              </button>
                              <button
                                className="bg-red-500 text-white font-semibold px-3 py-2 rounded ml-1"
                                onClick={() => removeItem(item)}
                              >
                                <FontAwesomeIcon icon="trash" />
                              </button>
                            </div>
                            <div>
                              <div>
                                <span className="text-red-500 font-semibold">
                                  {formatVndCurrency(price)}
                                </span>
                                {' x '}
                                <input
                                  type="number"
                                  className="input w-20"
                                  value={item.quantity}
                                  min={1}
                                />
                                {' = '}
                                <span className="text-red-500 font-semibold">
                                  {formatVndCurrency(price * item.quantity)}
                                </span>
                              </div>
                            </div>
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
              );
            })}
            <tr>
              <td className="border border-gray-200 p-8">Tổng tiền:</td>
              <td className="border border-gray-200 text-right p-4">
                <span className="text-red-500 font-bold">
                  {formatVndCurrency(totalPrice)}
                </span>
                <button
                  className="ml-2 bg-blue-500 text-white p-2 rounded-lg font-semibold"
                  onClick={handleMoveItemsToCart}
                >
                  Tới giỏ hàng
                </button>
              </td>
            </tr>
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
