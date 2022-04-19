import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import productApi from "../../requests/ProductRequest";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ReviewSection({ product }) {
    const navigate = useNavigate();

    const [reviewData, setReviewData] = React.useState({
        reviewExist: false,
        ratingIcons: [0, 0, 0, 0, 0],
        content: "",
    });

    const {
        profile: { info: user },
    } = useSelector((state) => state.auth);

    React.useEffect(() => {
        if (user) {
            const _reviewExist = product.reviews.find((_review) => _review.user._id === user._id);
            setReviewData({ ...reviewData, reviewExist: _reviewExist });
        }
    }, [user]);

    const handleRedirectLogin = () => {
        navigate("/login");
    };

    const handleUpdateRating = (rating) => {
        setReviewData({
            ...reviewData,
            ratingIcons: reviewData.ratingIcons.map((_rate, _idx) => (_idx <= rating ? 1 : 0)),
        });
    };

    const handleChangeReviewContent = (e) => {
        setReviewData({ ...reviewData, content: e.target.value });
    };

    const handleSubmitReview = async () => {
        try {
            const _review = {
                reviewDetail: reviewData.content,
                rating: reviewData.ratingIcons.filter((_rating) => _rating).length,
                user: user._id,
                product: product._id,
            };
            await productApi.createProductReview(_review);
            toast.success(
                "Cảm ơn bạn đã đóng góp cho truyện này! Đánh giá sẽ được hiển thị sau khi quản trị viên duyệt."
            );
            setReviewData({
                reviewExist: true,
                ratingIcons: [0, 0, 0, 0, 0],
                content: "",
            });
        } catch (e) {
            toast.error("Gửi đánh giá thất bại! Vui lòng thử lại sau.");
            console.error(e);
        }
    };

    const ratingIcons = [0, 0, 0, 0, 0];
    return (
        <>
            <div className="w-full">
                {user._id && !reviewData.reviewExist && (
                    <div>
                        {reviewData.ratingIcons.map((_rate, _idx) => (
                            <FontAwesomeIcon
                                key={_idx}
                                className="text-yellow-400 cursor-pointer text-xl"
                                icon={_rate ? "fa-star" : "far fa-star"}
                                onClick={() => handleUpdateRating(_idx)}
                            />
                        ))}
                        <textarea
                            className="input w-full mt-2"
                            placeholder="Hãy cho chúng mình biết cảm nhận của bạn về bộ truyện này"
                            value={reviewData.content}
                            onChange={handleChangeReviewContent}
                        />
                        <button
                            onClick={handleSubmitReview}
                            className="bg-blue-800 text-white font-semibold rounded-lg py-2 px-20"
                        >
                            Đăng
                        </button>
                    </div>
                )}
                {!user._id && product.reviews.length === 0 && (
                    <>
                        <span className="text-lg">
                            Chưa có đánh giá nào.{" "}
                            <span
                                className="font-bold cursor-pointer hover:underline"
                                onClick={handleRedirectLogin}
                            >
                                Đăng nhập
                            </span>{" "}
                            để trở thành người đầu tiên đưa ra nhận xét về sản phẩm này nhé
                        </span>
                    </>
                )}
                {product.reviews.map((_review) => (
                    <div key={_review._id} className="p-4">
                        <div>
                            <span className="font-semibold">{_review.user.name}</span>
                            {" - "}
                            <span>{moment(_review.createdAt).format("HH:mm DD/MM/YYYY")}</span>
                        </div>
                        <div>
                            {ratingIcons.map((_icon, _idx) => (
                                <FontAwesomeIcon
                                    key={_idx}
                                    className="text-yellow-400 cursor-pointer text-xl"
                                    icon={_idx < _review.rating ? "fa-star" : "far fa-star"}
                                />
                            ))}
                        </div>
                        <div>
                            <pre>{_review.reviewDetail}</pre>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ReviewSection;
