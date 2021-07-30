import styles from './Product.module.css';
import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Button from '../../Components/Buttons/Button';
import ProductUploadService from '../../service/ProductUploadService';
import UploadService from '../../service/UploadService';
import PopUpWindow from '../../Components/PopUpWindow/PopUpWindow';

function Product() {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState(undefined);

    const [modalClose, setModalClose] = useState(false);
    const [activeObject, setActiveObject] = useState(null);
    const [activeImage, setActiveImage] = useState(undefined);

    const history = useHistory();

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


    return(
        <div className={styles.overAllSize}>
            <div className={styles.productForm}>
                <div className={styles.container}>
                    <div>
                        {uploadedFiles.length > 0 && uploadedFiles.map((uploadedFile, index) => {
                            return <div key={index}><img className={styles.pictureSize} src={uploadedFile.url} alt="hoi" key={index}
                                                                                      onClick={() => {
                                                                                          setActiveObject({index, uploadedFile});
                                                                                          setModalClose(true)
                                                                                      }}/>
                                {console.log('activeobj',activeObject)}
                            </div>
                        })}

                        { modalClose ? <PopUpWindow
                            oneImage={activeObject}
                            object={activeObject}
                            modalClose={modalClose}
                            setModalClose={setModalClose}/> : null}
                    </div>


                </div>
                <Link to='/productlist'>
                    <Button
                        type='button'
                        name='toList'
                        title='My lists'
                    />
                </Link>
                <label className={styles.uploadButtonStyle}>
                    <input className={styles.inputFile} type="file" onChange={selectFile} />Upload
                </label>

                <button
                    disabled={!selectedFiles}
                    onClick={uploadImage}
                >
                    Upload
                </button>
            </div>
        </div>
    );
}

export default Product;