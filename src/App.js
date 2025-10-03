import "./App.css";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import GlobalStateProvider from "./config/GlobalState";

import Footer from "./molecules/footer/Footer";
import Header from "./molecules/header/Header";
import HomeFeed from "./pages/homeFeed/HomeFeed";
import Landing from "./pages/landing/Landing";
import LoginForm from "./molecules/loginForm/LoginForm";
import SignupForm from "./molecules/signupForm/SignupForm";
import UpdateMyInfo from "./molecules/updateForm/UpdateMyInfo";

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
            <Route
              path = "/home"
              element = {<HomeFeed/>}
            />
            <Route 
              path= "/update"
              element = {<UpdateMyInfo/>}
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
