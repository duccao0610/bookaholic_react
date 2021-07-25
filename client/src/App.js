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
function App() {
  const { pathname } = useLocation();

  return (
    <div className="App bg-white min-vh-100  border border-light px-0">
      <NavBar />
      <div className="content">
        <Route path='/profile/:id/shelves' component={Shelves} />
        <Route path='/profile/:id' component={Profile} />
        <Route
          path="/books/:id"
          render={() => <BookDetail key={Date.now()} />}
        />
        <Route path="/categories/:category" component={Category} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Home} />
      </div>
      {pathname === "/login" ? null : pathname === "/register" ? null : (
        <FloatingButton />
      )}
    </div>
  );
}

export default App;
