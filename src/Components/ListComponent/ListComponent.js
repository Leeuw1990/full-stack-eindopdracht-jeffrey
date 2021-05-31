import React, { useEffect, useState } from 'react';
import ListForm from "../ListForm/ListForm";
import List from "../List/List";
import styles from './ListComponent.module.css'
import axios from "axios";
import ProductListService from "../../service/ProductListService";


// function ListComponent() {
//     const [lists, setLists] = useState([])
//     const [productLists, setProductLists] = useState([])
//
//     useEffect(()=>  {
//
//     async function fetchData() {
//
//         try {
//             const response = await axios.post('http://localhost:8080/productlist/', {
//                 method: "POST",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify({listName:productLists.listName})
//
//             })
//             setProductLists(response.data)
//
//             // setProductLists(data)
//
//         } catch (e) {
//             console.error(e)
//         }
//     }
//         fetchData()
//
//
//     }, [productLists])



    // function addList(list) {
    //     if (!list.text || /^\s*$/.test(list.text)) {
    //         return;
    //     }
    //     const newList = [list, ...productLists]
    //     setProductLists(newList.text)
    //     console.log('addlist',list.text)
    // }

    // console.log('???????',setProductLists)
    //
    // function updateList(listId, newValue) {
    //     if (!newValue.text || /^\s*$/.test(newValue.text)) {
    //         return;
    //     }
    //     setLists(prev => prev.map(item => (item.id === listId ? newValue : item))
    //     );
    // }
    //
    // function removeList(id) {
    //     const removeAtt = [...lists].filter(list => list.id !== id)
    //     setLists(removeAtt)
    // }
    //
    // return(
    //     <div className={styles.listComponent}>
    //     <ListForm />
    //     <List
    //     lists={productLists}
        // renderLists={}
        // completeList={completeList}
//         removeList={removeList}
//         updateList={updateList}
//         />
//         </div>
//     )
// }
//
// export default ListComponent;

//functie ombouwen om naar Product te navigeren.
// 1. useHistory importeren.
// 2. useHisorty.push gebruiken in complete.
// 3. dynamsiche id link naar juiste list.
// - Klik op lijst, localhost:3000/product/{id}
// function completeList() {
//
//     return history.push("/product");
// }

// function completeList(id) {
//     let updatedLists = lists.map(list => {
//         if (list.id === id) {
//             list.isComplete = !list.isComplete
//         }
//         return list;
//     })
//     setLists(updatedLists);
//     history.push("/product");
// }

// function addList(list) {
//     if(!list.text || /^\s*$/.test(list.text)) {
//         return;
//     }
//     const newList = [list, ...lists]
//     setLists(newList)
// }

// await axios.post('http://localhost:8080/productlist', {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify,
//     listName:lists.listName
// })