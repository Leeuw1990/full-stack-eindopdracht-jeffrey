import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import './SignUp.css'

import Button from "../../Components/Buttons/Button";
import InputField from "../../Components/InputField/InputField";


function SignUp() {
    const [loading, toggleLoading] = useState(false);
    const [registerSucces, toggleRegisterSucces] = useState(false);
    let history = useHistory();
    const { watch, handleSubmit, register, formState:{errors} } = useForm({
        mode: "onChange"
    })

    const password = useRef({});
    password.current = watch("password", "");

    async function submitData(data) {
        toggleLoading(true)

        try {
            const postResult = await axios.post("http://localhost:3000/register", {
                email:data.email,
                username:data.username,
                password:data.password,
                age:data.age,
                firstName:data.firstName,
                lastName:data.lastName,
            });


            toggleRegisterSucces(true);
            setTimeout(()=>{history.push("/sign-in");
            }, 2000)


        } catch (e) {
            console.error(e)
        }
        toggleLoading(false)

    }

    return(
        <div className='overAllSize'>
        <>
            <form className='signUpForm' onSubmit={handleSubmit(submitData)}>
                <InputField
                    type="text"
                    name="first"
                    placeholder="Voornaam"
                    fieldRef={register("first",
                        {
                            required: {
                                value: true,
                                message: "Voornaam is verplicht",
                            }
                        }
                    )}
                    errors={errors}
                />
                <InputField
                    type="text"
                    name="last"
                    placeholder="Achternamer"
                    fieldRef={register("last",
                        {
                            required: {
                                value: true,
                                message: "Achternaam is verplicht",
                            }
                        }
                    )}
                    errors={errors}
                />
                <InputField
                    type="text"
                    name="age"
                    placeholder="DD-MM-YYYY"
                    fieldRef={register("age",
                        {
                            required: {
                                value: true,
                                message: "Geboorte datum is verplicht",
                            },
                            pattern: {
                                value: (/^(\d{1,2})-(\d{1,2})-(\d{4})$/),
                                message: "Geboorte datum onjuist"
                            }
                        })}
                    errors={errors}
                />
                <InputField
                    type="text"
                    name="user"
                    placeholder="Gebruikersnaam"
                    fieldRef={register("user",
                        {
                            required: {
                                value: true,
                                message: "Gebruikersnaam is verplicht",
                            }
                        }
                    )}
                    errors={errors}
                />
                <InputField
                    type="text"
                    name="mail"
                    placeholder="E-mail"
                    fieldRef={register("mail",
                        {
                            required: {
                                value: true,
                                message: "E-mail is verplicht",
                            },
                            pattern: {
                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "E-mailadres voldoet niet aan de vereiste karakters."
                            }
                        })}
                    errors={errors}
                />
                <InputField
                    type="password"
                    name="password"
                    placeholder="Wachtwoord"
                    fieldRef={register("password",
                        {
                            required: {
                                value: true,
                                message: "Wachtwoord is verplicht",
                            },
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                                message: "Wachtwoord is niet sterk genoeg." +
                                    "Bevat tenminste 8 karakaters, 1 cijfer, 1 hoofdletter, 1 kleine letter en bestaat uit 0-9/A-Z."
                            }
                        })}
                    errors={errors}
                />
                <InputField
                    type="password"
                    name="repeatPass"
                    placeholder="Herhaal wachtwoord"
                    fieldRef={register("repeatPass",
                        {
                            validate: value =>
                                value === password.current || "Wachtwoord komt niet overeen."
                        })}
                    errors={errors}
                />
                <Button
                    type='submit'
                    name='signup'
                    title='Sign up'
                />
                {registerSucces === true && <p>Het registreren is gelukt! U wordt nu doorgestuurd naar de login pagina.</p>}
                {loading === true && <span>"Page is loading!"</span>}
                Heeft u al een account? Klik <Link to="/sign-in">hier!</Link>
            </form>
        </>
        </div>
    )
}

export default SignUp;