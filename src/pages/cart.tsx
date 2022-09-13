import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/cart/cartItem";
import { clearCart, getCartItems } from "../redux/slices/cartSlice";
import { useAppDispatch } from "../redux/store";
import { Link, useNavigate } from "react-router-dom";
import s from "../sass/cart.module.scss";
import TotalInfoCart from "../components/cart/TotalInfoCart";
import SaleItems from "../components/main/saleItems";
import { fetchSaleMock, getSaleItemsSl, ItemsTypeSale } from "../redux/slices/itemsSaleSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { setBeforePage } from "../redux/slices/pageSlice";

const Cart = () => {
  const items = useSelector(getCartItems);
  const dispatch = useAppDispatch();
  const { saleItems }: ItemsTypeSale = useSelector(getSaleItemsSl);
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  let navigate = useNavigate();

  React.useEffect(() => {
    if (!user) {
      dispatch(setBeforePage("/catalog"));
      return navigate("/authorization");
    }
  }, [user]);
  React.useEffect(() => {
    saleItems.length === 0 && dispatch(fetchSaleMock());
  }, []);
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.namePage}>
          <h2 className={s.wrapper__cart}>Корзина</h2>
          {items.length !== 0 && (
            <button className={s.clearCart} onClick={() => dispatch(clearCart())}>
              Очистить корзину
            </button>
          )}
        </div>
        {items.length !== 0 ? (
          <div className={s.InfoCart}>
            <div>
              <CartItem />
            </div>
            <div className={s.totalInfo}>
              <TotalInfoCart />
            </div>
          </div>
        ) : (
          <div className={s.emptyCart}>
            <div className={s.emptyCartText}>Добавьте товаров для заказа!</div>
            <Link className={s.toCatalog} to="/catalog">
              За покупками
            </Link>
          </div>
        )}
      </div>
      <SaleItems />
    </>
  );
};

export default Cart;
