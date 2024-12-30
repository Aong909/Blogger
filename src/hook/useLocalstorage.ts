import { useEffect, useState } from "react";

const useLocalstorage = () => {
  const [user, setUser] = useState<string | null>(null);
  console.log("USER ===>", user);

  useEffect(() => {
    //handle storage
    setUser(localStorage.getItem("user") || null);

    window.addEventListener("storage", storageEventHandle, false);
  }, [localStorage.getItem("user")]);

  const storageEventHandle = () => {
    setUser(localStorage.getItem("user") || null);
  };

  const getUser = () => {
    return localStorage.getItem("User") || null;
  };

  return { user, storageEventHandle, getUser };
};

export default useLocalstorage;
