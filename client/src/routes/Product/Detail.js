import React from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import productApi from "../../requests/ProductRequest";
import { getImageUrl } from "../../helpers/Common";
import Slider from "react-slick";

function ProductDetail(props) {
    const [loading, setLoading] = React.useState(true);
    const [product, setProduct] = React.useState(null);
    const params = useParams();
    const carouselRef = React.useRef(null);

    const fetchProduct = async (url) => {
        const id = url.split("-").reverse()[0];
        try {
            setLoading(true);
            const resp = await productApi.getProductById(id);
            setProduct(resp.data);
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

    React.useEffect(() => {
        fetchProduct(params.product);
    }, [params]);

    const switchCarousel = (idx) => {
        carouselRef.current.slickGoTo(idx);
    }

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
                    <div className="bg-white rounded-xl">
                        <div className="text-xl font-semibold p-4">{product.name}</div>
                        <div className="grid grid-cols-5 gap-8 p-4">
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
                                                <div className="border border-gray-400 cursor-pointer hover:border-2" key={_img._id} onClick={() => switchCarousel(_idx)}>
                                                    <img
                                                        className="w-full"
                                                        src={getImageUrl(_img.fileName)}
                                                        alt={product.slug}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="col-span-7">Test</div>
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
                </>
            )}
        </>
    );
}

export default ProductDetail;
