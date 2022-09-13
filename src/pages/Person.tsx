import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Person = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  let navigate = useNavigate();
  React.useEffect(() => {
    !user && navigate("/authorization");
  }, [user]);

  return (
    <div>
      <div>{user?.email}</div>
      <div>{user?.uid}</div>
      <div></div>
      <button
        onClick={() => {
          signOut(auth);
        }}
      >
        логаут
      </button>
    </div>
  );
};

export default Person;
