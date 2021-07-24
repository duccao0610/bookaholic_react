import "./App.css";
import { Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import BookDetail from "./components/BookDetail";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  //
  return (
    <div className="App bg-white min-vh-100 position-relative">
      <NavBar />
      <div className="content" style={{ marginTop: 50 }}>
        <Route path="/profile" exact component={Profile} />
        {/* <Route path="/books/:id" component={BookDetail} /> */}
        <Route
          path="/books/:id"
          render={() => <BookDetail key={Date.now()} />}
        />
        <Route path="/categories/:category" component={Category} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Home} />
      </div>
    </div>
  );
}

export default App;
