import React from "react";
function UploadSingleImg({ img, handleChangeImage }) {
    return (
        <>
            <div className="p-2 h-60">
                <label
                    htmlFor={img.id}
                    className={
                        "h-full w-52 border-gray-700 border rounded-lg flex items-center cursor-pointer select-none overflow-hidden"
                    }
                >
                    <img
                        src={`${process.env.REACT_APP_ORIGIN_BACKEND}/images/${img.content}`}
                        className="w-full"
                        alt="thumbnail"
                    />
                </label>
                <input
                    id={img.id}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleChangeImage(img, e)}
                />
            </div>
        </>
    );
}

export default UploadSingleImg;
