import React from "react";
import Footer from "./components/section/footer";
import Header from "./components/section/header";
import Navigation from "./components/navigation";
import Main from "./pages/main";
import "./sass/App.scss";
import "./sass/normalize.scss";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Catalog from "./pages/catalog";
import Cart from "./pages/cart";
import NotFound from "./pages/notFound";

function App() {
  return (
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
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
