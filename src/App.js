// import React from "react";
import "./App.css";

import Loader from "./components/Loader";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

// export default class App extends React.Component {
export default function App() {
  // state = {
  //   searchQuery: "",
  //   imageData: [],
  //   page: 1,
  //   error: null,
  //   showModal: false,
  // };
  const [searchQuerySt, setSearchQuerySt] = useState("");
  const [imageData, setImageData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [alt, setAlt] = useState("");
  const [arrayLength, setArrayLength] = useState(0);
  const [fetchData, setFetchData] = useState([]);

  // componentDidUpdate
  useEffect(() => {
    console.log("COMPONENT DIDUPDATE");

    // const oldQuery = prevState.searchQuerySt;
    // const newQuery = searchQuerySt;

    // if (oldQuery !== newQuery) {
    //   console.clear();
    //   fetchArray();
    // }
    // const oldPage = prevState.page;
    // const newPage = page;

    // if (oldPage !== newPage) {
    //   fetchArray();
    // }

    if (!searchQuerySt) {
      return;
    }
    console.log("searchQuerySt", searchQuerySt);

    fetchArray({ searchQuerySt, page })
      .then((data) => {
        console.log("data", data);

        setArrayLength(data.hits.length);
        setFetchData(data);
        setImageData([
          ...imageData,
          ...data.hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
            id: id,
            webformatURL: webformatURL,
            tags: tags,
            largeImageURL: largeImageURL,
          })),
        ]);

        let arrayLengthFetch = data.hits.length;
        lastImagesInDB(arrayLengthFetch);
        setLoading(false);

        console.log(
          "data.hits.length",
          data.hits.length,
          "arrayLengthF",
          arrayLengthFetch
        );
      })
      .catch((error) => {
        // this.setState({ error });
        setError({ error });
        toast.error(`${error}`, {
          theme: "colored",
          position: "top-right",
        });
      });
    // .finally((arrayLength) => {
    //   lastImagesInDB(arrayLength);
    //   // this.setState({ loading: false });
    //   setLoading(false);
    // });
    // .then((data) => {
    //   console.log("data", data);
    //   console.log("arrayLength", data.hits.length);

    // this.setState((prevState) => ({
    //   fetchData: data,
    //   imageData: [
    //     ...prevState.imageData,
    //     ...data.hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
    //       id: id,
    //       webformatURL: webformatURL,
    //       tags: tags,
    //       largeImageURL: largeImageURL,
    //     })),
    //   ],
    //   arrayLength: data.hits.length,
    // }));
    // })
  }, [searchQuerySt, page]);

  const formSubmitHandler = (searchQuery) => {
    console.log("formSubmitHandler");

    if (searchQuerySt === searchQuery) {
      toast.error("You enter the same word!!! Enter new one!!!", {
        theme: "colored",
        position: "top-right",
      });
      return;
    }

    setSearchQuerySt(searchQuery);
    setPage(1);
    setImageData([]);
    setError(null);
    setShowModal(false);

    // if (searchQuerySt !== searchQuery) {
    //   this.setState({
    //     searchQuery: searchQuery,
    //     page: 1,
    //     imageData: [],
    //     error: null,
    //     showModal: false,
    //   });
    // }
  };

  const fetchArray = async () => {
    // const { searchQuery, page } = this.state;
    // this.setState({ loading: true });
    setLoading(true);

    const response = await fetch(
      `https://pixabay.com/api/?q=${searchQuerySt}&page=${page}&key=3705719-850a353db1ffe60c326d386e6&image_type=photo&orientation=horizontal&per_page=12`
    );
    if (response.ok) {
      return response.json();
    }
    return await Promise.reject(new Error(`No images with ${"newSearch"}`));
    // .then((data) => {
    //   console.log("data", data);
    //   console.log("arrayLength", data.hits.length);
    //   setArrayLength(data.hits.length);
    // this.setState((prevState) => ({
    //   fetchData: data,
    //   imageData: [
    //     ...prevState.imageData,
    //     ...data.hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
    //       id: id,
    //       webformatURL: webformatURL,
    //       tags: tags,
    //       largeImageURL: largeImageURL,
    //     })),
    //   ],
    //   arrayLength: data.hits.length,
    // }));
    // })
    // .catch((error) => {
    //   // this.setState({ error });
    //   setError({ error });
    //   toast.error(`${error}`, {
    //     theme: "colored",
    //     position: "top-right",
    //   });
    // })
    // .finally(() => {
    //   lastImagesInDB();
    //   // this.setState({ loading: false });
    //   setLoading(false);
    // });
  };

  const loadMoreImages = () => {
    // this.setState((prevState) => ({
    //   page: prevState.page + 1,
    // }));

    setPage((page) => page + 1);
    console.log("BUTTON+1 ", page);
    // console.log("BUTTON+1 ", this.state.page);
  };

  const toggleModal = (e) => {
    // this.setState(({ showModal }) => ({
    //   showModal: !showModal,
    // }));
    setShowModal(!showModal);
  };

  const imgInfo = (e) => {
    const altImg = e.currentTarget.getAttribute("alt");
    const largeImg = e.currentTarget.getAttribute("largeimageurl");

    // this.setState({
    //   largeImageURL: largeImg,
    //   alt: altImg,
    // });

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
      return;
    }
  };

  const reset = () => {
    // this.setState({
    //   imageData: [],
    //   page: 1,
    //   searchQuery: "",
    //   error: null,
    //   // id: "",
    //   // webformatURL: "",
    //   // largeImageURL: "",
    // });

    setImageData([]);
    setPage(1);
    setSearchQuerySt("");
    setError(null);
  };

  // console.log("App this.state", this.state);
  // const { showModal, largeImageURL, alt, imageData, loading, arrayLength } =
  //   this.state;

  return (
    <div className="App">
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
