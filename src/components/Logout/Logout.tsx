import { useCookies } from "react-cookie";

const logout = () => {
  const [, , removeCookie] = useCookies(["token"]);

  removeCookie("token");
  localStorage.removeItem("user");
  console.log("logout");

  return { logout };
};

export default logout;
