import "./App.css";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import BookDetail from "./components/BookDetail";
import Category from "./pages/Category";
function App() {
  //
  return (
    <div className="App bg-light min-vh-100 position-relative mt-5 ">
      <NavBar />
      <div className="content pt-1">
        <Route path="/profile" exact component={Profile} />
        <Route path="/books/:id" component={BookDetail} />
        <Route path="/categories/:category" component={Category} />
        <Route path="/" exact component={Home} />
      </div>
    </div>
  );
}

export default App;
