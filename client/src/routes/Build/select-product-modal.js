import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Modal } from '../../components';
import { formatVndCurrency, getImageUrl } from '../../helpers/Common';

function SelectProductModal({ open, onClose, products, onSelectProduct }) {
  return (
    <>
      <Modal open={open} onClose={onClose} dimmer>
        <div className="w-1/2 bg-white border rounded-xl p-4">
          {products.map((_product) => (
            <div
              key={_product._id}
              className="flex p-4 border-b last:border-0 border-grey"
            >
              <div className="w-[125px] h-[125px] rounded-lg overflow-hidden mr-6">
                <img
                  src={getImageUrl(_product.thumbnail.fileName)}
                  alt={_product.slug}
                />
              </div>
              <div className="flex-grow">
                <p className="text-lg font-semibold">{_product.name}</p>
                <p>
                  Bảo hành:{' '}
                  <span className="font-semibold">
                    {_product.warrantyDuration} tháng
                  </span>
                </p>
                <p>
                  Kho hàng:{' '}
                  {_product.stock > 0 ? (
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
                  {formatVndCurrency(_product.sale || _product.price)}
                </p>
              </div>
              <div>
                <button
                  onClick={() => onSelectProduct(_product)}
                  className="w-[50px] h-[50px] bg-blue-500 text-white rounded-lg"
                >
                  <FontAwesomeIcon icon="cart-shopping" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

export default SelectProductModal;
