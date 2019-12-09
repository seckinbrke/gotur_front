import React from 'react';



import './CategoryItem.css';

const CategoryItem = (props) => (
   // <Link to={'/' + props.title}>
        <article className="PostCatagory">
            <div className="TitleCatagory" >
                <h3 style={{fontSize:15}}>{props.title}</h3>
            </div>
            <div className="InfoCatagory">
                <img className="ImagesCatagory" src={props.link} alt="" />
            </div>
        </article>
   // </Link>
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