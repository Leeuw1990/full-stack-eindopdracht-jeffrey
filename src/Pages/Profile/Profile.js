import './Profile.css'
import { Link } from 'react-router-dom';
import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from "../../Context/AuthContext";
import Button from "../../Components/Buttons/Button";
import axios from "axios";
import UploadService from "../../service/UploadService";


function Profile() {
    const {user, logout} = useContext(AuthContext)
    console.log('Profile', user)
    const [profileImage, setProfileImage] = useState([]);
    const [formData, setFormData] = useState(undefined)

    //////////////////////////////////////////////////////////
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [currentFile, setCurrentFile] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState('');
    const [fileInfos, setFileInfos] = useState([]);
    const [previewImage, setPreviewImage] = useState(undefined);

    function selectFile(event) {
        setSelectedFiles(event.target.files)
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
    }

    console.log('wat zit er in previw', previewImage)

    // function preview(event) {
    //     setPreviewImage(URL.createObjectURL(event.target.files[0]))
    // }

    function upload() {
        let currentFile = selectedFiles[0]
        setProgress(0);
        setCurrentFile(currentFile);

        UploadService.upload(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total),
            );
        }).then((response) => {
            setMessage(response.data.message);
            return UploadService.getFiles();
        }).then((files) => {
            setFileInfos(files.data)
        }).catch(() => {
            setProgress(0);
            setMessage('Could not upload the file!');
            setCurrentFile(undefined);
        })
        setSelectedFiles(undefined);
    }

    useEffect(() => {
        UploadService.getFiles().then((response) => {
            setFileInfos(response.data)
        });
    },[]);




    // function imageHandleChange(e) {
    //     // console.log('Laat dit fotos zien??????????', e.target.files)
    //     if(e.target.files) {
    //         const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
    //         console.log(fileArray)
    //         setProfileImage((prevImages)=>prevImages.concat(fileArray))
    //         Array.from(e.target.files).map(
    //             (file)=>URL.revokeObjectURL(file)
    //         )
    //     }
    // }

    // function renderPhotos(source) {
    //
    //     return source.map((profileImage)=> {
    //         return <img className="profileSizeImage" src={profileImage} key={profileImage} alt='Uploaded'/>
    //     })
    // }

    useEffect(() => {

    async function image() {
    //
    //     // PROBLEEM, STATUS 401 BIJ EEN GET REQUEST NAAR DE FILES.
    //     // geprobeerd:
    //     // User.id meegeven aan de get request.
    //     //antmatchers gecheckt in de backend.
    //     // De data erin kan ik wel loggen, maar link niet openen.
    //     // Dependencie array moet leeg, anders infinity loop.
    //     //

        try {
            const getImage = await axios.get(`http://localhost:8080/api/product/files/8c101d0a-c4f7-4a7b-a244-b6b4a7bfae37`)
            setFormData(getImage)
            console.log(formData, 'wat gebeurt? profile')


        } catch (e) {
            console.error(e)
        }

    }
    image()

    },[])
    // {formData && formData.map ((formData) => {
    //     return formData && <img alt='picture loading...' key={formData.url} src={formData.url}/>
    // })}
    // const objectURL = URL.createObjectURL(formData)


    return(
        <div className='overAllSize'>
            <div className='profileStyle'>
                <h1>Profiel</h1>
                <fieldset className='photoFieldSet'>
                <div className='photoContainer'>
                    {
                         formData && <img alt='picture loading...' src={formData}/>
                    }

                </div>
                </fieldset>
                <div>
                    {currentFile && (
                        <div className="progress">
                            <div
                                className="progress-bar progress-bar-info progress-bar-striped"
                                role="progressbar"
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                style={{ width: progress + "%" }}
                            >
                                {progress}%
                            </div>
                        </div>
                    )}

                    <label className="btn btn-default">
                        <input type="file" onChange={selectFile} />
                    </label>

                    <button className="btn btn-success"
                            disabled={!selectedFiles}
                            onClick={upload}
                    >
                        Upload
                    </button>

                    <div className="alert alert-light" role="alert">
                        {message}
                    </div>

                    <div className="card">
                        <div className="card-header">List of Files</div>
                        <ul className="list-group list-group-flush">
                            {fileInfos &&
                            fileInfos.map((file, index) => (
                                <li className="list-group-item" key={index}>
                                    <a href={file.url}>{file.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                <div className='userDetails'>
            <h2>Gegevens:</h2>
                    <p><strong>Voornaam:</strong>{user && user.firstName}</p>
                    <p><strong>Achternaam:</strong>{user && user.lastName}</p>
                    <p><strong>Gebruikersnaam:</strong>{user && user.username}</p>
                    <p><strong>Email:</strong>{user && user.email}</p>
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