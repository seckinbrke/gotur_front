import React from 'react';
import '../../MainPage/MainPage.css';
import Auxx from '../../hoc/Auxx';
import Post from '../Post/Post';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import searchIcon from '../../img/search.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";


class CatagoryDetail extends React.Component {
    state = {
        data: [],
        unfiltredItems: [],
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
                this.setState({ data: responseData.data, unfiltredItems: responseData.data, isVisible: false })
            })
            .catch(error => {
                this.setState({ error: true, isVisible: false });
            })

    }
    getItems = async () => {
        
            this.setState({ isVisible: true })
            let body = { name: this.state.query }
            let REQUEST_URL = 'http://goturapp.herokuapp.com/product/get';
            await axios.post(REQUEST_URL, body)
                .then(response => response)
                .then(responseData => {
                    console.warn(responseData.data)
                    this.setState({ data: responseData.data, isVisible: false })
                })
                .catch(error => {
                    this.setState({ error: true });
                })
        
    }
    handleChange (event) {
        this.setState({ query: event.target.value }, () => {  
            if (this.state.query.length === 0) {
                this.setState({data: this.state.unfiltredItems})
            }
            else {
                this.state.data.filter(item => {
                    this.getItems();
                    return item.name == this.state.query
                       
                    
                })
            }   
        });
        
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
            <Auxx>
                <div className="MainPage">
                    <div className="wrap">
                        <div className="search">
                            <input
                                value={this.state.query}
                                onChange={(query) => this.handleChange(query)}
                                type="text"
                                className="searchTerm"
                                placeholder="Hangi ürünü aramıştınız?" />
                            <button onClick={() => this.getItem()} type="submit" className="searchButton">
                                <img className="searchIcon" src={searchIcon} />
                            </button>
                        </div>
                    </div>
                </div>
                {this.renderItems()}
            </Auxx>
        );
    }
}
export default CatagoryDetail;


