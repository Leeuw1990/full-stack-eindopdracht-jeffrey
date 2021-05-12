import React, { useState, useEffect, useRef } from 'react';
import styles from './ListForm.module.css'


function ListForm(props) {
    const [input, setInput] = useState(props.edit ? props.edit.value : '');

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();

    },[input])

    function handleChange(e) {
        setInput(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onSubmit({
            id: Math.floor(Math.random() * 10000),
            text: input
        });
        setInput('');
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className={styles.addList}>{props.edit ? (
                <>
                <input type='text'
                       placeholder='Update'
                       value={input}
                       name='text'
                       onChange={handleChange}
                       ref={inputRef}
                       className={styles.EditListInput}
                />
                <button className={styles.editListButton} >Update</button>
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
                <button className={styles.addListButton} >Create list!</button>
                </>
                )}

            </form>
        </div>
    );
}


export default ListForm;