import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  SearchbarItem,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './SearchbarStyled';

export default function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (searchValue.trim() === '') return;
    onSubmit(searchValue);
    setSearchValue('');
  };

  const handleInputChange = e => {
    setSearchValue(e.target.value.toLowerCase());
  };

  return (
    <SearchbarItem className="searchbar">
      <SearchForm onSubmit={handleSubmit} className="form">
        <SearchFormButton type="submit" className="button">
          <SearchFormLabel className="button-label">Search</SearchFormLabel>
        </SearchFormButton>

        <SearchFormInput
          onChange={handleInputChange}
          value={searchValue}
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarItem>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
