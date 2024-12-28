import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Bookmark from "./pages/Bookmark";
import Following from "./pages/Following";
import { useEffect, useState } from "react";
import Personal from "./pages/Personal";
import Content from "./pages/Content";

const App = () => {
  const [cookie] = useCookies(["token"]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    //handle storage
    setUser(localStorage.getItem("user") || null);

    window.addEventListener("storage", storageEventHandle, false);
  }, [localStorage.getItem("user")]);

  const storageEventHandle = () => {
    setUser(localStorage.getItem("user") || null);
  };

  // if (!user) {
  //   console.log("user = ", user);
  //   console.log("token = ", cookie.token);
  //   if (cookie.token) {
  //     return null;
  //   } else {
  //     return <Login setUser={storageEventHandle} />;
  //   }
  // }

  if (!cookie.token) {
    return <Login setUser={storageEventHandle} />;
  } else {
    if (!user) {
      return <Login setUser={storageEventHandle} />;
    }
  }

  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <Routes>
        <Route path="/post" element={<Editor />} />
      </Routes>
      <Routes>
        <Route path="/edit/:id" element={<Editor />} />
      </Routes>

      <Routes>
        <Route path="/bookmark" element={<Bookmark />} />
      </Routes>
      <Routes>
        <Route path="/following" element={<Following />} />
      </Routes>
      <Routes>
        <Route path="/personal/:id" element={<Personal />} />
      </Routes>
      <Routes>
        <Route path="/content/:id" element={<Content />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
