import './Product.css'
import React, { useState } from 'react';
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

        const [selectedImages, setSelectedImages] = useState([]);
        // const [openPopup, toggleOpenPopup] = useState(false);
        const myRef = React.createRef();
        const history = useHistory();



    const { register, formState: errors} = useForm({
        mode: "onChange"
    });

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
                    console.log('wat zit hierin?',items)
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
            setSelectedImages(arrayMove(selectedImages, oldIndex, newIndex));
        };

        function imageHandleChange(e) {
            // console.log('Laat dit fotos zien??????????', e.target.files)

            if(e.target.files) {
                const fileArray = Array.from(e.target.files).map((file)=> URL.createObjectURL(file))
                console.log(fileArray)
                setSelectedImages((prevImages)=>prevImages.concat(fileArray))
                Array.from(e.target.files).map(
                    (file)=>URL.revokeObjectURL(file)
                )
            }
        }

        function renderPhotos(source) {

            return source.map((selectedImages)=> {
                return <img className="resize" src={selectedImages} key={selectedImages} alt='Uploaded'/>
            })
        }


    return(

        <div className='overAllSize'>
            <div className='productForm'>
                <div className='container' ref={myRef}>
                    {/*<PopUpWindow>*/}
                    {/*    <InputField*/}
                    {/*        name='price'*/}
                    {/*        type='text'*/}
                    {/*        placeholder='Prijs'*/}
                    {/*        fieldRef={register("email",*/}
                    {/*            {*/}
                    {/*                required: {*/}
                    {/*                    value: false,*/}
                    {/*                }*/}
                    {/*            }*/}
                    {/*        )}*/}
                    {/*        errors={errors}*/}
                    {/*    />*/}
                    {/*    <InputField*/}
                    {/*        name='shop'*/}
                    {/*        type='text'*/}
                    {/*        placeholder='Winkel naam'*/}
                    {/*        fieldRef={register("winkel",*/}
                    {/*            {*/}
                    {/*                required: {*/}
                    {/*                    value: false,*/}
                    {/*                }*/}
                    {/*            }*/}
                    {/*        )}*/}
                    {/*        errors={errors}*/}
                    {/*    />*/}
                    {/*</PopUpWindow>*/}
                    <SortableList
                        key={selectedImages.key}
                        lockToContainerEdges={true}
                        shouldUseDragHandle={true}
                        useDragHandle
                        axis="xy"
                        items={renderPhotos(selectedImages)}
                        onSortEnd={onSortEnd}
                    />
                </div>
                {/*{renderPhotos(selectedImage)}*/}
                {/* eslint-disable-next-line react/jsx-no-undef */}



                <input hidden type='file' name='upload' multiple id='file' onChange={imageHandleChange}/>
                <label htmlFor='file' className='uploadButtonStyle'>Add Photo</label>
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