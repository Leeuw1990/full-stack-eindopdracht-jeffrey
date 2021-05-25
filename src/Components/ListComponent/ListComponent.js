import React, { useState } from 'react';
import ListForm from "../ListForm/ListForm";
import List from "../List/List";
import styles from './ListComponent.module.css'



function ListComponent() {
    const [lists, setLists] = useState([])


    //Zit functie in die spaties aan elkaar zet.
    function addList(list) {
        if(!list.text || /^\s*$/.test(list.text)) {
            return;
        }
        const newList = [list, ...lists]
        setLists(newList)
    }

    // functie doet het niet goed. Krijg undifined uit newValue, hoe los ik dit op???
    function updateList(listId, newValue) {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
            return;
        }
        setLists(prev => prev.map(item => (item.id === listId ? newValue : item))
        );
    }


    function removeList(id) {
        const removeAtt = [...lists].filter(list => list.id !== id)
        setLists(removeAtt)
    }

    //functie ombouwen om naar Product te navigeren.
    // 1. useHistory importeren.
    // 2. useHisorty.push gebruiken in complete.
    // 3. dynamsiche id link naar juiste list.
    // - Klik op lijst, localhost:3000/product/{id}
    // function completeList() {
    //
    //     return history.push("/product");
    // }


    return(
        <div className={styles.listComponent}>
        <ListForm onSubmit={addList}/>
        <List
        lists={lists}
        // completeList={completeList}
        removeList={removeList}
        updateList={updateList}
        />
        </div>
    )
}

export default ListComponent;

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