import './Product.css'
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import {Link, useHistory} from 'react-router-dom'
import { FaRegEye } from 'react-icons/fa'
import {
    SortableContainer,
    SortableElement,
    SortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
import PopUpWindow from "../../Components/PopUpWindow/PopUpWindow";
import InputField from "../../Components/InputField/InputField";
import Button from "../../Components/Buttons/Button";
import ProductUploadService from "../../service/ProductUploadService";
import UploadService from "../../service/UploadService";
import axios from "axios";

// To DO lijst!!!
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Elementen in container zo programmeren dat ze in de container blijven.[X]
// functie aan toevoegen dat ik de elementen kan markeren ( Bijvoorbeeld: Duimpje omhoog of omlaag )[]
// Functie upload knop koppelen aan de HOC grid elementen, dat het element een foto is.[X] LET OP! kan maar 1 foto uploaden.
// Functie toevoegen dat ik de elementen kan verwijderen.[]

// Functie toevoegen dat de comments, shopname en price aangepast kunnen worden.[]
// 1 [] component Popup maken.
// 1.1 [] --------> npm install
// 2 [] Popup moet comments, price en shopname kunnen opslaan
// 3 [] Popup moet een grotere foto kunnen laten zien.
// 3 [] pictogram verwerken in de image.
// 4 [] pictogram functie geven naar popup component.
// 5 [] via popup component de foto kunnen updaten en verwijderen.

function Product() {

        // const [selectedImages, setSelectedImages] = useState([]);
        // const [openPopup, toggleOpenPopup] = useState(false);

    /////////////////////////////////////////////////////////////////////////////
    // const [selectedFiles, setSelectedFiles] = useState(undefined);
    // const [currentFile, setCurrentFile] = useState(undefined);
    // const [progress, setProgress] = useState(0);
    // const [message, setMessage] = useState('');
    // const [fileInfos, setFileInfos] = useState([]);
    // const [previewImage, setPreviewImage] = useState(undefined);
    // const [imageData, setImageData] = useState({});

    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState(undefined);

        const myRef = React.createRef();
        const history = useHistory();

    const { register, formState: errors} = useForm({
        mode: "onChange"
    });

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

    const Handle = SortableHandle(({ tabIndex }) => (
        <div className='handle' tabIndex={tabIndex}>
        </div>
    ));

    const SortableItem = SortableElement(props => {
        const { value: item } = props;
        return (
            <div className='content' ref={myRef}>
                {item.caption}
                {props.shouldUseDragHandle && <Handle />}
                {<img src={props.url} className='picSize' alt='Loading...' />}
                {<FaRegEye className='iconEye' onClick={()=> history.push(`/modal/${props.key}`)}/>}
            </div>
        );
    });


    const SortableList = SortableContainer(props => {
        const { items, ...restProps } = props;
        return (
            <div className='StyledContainer' ref={myRef}>
                {items.map((item, index) => {
                    return < SortableItem
                        ref={myRef}
                        key={`item-${item.key}`}
                        url = {item.key}
                        index={index}
                        value={item}
                        {...
                            restProps
                        }
                    />
                })}
            </div>
        );
    });

        const onSortEnd = ({ oldIndex, newIndex }) => {
            setUploadedFiles(arrayMove(uploadedFiles, oldIndex, newIndex));
        };

        // function imageHandleChange(e) {
        //     console.log('Laat dit fotos zien??????????', e.target.files)
        //
        //     if(e.target.files) {
        //         const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
        //         console.log(fileArray)
        //         setSelectedImages((prevImages)=>prevImages.concat(fileArray))
        //         Array.from(e.target.files).map(
        //             (file)=>URL.revokeObjectURL(file)
        //         )
        //     }
        // }

        // function renderPhotos(source) {
        //     return source.map((selectedImages)=> {
        //         return <img className="resize" src={selectedImages} key={selectedImages} alt='Uploaded'/>
        //     })
        // }

        // useEffect(() => {
        //
        // async function renderImage() {
        //     try {
        //         const responseImage = await axios.get('http://localhost:8080/api/product/files');
        //         // setImageData(responseImage)
        //         console.log('wat zit er in image',responseImage)
        //
        //     } catch (e) {
        //         console.error(e)
        //     }
        // }
        // renderImage()
        //
        // },[])

    function renderImages() {
        uploadedFiles.length > 0 && uploadedFiles.map((uploadedFile) => {
            return <img src={uploadedFile.url} alt="hoi"/>
        })
    }



    return(

        <div className='overAllSize'>
            <div className='productForm'>
                <div className='container' ref={myRef}>
                    <SortableList
                        key={uploadedFiles.key}
                        lockToContainerEdges={true}
                        shouldUseDragHandle={true}
                        useDragHandle
                        axis="xy"
                        items={renderImages(uploadedFiles)}
                        onSortEnd={onSortEnd}
                    />
                </div>

                {/*<input hidden type='file' name='upload' multiple id='file' onChange={upload}/>*/}
                {/*<label htmlFor='file' className='uploadButtonStyle'>Add Photo</label>*/}
                <div>


                    <label className="btn btn-default">
                        <input type="file" onChange={selectFile} />
                    </label>

                    <button className="btn btn-success"
                            disabled={!selectedFiles}
                            onClick={uploadImage}
                    >
                        Upload
                    </button>



                    {/*<div className="card">*/}
                    {/*    <div className="card-header">List of Files</div>*/}
                    {/*    <ul className="list-group list-group-flush">*/}
                    {/*        {fileInfos &&*/}
                    {/*        fileInfos.map((file, index) => (*/}
                    {/*            <li className="list-group-item" key={index}>*/}
                    {/*                <a href={file.url}>{file.name}</a>*/}
                    {/*            </li>*/}
                    {/*        ))}*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
                <Link to='/list'>
                    <Button
                        type='button'
                        name='toList'
                        title='My lists'
                    />
                </Link>
            </div>
        </div>
    );
}

export default Product;