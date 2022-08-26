import React from "react";
import s from "../sass/listItem.module.scss";
import like from "../assets/like.png";
import { useAppDispatch } from "../redux/store";
import {
  addLikeProduct,
  deleteLikeProduct,
  getItemsLike,
} from "../redux/slices/likeItems";
import { useSelector } from "react-redux";

export interface propsItem {
  nameProd: string;
  id: string;
  price: number;
  title: string;
  count: number;
  weight: number;
  imageUrl: string;
  classProduct: string;
  saleProd: number;
}

const ListItem = ({
  nameProd,
  id,
  price,
  title,
  count,
  weight,
  imageUrl,
  classProduct,
  saleProd,
}: propsItem) => {
  const itemsLike: propsItem[] = useSelector(getItemsLike);
  const dispatch = useAppDispatch();

  const [style, setStyle] = React.useState(
    like === "yes" ? s.likeActive : s.like
  );
  const [priceSale, setPriceSale] = React.useState(0);

  React.useEffect(() => {
    itemsLike.length &&
      itemsLike.map((obj) => obj.id === id && setStyle(s.likeActive));
    saleProd && setPriceSale(calcSalePrice());
  }, []);

  const calcSalePrice = () => {
    return Math.ceil((price / 100) * (100 - saleProd));
  };

  const onClickLike = (prop: propsItem) => {
    if (style === s.like) {
      setStyle(s.likeActive);
      dispatch(addLikeProduct(prop));
    } else {
      setStyle(s.like);
      dispatch(deleteLikeProduct(prop.id));
    }
  };
  return (
    <div className={s.container}>
      <div className={s.img}>
        {saleProd ? (
          <div className={s.saleBlockImg}>
            <div className={s.saleBlockImg__percent}>%</div>
          </div>
        ) : (
          ""
        )}
        <button
          className={style}
          onClick={() =>
            onClickLike({
              price,
              title,
              count,
              weight,
              imageUrl,
              classProduct,
              id,
              nameProd,
              saleProd,
            })
          }
        ></button>
        <img src={imageUrl} alt="product" />
      </div>
      <div className={s.info}>
        <div className={s.info__priceCount}>
          <div className={s.info__priceCount__count}>В наличии {count} шт.</div>
          <div className={s.info__priceCount__count}>
            {saleProd ? priceSale : price} руб.
          </div>
        </div>
        <div className={s.title}>
          {nameProd}, {title}, {weight}&nbsp;
          {classProduct === ("water" || "milk") ? "Л" : "гр."}
        </div>
        <div className={s.bottomCard}>
          <div className={s.priceBottom}>
            {saleProd ? (
              <div className={s.saleBlock}>
                <div className={s.salePrice}>{priceSale}руб.</div>
                <div className={s.price}>{price}руб.</div>
              </div>
            ) : (
              price + " Руб."
            )}
          </div>
          <button className={s.button}>В корзину</button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
