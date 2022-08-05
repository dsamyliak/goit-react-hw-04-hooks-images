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

  // componentDidMount() {
  //   console.log("App DidMount");

  //   window.addEventListener("keydown", this.handleAltSpaceDown);
  // }

  // componentWillUnmount() {
  //   console.log("App WillUnMount");
  //   window.removeEventListener("keydown", this.handleAltSpaceDown);
  // }

  // handleAltSpaceDown = (e) => {
  //   console.log("keydown e.code ", e.code);

  //   if (this.state.searchQuery !== "") {
  //     if (e.altKey && e.code === "Space") {
  //       console.log("MetaLeft pressed");
  //       this.loadMoreImages();
  //     }
  //   }
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log("COMPONENT DIDUPDATE");

  //   const oldQuery = prevState.searchQuery;
  //   const newQuery = this.state.searchQuery;

  //   if (oldQuery !== newQuery) {
  //     console.clear();
  //     this.fetchArray();
  //   }

  //   const oldPage = prevState.page;
  //   const newPage = this.state.page;

  //   if (oldPage !== newPage) {
  //     this.fetchArray();
  //   }
  // }

  // componentDidUpdate
  useEffect(() => {
    console.log("COMPONENT DIDUPDATE");
    if (!searchQuerySt) {
      return;
    }
    console.log("searchQuerySt", searchQuerySt);
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
    fetchArray();
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

  const fetchArray = () => {
    // const { searchQuery, page } = this.state;
    // this.setState({ loading: true });
    setLoading(true);

    fetch(
      `https://pixabay.com/api/?q=${searchQuerySt}&page=${page}&key=3705719-850a353db1ffe60c326d386e6&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(new Error(`No images with ${"newSearch"}`));
      })
      .then((data) => {
        this.setState((prevState) => ({
          fetchData: data,
          imageData: [
            ...prevState.imageData,
            ...data.hits.map(({ id, webformatURL, tags, largeImageURL }) => ({
              id: id,
              webformatURL: webformatURL,
              tags: tags,
              largeImageURL: largeImageURL,
            })),
          ],
          setArrayLength: data.hits.length,
        }));
      })
      .catch((error) => {
        // this.setState({ error });
        setError({ error });
        toast.error(`${error}`, {
          theme: "colored",
          position: "top-right",
        });
      })
      .finally(() => {
        lastImagesInDB();
        // this.setState({ loading: false });
        setLoading(false);
      });
  };

  const loadMoreImages = (prevState) => {
    // this.setState((prevState) => ({
    //   page: prevState.page + 1,
    // }));
    setPage(prevState + 1);

    // console.log("BUTTON+1 ", this.state.page);
    console.log("BUTTON+1 ", page);
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

  const lastImagesInDB = () => {
    const arrL = arrayLength;

    if (arrL !== 12) {
      toast.warn("No more images in DataBase!!!", {
        theme: "colored",
        icon: "🚀",
        position: "top-right",
      });
      console.log("arrLength", arrL);
      console.log("lastImagesInDB");
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
