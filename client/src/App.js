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
import { useLocation } from "react-router-dom";
import { useState } from "react";
import UserContext from "./context/userContext";
function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);
  const handleSetCurrentUser = (user) => {
    setUser(user);
  };
  return (
    <UserContext.Provider value={{ user: user, setUser: handleSetCurrentUser }}>
      <div className="App bg-white min-vh-100  border border-light px-0">
        <NavBar />
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
