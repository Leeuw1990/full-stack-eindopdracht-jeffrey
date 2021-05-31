import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styles from './ListForm.module.css'
import axios from "axios";
import InputField from "../InputField/InputField";

function ListForm(props) {
    // const [productLists, setProductLists] = useState([]);

    const { handleSubmit,register, formState:{errors} } = useForm({
        mode: "onSubmit"
    });

        async function postData(data) {
            console.log('klopt mijn data', data)
            console.log('listname', data.listName)
            try {
                await axios.post('http://localhost:8080/productlist', {
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

        async function updateData() {
            try {
                await axios.put('http://localhost:8080/productlist', {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify,

                }).then(() => {
                    console.log("List updated")
                })

            } catch (e) {
                console.log(e)
            }
        }


    // function handleChange(data) {
    //     setInput(data.target.value);
    // }

    // function handleDataSubmit(data) {

            // data.preventDefault();
            // props.onSubmit({
            //     id: Math.floor(Math.random() * 10000),
            //     text: input
            // });
            // setInput('');
    // }


    return(
        <div>
            <form onSubmit={handleSubmit(postData)}> {props.edit ? (
                         <>
                             <InputField
                                 type="text"
                                 name="updateName"
                                 placeholder="Create list"
                                 fieldRef={register("updateName",
                                     {
                                         required: {
                                             value: true,
                                             message: "Invoer nodig",
                                         }
                                     }
                                 )}
                                 errors={errors}
                             />
                 <button type='submit' name='updateName' className={styles.editListButton} >Update</button>
                        </>
                    ) :
                    (
                        <>
                    <InputField
                        type="text"
                        name="listName"
                        placeholder="Create list"
                        fieldRef={register("listName",
                            {
                                required: {
                                    value: true,
                                    message: "Invoer nodig",
                                }
                            }
                        )}
                        errors={errors}
                    />
                <button type='submit' name='listName' className={styles.addListButton} >Create list!</button>
                        </>
                    )}
            </form>
        </div>
    );
}


export default ListForm;

// <form onSubmit={handleSubmit} className={styles.addList}>{props.edit ? (
//         <>
//             <input type='text'
//                    placeholder='Update'
//                    value={input}
//                    name='text'
//                    onChange={handleChange}
//                    ref={inputRef}
//                    className={styles.EditListInput}
//             />
//             <button className={styles.editListButton} >Update</button>
//         </>
//     ) :
//     (
//         <>
//             <input type='text'
//                    placeholder='Add list'
//                    value={input}
//                    name='text'
//                    onChange={handleChange}
//                    ref={inputRef}
//                    className={styles.addListInput}
//             />
//             <button className={styles.addListButton} >Create list!</button>
//         </>
//     )}
//
// </form>

// async function onSubmit(data) {
//     console.log(data)
//     toggleLoading(true)
//     try {
//         await axios.post("http://localhost:8080/item",{
//             method: "POST",
//             headers: {"Content-Type": "application/json"},
//             body: JSON.stringify,
//             // const result = await axios.post("http://localhost:8080/customer",
//             itemType: data.itemType,
//             // item: data.item,
//             // content: data.content,
//             name: data.name,
//             price: data.price,
//             description: data.description,
//             count: data.count,
//         }).then(() => {
//             console.log("New item added")
//         })
//         toggleRegisterSucces(true)
//         setTimeout(() => {
//             history.push("http://localhost:3000/");
//         }, 2000)
//     } catch (e) {
//         console.error(e)
//     }
//     toggleLoading(false)
// }