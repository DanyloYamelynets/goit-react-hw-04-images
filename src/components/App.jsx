import React, { useState, useEffect } from 'react';
import { requestImages } from 'services/Api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Notiflix from 'notiflix';
import { AppCont } from './AppStyled';

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchImage, setSearchImage] = useState('');
  const [modal, setModal] = useState({ isOpen: false, modalData: null });
  const [noImagesLeft, setNoImagesLeft] = useState(false);

  useEffect(() => {
    if (!searchImage || !currentPage) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const images = await requestImages(searchImage, currentPage);
        setImages(prevImages =>
          currentPage === 1 ? images.hits : [...prevImages, ...images.hits]
        );
        setError(null);
        setNoImagesLeft(images.hits.length === 0 && currentPage > 1);

        if (images.hits.length === 0 && currentPage === 1) {
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [searchImage, currentPage]);

  const onSubmit = searchImage => {
    setSearchImage(searchImage);
    setCurrentPage(1);
    setNoImagesLeft(false);
  };

  const onLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const onOpenModal = data => setModal({ isOpen: true, modalData: data });
  const onCloseModal = () => setModal({ isOpen: false, modalData: null });

  {
    const showLoadMoreBtn = images.length > 0 && !isLoading && !noImagesLeft;
    return (
      <AppCont>
        <Searchbar onSubmit={onSubmit} />
        {error && <div>Error: {error}</div>}
        <ImageGallery images={images} onOpenModal={onOpenModal} />
        {isLoading && (
          <div>
            <Loader />
          </div>
        )}
        {modal.isOpen && (
          <Modal modalData={modal.modalData} onCloseModal={onCloseModal} />
        )}
        {showLoadMoreBtn && <Button onLoadMore={onLoadMore} />}
        {noImagesLeft &&
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          )}
      </AppCont>
    );
  }
}
