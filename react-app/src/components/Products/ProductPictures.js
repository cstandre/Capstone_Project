import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import './ProductPictures.css'

const ProductPicture = () => {
    const history = useHistory();
    const { productId } = useParams();
    const [selectedImages, setselectedImages] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    // const [previewIndex, setPreviewIndex] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('image[]', previewImage);
        formData.append(`is_preview_0`, true);

        selectedImages.forEach(img => {
          formData.append('image[]', img);
        });

        // console.log(formData)

        const res = await fetch(`/api/images/${productId}`, {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            await res.json();
            history.push(`/products/${productId}`)
        };
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 5) {
            alert("Please select up to 5 files only.");
            return;
        };

        setselectedImages(files.slice(1))
        setPreviewImage(files[0]);
        // setPreviewIndex(0);
    }

    const homeClick = (e) => {
        e.preventDefault()
        history.push('/')
    };

    return (
        <div className="form">
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <div className="img">
                    <img className="logo" alt="" onClick={homeClick} src="https://res.cloudinary.com/djclmc80y/image/upload/v1684814624/amazon_logo_weywcm.png" />
                </div>
                <div className="form-pictures">
                    <p className="header">Add Pictures</p>
                    <div className="input-file">
                        <input
                            type="file"
                            id="file"
                            accept="images/*"
                            multiple
                            onChange={handleImageChange}
                        />
                        <p className="img-form-sub-header">Select 1-5 images</p>
                        <label for='file'>
                            <div className="upload-container">
                                <div className="upload-txt">Upload</div>
                            </div>
                        </label>
                        <button type="submit" className="create-botton">
                            <div className="btn-txt">
                            Create product
                            </div>
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
};

export default ProductPicture;
