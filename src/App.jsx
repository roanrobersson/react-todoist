import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Home from "./components/Home";
import { AUTH_STATE } from "./configs/env.js";
import AuthModal from "./components/AuthModal";
import { FETCH_TOKEN } from "./state/slices/authSlice";
import { redirectToAuth } from "@/lib/util.js";
import { AUTHORIZED } from "@/state/slices/authSlice.js";
import LoadingModal from "./components/LoadingModal";
import LinearLoading from "./components/LinearLoading";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const [authModalIsOpen, setAuthModalIsOpen] = useState(false);
  const authState = useSelector((state) => state.auth);
  const commonState = useSelector((state) => state.common);
  const projects = useSelector((state) => state.projects);
  const tasks = useSelector((state) => state.tasks);
  const isLoading = projects.loading || tasks.loading;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (token) {
      dispatch(AUTHORIZED(token));
      return;
    }

    // state != AUTH_STATE is used to check if the response has been tampered with by a third party
    if (
      token == null &&
      (state == null || code == null || state != AUTH_STATE)
    ) {
      redirectToAuth(true);
      return;
    }

    if (token == null && state && code) {
      dispatch(FETCH_TOKEN(code));
      return;
    }
  }, []);

  useEffect(() => {
    setAuthModalIsOpen(!authState.token);
  }, [authState.token]);

  const handleRetryClick = () => {
    redirectToAuth(false);
  };

  const authModalTitle = () => {
    if (authState.error) return "Erro";
    else if (authState.loading) return "Autenticando...";
    else return "Redirecionando para a página de login...";
  };

  return (
    <>
      <Routes>
        <Route exact path={"/"} element={<Navigate to="/app/projects" />} />
        <Route path={"/app"} element={<Navigate to="/app/projects" />} />
        <Route path={"/app/projects/"} element={<Home />} />
        <Route path={"/app/projects/:projectId"} element={<Home />} />
        <Route path={"*"} element={<Navigate to={"/app/projects"} />} />
      </Routes>
      <AuthModal
        isOpen={authModalIsOpen}
        title={authModalTitle()}
        showRetryButton={authState.error}
        onRetryClick={handleRetryClick}
      />
      <LoadingModal isOpen={commonState.initialData.loading} />
      {isLoading && <LinearLoading />}
    </>
  );
};

export default App;
