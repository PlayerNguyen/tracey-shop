import AxiosHelper from "../helpers/AxiosHelper";

async function createOrder(data) {
    return AxiosHelper({
        url: "/orders",
        method: "POST",
        data,
    });
}

const OrderRequest = { createOrder };
export default OrderRequest;
