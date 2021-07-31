import "./App.css";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import BookDetail from "./components/BookDetail";
import Category from "./pages/Category";
import Shelves from "./pages/Shelves";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FloatingButton from "./components/FloatingButton";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import UserContext from "./context/userContext";
function App() {
  const history = useHistory();
  const { pathname } = useLocation();
  const [expTime, setExpTime] = useState();
  const handleSetExpTime = (time) => {
    setExpTime(time);
  };

  useEffect(() => {
    let timer;
    if (expTime !== undefined) {
      const expired = expTime * 1000 - Date.now();
      timer = setTimeout(() => {
        alert("TOKEN_EXPIRED.Please login again");
        sessionStorage.clear();
        setExpTime(undefined);
        history.push("/auth/login");
      }, expired);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [history, expTime]);

  return (
    <UserContext.Provider
      value={{
        expTime: expTime,
        setExpTime: handleSetExpTime,
      }}
    >
      <div className="App bg-white min-vh-100  border border-light px-0">
        {pathname === "/" && !sessionStorage.getItem("token") ? null : (
          <NavBar />
        )}
        <div className="content">
          <Route path="/user/:username/shelves" component={Shelves} />
          <Route path="/user/:username" exact component={Profile} />
          <Route
            path="/book/:id"
            render={() => <BookDetail key={Date.now()} />}
          />
          <Route path="/category/:category" component={Category} />
          <Route path="/auth/login" component={Login} />
          <Route path="/auth/register" component={Register} />
          <Route path="/" exact component={Home} />
        </div>
        {pathname === "/auth/login" ? null : pathname ===
          "/auth/register" ? null : (
          <FloatingButton />
        )}
      </div>
    </UserContext.Provider>
  );
}

export default App;
