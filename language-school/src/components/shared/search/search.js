import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

import "./search.scss";

const Search = ({ address, search }) => {
  const navigate = useNavigate();
  const searchInput = useRef(null);

  const addItem = () => {
    navigate(`/${address}`);
  };

  const dupa = () => {
    search(searchInput.current.value);
  };
  return (
    <div>
      <input ref={searchInput} className="search__button " type="text" />
      <button onClick={dupa}>
        <span className="material-symbols-outlined">search</span>
      </button>

      <button onClick={addItem}>
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
};

export default Search;
