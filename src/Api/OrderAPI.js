import axios from 'axios';

export const getOrders = () => {
    return new Promise((resolve, reject) => {
        let REQUEST_URL = "http://goturapp.herokuapp.com/order/get";
        axios.get(REQUEST_URL)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(null);
            })
    });
};