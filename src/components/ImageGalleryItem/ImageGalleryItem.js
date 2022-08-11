import React from "react";
import css from "./ImageGalleryItem.module.css";
import propTypes from "prop-types";

const ImageGalleryItem = ({
  id,
  showModal,
  webformaturl,
  tags,
  largeimageurl,
  imgInfo,
}) => {
  return (
    <li className={css.ImageGalleryItem} id={id} onClick={showModal}>
      <img
        className={css.ImageGalleryItemImage}
        src={webformaturl}
        alt={tags}
        largeimageurl={largeimageurl}
        onClick={imgInfo}
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
