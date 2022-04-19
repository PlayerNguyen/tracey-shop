import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import productApi from "../../requests/ProductRequest";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CommentSection({ product }) {
    const [commentContent, setCommentContent] = React.useState("");
    const [comments, setComments] = React.useState([]);
    const {
        profile: { info: user },
    } = useSelector((state) => state.auth);

    React.useEffect(() => {
        setComments(product.comments.reverse());
    }, [product]);

    const handleChangeCommentContent = (e) => {
        setCommentContent(e.target.value);
    };

    const handleSubmitComment = async () => {
        try {
            const comment = {
                content: commentContent,
            };
            await productApi.createProductComment(product._id, comment);
            setComments([
                {
                    ...comment,
                    user,
                    createdAt: new Date(),
                },
                ...comments,
            ]);
            setCommentContent("");
        } catch (e) {
            toast.error(
                e.response?.data?.error?.message || "Bình luận thất bại! Vui lòng thử lại sau."
            );
            console.error(e);
        }
    };

    return (
        <>
            <div className="w-full">
                {user._id && (
                    <div>
                        <textarea
                            className="input w-full mt-2"
                            placeholder="Bạn có thắc mắc về sản phẩm? Hãy để lại bình luận phía dưới"
                            value={commentContent}
                            onChange={handleChangeCommentContent}
                        />
                        <button
                            onClick={handleSubmitComment}
                            className="bg-blue-800 text-white font-semibold rounded-lg py-2 px-20"
                        >
                            Đăng
                        </button>
                    </div>
                )}
                {comments.length > 0 ? (
                    comments.map((_comment, _idx) => (
                        <div key={_idx} className="p-4">
                            <div>
                                <span className="font-semibold">{_comment.user.name}</span>
                                {" - "}
                                <span>{moment(_comment.createdAt).format("HH:mm DD/MM/YYYY")}</span>
                            </div>
                            <div>
                                <pre>{_comment.content}</pre>
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        <span className="text-lg">Chưa có bình luận nào.</span>
                    </>
                )}
            </div>
        </>
    );
}

export default CommentSection;
