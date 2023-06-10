import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";


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

        console.log(formData)

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
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="form"
        >
            <div className="logo-img">
                <img className="logo" alt="" onClick={homeClick} src="https://res.cloudinary.com/djclmc80y/image/upload/v1684814624/amazon_logo_weywcm.png" />
            </div>
            <label>
                <h3>Add pictures of your product!</h3>
                <input
                    type="file"
                    accept="images/*"
                    multiple
                    onChange={handleImageChange}
                />
                <button type="submit">Create product</button>
            </label>
        </form>
    )
};

export default ProductPicture;
