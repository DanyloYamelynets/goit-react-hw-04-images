import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Overlay, ModalItem } from './ModalStyled';

export default class Modal extends Component {
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onCloseModal();
    }
  };
  handleClickOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.onCloseModal();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <Overlay className="overlay" onClick={this.handleClickOverlay}>
        <ModalItem className="modal">
          <img
            src={this.props?.modalData?.largeImageURL}
            alt={this.props?.modalData?.tags}
          />
        </ModalItem>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  modalData: PropTypes.object.isRequired,
};
