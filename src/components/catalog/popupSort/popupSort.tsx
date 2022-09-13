import React from "react";
import { addAscdesc, addFilter } from "../../../redux/slices/filterSlice";
import { useAppDispatch } from "../../../redux/store";
import s from "./popupSort.module.scss";
const sortingParams = [
  {
    name: "По цене",
    originalName: "price",
  },
  {
    name: "По алфавиту",
    originalName: "name",
  },
  {
    name: "По количеству",
    originalName: "count",
  },
];
export type PopupClick = MouseEvent & {
  path: Node[];
};
const PopupSort = React.memo(() => {
  const popup = React.useRef<HTMLDivElement>(null);
  const [rotateArrow, setRotateArrow] = React.useState(s.ascDesc);
  const [visible, isVisible] = React.useState(false);
  const [sortingParam, setSortingParam] = React.useState("По цене");
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const handleClickOut = (e: MouseEvent) => {
      const _event = e as PopupClick;
      if (popup.current && !_event.path.includes(popup.current)) {
        isVisible(false);
      }
    };
    document.body.addEventListener("click", handleClickOut);
    return () => document.body.removeEventListener("click", handleClickOut);
  }, []);
  React.useEffect(() => {
    sortingParams.map((obj) => {
      obj.name === sortingParam && dispatch(addFilter(obj.originalName));
    });
  }, [sortingParam]);

  const setAscDesc = () => {
    rotateArrow === s.ascDesc ? setRotateArrow(s.ascDescRotate) : setRotateArrow(s.ascDesc);
    dispatch(addAscdesc());
  };
  const changeSortParam = (name: string) => {
    setSortingParam(name);
    isVisible(false);
  };
  return (
    <div className={s.mainPopup} ref={popup}>
      <div className={s.setFilter}>
        <button className={s.sortingParam} onClick={() => isVisible(!visible)}>
          {sortingParam}&nbsp;
        </button>
        <button className={s.arrow} onClick={() => setAscDesc()}>
          <div className={rotateArrow}>&gt;</div>
        </button>
      </div>
      {visible && (
        <div className={s.popup}>
          {sortingParams.map((obj, index) => (
            <div key={"sorting" + index} className={s.setFilterPopup} onClick={() => changeSortParam(obj.name)}>
              <b>{obj.name}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default PopupSort;
