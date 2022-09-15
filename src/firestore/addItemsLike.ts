import React from "react";
import { useSelector } from "react-redux";
import { firestore } from "../Firebase";
import { getCartItems } from "../redux/slices/cartSlice";
export const AddItemsLike = ({ uid, itemsLike }: any) => {
    console.log("addLiek");
  firestore.collection("itemsUsers").doc(uid).update({
    likeItems: { itemsLike },
    uid: uid,
  });
};
