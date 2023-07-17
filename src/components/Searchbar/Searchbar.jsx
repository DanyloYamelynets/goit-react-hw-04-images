import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  SearchbarItem,
  SearchForm,
  SearchFormButton,
  SearchFormLabel,
  SearchFormInput,
} from './SearchbarStyled';

export default class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.searchValue.trim() === '') return;
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  handleInputChange = e => {
    this.setState({ searchValue: e.target.value.toLowerCase() });
  };

  render() {
    return (
      <SearchbarItem className="searchbar">
        <SearchForm onSubmit={this.onSubmit} className="form">
          <SearchFormButton type="submit" className="button">
            <SearchFormLabel className="button-label">Search</SearchFormLabel>
          </SearchFormButton>

          <SearchFormInput
            onChange={this.handleInputChange}
            value={this.state.searchValue}
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
}

Searchbar.propsTypes = {
  onSubmit: PropTypes.func.isRequired,
};
