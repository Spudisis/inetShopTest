import React from "react";
import { addFilterView, addType } from "../redux/slices/filterSlice";
import { changeParamSale } from "../redux/slices/sortSlice";
import { useAppDispatch } from "../redux/store";
import s from "../sass/filters.module.scss";
const Filters = () => {
  const dispatch = useAppDispatch();
  const [saleYes, setSaleYes] = React.useState(false);
  const id = React.useId();
  const SendFilterType = (type: string) => {
    dispatch(addType(type));
  };
  const ChangeClassProduct = (classProduct: string) => {
    dispatch(addFilterView(classProduct));
  };

  React.useEffect(() => {
    dispatch(changeParamSale(saleYes));
  });

  return (
    <div className={s.Wrapper}>
      <div className={s.filtersParams}>
        <h3 className={s.firstBlockParam}>Особенности</h3>
        <div>
          <input type="checkbox" id={id + "1"} />
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
      <div className={s.filtersParams}>
        <h3 className={s.secondBlockParam}>Каталог</h3>
        <div>
          <h4
            className={s.firstThemeCatalog}
            onClick={() => SendFilterType("Кулинария")}
          >
            Кулинария
          </h4>
          <ol>
            <li onClick={(e) => ChangeClassProduct("backery")}>Выпечка</li>
            <li>Пиццы</li>
            <li>Гриль-меню</li>
            <li>Салаты</li>
            <li>Супы</li>
            <li>Горячие блюда</li>
            <li>Десерты</li>
          </ol>
        </div>
        <div>
          <h4 onClick={() => SendFilterType("Супермаркет")}>Супермаркет</h4>
          <ol>
            <li>Вода и напитки</li>
            <li>Молоко, масло и яйца</li>
            <li>Снэки и сухофрукты</li>
            <li>Кофе, чай и сладости</li>
            <li>Макароны и крупы</li>
            <li>Хлеб и выпечка</li>
            <li>Масло, соусы и специи</li>
            <li>Консервы и соления</li>
          </ol>
        </div>
        <div onClick={() => SendFilterType("Заморозка")}>
          <h4>Заморозка</h4>
          <ol>
            <li>Пельмени, вареники и равиоли</li>
            <li>Хинкали и манты</li>
            <li>Полуфабрикаты</li>
            <li>Замороженные овощи</li>
          </ol>
        </div>
        <div>
          <h4 onClick={() => SendFilterType("Другое")}>Другое</h4>
          <ol>
            <li>Красота и гигиена</li>
            <li>Стирка и уборка</li>
            <li>Полезные мелочи</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Filters;
