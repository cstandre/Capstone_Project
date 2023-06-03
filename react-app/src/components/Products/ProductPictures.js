import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { addProductImg } from "../../store/products";

const ProductPicture = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();
    const [prevImg, setPrevImg] = useState(null);
    const [optionalImgs, setOptionalImgs] = useState(Array(4).fill(null));
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const formData = new FormData();

        if (!prevImg) {
            setErrors(["A preview image is required"]);
            return;
        }

        formData.append("image_preview", prevImg);
        // console.log(prevImg)
        // console.log(formData, "after first append")
        optionalImgs.forEach((optionalImg, index) => {
            if (optionalImg) {
                formData.append(`image_${index}`, optionalImg);
            }
        });

        const productImages = await dispatch(addProductImg(productId, formData)).catch((res) => {
            // console.log(formData, 'in the dispatch for the thunk')
            if (res.status === 400) {
                const errorMsg = "File type is not supported.";
                setErrors([errorMsg]);
            }
        });

        if (productImages) {
            history.push(`/products/${productId}`);
        }
    };

    const handleImageChange = (index, e) => {
        const newOptionalImgs = [...optionalImgs];
        newOptionalImgs[index] = e.target.files[0];
        setOptionalImgs(newOptionalImgs);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label>Preview Image *</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPrevImg(e.target.files[0])}
                />
            </div>
            {[...Array(4)].map((_, index) => (
                <div key={index}>
                    <label>Optional Image {index + 1}</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, e)}
                    />
                </div>
            ))}
            <button type="submit">Create Product</button>
            {errors.length > 0 && <div>{errors.join(", ")}</div>}
        </form>
    );
};

export default ProductPicture;
