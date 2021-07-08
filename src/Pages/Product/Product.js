import './Product.css'
import React, { useState, useEffect } from 'react';
import {Link, Route, useParams} from 'react-router-dom'
import { FaRegEye } from 'react-icons/fa'
import Button from "../../Components/Buttons/Button";
import ProductUploadService from "../../service/ProductUploadService";
import UploadService from "../../service/UploadService";
import PopUpWindow from "../../Components/PopUpWindow/PopUpWindow";

function Product() {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState(undefined);

    const [modalClose, setModalClose] = useState(false);
    const [activeImage, setActiveImage] = useState(undefined);


    function selectFile(event) {
        setSelectedFiles(event.target.files)
    }


    async function uploadImage() {
        setProgress(0);
        const currentFile = selectedFiles[0];

        try {
            // AFBEELDING UPLOADEN
            const response = await ProductUploadService.upload(currentFile, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
            });


            // @todo: communiceer met de gebruiker response.data.message

            // ALLE AFBEELDINGEN OPHALEN
            const allFiles = await ProductUploadService.getFiles();
            setUploadedFiles(allFiles.data);
        } catch (e) {
            setProgress(0);
            // @todo: communiceer met de gebruiker dat er een error is
        }
    }

    useEffect(() => {
        UploadService.getFiles().then((response) => {
            setUploadedFiles(response.data)
        });
    },[]);


     function openModal(uploadedFile) {
        setModalClose(prev => !prev);
        setActiveImage(uploadedFile.url)


    }

    console.log(uploadedFiles[1])






    return(
        <div className='overAllSize'>
            <div className='productForm'>
                <div className='container'>
                    <div>
                        {uploadedFiles.length > 0 && uploadedFiles.map((uploadedFile, index) => {
                            return <div key={uploadedFile.url} className='pictureContainer'><img className='pictureSize' src={uploadedFile.url} alt="hoi"/>
                                       <FaRegEye onClick={openModal}/>
                                <PopUpWindow
                                    key={index}
                                    modalClose={modalClose}
                                    setModalClose={setModalClose}
                                    oneImage={uploadedFile.url}

                                />
                            </div>
                        })}
                    </div>

                    <label className="btn btn-default">
                        <input type="file" onChange={selectFile} />
                    </label>

                    <button className="btn btn-success"
                            disabled={!selectedFiles}
                            onClick={uploadImage}
                    >
                        Upload
                    </button>
                </div>
                <Link to='/productlist'>
                    <Button
                        type='button'
                        name='toList'
                        title='My lists'
                    />
                </Link>
                {/*<Route*/}
                {/*    path={`${this.props.match.url}/modal`}*/}
                {/*    render={() => {*/}
                {/*        return (*/}
                {/*            <PopUpWindow*/}
                {/*            onClick={() => {*/}
                {/*                this.props.history.push(this.props.match.url)*/}
                {/*            }}*/}
                {/*            >*/}

                {/*            </PopUpWindow>*/}

                        );
                    {/*}}*/}
                    {/*/>*/}
            </div>
        </div>
    );
}

export default Product;