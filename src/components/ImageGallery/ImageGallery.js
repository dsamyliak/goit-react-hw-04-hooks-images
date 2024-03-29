import React from "react";
import css from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import { nanoid } from "nanoid";
import propTypes from "prop-types";

const ImageGallery = ({ images, modalInfo, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          id={id}
          key={nanoid()}
          webformaturl={webformatURL}
          tags={tags}
          largeimageurl={largeImageURL}
          modalInfo={modalInfo}
          openModal={openModal}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
};

export default ImageGallery;

ImageGalleryItem.propTypes = {
  images: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number,
      webformatURL: propTypes.string,
      largeImageURL: propTypes.string,
      tags: propTypes.string,
    })
  ),
  showModal: propTypes.func,
  imgInfo: propTypes.func,
};
