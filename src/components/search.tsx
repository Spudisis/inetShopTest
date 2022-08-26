import React from "react";
import s from "../sass/search.module.scss";
const Search: React.FC = () => {
  return (
    <div>
      <input placeholder="Начать поиск" className={s.blockSearch} />
    </div>
  );
};

export default Search;
