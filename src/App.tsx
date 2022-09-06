import React from "react";
import Footer from "./components/section/footer";
import Header from "./components/section/header";
import Navigation from "./components/navigation";
import Main from "./pages/main";
import "./sass/App.scss";
import "./sass/normalize.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import Profile from "./pages/profile";
import Catalog from "./pages/catalog";
import Cart from "./pages/cart";
import NotFound from "./pages/notFound";
import { useAppDispatch } from "./redux/store";
import { setPageLocation } from "./redux/slices/pageSlice";

function App() {
  let location = useLocation();
  const dispath = useAppDispatch();
  React.useEffect(() => {
    dispath(setPageLocation(location.pathname));
  }, [location]);
  return (
    <>
      <div className="container">
        <header className="header">
          <Header />
        </header>
        <main className="main">
          <Navigation />
          <Routes>
            <Route path="" element={<Main />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
      <footer className="footer">
        <Footer />
      </footer>
    </>
  );
}

export default App;
