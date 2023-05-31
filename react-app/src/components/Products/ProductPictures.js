import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { addProductImg } from "../../store/products";



const ProductPicture = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { productId } = useParams();
    const [ prevImg, setPrevImg ] = useState(null);
    const [ errors, setErrors ] = useState([]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

        const newImg = {
            prevImg,
            preview: true,
            productId
        }

        const productImage = await dispatch(addProductImg(productId, newImg))
        .catch(async (res) => {
            if (res.status === 400) {
                const errorMsg = "file type is not supported.";
                setErrors([errorMsg])
            }
        })
        if (productImage) {
            history.push(`/products/${productId}`)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPrevImg(e.target.files[0])}
            />
            <button type="submit">Create Product</button>
        </form>
    )
}

export default ProductPicture;
