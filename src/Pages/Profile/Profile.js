import styles from './Profile.module.css'
import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import Button from "../../Components/Buttons/Button";
import ChangeModal from "../../Components/ChangeModal/ChangeModal";



function Profile() {
    const [openChangeModal, setOpenChangeModal] = useState(false);
    const {user, logout} = useContext(AuthContext);
    console.log('Profile', user)

    return(
        <div className={styles.overAllSize}>
            <div className={styles.profileStyle}>
                <h1>Profiel</h1>

                <div className={styles.userDetails}>
                    <h2 className={styles.profileHeader}>Gebruiker gegevens:</h2>
                    <h3><strong>Voornaam:</strong>{user && user.firstName}</h3>
                    <h3><strong>Achternaam:</strong>{user && user.lastName}</h3>
                    <h3><strong>Gebruikersnaam:</strong>{user && user.username}</h3>
                    <h3><strong>Email:</strong>{user && user.email}</h3>
                </div>

                <Button
                type='button'
                name='editProfile'
                title='Gegevens wijzigen'
                onclick={() => setOpenChangeModal(true)}
                />

                {openChangeModal ? <ChangeModal
                openChangeModal={openChangeModal}
                setOpenChangeModal={setOpenChangeModal}
                /> : null}

                <div className={styles.profileButtons}>
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