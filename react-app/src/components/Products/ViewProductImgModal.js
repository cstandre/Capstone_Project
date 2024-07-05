import React, { useState } from "react";
import { useModal } from "../../context/Modal";

import './ViewProductImgModal.css'


const ViewProductImgModal = (product) => {
    const { closeModal } = useModal();
    const [selectedImg, setSelectedImg] = useState(product?.currImg)

    const handleImgClick = (img) => {
        setSelectedImg(img);
      };

    return (
        <>
            <div className="image-view-modal">
                <div className="img-modal-container">
                    {<img className="main-view-img" alt="" src={selectedImg}>
                    </img>}
                    {product? (
                        <>
                            <div className="side-imgs-container">
                                {product?.product?.product_images?.map((img, idx)=>
                                    <img
                                        key={idx}
                                        alt=''
                                        className={`small-img ${selectedImg === idx ? 'selectedImg': ''}`}
                                        src={img?.image}
                                        value={img.image}
                                        onClick={() => handleImgClick(img.image, idx)}
                                    >
                                    </img>
                                )}
                            </div>
                        </>
                    ): (
                        <>
                        </>
                    )}
                </div>
            <button className="fa-solid fa-x" onClick={closeModal}></button>
            </div>
        </>
    )
}

export default ViewProductImgModal
