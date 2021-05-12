import React, { useState } from 'react'
import ListForm from "../ListForm/ListForm";
import styles from './List.module.css'
import { useHistory } from 'react-router-dom'

function List({lists, removeList, updateList} ) {

    const history = useHistory();

    const [edit, setEdit] = useState({
        id: null,
        value: ''
    })

    function submitUpdate(value) {
        updateList(edit.id, value)
        setEdit({
            id: null,
            value: ''
        })
    }

    if(edit.id) {
        return <ListForm edit={edit} onSubmit={submitUpdate}/>
    }

    return lists.map((list, index) => (
        <div key={index}>
            <div className={styles.icon}>

                <div className={styles.listText} key={list.id} onClick={() => history.push(`/product/${list.text}`)} >
                    {list.text}
                </div>

                <div onClick={() => removeList(list.id)}
                className='deleteIcon'
                >Remove</div>
                <div onClick={() => setEdit({id: list.id, value: list.text})}
                className='editIcon'
                >Edit</div>
            </div>
        </div>

        ));
}

export default List;

// <p className={styles.listText} key={list.id} onClick={() => completeList(list.id)}>
//     {list.text}
// </p>