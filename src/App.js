import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  NavLink,
  Outlet,
} from "react-router-dom";

import GlobalStateProvider from "./config/GlobalState";

import Footer from "./molecules/footer/Footer";
import Header from "./molecules/header/Header";
import HomeFeed from "./pages/homeFeed/HomeFeed";
import Landing from "./pages/landing/Landing";
import Registration from "./pages/registration/Registration";
import LoginForm from "./molecules/loginForm/LoginForm";
import SignupForm from "./molecules/signupForm/SignupForm";

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <div className="main-scaffold">
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={<LoginForm/>} 
            />
            <Route
              path="/register"
              element={<SignupForm/>} 
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
