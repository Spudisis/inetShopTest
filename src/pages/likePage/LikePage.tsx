import React from "react";
import { useSelector } from "react-redux";
import ListItem, { propsItem } from "../../components/listItems/listItem";
import { useAppDispatch } from "../../redux/store";
import s from "./LikePage.module.scss";
import likeActive from "../../assets/activeLike.png";
import { Item } from "../../redux/slices/itemsSlice";
import { getItemsLike } from "../../redux/slices/likeItemsSlice";

const LikePage = () => {
  const dispatch = useAppDispatch();
  const itemsLike: propsItem[] = useSelector(getItemsLike);

  
  return (
    <>
      {itemsLike.length !== 0 ? (
        <div className={s.listLikes}>
          {itemsLike.map((obj) => (
            <ListItem
              id={obj.id}
              price={obj.price}
              title={obj.title}
              count={obj.count}
              weight={obj.weight}
              imageUrl={obj.imageUrl}
              classProduct={obj.classProduct}
              nameProd={obj.nameProd}
              saleProd={obj.saleProd}
              key={obj.id + "like"}
            />
          ))}
        </div>
      ) : (
        <div className={s.voidLike}>
          Добавьте любимые товары в избранное
          <img src={likeActive} alt="likeActive" />
        </div>
      )}
    </>
  );
};

export default LikePage;
