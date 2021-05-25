import './Profile.css'
import { Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import Button from "../../Components/Buttons/Button";


function Profile() {
    const { user, logout } = useContext(AuthContext)
    console.log(user)
    const [profileImage, setProfileImage] = useState([]);

    function imageHandleChange(e) {
        // console.log('Laat dit fotos zien??????????', e.target.files)
        if(e.target.files) {
            const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
            console.log(fileArray)
            setProfileImage((prevImages)=>prevImages.concat(fileArray))
            Array.from(e.target.files).map(
                (file)=>URL.revokeObjectURL(file)
            )
        }
    }

    function renderPhotos(source) {

        return source.map((profileImage)=> {
            return <img className="profileSizeImage" src={profileImage} key={profileImage} alt='Uploaded'/>
        })
    }


    return(
        <div className='overAllSize'>
            <div className='profileStyle'>
                <h1>Profiel</h1>
                <fieldset className='photoFieldSet'>
                <div className='photoContainer'>
                    {renderPhotos(profileImage)}
                </div>
                </fieldset>
                <input hidden type='file' name='upload' multiple id='file' onChange={imageHandleChange}/>
                <label htmlFor='file' className='profileUploadButtonStyle'>Add Photo</label>


                <div className='userDetails'>
            <h2>Gegevens:</h2>
                    <p><strong>Voornaam:</strong>{user && user.firstName}</p>
                    <p><strong>Achternaam:</strong>{user && user.lastName}</p>
                    <p><strong>Gebruikersnaam:</strong>{user && user.userName}</p>
                    <p><strong>Email:</strong>{user && user.email}</p>
                    <p><strong>Geboorte datum:</strong>{user && user.age}</p>
                </div>

                <div className='profileButtons'>
                <Link to='/list'>
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