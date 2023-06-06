const ProductPicture = () => {
    const [previewImage, setPreviewImage] = useState('');
    const [image1, setImage1] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

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
                <h3>Main Display Picture</h3>
                <input
                    type="file"
                    accept="images"
                />
            </label>
        </form>
    )
};

export default ProductPicture;
