import React, { useState, useEffect } from 'react';
import styles from './List.module.css';
import { useHistory } from 'react-router-dom';
import axios from "axios";


function List() {
    const [listsData, setListsdata] = useState([]);
    const history = useHistory();

    useEffect(()=>  {

    async function fetchData() {
        try {
            const response = await axios.get('http://localhost:8080/api/productlist/')
            console.log('response list', response)
            setListsdata(response.data)

        } catch (e) {
            console.error(e)
        }
    }
    fetchData()

}, [])


    async function deleteData(listId) {
        try {
            await axios.delete(`http://localhost:8080/api/productlist/${listId}`, {
                method: "DELETE",
            }).then(()=>{
                window.location.reload(false);
            })

        } catch (e) {
            console.error(e)
        }
    }

    async function updateData(listId) {
        try {
            await axios.put(` http://localhost:8080/api/productlist${listId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify,

            }).then(() => {
                console.log("List updated")
            })

        } catch (e) {
            console.log(e)
        }
    }



    // if(updateData) {
    //     return <ListForm onSubmit={updateData}/>
    // }
    // console.log('wat zit er in edit?')

    return listsData.map((name, index) => (
        <div key={index}>
            <div className={styles.icon}>

                <div className={styles.listText} key={index} onClick={() => history.push(`/product/${name.productList_id}`)} >
                    {name.listName}
                </div>

                <div onClick={() => deleteData(name.productList_id)}
                className='deleteIcon'
                >Remove</div>
                {console.log('DELETE!!!!', name.productList_id)}
                {/*<div onClick={() => updateData(name.productList_id)}*/}
                {/*className='editIcon'*/}
                {/*>Edit</div>*/}
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