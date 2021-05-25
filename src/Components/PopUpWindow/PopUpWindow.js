import styles from './PopUpWindow.module.css'
import React from "react";


function PopUpWindow() {

    return (
     <div className={styles.popupForm}>
         <div>
             <button>Close</button>
         </div>
     </div>

    );
}

export default PopUpWindow();