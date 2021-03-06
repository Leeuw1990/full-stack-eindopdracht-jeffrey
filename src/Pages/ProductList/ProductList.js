import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProductList.module.css";
import Button from "../../Components/Buttons/Button";
import List from "../../Components/List/List";

function ProductList() {
  return (
    <div className={styles.overAllSize}>
      <div className={styles.productListField}>
        <Link to="/profile">
          <Button type="button" name="profile" title="Profile" />
        </Link>
        <List />
      </div>
    </div>
  );
}

export default ProductList;
