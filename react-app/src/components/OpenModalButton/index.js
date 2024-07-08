import React from 'react';
import { useModal } from '../../context/Modal';

import './index.css'
import ViewProductImgModal from '../Products/ViewProductImgModal';
import LoginFormModal from '../LoginFormModal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };


  if (buttonText === 'Delete') {
    return (<button className='delete-modal' onClick={onClick}>{buttonText}</button>);
  };
  if (buttonText === 'Add to cart') {
    return (<button className='add-to-cart' onClick={onClick}>{buttonText}</button>);
  };
  if (buttonText === 'Write a customer review') {
    return (<button className='create-review-btn' onClick={onClick}>{buttonText}</button>);
  };
  if (modalComponent === LoginFormModal ) {
    return (<button className='get-started-btn' onClick={onClick}>{buttonText}</button>);
  }
  return (<button className='btn-main' onClick={onClick}>{buttonText}</button>);
}

export default OpenModalButton;
