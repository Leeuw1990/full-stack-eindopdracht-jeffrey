import styles from './PopUpWindow.module.css'
import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams} from 'react-router-dom';

// TO DO!!!!
//inputfield maken waar nieuwe waarde van price, shopename en comment in opgeslagen kan worden.
// Delete functie maken.
// Edit functie.
// Star rating toevoegen?


function PopUpWindow({modalClose, setModalClose, oneImage, object}) {
    const [image, setImage] = useState({});
    const [shopeName, setShopName] = useState('');
    const [price, setPrice] = useState();
    const [comment, setComment] = useState('');


// useEffect(() => {
//     async function oneProduct() {
//         try {
//             const response = await axios.get(`${oneImage}`,{
//
//             })
//             setImage(response)
//
//
//
//         } catch (e) {
//             console.error(e)
//         }
//
//     }
//     oneProduct()
// },[])




    async function productData(sendData) {
        const data = {
            price: price,
            shopeName: shopeName,
            comment: comment,

        }
    try {

        await axios.post(`${object.uploadedFile.url}`, data).then(res => {

            setShopName('')
            setComment('')
        })




        // Post request voor price, shopname en comments

    } catch (e) {
        console.error(e)
    }
    }

// Bij price: krijgt waarde binnen als interger, misschien moet het float zijn.
    console.log(comment)
        return (
            <>
                {console.log('wat zit hier in', object)}
                {modalClose ? (
                <div className={styles.popupForm}>
                    {image && <img className={styles.image} alt='Image' src={object.uploadedFile.url}/>}
                    <p>{price}</p>
                    <input placeholder='Prijs' type='number' value={price} onChange={e => setPrice(e.target.value.parseInt)} />
                    <p>{shopeName}</p>
                    <input placeholder='Naam winkel' type='text' value={shopeName} onChange={e => setShopName(e.target.value)} />
                    <p>{comment}</p>
                    <input placeholder='Opmerking' type='text' value={comment} onChange={e => setComment(e.target.value)}/>
                    <button onClick={productData}>save</button>
                    <button onClick={() => setModalClose(prev => !prev)} >Close</button>
                </div> ) : null}
            </>
    );
}

export default PopUpWindow;