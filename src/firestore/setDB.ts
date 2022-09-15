import React from "react";
import { firestore } from "../Firebase";

export const SetDB = ({ uid, email }: any) => {
  firestore.collection("users").doc(uid).set({
    uid: uid,
    email: email,
    first_name: "",
    last_name: "",
    middle_name: "",
    birthday: "",
  });
};
