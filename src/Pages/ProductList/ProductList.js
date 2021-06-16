import React from 'react';
import  {useContext} from 'react'
import { Link } from 'react-router-dom';
import ListComponent from "../../Components/ListComponent/ListComponent";
import './ProductList.css'
import Button from "../../Components/Buttons/Button";
import ListForm from "../../Components/ListForm/ListForm";
import List from "../../Components/List/List";
import {AuthContext} from "../../Context/AuthContext";

function ProductList() {
    return(
        <div className='overAllSize' >
            <div className='productListField'>

                <Link to="/profile">
                <Button
                    type='button'
                    name='profile'
                    title='Profile'
                />
                </Link>
                {/*<ListComponent />*/}
                <ListForm/>
                <List/>

            </div>

      </div>
    );
}


export default ProductList;