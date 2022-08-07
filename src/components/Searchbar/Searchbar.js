import { useState } from "react";
import "./Searchbar.css";
import { nanoid } from "nanoid";
// import propTypes from "prop-types";
import { toast } from "react-toastify";

// class Searchbar extends React.Component {
export default function Searchbar({ onSubmit }) {
  // searchQueryId = nanoid();
  const [searchQueryId, setSearchQueryId] = useState(nanoid());
  const [searchQuery, setSearchQuery] = useState("");

  // static propTypes = {
  //   state: propTypes.shape({
  //     searchQuery: propTypes.string.isRequired,
  //   }),
  // };

  // state = {
  //   searchQuery: "",
  // };

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;
    // this.setState({ [name]: value });
    setSearchQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      toast.error("Enter name of image!");
      return;
    }

    onSubmit(searchQuery.trim().toLowerCase());
    reset();
  };

  const reset = () => {
    // this.setState({
    //   searchQuery: "",
    // });
    setSearchQuery("");
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <label htmlFor={searchQueryId}>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            //   pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            //   title="Name may contain only letters, apostrophe, dash and spaces. For example Cat, Architecture"
            //   required
            id={searchQueryId}
            // name="searchQuery"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search images and photos"
          />
        </label>
      </form>
    </header>
  );
}

// export default Searchbar;
