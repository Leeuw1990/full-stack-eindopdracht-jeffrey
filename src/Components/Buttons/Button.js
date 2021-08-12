import React from "react";
import styles from "./Button.module.css";

function Button({ type, name, title, onclick }) {
  return (
    <button type={type} name={name} className={styles.Button} onClick={onclick}>
      {title}
    </button>
  );
}

export default Button;
