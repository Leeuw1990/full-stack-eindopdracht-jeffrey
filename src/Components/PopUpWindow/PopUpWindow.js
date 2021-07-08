import styles from './PopUpWindow.module.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams} from 'react-router-dom';

// TO DO!!!!
//inputfield maken waar nieuwe waarde van price, shopename en comment in opgeslagen kan worden.
// Delete functie maken.
// Edit functie.
// Star rating toevoegen?


function PopUpWindow({modalClose, setModalClose, oneImage}) {
    const [image, setImage] = useState({});
    const [shopeName, setShopName] = useState('');
    const [price, setPrice] = useState(0);
    const [comment, setComment] = useState('');


useEffect(() => {
    async function oneProduct() {
        try {
            const response = await axios.get(`${oneImage}`,{
                headers: {  "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            setImage(response.config.url)

            console.log(response)

        } catch (e) {
            console.error(e)
        }

    }
    oneProduct()
},[])


    async function productData() {

    try {

        // Post request voor price, shopname en comments

    } catch (e) {
        console.error(e)
    }
    }


        return (
            <>{modalClose ?
                <div className={styles.popupForm}>
                    {image && <img className={styles.image} alt='Image' src={image}/>}
                    <p>{price}</p>
                    <input />
                    <p>{shopeName}</p>
                    <input />
                    <p>{comment}</p>
                    <input />
                 <button onClick={setModalClose}>Close & save</button>
                </div> : null}
            </>
    );
}

export default PopUpWindow;