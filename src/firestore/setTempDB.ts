import React from "react";
import { firestore } from "../Firebase";

export const setTempDB = ({ uid, email }: any) => {
  firestore.collection("itemsUsers").doc(uid).set({
    likeItems: {},
    uid: uid,
    items: {},
  });
};
