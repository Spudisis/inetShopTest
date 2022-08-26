import React from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import Navigation from "./components/navigation";
import Main from "./pages/main";
import "./sass/App.scss";
import "./sass/normalize.scss";
import { Routes, Route } from "react-router-dom";
import Profile from "./pages/profile";
import Catalog from "./pages/catalog";

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
        </Routes>
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
