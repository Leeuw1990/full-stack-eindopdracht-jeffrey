import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../Components/Buttons/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import InputField from '../../Components/InputField/InputField';
import styles from './SignIn.module.css'

function SignIn() {
    const { login } = useContext(AuthContext)
    const { handleSubmit, register, formState:{errors} } = useForm({
        mode:'onChange'
    });

    async function submitData(data) {
        try {
            const result = await axios.post('http://localhost:8080/api/auth/signin', data);
            login(result.data.accessToken);
        } catch (e) {
            console.error(e)
        }
    }

    return(
        <div className={styles.overAllSize}>
            <form className={styles.signInForm} onSubmit={handleSubmit(submitData)}>
                <InputField
                    type='text'
                    name='username'
                    placeholder='Gebruikersnaam'
                    fieldRef={register('username',
                        {
                            required: {
                                value: true,
                                message: 'Gebruikersnaam is verplicht',}})}
                    errors={errors}
                />
                <InputField
                    type='password'
                    name='password'
                    placeholder='Wachtwoord'
                    fieldRef={register('password',
                        {
                            required: {
                                value: true,
                                message: 'Wachtwoord is verplicht',}})}
                    errors={errors}
                />
                <Button
                type='submit'
                name='signin'
                title='Sign in'
                />
                <Link to="/signup">
                <Button
                    type='button'
                    name='signUp'
                    title='Sign up'
                />
                </Link>
            </form>
            </div>
    );
}

export default SignIn;