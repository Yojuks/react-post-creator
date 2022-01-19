import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter } from "react-router-dom";
import "../src/styles/App.css";
import Navbar from "./UI/navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setIsloading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, isloading }}>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
