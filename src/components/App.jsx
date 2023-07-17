import React, { Component } from 'react';
import { requestImages } from 'services/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';
import { AppCont } from './AppStyled';

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    isLoading: false,
    error: null,
    searchImage: '',
    modal: { isOpen: false, modalData: null },
    noImagesLeft: false,
  };

  async componentDidUpdate(_, prevState) {
    const { searchImage, currentPage } = this.state;
    if (
      this.state.searchImage !== prevState.searchImage ||
      this.state.currentPage !== prevState.currentPage
    ) {
      try {
        this.setState({ isLoading: true });
        const images = await requestImages(searchImage, currentPage);
        this.setState({
          images:
            currentPage === 1
              ? images.hits
              : [...prevState.images, ...images.hits],
          error: null,
          noImagesLeft: images.hits.length === 0 && currentPage > 1,
        });

        if (images.hits.length === 0 && currentPage === 1) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  onSubmit = searchImage => {
    this.setState({
      searchImage: searchImage,
      currentPage: 1,
      noImagesLeft: false,
    });
  };

  onLoadMore = () => {
    this.setState(prev => ({ currentPage: prev.currentPage + 1 }));
  };

  onOpenModal = data =>
    this.setState({ modal: { isOpen: true, modalData: data } });
  onCloseModal = () =>
    this.setState({ modal: { isOpen: false, modalData: null } });

  render() {
    const { images, isLoading, error, modal, noImagesLeft } = this.state;
    const showLoadMoreBtn = images.length > 0 && !isLoading && !noImagesLeft;
    return (
      <AppCont>
        <Searchbar onSubmit={this.onSubmit} />

        {error && <div>Error: {error}</div>}
        <ImageGallery images={images} onOpenModal={this.onOpenModal} />
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {modal.isOpen && (
          <Modal modalData={modal.modalData} onCloseModal={this.onCloseModal} />
        )}
        {showLoadMoreBtn && <Button onLoadMore={this.onLoadMore} />}
        {noImagesLeft &&
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          )}
      </AppCont>
    );
  }
}
