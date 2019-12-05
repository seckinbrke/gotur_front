import React from 'react';
import { Link } from 'react-router-dom';



import './CategoryItem.css';

const CategoryItem = (props) => (
    <Link to={'/' + props.title}>
        <article className="Post">
            <div className="Title" >
                <h3>{props.title}</h3>
            </div>
            <div className="Info">
                <img className="Images" src={props.link} alt="" />
            </div>
        </article>
    </Link>
);

export default CategoryItem;

// getCatItem = async () => {
//     this.setState({ isVisible: true })
//     let body = { mainType: props.title }
//     let REQUEST_URL = 'http://goturapp.herokuapp.com/enroll/getCategoryItems ';
//     await axios.post(REQUEST_URL, body)
//         .then(response => response)
//         .then(responseData => {
//             console.warn(responseData.data)
//             this.setState({ data: responseData.data })
//         })
//         .catch(error => {
//             this.setState({ error: true });
//         })

// }