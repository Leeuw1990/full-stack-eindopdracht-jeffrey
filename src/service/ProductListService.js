import http from '../http-common';

    const getAll = async () => {
        return http.get('/productlist');
    }

    const updateProductList = (listName) => {
        return http.put('/productlist', listName);
    }

    const removeProductList = (listId) => {
        return http.delete(`/productlist/${listId}`);
    }

    const addProductList = (listName) => {
        return http.post('/productlist', listName);
    }

export default {
    getAll,
    updateProductList,
    removeProductList,
    addProductList
}