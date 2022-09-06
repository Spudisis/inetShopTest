import React, { HTMLAttributes } from "react";
import { addSearch } from "../redux/slices/filterSlice";
import { useAppDispatch } from "../redux/store";
import s from "../sass/search.module.scss";
import { debounce } from "lodash";
import { useSelector } from "react-redux";
import { getPage } from "../redux/slices/pageSlice";
import { useNavigate } from "react-router-dom";
const Search: React.FC = () => {
  const dispatch = useAppDispatch();
  let navigate = useNavigate();
  const { pageLocation } = useSelector(getPage);
  const debouncedSearch = debounce(async (value) => {
    dispatch(addSearch(await value));
  }, 250);

  async function handleChange(value: string) {
    debouncedSearch(value);
  }

  const checkLocation = () => {
    if (pageLocation !== "/catalog") {
      navigate("/catalog");
    }
  };
  return (
    <div>
      <input
        placeholder="Поиск товаров"
        className={s.blockSearch}
        onChange={(e) => handleChange(e.target.value)}
        onClick={() => checkLocation()}
      />
    </div>
  );
};

export default Search;
