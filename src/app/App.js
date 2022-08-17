import css from "./App.module.css";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Searchbar from "../components/Searchbar";
import ImageGallery from "../components/ImageGallery";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import fetchImages from "./services";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  // const [error, setError] = useState(null);
  const [modal, setModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [alt, setAlt] = useState("");
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
        console.log("images", data.hits);
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
    setModal(false);
  };

  const loadMoreImages = () => {
    setPage((page) => page + 1);
  };

  const imgInfo = (e) => {
    const altImg = e.currentTarget.getAttribute("alt");
    const largeImg = e.currentTarget.getAttribute("largeimageurl");

    setLargeImageURL(largeImg);
    setAlt(altImg);
  };

  const lastImagesInDB = (arrayLengthFetch) => {
    if (arrayLengthFetch !== 12) {
      toast.warn("No more images in DataBase!!!", {
        theme: "colored",
        icon: "🚀",
        position: "top-right",
      });

      console.log("...lastImagesInDB...");
      return arrayLengthFetch;
    }
  };

  console.log("imagesLength", images.length);
  console.log("pagesLength", page);
  console.log("arrayLength", images.length / page);

  return (
    <div className={css.App}>
      {modal && (
        <Modal closeModal={() => setModal(!modal)}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}

      <Searchbar onSubmit={formSubmitHandler} />

      {images.length > 0 && (
        <ImageGallery
          images={images}
          showModal={() => setModal(!modal)}
          imgInfo={imgInfo}
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
