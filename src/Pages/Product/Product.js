import './Product.css'

import React, { useState } from 'react';
import {
    SortableContainer,
    SortableElement,
    SortableHandle
} from "react-sortable-hoc";
import arrayMove from "array-move";
// import PopUp from "../../Components/PopUp/PopUp";


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

        const [selectedImage, setSelectedImage] = useState([])
        const [popup, setPopup] = useState(false);
    // const [popup, togglePopup] = useState([])
        // const [zoom, setZoom] = useState([])
    //     const [photos, setPhotos] = React.useState([
    //
    //     {
    //         id: 1,
    //         preview:
    //             <UploadButton/>,
    //         caption: "test 1",
    //         starred: true
    //     },
    //     {
    //         id: 2,
    //         preview:
    //             <UploadButton/>,
    //         caption: "test 2"
    //     },
    //     {
    //         id: 3,
    //         preview:
    //             <UploadButton/>,
    //         caption: "test 3"
    //     },
    //     {
    //         id: 4,
    //         preview:
    //             <UploadButton/>,
    //         caption: "test 4",
    //     },
    //     {
    //         id: 5,
    //         preview:
    //             <UploadButton/>,
    //         caption: "test 5"
    //     },
    //     {
    //         id: 6,
    //         preview:
    //             <UploadButton/>,
    //         caption: "test 6"
    //     },
    //     {
    //         id: 7,
    //         preview:
    //             <UploadButton/>,
    //         caption: "test 7"
    //     }
    // ]);


    const Handle = SortableHandle(({ tabIndex }) => (
        <div className='handle' tabIndex={tabIndex}>
            {/*<svg viewBox="0 0 50 50">*/}
            {/*<path*/}
            {/*    d="M 0 7.5 L 0 12.5 L 50 12.5 L 50 7.5 L 0 7.5 z M 0 22.5 L 0 27.5 L 50 27.5 L 50 22.5 L 0 22.5 z M 0 37.5 L 0 42.5 L 50 42.5 L 50 37.5 L 0 37.5 z"*/}
            {/*    color="#000"*/}
            {/*/>*/}
            {/*</svg>*/}
        </div>
    ));

    const SortableItem = SortableElement(props => {
        const { value: item } = props;
        // console.log('wat is dat???????????',props);
        return (

            <div className='content'>
                {item.caption}
                {props.shouldUseDragHandle && <Handle />}
                {<img src={selectedImage} className='picSize' alt='Loading...' />}

            </div>

        );
    });


    const SortableList = SortableContainer(props => {
        const { items, ...restProps } = props;
        return (
            <div className='StyledContainer'>
                {items.map((item, index) => (
                    <SortableItem
                        key={`item-${item.id}`}
                        index={index}
                        value={item}
                        {...restProps}
                    />
                ))}
            </div>
        );
    });
    // `item-${item.id}`
        const onSortEnd = ({ oldIndex, newIndex }) => {
            setSelectedImage(arrayMove(selectedImage, oldIndex, newIndex));
        };

        function imageHandleChange(e) {
            // console.log('Laat dit fotos zien??????????', e.target.files)
            if(e.target.files) {
                const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
                console.log(fileArray)
                setSelectedImage((prevImages)=>prevImages.concat(fileArray))
                Array.from(e.target.files).map(
                    (file)=>URL.revokeObjectURL(file)
                )
            }
        }

        function renderPhotos(source) {
            return source.map((selectedImage)=> {
                return <img className="resize" src={selectedImage} key={selectedImage} alt='Uploaded'/>
            })
        }


    return(

        <div className='overAllSize'>
            <div className='productForm'>
                {/*<div className='result'>*/}
                {/*    {renderPhotos(selectedImage)}*/}
                {/*</div>*/}
                <div className='container'>
                    <SortableList
                        key={selectedImage.id}
                        lockToContainerEdges={true}
                        shouldUseDragHandle={true}
                        useDragHandle
                        axis="xy"
                        items={renderPhotos(selectedImage)}
                        onSortEnd={onSortEnd}
                    />
                </div>
                {/*{renderPhotos(selectedImage)}*/}
                {/* eslint-disable-next-line react/jsx-no-undef */}
                {/*<PopUp trigger={popup} setTrigger={setPopup}> <h3>My popup</h3> </PopUp>*/}
                {/*<button onClick={() => setPopup(true)}>Open popup</button>*/}

                <input hidden type='file' name='upload' multiple id='file' onChange={imageHandleChange}/>
                <label htmlFor='file' className='uploadButtonStyle'>Add Photo</label>

            </div>
        </div>
    );
}

export default Product;