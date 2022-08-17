import { useState } from "react";
import css from "./SearchBar.module.css";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

export default function SearchBar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const { value } = e.currentTarget;

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
    setSearchQuery("");
  };

  return (
    <header className={css.SearchBar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
        <label htmlFor={nanoid()}>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            id={nanoid()}
            //   pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            //   title="Name may contain only letters, apostrophe, dash and spaces. For example Cat, Architecture"
            //   required
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
