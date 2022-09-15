import { useSelector } from "react-redux";
import firebase from "../Firebase";
import { setItemFromDB } from "../redux/slices/cartSlice";
import { addLikeProductDB } from "../redux/slices/likeItemsSlice";
import { getAuthStatus, setAuthStatus } from "../redux/slices/profile";

export const CheckCartItemsDB = ({ user, dispatch, cartItem, itemsLike }: any) => {
  if (user) {
    firebase
      .firestore()
      .collection("itemsUsers")
      .doc(user.uid)
      .get()
      .then((queryRes) => {
        console.log("getfull");
        dispatch(setItemFromDB(queryRes.data()));
        dispatch(addLikeProductDB(queryRes.data()));
      });
  }
};
