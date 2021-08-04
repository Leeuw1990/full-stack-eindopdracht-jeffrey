import styles from './Product.module.css';
import React, { useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import Button from '../../Components/Buttons/Button';
import ProductUploadService from '../../service/ProductUploadService';
import UploadService from '../../service/UploadService';
import PopUpWindow from '../../Components/PopUpWindow/PopUpWindow';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';



function Product() {

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [errorMessage, toggleErrorMessage] = useState(false);
    const [message, toggleMessage] = useState(false);
    const [modalClose, setModalClose] = useState(false);
    const [activeObject, setActiveObject] = useState(null);


    function selectFile(event) {
        setSelectedFiles(event.target.files)
    }

    async function uploadImage() {
        const currentFile = selectedFiles[0];

        try {
            const response = await ProductUploadService.upload(currentFile, (event) => {
            });
            toggleMessage(true)

            const allFiles = await ProductUploadService.getFiles();
            setUploadedFiles(allFiles.data);
        } catch (e) {
            toggleErrorMessage(true);
        }
    }

    useEffect(() => {
        UploadService.getFiles().then((response) => {
            setUploadedFiles(response.data)

        });
    },[]);

    function sortPriceAsc() {
       const products = [...uploadedFiles].sort((a,b) => {
           if (a.price < b.price) {
               return -1
           }
           return 0;
       })
        setUploadedFiles(products)
    }

    function sortPriceDesc() {
        const products = [...uploadedFiles].sort((a,b) => {
            if (a.price > b.price) {
                return -1
            }
            return 0;
        })
        setUploadedFiles(products)
    }

    return(
        <div className={styles.overAllSize}>
            <div className={styles.productForm}>
                <div className={styles.container}>
                    <div>
                        {uploadedFiles.length > 0 && uploadedFiles.map((uploadedFile, index) => {
                            return <div className={styles.pictureElement} key={index}>
                                <img className={styles.pictureSize} src={uploadedFile.url} alt="hoi" key={index}
                                     onClick={() => {
                                     setActiveObject({index, uploadedFile});
                                     setModalClose(true)
                                     }}/>
                                     <div className={styles.picProperties}>
                                         <ul>
                                {uploadedFile.price && <li>Prijs: €{uploadedFile.price}</li>}
                                {uploadedFile.shopName && <li>Winkel: {uploadedFile.shopName}</li>}
                                {uploadedFile.comment && <li>Opmerkingen: {uploadedFile.comment}</li>}
                                {/*{console.log('activeobj',activeObject)}*/}
                                {console.log('wat zit er in file', uploadedFile)}
                                         </ul>
                                     </div>
                            </div>
                        })}


                    </div>

                </div>
                { modalClose ? <PopUpWindow
                    oneImage={activeObject}
                    object={activeObject}
                    modalClose={modalClose}
                    setModalClose={setModalClose}
                    setUploadedFiles={setUploadedFiles}/> : null}

                <div className={styles.buttons}>
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
                    title='Confirm'
                    disabled={!selectedFiles}
                    onClick={uploadImage}
                />
                </div>

                <div className={styles.sortButtons}>
                    <p>Price</p>
                <GoTriangleUp size='25px' color='#707070' type='click'  onClick={sortPriceAsc} />
                <GoTriangleDown size='25px' color='#707070' type='click' onClick={sortPriceDesc} />
                </div>
                {message && <p>Uploaded!</p>}
                {errorMessage && <p>Something went wrong, Try again!</p>}
            </div>
        </div>
    );
}

export default Product;