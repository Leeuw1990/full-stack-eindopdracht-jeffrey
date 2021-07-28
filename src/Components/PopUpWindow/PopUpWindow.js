import styles from './PopUpWindow.module.css'
import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams} from 'react-router-dom';
import Button from "../Buttons/Button";
import InputField from "../InputField/InputField";

// TO DO!!!!
//inputfield maken waar nieuwe waarde van price, shopename en comment in opgeslagen kan worden.
// Delete functie maken.
// Edit functie.
// Star rating toevoegen?


function PopUpWindow({modalClose, setModalClose, oneImage, object}) {

    const { handleSubmit, register, formState:{errors} } = useForm({
        mode: 'onChange'
    })

    const [image, setImage] = useState({});
    const [shopeName, setShopName] = useState('');
    const [price, setPrice] = useState();
    const [comment, setComment] = useState('');


    async function addData (updateData) {
        // http://localhost:8080/api/product${id}
        try{
            await axios.patch(`${object.uploadedFile.url}`,
                updateData,
                {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    }
                })
            console.log('change Photo!!!',updateData)
        } catch (e) {
            console.error(e)
        }
    }

// Bij price: krijgt waarde binnen als interger, misschien moet het float zijn.
    console.log(comment)
        return (
            <div className={styles.overAllSize}>
                {console.log('wat zit hier in', object)}
                {modalClose ? (
                <form className={styles.popupForm} onSubmit={handleSubmit(addData)}>
                    {image && <img className={styles.image} alt='Image' src={object.uploadedFile.url}/>}
                    <p>{price}</p>
                    <InputField
                        type='number'
                        name='price'
                        placeholder='Prijs'
                        fieldRef={register('price',
                            {
                                required: {
                                    value: false,}})}
                        errors={errors}
                    />

                    <p>{shopeName}</p>
                    <InputField
                        type='text'
                        name='shopName'
                        placeholder='Winkel'
                        fieldRef={register('shopName',
                            {
                                required: {
                                    value: false,}})}
                        errors={errors}
                    />

                    <p>{comment}</p>
                    <textarea className={styles.commentArea}
                    cols='20' rows='10'
                    />

                    <Button
                    type='submit'
                    name='save'
                    title='Save'
                    />
                    <Button
                    type='click'
                    name='Close'
                    onclick={() => setModalClose(prev => !prev)}
                    title='Close'
                    />
                </form> ) : null}
            </div>
    );
}

export default PopUpWindow;