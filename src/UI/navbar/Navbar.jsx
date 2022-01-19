import { useContext } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { AuthContext } from "../../context";
import MyButton from "../button/MyButton";

function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const loqout = () => {
    setIsAuth(false);
    localStorage.removeItem("auth");
  };

  return (
    <div className="navbar">
      <MyButton onClick={loqout}>Вийти</MyButton>
      <div className="navbar__links">
        <Link to="/about">Про сайт</Link>
        <Link to="/posts">Пости</Link>
      </div>
    </div>
  );
}

export default Navbar;
