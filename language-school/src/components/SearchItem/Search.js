import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "../SearchItem/Search.scss";

const Search = ({ address, search }) => {
  const navigate = useNavigate();
  const searchInput = useRef(null);

  const addItem = () => {
    navigate(`/${address}`);
  };

  const itemSearch = () => {
    search(searchInput.current.value);
  };
  return (
    <div>
      <input ref={searchInput} className="search__button " type="text" />
      <button className="search__button-item" onClick={itemSearch}>
        <span className="material-symbols-outlined ">search</span>
      </button>

      <button className="search__button-item" onClick={addItem}>
        <span className="material-symbols-outlined">
          add
        </span>
      </button>
    </div>
  );
};

export default Search;