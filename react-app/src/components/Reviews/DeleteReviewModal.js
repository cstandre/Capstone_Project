import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import { removeReviews, loadReviews } from "../../store/reviews";

const DeleteReViewModal = ({ reviewId, productId }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(removeReviews(reviewId));
        await dispatch(loadReviews(productId))
        closeModal();
    }

    return (
        <div>
            <div className="delete-form">
                <p className="delete-title">Confirm Delete</p>
                <div className="delete-confirm">Are you sure you want to delete your review?</div>
                <div className="delete-buttons">
                    <button className="delete-button" onClick={handleClick}>
                        <div className="btn-txt">
                            Yes (Delete)
                        </div>
                    </button>
                    <button className="cancel-button" onClick={closeModal}>
                        <div className="btn-txt">
                            No (Cancel)
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteReViewModal
