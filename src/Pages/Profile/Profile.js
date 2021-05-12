import React, { useContext } from 'react';
import { AuthContext } from "../../Context/AuthContext";



function Profile() {
    const { user, logout } = useContext(AuthContext)
    console.log(user)


    return(
        <div className='overAllSize'>
        <>
            <h1>Profielpagina</h1>
            <h2>Gegevens:</h2>
            <p><strong>Gebruikersnaam:</strong>{user && user.userName}</p>
            <p><strong>Email:</strong>{user && user.email}</p>

            <button
            type='button'
            onClick={logout}
            >Log uit!</button>

        </>
        </div>
    );
}

export default Profile;