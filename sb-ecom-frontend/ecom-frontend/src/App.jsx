import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/home/Home";
import Products from "./components/products/Products";
import NavBar from "./components/shared/NavBar";
import Cart from "./components/cart/Cart";

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
           <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
