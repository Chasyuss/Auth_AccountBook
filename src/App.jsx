import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import GlobalStyle from './styles/GlobalStyle';
import Login from "./pages/Login";
import Join from "./pages/Join";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import useBearsStore from "./zustand/bearsStore";
import { useEffect } from "react";


const App = () => {
  const { checkToken, isAuthenticated } = useBearsStore();

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        {isAuthenticated && <Route path="/" element={<Layout />} />}
        {/* 인증되어야지만 home 으로 넘어가기 */}
        <Route index element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;