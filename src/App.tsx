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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Navbar setLocalUser={storageEventHandle} />
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
      </div>
    </BrowserRouter>
  );
};

export default App;
