import axios from 'axios';

export const getCategories = () => {
    return new Promise((resolve, reject) => {
        let REQUEST_URL = "http://goturapp.herokuapp.com/mainType/get";
        axios.get(REQUEST_URL)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(null);
            })
    });
};

export const getCategoryProducts = ({body=null}) => {
    return new Promise((resolve, reject) => {
        let REQUEST_URL = "http://goturapp.herokuapp.com/enroll/getCategoryItems";
        axios.post(REQUEST_URL,body)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(null);
            })
    });
};
export const getSubTypes = ({body=null}) => {
    return new Promise((resolve, reject) => {
        let REQUEST_URL = "http://goturapp.herokuapp.com/enroll/getSubTypes";
        axios.post(REQUEST_URL,body)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(null);
            })
    });
};
export const addProduct = ({body=null}) => {
    return new Promise((resolve, reject) => {
        let REQUEST_URL = "http://goturapp.herokuapp.com/product/add";
        axios.post(REQUEST_URL,body)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(null);
            })
    });
};

export const deleteProduct = ({body=null}) => {
    return new Promise((resolve, reject) => {
        let REQUEST_URL = "http://goturapp.herokuapp.com/product/remove/" + body._id;
        axios.delete(REQUEST_URL,body)
            .then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(null);
            })
    });
};

