import './App.css';
import React from "react";
import { BrowserRouter as Router,
  Link,
  useParams,
  Switch,
  Route,
} from 'react-router-dom';
import Profile from "./Pages/Profile/Profile";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import Product from "./Pages/Product/Product";
import ProductList from "./Pages/ProductList/ProductList";
import PopUpWindow from "./Components/PopUpWindow/PopUpWindow";
import ProductCLEAN from "./Pages/Product/ProductCLEAN";


function App() {

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
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/product/:text" >
            <Product/>
          </Route>
          <Route exact path="/modal/:id">
            <PopUpWindow />
          </Route>
          <Route exact path="/list">
            <ProductList />
          </Route>
        </Switch>
        </div>

  );
}

export default App;
