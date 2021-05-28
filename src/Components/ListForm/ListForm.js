import React, { useState, useEffect, useRef } from 'react';
import styles from './ListForm.module.css'

function ListForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    console.log('zit hier wat???', input)

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();

    },[input])



    function handleChange(data) {
        setInput(data.target.value);
    }

    function handleDataSubmit(data) {

            data.preventDefault();
            props.onSubmit({
                id: Math.floor(Math.random() * 10000),
                text: input
            });
            setInput('');
    }

    return(
        <div>
            <form onSubmit={handleDataSubmit}>{props.edit ? (
                <>
                <input type='text'
                       placeholder='Update'
                       value={input}
                       name='text'
                       onChange={handleChange}
                       ref={inputRef}
                       className={styles.EditListInput}
                />
                <button type='submit' className={styles.editListButton} >Update</button>
                </>
                ) :
                (
                <>
                <input type='text'
                placeholder='Add list'
                value={input}
                name='text'
                onChange={handleChange}
                ref={inputRef}
                className={styles.addListInput}
                />
                <button type='submit' className={styles.addListButton} >Create list!</button>
                </>
                )}

            </form>
            {console.log("value input?", input)}
        </div>
    );
}


export default ListForm;

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