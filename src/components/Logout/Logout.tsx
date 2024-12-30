import { useCookies } from "react-cookie";

import useLocalstorage from "../../hook/useLocalstorage";

const logout = () => {
  const [, , removeCookie] = useCookies(["token"]);
  const { user, storageEventHandle } = useLocalstorage();

  removeCookie("token");
  localStorage.removeItem("user");
  storageEventHandle();
  console.log("user ==>", user);

  return { logout };
};

export default logout;
