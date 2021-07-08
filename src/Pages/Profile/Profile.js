import './Profile.css'
import { Link } from 'react-router-dom';
import React, { useContext} from 'react';
import { AuthContext } from "../../Context/AuthContext";
import Button from "../../Components/Buttons/Button";



function Profile() {
    const {user, logout} = useContext(AuthContext)
    console.log('Profile', user)

    return(
        <div className='overAllSize'>
            <div className='profileStyle'>
                <h1>Profiel</h1>

                <div className='userDetails'>
            <h2>Gegevens:</h2>
                    <p><strong>Voornaam:</strong>{user && user.firstName}</p>
                    <p><strong>Achternaam:</strong>{user && user.lastName}</p>
                    <p><strong>Gebruikersnaam:</strong>{user && user.username}</p>
                    <p><strong>Email:</strong>{user && user.email}</p>
                </div>

                <div className='profileButtons'>
                <Link to='/productlist'>
                <Button
                    type='button'
                    name='toList'
                    title='My lists'
                />
                </Link>
                <Button
                    type='button'
                    name='logout'
                    title='Log out!'
                    onclick={logout}
                 />
                </div>

            </div>
        </div>
    );
}

export default Profile;