import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ChangeModal.module.css';
import Button from "../Buttons/Button";
import { AuthContext } from "../../Context/AuthContext";
import axios from 'axios';
import InputField from "../InputField/InputField";

function ChangeModal({ openChangeModal, setOpenChangeModal }) {
    const { watch, handleSubmit, register, formState:{errors} } = useForm({
        mode: 'onChange'
    })
    const { user } = useContext(AuthContext);
    console.log(user)

    async function changeData (updateData) {
        
        try{
            await axios.patch(`http://localhost:8080/api/users/user/${user.username}/details/update`,
                updateData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${user.token}`,
                    }
            })
        } catch (e) {
            console.error(e)
        }
    }

    return(
        (openChangeModal ? <div className={styles.modal}>
                <form onSubmit={handleSubmit(changeData)}>
                <h2>Gebruiker gegevens:</h2>
                <h3><strong>Voornaam:</strong>{user && user.firstName}</h3>
                <InputField
                    type='text'
                    name='changeName'
                    placeholder='Wijzig voornaam'
                    fieldRef={register('firstName',
                        {
                            required: {
                                value: false,}})}
                    errors={errors}
                />
                <h3><strong>Achternaam:</strong>{user && user.lastName}</h3>
                <InputField
                    type='text'
                    name='lastName'
                    placeholder='Wijig achternaam'
                    fieldRef={register('lastName',
                        {
                            required: {
                                value: false,}})}
                    errors={errors}
                />
                <h3><strong>Gebruikersnaam:</strong>{user && user.username}</h3>
                <InputField
                    type='text'
                    name='changeUsername'
                    placeholder='Wijzig gebruikersnaam'
                    fieldRef={register('username',
                        {
                            required: {
                                value: false,}})}
                    errors={errors}
                />
                <h3><strong>Email:</strong>{user && user.email}</h3>
                <InputField
                    type='text'
                    name='email'
                    placeholder='Wijzig e-mail'
                    fieldRef={register('email',
                        {
                            required: {
                                value: false,
                            },
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: 'E-mailadres voldoet niet aan de vereiste karakters.'}})}
                    errors={errors}
                />
            <Button
            type='button'
            name='close'
            title='Opslaan'
            />
        </form>
            <Button
                type='button'
                name='close'
                title='Profiel'
                onclick={()=> setOpenChangeModal(prev => !prev)}
            />
            </div> : null )
    );
}

export default ChangeModal;