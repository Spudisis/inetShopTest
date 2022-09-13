import React from "react";
import { useSelector } from "react-redux";
import { delItemCart, getCartItems, ItemCart, setItemsCart } from "../../../redux/slices/cartSlice";
import { useAppDispatch } from "../../../redux/store";
import { propsItem } from "../../listItems/listItem";
import s from "./buttonBuy.module.scss";
import { useNavigate } from "react-router-dom";
import { setBeforePage } from "../../../redux/slices/pageSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
const ButtonBuy: React.FC<propsItem> = ({
  price,
  title,
  count,
  weight,
  imageUrl,
  classProduct,
  id,
  nameProd,
  saleProd,
}) => {
  let navigate = useNavigate();

  const [haveCart, setHaveCart] = React.useState(false);
  const [countCart, setCountCart] = React.useState(0);

  const dispatch = useAppDispatch();
  const cartItem: ItemCart[] = useSelector(getCartItems);

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

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
  const addToCart = ({ price, title, count, weight, imageUrl, classProduct, id, nameProd, saleProd }: propsItem) => {
    if (!user) {
      dispatch(setBeforePage("/catalog"));
      return navigate("/authorization");
    }
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
