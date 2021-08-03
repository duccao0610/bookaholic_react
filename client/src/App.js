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
import Footer from "./components/Footer";
import Alert from "./components/Alert";
function App() {
  const history = useHistory();
  const { pathname } = useLocation();
  const expTimeTemp = sessionStorage.getItem("expTime");
  const [expTime, setExpTime] = useState(expTimeTemp ? expTimeTemp : undefined);
  const currentTemp = JSON.parse(sessionStorage.getItem("currentUser"));
  const [currentUser, setCurrentUser] = useState(currentTemp ? {} : null);
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertStatus, setAlertStatus] = useState();
  const [alertDetail, setAlertDetail] = useState();

  const showAlert = (type, status, detail) => {
    setAlertVisibility(true);
    setAlertType(type);
    setAlertStatus(status);
    setAlertDetail(detail);
  };
  const alertClose = (status) => {
    setAlertVisibility(false);
    if (status === "fail") {
      sessionStorage.clear();
      setExpTime(undefined);
      setCurrentUser(null);
      history.push("/auth/login");
    }
  };
  const handleSetExpTime = (time) => {
    setExpTime(time);
  };

  useEffect(() => {
    let loadingData = true;
    const current = JSON.parse(sessionStorage.getItem("currentUser"));
    if (current) {
      fetch(`http://localhost:5000/user/id/${current.id}`)
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson.message === true && loadingData) {
            console.log("CURRENT", resJson);
            setCurrentUser(resJson.user[0]);
          }
        });
    }
    return () => {
      loadingData = false;
    };
  }, []);

  const handleUpdateCurrentUser = (userId) => {
    fetch(`http://localhost:5000/user/id/${userId}`)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.message === true) {
          console.log("CURRENT", resJson);
          setCurrentUser(resJson.user[0]);
        }
      });
  };

  useEffect(() => {
    let timer;
    if (expTime !== undefined) {
      const expired = expTime * 1000 - Date.now();
      timer = setTimeout(() => {
        showAlert("logout", "fail");
      }, expired);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [expTime, history]);

  return (
    <UserContext.Provider
      value={{
        setCurrentUser: setCurrentUser,
        currentUser: currentUser,
        handleUpdateCurrentUser: handleUpdateCurrentUser,
        expTime: expTime,
        setExpTime: handleSetExpTime,
      }}
    >
      <div className="App bg-white min-vh-100  border border-light px-0">
        {pathname === "/" && !sessionStorage.getItem("token") ? null : (
          <NavBar />
        )}
        <div className="content">
          <Alert
            alertClose={alertClose}
            alertVisibility={alertVisibility}
            alertType={alertType}
            alertStatus={alertStatus}
            alertDetail={alertDetail}
          />
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
      <Footer />
    </UserContext.Provider>
  );
}

export default App;
