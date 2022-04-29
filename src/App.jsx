import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import TopBar from "@/components/TopBar";
import LeftMenu from "./components/LeftMenu";
import Home from "./components/Home";
import LeftMenuProvider from "./providers/LeftMenuProvider";

const App = () => {
  return (
    <BrowserRouter>
      <LeftMenuProvider>
        <TopBar />
        <LeftMenu />
      </LeftMenuProvider>
      <Routes>
        <Route exact path={"/"} element={<Navigate to="/app" />} />
        <Route path={"/app"} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
