import React, { useState, useEffect } from 'react';
import ListForm from "../ListForm/ListForm";
import styles from './List.module.css';
import { useHistory } from 'react-router-dom';
import axios from "axios";


function List({removeList, updateList, lists} ) {
    const [listsData, setListsdata] = useState([]);

    // console.log('wat krijg ik??',productLists)

    // console.log('list component', productLists)
    useEffect(()=>  {

    async function fetchData() {

        try {
            const response = await axios.get('http://localhost:8080/productlist/')
            console.log('response list', response)
            setListsdata(response.data)

        } catch (e) {
            console.error(e)
        }
    }
    fetchData()

}, [])
    console.log('hallo?',listsData)

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

    return listsData.map((name, index) => (
        <div key={index}>
            <div className={styles.icon}>

                <div className={styles.listText} key={index} onClick={() => history.push(`/product/${name.listName}`)} >
                    {name.listName}
                </div>


                <div onClick={() => removeList(index)}
                className='deleteIcon'
                >Remove</div>
                <div onClick={() => setEdit({id: name.id, value: name.listName})}
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

// return lists.map((list, index) => (
//     <div key={index}>
//         <div className={styles.icon}>
//
//             <div className={styles.listText} key={list.id} onClick={() => history.push(`/product/${list.text}`)} >
//                 {list.text}
//             </div>
//             {console.log(list)}
//
//             <div onClick={() => removeList(list.id)}
//                  className='deleteIcon'
//             >Remove</div>
//             <div onClick={() => setEdit({id: list.id, value: list.text})}
//                  className='editIcon'
//             >Edit</div>
//         </div>
//     </div>