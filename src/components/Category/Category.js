import React, { Component } from 'react';
import axios from 'axios';

class Category extends Component {
    state = {
        data: []
    }
    getFilteredItem = async () => {
        this.setState({ isVisible: true })
        let body = { mainType: this.props.title }
        let REQUEST_URL = 'http://goturapp.herokuapp.com/enroll/getCategoryItems ';
        await axios.post(REQUEST_URL, body)
            .then(response => response)
            .then(responseData => {
                console.warn(responseData.data)
                this.setState({ data: responseData.data })
            })
            .catch(error => {
                this.setState({ error: true });
            })

    }
    render() {
        return (
            <h4></h4>
        );
    }
}

export default Category;
