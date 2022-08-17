import React from "react";
import css from "./ImageGalleryItem.module.css";
import propTypes from "prop-types";

const ImageGalleryItem = ({
  id,
  openModal,
  webformaturl,
  tags,
  largeimageurl,
  modalInfo,
}) => {
  return (
    <li className={css.ImageGalleryItem} id={id} onClick={openModal}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformaturl}
        alt={tags}
        largeimageurl={largeimageurl}
        onClick={modalInfo}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: propTypes.number,
  webformaturl: propTypes.string,
  largeimageurl: propTypes.string,
  tags: propTypes.string,
  showModal: propTypes.func,
  imgInfo: propTypes.func,
};
