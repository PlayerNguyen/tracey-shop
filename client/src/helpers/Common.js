function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function formatVndCurrency(number) {
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}

function getImageUrl(fileName) {
    return `${process.env.REACT_APP_ORIGIN_BACKEND}/images/${fileName}`;
}

export { classNames, formatVndCurrency, getImageUrl };
