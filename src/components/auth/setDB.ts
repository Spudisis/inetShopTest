import React from "react";
import { firestore } from "../../Firebase";

export const SetDB = ({ accessToken, uid, email }: any) => {
  firestore.collection("users").doc(uid).set({
    accessToken: accessToken,
    uid: uid,
    email: email,
  });
};
