import React from "react";
import { propsItem } from "../listItem";
import like from "../../assets/like.png";
import s from "../../sass/listItem.module.scss";
import { useSelector } from "react-redux";
import { addLikeProduct, deleteLikeProduct, getItemsLike } from "../../redux/slices/likeItemsSlice";
import { useAppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { getPage, setBeforePage } from "../../redux/slices/pageSlice";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
const LikeButton: React.FC<propsItem> = ({
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

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const [style, setStyle] = React.useState(like === "yes" ? s.likeActive : s.like);

  const dispatch = useAppDispatch();
  const itemsLike: propsItem[] = useSelector(getItemsLike);
  
  const onClickLike = (prop: propsItem) => {
    if (!user) {
      dispatch(setBeforePage("/catalog"));
      return navigate("/authorization");
    }
    if (style === s.like) {
      setStyle(s.likeActive);
      dispatch(addLikeProduct(prop));
    } else {
      setStyle(s.like);
      dispatch(deleteLikeProduct(prop.id));
    }
  };

  React.useEffect(() => {
    itemsLike.length && itemsLike.map((obj) => obj.id === id && setStyle(s.likeActive));
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
