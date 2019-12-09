import React from 'react';
import './Getir.css';
import Auxx from '../hoc/Auxx';
import Post from '../components/Post/Post';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';
import "react-responsive-carousel/lib/styles/carousel.min.css";


class CatagoryDetail extends React.Component {
    state = {
        data: [],
        categoryItems: [],
        query: "",
        error: false,
        isVisible: true
    }
    componentDidMount() {
        this.getItem();
    }
    getItem = async () => {
        this.setState({ isVisible: true })
        console.log(this.props.location.state.item)
        let body = { mainType: this.props.location.state.item.mainType }
        let REQUEST_URL = 'http://goturapp.herokuapp.com/enroll/getCategoryItems';
        await axios.post(REQUEST_URL, body)
            .then(response => response)
            .then(responseData => {
                console.warn(responseData.data)
                this.setState({ data: responseData.data, isVisible: false })
            })
            .catch(error => {
                this.setState({ error: true, isVisible: false });
            })

    }

    renderItems = () => {
        if (this.state.isVisible) {
            return (
                <Spinner />
            )
        }
        else {
            return this.state.data.map(data => {
                return <Post key={data._id}
                    title={data.name}
                    link={data.productPhoto}
                    price={data.price} />
            })

        }
    }

    render() {
        let nameTag = this.state.query.length === 0 ? <p className="categoryText">Kategoriler</p> : <p>"{this.state.query}" için bulunan ürünler...</p> //Arda bunu sekil yap
        return (
            <div>
                <Auxx>
                    {this.renderItems()}
                </Auxx>
            </div>


        );
    }
}
export default CatagoryDetail;
