import React from 'react';
import Modal from '../../components/Modal';

function OrderDetailModal({ open, onClose, orderDetail }) {
  return (
    <>
      <Modal dimmer={true} onClose={onClose} open={open}>
          <p className='text-xl font-semibold'>Thông tin đơn hàng</p>
      </Modal>
    </>
  );
}

export default OrderDetailModal;
