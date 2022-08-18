import css from "./App.module.css";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import SearchBar from "../SearchBar";
import ImageGallery from "../ImageGallery";
import Button from "../Button";
import Modal from "../Modal";
import fetchImages from "../services/fetchImages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState({
    largeImageURL: "",
    alt: "",
  });
  const [loading, setLoading] = useState(false);

  // componentDidUpdate
  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setLoading(true);
    fetchImages({ searchQuery, page })
      .then((data) => {
        setImages([
          ...images,
          ...data.hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
            id: id,
            webformatURL: webformatURL,
            tags: tags,
            largeImageURL: largeImageURL,
          })),
        ]);
        lastImagesInDB(data.hits.length);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(`${error}`, {
          theme: "colored",
          position: "top-right",
        });
      });
  }, [searchQuery, page]);

  const formSubmitHandler = (searchQueryBar) => {
    if (searchQuery === searchQueryBar) {
      toast.error("You enter the same word!!! Enter new one!!!", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }

    setSearchQuery(searchQueryBar);
    setPage(1);
    setImages([]);
  };

  const loadMoreImages = () => {
    setPage((page) => page + 1);
  };

  const openModal = (e) => {
    setModal({
      largeImageURL: e.currentTarget.getAttribute("largeimageurl"),
      alt: e.currentTarget.getAttribute("alt"),
    });
  };
  const closeModal = (e) => {
    setModal({
      largeImageURL: "",
      alt: "",
    });
  };

  const lastImagesInDB = (arrayLengthFetch) => {
    if (arrayLengthFetch !== 12) {
      toast.warn("No more images in DataBase!!!", {
        theme: "colored",
        icon: "🚀",
        position: "top-right",
      });

      return arrayLengthFetch;
    }
  };

  return (
    <div className={css.App}>
      {modal.largeImageURL.length > 0 && (
        <Modal closeModal={() => closeModal()}>
          <img src={modal.largeImageURL} alt={modal.alt} />
        </Modal>
      )}

      <SearchBar onSubmit={formSubmitHandler} />

      {images.length > 0 && (
        <ImageGallery
          images={images}
          openModal={() => openModal}
          modalInfo={openModal}
        ></ImageGallery>
      )}

      {loading && <Loader loading={loading} />}

      {images && images.length / page === 12 && images.length <= 500 && (
        <Button onClick={loadMoreImages} />
      )}

      <ToastContainer
        autoClose={1500}
        theme="colored"
        position="top-right"
        icon="🚀"
      />
    </div>
  );
}
