import React from "react";
import { propsItem } from "../listItem";
import like from "../../assets/like.png";
import s from "../../sass/listItem.module.scss";
import { useSelector } from "react-redux";
import {
  addLikeProduct,
  deleteLikeProduct,
  getItemsLike,
} from "../../redux/slices/likeItems";
import { useAppDispatch } from "../../redux/store";
const LikeButton = ({
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
  const [style, setStyle] = React.useState(
    like === "yes" ? s.likeActive : s.like
  );
  const dispatch = useAppDispatch();
  const itemsLike: propsItem[] = useSelector(getItemsLike);
  const onClickLike = (prop: propsItem) => {
    if (style === s.like) {
      setStyle(s.likeActive);
      dispatch(addLikeProduct(prop));
    } else {
      setStyle(s.like);
      dispatch(deleteLikeProduct(prop.id));
    }
  };
  React.useEffect(() => {
    itemsLike.length &&
      itemsLike.map((obj) => obj.id === id && setStyle(s.likeActive));
  }, []);
  return (
    <>
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
    </>
  );
};

export default LikeButton;
