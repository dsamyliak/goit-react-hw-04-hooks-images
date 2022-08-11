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

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [imageData, setImageData] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [alt, setAlt] = useState("");
  const [arrayLength, setArrayLength] = useState(0);

  // componentDidUpdate
  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    fetchImages({ searchQuery, page })
      .then((data) => {
        setArrayLength(data.hits.length);
        setImageData([
          ...imageData,
          ...data.hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
            id: id,
            webformatURL: webformatURL,
            tags: tags,
            largeImageURL: largeImageURL,
          })),
        ]);
        console.log("imageData", imageData);
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
    setImageData([]);
    setShowModal(false);
  };

  const fetchImages = async () => {
    setLoading(true);

    const response = await fetch(
      `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=3705719-850a353db1ffe60c326d386e6&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (response.ok) {
      return response.json();
    }
    return await Promise.reject(new Error(`No images with ${"newSearch"}`));
  };

  const loadMoreImages = () => {
    setPage((page) => page + 1);
  };

  const toggleModal = (e) => {
    setShowModal(!showModal);
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
      console.log("arrayLengthFetch", arrayLengthFetch);
      console.log("...lastImagesInDB...");
      return arrayLengthFetch;
    }
  };
  console.log("imageDataLength", imageData.length);

  return (
    <div className={css.App}>
      {showModal && (
        <Modal showModal={toggleModal}>
          <img src={largeImageURL} alt={alt} />
        </Modal>
      )}

      <Searchbar onSubmit={formSubmitHandler} />

      {imageData.length > 0 && (
        <ImageGallery
          imageData={imageData}
          showModal={toggleModal}
          imgInfo={imgInfo}
        ></ImageGallery>
      )}

      {loading && <Loader loading={loading} />}

      {imageData && arrayLength === 12 && <Button onClick={loadMoreImages} />}

      <ToastContainer
        autoClose={1500}
        theme="colored"
        position="top-right"
        icon="🚀"
      />
    </div>
  );
}
