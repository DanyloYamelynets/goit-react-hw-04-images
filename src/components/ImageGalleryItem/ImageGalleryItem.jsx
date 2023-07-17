import PropTypes from 'prop-types';
import {
  ImageGalleryOneItem,
  ImageGalleryImage,
} from './ImageGalleryItemStyled';

function ImageGalleryItem({
  id,
  tags,
  webformatURL,
  largeImageURL,
  onOpenModal,
}) {
  return (
    <ImageGalleryOneItem key={id}>
      <ImageGalleryImage
        src={webformatURL}
        alt={tags}
        width={300}
        onClick={() => {
          onOpenModal({ id, tags, largeImageURL });
        }}
      />
    </ImageGalleryOneItem>
  );
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
