import React from 'react';
import styles from './Button.module.css'

function Button({type, name, title }) {
    return(
        <button type={type}
                name={name}
                className={styles.Button}
        >{title}
        </button>
    );
}

export default Button;