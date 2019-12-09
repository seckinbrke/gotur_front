import React from 'react';
import './CategoryItem.css';

class CategoryItem extends React.Component {

    render() {
        const { onClick, title, link } = this.props;
        return (
            <div onClick={onClick}>
                <article className="PostCatagory">
                    <div className="TitleCatagory" >
                        <h3 style={{ fontSize: 15 }}>{title}</h3>
                    </div>
                    <div className="InfoCatagory">
                        <img className="ImagesCatagory" src={link} alt="" />
                    </div>
                </article>
            </div>
        );
    }
}
export default CategoryItem;
                            //Denemedafaasdf


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