import http from '../http-common';
import React from 'react';

class ProductListService {

    createProductList(listName) {

        let data = new data();

        data.append('listName', listName)

        return http.post('api/productlist')
    }


    getProductList() {
        return http.get('api/productlist')
    }


}

export default ProductListService;

