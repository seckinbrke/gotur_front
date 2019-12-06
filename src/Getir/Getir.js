import React from 'react';
import './Getir.css';
import logo from '../img/gotur.png';
import searchIcon from '../img/search.png'
import Auxx from '../hoc/Auxx';
import Post from '../components/Post/Post';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';
import CategoryItem from '../components/Category/CategoryItem/CategoryItem';




class Getir extends React.Component {
    state = {
        data: [],
        categoryData: [],
        error: false,
        query: "",
        isVisible: true
    }
    componentDidMount() {
        this.getCategory();
    }
    getItem = async () => {
        if (this.state.query.trim() !== "") {
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
    }
    getCategory = async () => {
        // this.setState({ isVisible: true })
        // let body = { name: this.state.query }
        let REQUEST_URL = 'http://goturapp.herokuapp.com/mainType/get';
        await axios.get(REQUEST_URL)
            .then(response => response)
            .then(responseData => {
                console.warn(responseData.data)
                this.setState({ categoryData: responseData.data, isVisible: false })
            })
            .catch(error => {
                this.setState({ error: true });
            })
    }
    handleChange(event) {
        this.setState({ query: event.target.value }, () => {  //Callback yapiliyor once this.setState renderlaniyor sonra getItem()
            this.getItem();
        });
    }
    renderItems = () => {

        if (this.state.isVisible) {
            return (
                <Spinner />
            )
        }
        else {
            if (this.state.query === "") {
                return this.state.categoryData.map(data => {
                    return <CategoryItem key={data._id}
                        title={data.mainType}
                        link={data.typePhoto}
                    />
                });
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
    }
    render() {
        let nameTag = this.state.query.length === 0 ? <p className="categoryText">Kategoriler</p> : <p>"{this.state.query}" için bulunan ürünler...</p> //Arda bunu sekil yap
        return (
            <Auxx>
                <div className="Getir">
                    <img className="Logo" src={logo} />
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
                {nameTag}
                {this.renderItems()}
                {/* <Switch>
                    <Route path="/:title" component={Category} /> 
                </Switch> */}
            </Auxx>
        );
    }
}
export default Getir;
//Denemedafaasdf
