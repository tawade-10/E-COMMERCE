import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import About from "./components/About";
import Login from "./components/auth/login";
import Register from "./components/auth/Register";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import Contact from "./components/Contact";
import Home from "./components/home/Home";
import PrivateRoute from "./components/PrivateRoute";
import Products from "./components/products/Products";
import NavBar from "./components/shared/NavBar";

const App = () => {
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
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
          </Route>
          <Route path="/" element={<PrivateRoute publicPage />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </React.Fragment>
  );
};

export default App;
