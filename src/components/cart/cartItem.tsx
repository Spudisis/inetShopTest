import React from "react";
import { useSelector } from "react-redux";
import {
  delItemCart,
  getCartItems,
  setItemsCart,
} from "../../redux/slices/cartSlice";
import s from "../../sass/CartItem.module.scss";
import trash from "../../assets/trash.svg";
import { useAppDispatch } from "../../redux/store";
interface propsItemCart {
  nameProd: string;
  id: string;
  price: number;
  title: string;
  count: number;
  weight: number;
  imageUrl: string;
  classProduct: string;
  saleProd: number;
  countCart: number;
}
const CartItem = () => {
  const items = useSelector(getCartItems);
  const dispatch = useAppDispatch();

  const addToCart = ({
    price,
    title,
    count,
    weight,
    imageUrl,
    classProduct,
    id,
    nameProd,
    saleProd,
    countCart,
  }: propsItemCart) => {
    if (count > countCart) {
      dispatch(
        setItemsCart({
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
      );
    }
  };
  const delToCart = (id: string, countCart: number) => {
    dispatch(delItemCart(id));
  };

  return (
    <>
      {items &&
        items.map((obj, index) => (
          <div key={index} className={s.block}>
            <div className={s.imgItem}>
              {obj.saleProd ? (
                <div className={s.saleBlockImg}>
                  <div className={s.saleBlockImg__percent}>%</div>
                </div>
              ) : (
                ""
              )}
              <img src={obj.imageUrl} alt={index + "img"} />
            </div>
            <div className={s.NameCount}>
              <div className={s.NameCount__Name}>
                {obj.nameProd}, {obj.title}, {obj.weight}&nbsp;
                {obj.classProduct === "water"
                  ? "Л"
                  : obj.classProduct === "milk"
                  ? "Л"
                  : "гр."}
              </div>
              <span className={s.NameCount__Count}>
                В&nbsp;наличии&nbsp;{obj.count}&nbsp;шт.
              </span>
            </div>
            <div>
              {obj.saleProd ? (
                <div>
                  <div className={s.salePrice}>
                    {Math.ceil((obj.price / 100) * obj.saleProd)}руб.
                  </div>
                  <div className={s.price}>{obj.price}руб.</div>
                </div>
              ) : (
                <div className={s.priceNonSale}>{obj.price} Руб.</div>
              )}
            </div>
            <div className={s.ItemCartCount}>
              <button
                onClick={() => {
                  delToCart(obj.id, obj.countCart);
                }}
              >
                {obj.countCart === 1 ? (
                  <img src={trash} alt="deleteCart" />
                ) : (
                  "-"
                )}
              </button>
              <div className={s.chooseCount}>{obj.countCart}</div>
              <button onClick={() => addToCart(obj)}>+</button>
            </div>
            <div className={s.priceTotal}>
              <div>
                {obj.saleProd !== 0
                  ? Math.ceil((obj.price / 100) * obj.saleProd) * obj.countCart
                  : obj.price * obj.countCart}{" "}
                руб.
              </div>
              <div>{obj.countCart} шт</div>
            </div>
          </div>
        ))}
    </>
  );
};

export default CartItem;
