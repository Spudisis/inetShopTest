import React from "react";
import { useSelector } from "react-redux";
import { firestore } from "../Firebase";
import { getCartItems } from "../redux/slices/cartSlice";
export const AddItems = ({ uid, cartItem }: any) => {
  console.log("addCart");
  firestore.collection("itemsUsers").doc(uid).update({
    items: { cartItem },
    uid: uid,
  });
};
