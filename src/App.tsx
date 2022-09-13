import React from "react";
import Footer from "./components/section/footer/footer";
import Header from "./components/section/header/header";
import Navigation from "./components/navTypeItems/navigation";
import Main from "./pages/main/main";
import "./sass/App.scss";
import "./sass/normalize.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import Profile from "./pages/profile/profile";
import Catalog from "./pages/catalog/catalog";
import Cart from "./pages/cart/cart";
import NotFound from "./pages/notFound/notFound";
import { useAppDispatch } from "./redux/store";
import { setPageLocation } from "./redux/slices/pageSlice";
import Authorization from "./pages/authorization/authorization";

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
            <Route path="/authorization" element={<Authorization />} />
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
