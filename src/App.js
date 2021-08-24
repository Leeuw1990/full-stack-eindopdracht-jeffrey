import "./App.css";
import React from "react";
import { Switch, Route } from "react-router-dom";
import Profile from "./Pages/Profile/Profile";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import Product from "./Pages/Product/Product";
import ProductList from "./Pages/ProductList/ProductList";
import ProductModal from "./Components/ProductModal/ProductModal";
import Admin from "./Pages/Admin/Admin";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/product/:id" component={Product}>
          <Product />
        </Route>
        <Route exact path="/modal/:url" component={ProductModal}>
          <ProductModal />
        </Route>
        <Route exact path="/productlist">
          <ProductList />
        </Route>
        <PrivateRoute>
          <Admin exact path="/admin" />
        </PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
