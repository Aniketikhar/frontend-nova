import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [values, setValues] = useState({
    keyword: "",
    results: [],
  });
  const [searchLoading, setSearchLoading] = useState(false);

  return (
    <SearchContext.Provider value={{
      values,
      setValues,
      searchLoading,
      setSearchLoading,
    }}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };