import React from 'react';
import { Link } from 'react-router-dom';
import ListComponent from "../../Components/ListComponent/ListComponent";
import './ProductList.css'
import Button from "../../Components/Buttons/Button";

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

        <ListComponent />
            </div>

      </div>
    );
}


export default ProductList;