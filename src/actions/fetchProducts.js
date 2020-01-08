import axios from 'axios';
import {CONSTANSTS,fetchProductsBegin,fetchProductsSuccess,fetchProductsFailure,fetchProductsPending,fetchProductsError} from "./"
const baseUrl = "http://localhost:8000/api/"
let values;


function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsPending());
        axios.get(baseUrl+"cards/1/1")
        .then(res => res.json())
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchProductsSuccess(res.data))
            return res.data;
        })
        .catch(error => {
            dispatch(fetchProductsError(error));
        })
    }
}

export default fetchProducts;

