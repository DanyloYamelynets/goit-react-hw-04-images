import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Overlay, ModalItem } from './ModalStyled';

export default function Modal({ onCloseModal, modalData }) {
  
  const handleClickOverlay = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  return (
    <Overlay className="overlay" onClick={handleClickOverlay}>
      <ModalItem className="modal">
        <img src={modalData?.largeImageURL} alt={modalData?.tags} />
      </ModalItem>
    </Overlay>
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  modalData: PropTypes.object.isRequired,
};
