import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Bookmark from "./pages/Bookmark";
import Following from "./pages/Following";
import Personal from "./pages/Personal";
import Content from "./pages/Content";
import useLocalstorage from "./hook/useLocalstorage";
import { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import "./style.css";

const App = () => {
  const { user, storageEventHandle } = useLocalstorage();

  // if (!cookie.token) {
  //   return <Login setUser={storageEventHandle} />;
  // } else {
  //   if (!user) {
  //     return <Login setUser={storageEventHandle} />;
  //   }
  // }

  useEffect(() => {
    console.log("in Use Effect");
  }, [localStorage.getItem("user")]);

  if (!user) {
    return <Login setUser={storageEventHandle} />;
  }

  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Navbar setLocalUser={storageEventHandle} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Editor />} />
            <Route path="/edit/:id" element={<Editor />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/following" element={<Following />} />
            <Route path="/personal/:id" element={<Personal />} />
            <Route path="/content/:id" element={<Content />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
