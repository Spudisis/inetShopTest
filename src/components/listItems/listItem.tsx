import React from "react";

import s from "./listItem.module.scss";
import ButtonBuy from "../buttons/ButtonBuy/buttonBuy";
import LikeButton from "../buttons/likeButton/likeButton";
import { CalcSalePrice } from "./CalcSalePrice";

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

const ListItem: React.FC<propsItem> = ({
  nameProd,
  id,
  price,
  title,
  count,
  weight,
  imageUrl,
  classProduct,
  saleProd,
}) => {
  const [priceSale, setPriceSale] = React.useState(0);

  React.useEffect(() => {
    saleProd && setPriceSale(CalcSalePrice({ price, saleProd }));
  }, []);

  return (
    <div className={s.container}>
      <div className={s.img}>
        {saleProd ? (
          <div className={s.saleBlockImg}>
            <div className={s.saleBlockImg__percent}>{saleProd}%</div>
          </div>
        ) : (
          ""
        )}
        <LikeButton
          id={id}
          price={price}
          title={title}
          count={count}
          weight={weight}
          imageUrl={imageUrl}
          classProduct={classProduct}
          nameProd={nameProd}
          saleProd={saleProd}
          key={id + "like"}
        />
        <img src={imageUrl} alt="product" />
      </div>
      <div className={s.info}>
        <div className={s.info__priceCount}>
          <div className={s.info__priceCount__count}>В наличии {count} шт.</div>
          <div className={s.info__priceCount__count}>{saleProd ? priceSale : price} руб.</div>
        </div>
        <div className={s.title}>
          {nameProd}, {title}, {weight}&nbsp;
          {classProduct === "water" ? "Л" : classProduct === "milk" ? "Л" : classProduct === "oil" ? "Л" : "гр."}
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
          <ButtonBuy
            id={id}
            price={price}
            title={title}
            count={count}
            weight={weight}
            imageUrl={imageUrl}
            classProduct={classProduct}
            nameProd={nameProd}
            saleProd={saleProd}
          />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
