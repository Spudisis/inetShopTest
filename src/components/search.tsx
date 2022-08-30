import React, { HTMLAttributes } from "react";
import { addSearch } from "../redux/slices/filterSlice";
import { useAppDispatch } from "../redux/store";
import s from "../sass/search.module.scss";
import { debounce } from "lodash";
const Search: React.FC = () => {
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce(async (value) => {
    dispatch(addSearch(await value));
  }, 250);

  async function handleChange(value: string) {
    debouncedSearch(value);
  }

  return (
    <div>
      <input placeholder="Поиск товаров" className={s.blockSearch} onChange={(e) => handleChange(e.target.value)} />
    </div>
  );
};

export default Search;
