import './App.css';
import React from "react";
import {
  Link,
  Switch,
  Route,
} from 'react-router-dom';
import Profile from "./Pages/Profile/Profile";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import Product from "./Pages/Product/Product";
import ProductList from "./Pages/ProductList/ProductList";
import PopUpWindow from "./Components/PopUpWindow/PopUpWindow";



function App({uploadedFiles}) {


  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/list">lists</Link>
            </li>
          </ul>
        </nav>

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
            <Product/>
          </Route>
          <Route exact path="/modal/:url" component={PopUpWindow}>
            <PopUpWindow />
          </Route>
          <Route exact path="/productlist">
            <ProductList />
          </Route>
        </Switch>
        </div>

  );
}

export default App;
