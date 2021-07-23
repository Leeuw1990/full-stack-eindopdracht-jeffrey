import './Product.css'
import React, { useState, useEffect } from 'react';
import {Link, Route, useParams, useHistory} from 'react-router-dom'
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
        <div className='overAllSize'>
            <div className='productForm'>
                <div className='container'>
                    <div>

                        {uploadedFiles.length > 0 && uploadedFiles.map((uploadedFile, index) => {
                            return <div key={index} className='pictureContainer'><img className='pictureSize' src={uploadedFile.url} alt="hoi" key={index}
                                                                                      onClick={() => {
                                                                                          setActiveObject({index, uploadedFile});
                                                                                          setModalClose(true)
                                                                                      }}/>
                                       {/*<FaRegEye*/}
                                       {/*    key={index}*/}
                                       {/*    onClick={() => {*/}
                                       {/*    setActiveObject({index, uploadedFile});*/}
                                       {/*    setModalClose(true)*/}
                                       {/*    }}*/}
                                       {/*/>*/}
                                {console.log(activeObject)}


                            </div>
                        })}

                        { modalClose ? <PopUpWindow
                            oneImage={activeObject}
                            object={activeObject}
                            modalClose={modalClose}
                            setModalClose={setModalClose}/> : null}
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