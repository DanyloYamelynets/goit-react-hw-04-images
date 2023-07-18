import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Overlay, ModalItem } from './ModalStyled';

export default function Modal({ onCloseModal, modalData }) {
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };
  const handleClickOverlay = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

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
