import React from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import productApi from "../../requests/ProductRequest";
import { classNames, formatVndCurrency, getImageUrl } from "../../helpers/Common";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProductItem } from "../../components";
import { useSelector } from "react-redux";
import ReviewSection from "./ReviewSection";
import CommentSection from "./CommentSection";

function ProductDetail(props) {
    const SECTION = {
        REVIEW: "review",
        COMMENT: "comment",
    };
    const MAX_RATING = 5;
    const [loading, setLoading] = React.useState(true);
    const [product, setProduct] = React.useState(null);
    const [activeSection, setActiveSection] = React.useState(SECTION.REVIEW);
    const [suggestProducts, setSuggestProducts] = React.useState([]);
    const {
        profile: { info: user },
    } = useSelector((state) => state.auth);
    const params = useParams();
    const carouselRef = React.useRef(null);
    const [ratingIcons, setRatingIcons] = React.useState([]);

    const avgRating = React.useMemo(() => {
        if (product) {
            let _avgRating = (
                product.reviews.reduce((rating, review) => (rating += review.rating), 0) /
                    product.reviews.length || 0
            ).toFixed(2);
            let stars = _avgRating;
            const _ratingIcons = [];
            while (stars >= 1) {
                stars -= 1;
                _ratingIcons.push("fa-star");
            }
            while (stars >= 0.5) {
                stars -= 0.5;
                _ratingIcons.push("fa-star-half-alt");
            }
            for (let i = 0; i < MAX_RATING - Math.round(_avgRating); i++) {
                _ratingIcons.push("far fa-star");
            }
            setRatingIcons(_ratingIcons);
            return _avgRating;
        }
        return 0;
    }, [product]);

    const fetchProduct = async (id) => {
        try {
            setLoading(true);
            const productResp = await productApi.getProductById(id);
            const _product = productResp.data;
            const reviewsResp = await productApi.getProductReview(_product._id);
            _product.reviews = reviewsResp.data;
            setProduct(_product);
        } catch (e) {
            toast.error(
                e.response?.data?.error?.message ||
                    "Lấy thông tin sản phẩm thất bại! Vui lòng thử lại sau."
            );
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchSuggestProduct = async (_product) => {
        try {
            const resp = await productApi.getProductByCategory(_product.category.slug);
            setSuggestProducts(resp.data.filter((_item) => _item._id !== _product._id).slice(0, 5));
        } catch (e) {
            toast.error(
                e.response?.data?.error?.message ||
                    "Lấy thông tin sản phẩm thất bại! Vui lòng thử lại sau."
            );
            console.error(e);
        }
    };

    React.useEffect(() => {
        const idProduct = params.product.split("-").reverse()[0];
        fetchProduct(idProduct);
    }, [params]);

    React.useEffect(() => {
        if (product) {
            fetchSuggestProduct(product);
        }
    }, [product]);

    React.useEffect(() => {
        if (product) {
            document.title = `${product.name}`;
        }
    }, [product, user]);

    const switchCarousel = (idx) => {
        carouselRef.current.slickGoTo(idx);
    };

    return (
        <>
            {product && (
                <>
                    <div>
                        <Link className="font-semibold" to="/">
                            Trang chủ
                        </Link>{" "}
                        /{" "}
                        <Link className="font-semibold" to={`/${product.category.slug}`}>
                            {product.category.name}
                        </Link>{" "}
                        / <span className="font-semibold">{product.name}</span>
                    </div>
                    <div className="bg-white rounded-xl p-4 my-4">
                        <div className="text-3xl font-semibold border-b pb-4">{product.name}</div>
                        <div className="grid grid-cols-5 gap-8 pt-4">
                            <div className="col-span-4">
                                <div className="grid grid-cols-11 gap-8">
                                    <div className="col-span-4 p-8">
                                        <Slider
                                            infinite
                                            speed={500}
                                            slidesToShow={1}
                                            slidesToScroll={1}
                                            autoplay
                                            autoplaySpeed={5000}
                                            ref={carouselRef}
                                        >
                                            {product.images.map((_img) => (
                                                <div key={_img._id}>
                                                    <img
                                                        className="w-full"
                                                        src={getImageUrl(_img.fileName)}
                                                        alt={product.slug}
                                                    />
                                                </div>
                                            ))}
                                        </Slider>
                                        <div className="grid grid-cols-5 gap-2">
                                            {product.images.map((_img, _idx) => (
                                                <div
                                                    className="border border-gray-400 cursor-pointer hover:border-2"
                                                    key={_img._id}
                                                    onClick={() => switchCarousel(_idx)}
                                                >
                                                    <img
                                                        className="w-full"
                                                        src={getImageUrl(_img.fileName)}
                                                        alt={product.slug}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-7">
                                        <div className="flex divide-x">
                                            <div className="pr-4">
                                                Đánh giá:{" "}
                                                {ratingIcons.map((_icon, _idx) => (
                                                    <FontAwesomeIcon
                                                        className="text-yellow-400"
                                                        icon={_icon}
                                                        key={_idx}
                                                    />
                                                ))}{" "}
                                                {avgRating}
                                            </div>
                                            <div className="px-4">Bình luận: {product.comments.length}</div>
                                            <div className="pl-4">Lượt xem: 0</div>
                                        </div>
                                        <div className="my-4">
                                            <div>
                                                <label className="font-semibold">Giới thiệu</label>
                                            </div>
                                            <pre>{product.description}</pre>
                                        </div>
                                        <div>
                                            <div>
                                                <label className="font-semibold">
                                                    Thông số sản phẩm
                                                </label>
                                            </div>
                                            <div className="h-72 overflow-auto">
                                                <table className="border w-full">
                                                    <tbody>
                                                        <tr className="odd:bg-gray-100">
                                                            <td className="w-px whitespace-nowrap px-4 border-r">
                                                                Hãng sản xuất
                                                            </td>
                                                            <td className="px-4">
                                                                {product.manufacturer.name}
                                                            </td>
                                                        </tr>
                                                        <tr className="odd:bg-gray-100">
                                                            <td className="w-px whitespace-nowrap px-4 border-r">
                                                                Thời gian bảo hành
                                                            </td>
                                                            <td className="px-4">
                                                                {product.warrantyDuration} tháng
                                                            </td>
                                                        </tr>
                                                        {product.properties.map(
                                                            (_property, _idx) => (
                                                                <tr
                                                                    className="odd:bg-gray-100"
                                                                    key={_idx}
                                                                >
                                                                    <td className="w-px whitespace-nowrap px-4 border-r">
                                                                        {_property.key}
                                                                    </td>
                                                                    <td className="px-4">
                                                                        {_property.value}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="border border-gray-400 border-dotted py-8 px-4 rounded-lg">
                                            <div>
                                                <span className="text-red-700 text-3xl font-bold">
                                                    {formatVndCurrency(
                                                        product.sale || product.price
                                                    )}
                                                </span>
                                                {product.sale && (
                                                    <>
                                                        <span className="text-gray-800 line-through mx-2">
                                                            {formatVndCurrency(product.price)}
                                                        </span>
                                                        <span>
                                                            Tiết kiệm{" "}
                                                            {formatVndCurrency(
                                                                product.price - product.sale
                                                            )}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                            <div>
                                                <button className="bg-gray-200 font-semibold p-2 mt-8 mr-2">
                                                    Giá đã có VAT
                                                </button>
                                                <button className="bg-gray-200 font-semibold p-2 mt-8 ml-2">
                                                    Bảo hành {product.warrantyDuration} tháng
                                                </button>
                                            </div>
                                        </div>
                                        <button className="bg-red-600 rounded-lg mt-4 w-full p-4 text-white">
                                            <div className="font-bold text-xl">ĐẶT MUA NGAY</div>
                                            <div>Giao hàng tận nơi nhanh chóng</div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="border border-gray-200 rounded-xl mb-4 overflow-hidden">
                                    <div className="border-b border-gray-200 p-3 font-semibold bg-gray-200">
                                        YÊN TÂM MUA HÀNG
                                    </div>
                                    <div className="p-3">
                                        <ul>
                                            <li>- Uy tín 20 năm xây dựng và phát triển</li>
                                            <li>- Sản phẩm chính hãng 100%</li>
                                            <li>- Trả góp lãi suất 0% toàn bộ giỏ hàng</li>
                                            <li>- Trả bảo hành tận nơi sử dụng</li>
                                            <li>- Bảo hành tận nơi cho doanh nghiệp</li>
                                            <li>- Ưu đãi riêng cho học sinh sinh viên</li>
                                            <li>- Vệ sinh miễn phí trọn đời PC, Laptop</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-xl mt-4 overflow-hidden">
                                    <div className="border-b border-gray-200 p-3 font-semibold bg-gray-200">
                                        MIỄN PHÍ MUA HÀNG
                                    </div>
                                    <div className="p-3">
                                        <ul>
                                            <li>- Giao hàng siêu tốc trong 2h</li>
                                            <li>- Giao hàng miễn phí toàn quốc</li>
                                            <li>- Nhận hàng và thanh toán tại nhà (ship COD)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {suggestProducts.length > 0 && (
                        <div className="bg-white rounded-xl px-4 py-2">
                            <div className="text-xl font-semibold">Bạn có thể thích</div>
                            {suggestProducts.map((_product) => (
                                <ProductItem product={_product} key={_product._id} />
                            ))}
                        </div>
                    )}
                    <div className="bg-white rounded-xl px-4 py-2 col-span-4">
                        <div className="flex">
                            <div
                                className={classNames(
                                    "text-xl font-semibold mr-8 cursor-pointer hover:bg-gray-200 rounded-md p-2",
                                    activeSection === SECTION.REVIEW && "bg-gray-200"
                                )}
                                onClick={() => setActiveSection(SECTION.REVIEW)}
                            >
                                Đánh giá sản phẩm
                            </div>
                            <div
                                className={classNames(
                                    "text-xl font-semibold mr-8 cursor-pointer hover:bg-gray-200 rounded-md p-2",
                                    activeSection === SECTION.COMMENT && "bg-gray-200"
                                )}
                                onClick={() => setActiveSection(SECTION.COMMENT)}
                            >
                                Bình luận
                            </div>
                        </div>
                        {activeSection === SECTION.REVIEW && <ReviewSection product={product} />}
                        {activeSection === SECTION.COMMENT && <CommentSection product={product} />}
                    </div>
                </>
            )}
        </>
    );
}

export default ProductDetail;
