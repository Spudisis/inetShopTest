import React from "react";
import { addFilterView, addType } from "../../redux/slices/filterSlice";
import { changeParamSale, gerSortData } from "../../redux/slices/sortSlice";
import { useAppDispatch } from "../../redux/store";
import s from "../../sass/filters.module.scss";
import ItemForFilters from "../../assets/Json/ItemForFilters.json";
import { useSelector } from "react-redux";
import { clearCatalogPage } from "../../redux/slices/pageSlice";

const Filters = React.memo(() => {
  const dispatch = useAppDispatch();
  const { sale } = useSelector(gerSortData);
  const [saleYes, setSaleYes] = React.useState(sale);
  const id = React.useId();
  const SendFilterType = (type: string) => {
    dispatch(addType(type));
    ItemForFilters.map((elem) => {
      elem.type === type && dispatch(() => ChangeClassProduct(elem.class, elem.classForPerson));
    });
    dispatch(clearCatalogPage());
  };
  const ChangeClassProduct = (classT: string, classForPerson: string) => {
    const classAdd = { class: classT, classForPerson: classForPerson };
    dispatch(addFilterView(classAdd));
    dispatch(clearCatalogPage());
  };

  React.useEffect(() => {
    dispatch(changeParamSale(saleYes));
  }, [saleYes]);

  React.useEffect(() => {
    setSaleYes(sale);
  }, [sale]);
  const renderFilterParams = (type: string) => {
    return ItemForFilters.map(
      (obj, index) =>
        obj.type === type && (
          <li onClick={() => ChangeClassProduct(obj.class, obj.classForPerson)} key={index + type + obj.class}>
            {obj.classForPerson}
          </li>
        )
    );
  };

  return (
    <div className={s.Wrapper}>
      <div className={s.filtersParams}>
        <h3 className={s.firstBlockParam}>Особенности</h3>
        <div>
          <input type="checkbox" id={id + "1"} checked={saleYes} onChange={() => {}} />
          <label htmlFor={id + "1"} onClick={() => setSaleYes(!saleYes)}>
            Со скидкой
          </label>
        </div>
        <div>
          <input type="checkbox" id={id + "2"} />
          <label htmlFor={id + "2"}>Доставка сегодня</label>
        </div>
        <div>
          <input type="checkbox" id={id + "3"} />
          <label htmlFor={id + "3"}>Продукция от "Ильинского"</label>
        </div>
      </div>
      <h3 className={s.secondBlockParam}>Каталог</h3>
      <div className={s.filtersParams}>
        <div className={s.BlockTypes}>
          <div>
            <h4 className={s.firstThemeCatalog} onClick={() => SendFilterType("Кулинария")}>
              Кулинария
            </h4>
            <ol>{renderFilterParams("Кулинария")}</ol>
          </div>
          <div>
            <h4 onClick={() => SendFilterType("Супермаркет")}>Супермаркет</h4>
            <ol>{renderFilterParams("Супермаркет")}</ol>
          </div>
        </div>
        <div className={s.BlockTypes}>
          <div>
            <h4 onClick={() => SendFilterType("Заморозка")}>Заморозка</h4>
            <ol>{renderFilterParams("Заморозка")}</ol>
          </div>
          <div>
            <h4 onClick={() => SendFilterType("Другое")}>Другое</h4>
            <ol>{renderFilterParams("Другое")}</ol>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Filters;
