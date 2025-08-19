import "./App.css";
import Footer from "./molecules/footer/Footer";
import Header from "./molecules/header/Header";
import HomeFeed from "./pages/homeFeed/HomeFeed";
import Landing from "./pages/landing/Landing";
import Registration from "./pages/registration/Registration";

function App() {
  return (
    <div className="main-scaffold">
      <Header />
      {/* <Landing/>
      <Registration /> */}
      <HomeFeed/>
      <Footer />
    </div>
  );
}

export default App;
