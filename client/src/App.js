import "./App.css";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import BookDetail from "./components/BookDetail";
import Home from "./pages/Home";
function App() {
  return (
    <div className="App bg-light">
      <NavBar />
      <div className="content">
        <Route path="/books/:id" component={BookDetail} />
        <Route path="/" exact component={Home} />
      </div>
    </div>
  );
}

export default App;
