import './Product.css'
import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form'
import {Link, useHistory} from 'react-router-dom'
import {FaRegEye} from 'react-icons/fa'
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

function ProductCLEAN() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState(undefined);


    const {register, formState: errors} = useForm({
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

    return (
        <>
            <div>
                {uploadedFiles.length > 0 && uploadedFiles.map((uploadedFile) => {
                    return <img src={uploadedFile.url} alt="hoi"/>
                })}
            </div>

            <div className='overAllSize'>
                <div className='productForm'>
                    <div>
                        <label className="btn btn-default">
                            <input type="file" onChange={selectFile}/>
                        </label>
                        <button
                            className="btn btn-success"
                            disabled={!selectedFiles}
                            onClick={uploadImage}
                        >
                            Upload
                        </button>
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
        </>
    );
}

export default ProductCLEAN;