import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ListForm.module.css'
import axios from "axios";
import InputField from "../InputField/InputField";
import List from "../List/List";

function ListForm(props) {
    // const [productLists, setProductLists] = useState([]);
    // const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const { handleSubmit,register, formState:{errors} } = useForm({
        mode: "onSubmit"
    });

        async function postData(data) {
            console.log('klopt mijn data', data)
            console.log('listname', data.listName)
            try {
                await axios.post('http://localhost:8080/api/productlist', {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify,
                    listName: data.listName

                }).then(() => {
                    console.log("List added")
                })
            } catch (e) {
                console.error(e)
            }
        }

        function refreshPage() {
            window.location.reload(false);
        }

        // async function updateData() {
        //     try {
        //         await axios.put('http://localhost:8080/productlist', {
        //             method: "PUT",
        //             headers: {"Content-Type": "application/json"},
        //             body: JSON.stringify,
        //
        //         }).then(() => {
        //             console.log("List updated")
        //         })
        //
        //     } catch (e) {
        //         console.log(e)
        //     }
        // }


    // const inputRef = useRef(null);
    // useEffect(() => {
    //     inputRef.current.focus();

    // function handleChange(data) {
    //     setInput(data.target.value);
    // }

    // function handleDataSubmit(data) {
    //
    //         data.preventDefault();
    //         props.onSubmit({
    //             id: Math.floor(Math.random() * 10000),
    //             text: input
    //         });
    //         setInput('');
    // }

    return(
        <div>
            <form onSubmit={handleSubmit(postData)}>
                    <InputField
                        type="text"
                        onChange={postData}
                        name="listName"
                        placeholder="Create list"
                        fieldRef={register("listName",
                            {
                                required: {
                                    value: false,
                                    message: "Invoer nodig",
                                }
                            }
                        )}
                        errors={errors}
                    />
                <button type='submit' name='listName' onClick={refreshPage} className={styles.addListButton} >Create list!</button>
            </form>
        </div>
    );
}


export default ListForm;

// <>
//     <InputField
//         type="text"
//         name="updateName"
//         placeholder="Create list"
//         fieldRef={register("updateName",
//             {
//                 required: {
//                     value: false,
//                     message: "Invoer nodig",
//                 }
//             }
//         )}
//         errors={errors}
//     />
//     <button type='submit' name='updateName' className={styles.editListButton} >Update</button>
// </>
// ) :
// (
//     <>





