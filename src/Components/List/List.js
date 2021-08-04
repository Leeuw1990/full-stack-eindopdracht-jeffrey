import React, {useState, useEffect} from 'react';
import styles from './List.module.css';
import { useHistory } from 'react-router-dom';
import axios from "axios";


function List() {
    const [listsData, setListsdata] = useState([]);
    const history = useHistory();

    useEffect(()=>  {
    async function fetchData() {
        try {
            const response = await axios.get(`http://localhost:8080/api/productlist`,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
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
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            const deleteList = listsData.filter((result) => result.id !== listId)
            setListsdata(deleteList);
        } catch (e) {
            console.error(e)
        }
    }
    return <div className={styles.infiniteScroll}>
        {
        listsData.length > 0 && listsData.map((name, index) => (
            <div key={index}>
                <div className={styles.icon}>
                    <div className={styles.listText} key={index} onClick={() => history.push(`/product/${name.id}`)}>
                        {name.listName}
                    </div>
                    <div onClick={() => deleteData(name.id)}
                         className='deleteIcon'
                    >Remove
                    </div>
                    {console.log('DELETE!!!!', name.id)}
                </div>
            </div>
        ))}
            </div>
}

export default List;

