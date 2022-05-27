import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login, Register, Forgotpass, Home, Emailview, Changepassword } from './pages';
import history from './history';
import './App.css';

function App() {
  return (
    <div className="app">
      <Router history={history}>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/forgotpass" element={<Forgotpass />}></Route>
          <Route path="/profile" element={<Home />}></Route>
          <Route path="/emailview" element={<Emailview />}></Route>
          <Route path="/updatedpass" element={<Changepassword />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
