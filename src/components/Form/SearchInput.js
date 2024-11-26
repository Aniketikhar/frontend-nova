import React, {useRef} from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SearchInput.css';

const SearchInput = () => {
  const {values, setValues, setSearchLoading} = useSearch();
  const navigate = useNavigate();
  const ref = useRef("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSearchLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
      ref.current.value = "";
      setSearchLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="search mt-2">
      <form className="d-flex " role="search" onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          ref={ref}
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="search-btn" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
