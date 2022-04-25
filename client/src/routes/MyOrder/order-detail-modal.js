import React from "react";
import Modal from "../../components/Modal";

function OrderDetailModal({ open, onClose, orderDetail }) {
    return (
        <>
            <Modal dimmer={true} onClose={onClose} open={open}>
              
            </Modal>
        </>
    );
}

export default OrderDetailModal;
