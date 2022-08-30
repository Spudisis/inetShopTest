import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/cart/cartItem";
import { clearCart, getCartItems } from "../redux/slices/cartSlice";
import { useAppDispatch } from "../redux/store";
import { Link } from "react-router-dom";
import s from "../sass/cart.module.scss";
import TotalInfoCart from "../components/cart/TotalInfoCart";
import BlocksInfoMain from "../components/main/BlocksInfoMain";
import SaleItems from "../components/main/saleItems";
import { fetchSaleMock, getSaleItemsSl, ItemsTypeSale } from "../redux/slices/itemsSaleSlice";

const Cart = () => {
  const items = useSelector(getCartItems);
  const dispatch = useAppDispatch();
  const { saleItems, loading }: ItemsTypeSale = useSelector(getSaleItemsSl);
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
