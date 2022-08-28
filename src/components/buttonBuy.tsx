import React from "react";
import { useSelector } from "react-redux";
import {
  delItemCart,
  getCartItems,
  ItemCart,
  setItemsCart,
} from "../redux/slices/cartSlice";
import { useAppDispatch } from "../redux/store";
import { propsItem } from "./listItem";
import s from "../sass/button.module.scss";

const ButtonBuy = ({
  price,
  title,
  count,
  weight,
  imageUrl,
  classProduct,
  id,
  nameProd,
  saleProd,
}: propsItem) => {
  const [haveCart, setHaveCart] = React.useState(false);
  const [countCart, setCountCart] = React.useState(0);
  const dispatch = useAppDispatch();
  const cartItem: ItemCart[] = useSelector(getCartItems);

  React.useEffect(() => {
    changeCartCatalog();
  }, [cartItem]);

  const changeCartCatalog = () => {
    const haveCartCheck = cartItem.filter((obj) => obj.id === id);
    const countCartItem = haveCartCheck.map((obj) => obj.countCart);
    if (countCartItem.length !== 0 && countCartItem[0] !== 0) {
      setCountCart(countCartItem[0]);
      setHaveCart(true);
    }
  };

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
  }: propsItem) => {
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

  const delToCart = () => {
    if (countCart === 1) {
      dispatch(delItemCart(id));
      setHaveCart(false);
    } else {
      dispatch(delItemCart(id));
    }
  };

  return (
    <>
      {!haveCart ? (
        <button
          className={s.button}
          onClick={() =>
            addToCart({
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
        >
          В корзину
        </button>
      ) : (
        <div className={s.counterBuy}>
          <button
            className={s.changeCounter}
            onClick={() => {
              delToCart();
            }}
          >
            -
          </button>
          <span>{countCart}</span>
          <button
            className={s.changeCounter}
            onClick={() =>
              addToCart({
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
          >
            +
          </button>
        </div>
      )}
    </>
  );
};

export default ButtonBuy;
