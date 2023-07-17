import PropTypes from 'prop-types';
import React from 'react';
import { BtnLoadMore, BtnContainer } from './ButtonStyled';

function Button({ onLoadMore }) {
  return (
    <BtnContainer>
      <BtnLoadMore type="button" onClick={onLoadMore}>
        Load More
      </BtnLoadMore>
    </BtnContainer>
  );
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
