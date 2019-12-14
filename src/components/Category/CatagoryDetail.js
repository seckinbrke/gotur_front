import React from 'react';
import '../../MainPage/MainPage.css';
import Auxx from '../../hoc/Auxx';
import Post from '../Post/Post';
import axios from 'axios';
import Spinner from '../Spinner/Spinner';
import searchIcon from '../../img/search.png';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { connect } from 'react-redux';
import { actions as shoppingItemsActions } from '../../duck/reducers/Redux';


class CatagoryDetail extends React.Component {
    state = {
        data: [],
        unfiltredItems: [],
        categoryItems: [],
        query: "",
        error: false,
        isVisible: true,
        showPopup: false,
        selectedItem: {}
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
        let body = { name: this.state.query, mainType: this.props.location.state.item.mainType }
        let REQUEST_URL = 'http://goturapp.herokuapp.com/enroll/getFilteredItem';
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
    handleChange = (event) => {
        this.setState({
            query: event.target.value,
        }, () => {
            if (this.state.query.length === 0)
                this.setState({ data: this.state.unfiltredItems })
        });
    }

    renderPopUp() {
        const { showPopup, selectedItem } = this.state;
        if (showPopup) {
            return (
                <div className='popup'>
                    <div className='popup_inner'>
                        <button onClick={() => this.setState({ showPopup: !showPopup })}>X</button>
                        <h1>{selectedItem.name}</h1>
                        <h5>{selectedItem.subType}</h5>
                        <img style={{ width: 50, height: 50 }} src={selectedItem.productPhoto} alt="" />
                        <h1>{selectedItem.price} ₺</h1>
                        <button onClick={() => this.mergeItems(selectedItem)}>Sepete Ekle</button>
                    </div>
                </div >
            );
        }
    }
    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }
    /*
    store.subscribe(() => {
    // persist your state
    })
    */
    mergeItems = (item) => {
        this.props.setTotalPrice(0);
        let mergedItems = this.props.shoppingItems;
        let mergedItemsStorage = JSON.parse(localStorage.getItem('shoppingItems'));
        mergedItems.push(item)
        mergedItemsStorage.push(item)
        localStorage.setItem('shoppingItems', JSON.stringify(mergedItemsStorage));
        this.props.setShoppingItem(mergedItems);
        localStorage.setItem('shoppingItemCount', mergedItems.length);
        this.props.setShoppingItemCount(mergedItems.length);
        let total = 0;
        mergedItems.map((item) => { return total += item.price })
        console.log(total)
        localStorage.setItem('totalPrice', total);
        this.props.setTotalPrice(total);
        //
    }
    renderItems = () => {
        if (this.state.isVisible) {
            return (
                <Spinner />
            )
        }
        //this.mergeItems(data)
        else {
            return this.state.data.map(data => {
                return <Post key={data._id}
                    title={data.name}
                    link={data.productPhoto}
                    price={data.price}
                    onClickPlus={() => {this.mergeItems(data)}}
                    onClick={() => { this.setState({ selectedItem: data, showPopup: true }) }} />
            })
        }
    }
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.getItems()
        }
    }
    render() {
        let nameTag = this.state.query.length === 0 ? <p className="categoryText">Kategoriler</p> : <p>"{this.state.query}" için bulunan ürünler...</p> //Arda bunu sekil yap
        return (
            <Auxx>
                {this.renderPopUp()}
                <div className="MainPage">
                    <div className="wrap">
                        <div className="search">
                            <input
                                value={this.state.query}
                                onChange={(query) => this.handleChange(query)}
                                type="text"
                                className="searchTerm"
                                onKeyDown={this._handleKeyDown}
                                placeholder="Hangi ürünü aramıştınız?" />
                            <button onClick={() => this.getItems()} type="submit" className="searchButton">
                                <img className="searchIcon" src={searchIcon} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
                {this.renderItems()}
            </Auxx>
        );
    }
}
const mapStateToProps = ({ Redux: { shoppingItems, isVisibleBasket, shoppingItemCount, totalPrice } }) => ({
    shoppingItems, isVisibleBasket, shoppingItemCount, totalPrice
})
const mapDispatchToProps = (dispatch) => ({
    setShoppingItem: (shoppingItems) => dispatch(shoppingItemsActions.setShoppingItem(shoppingItems)),
    setIsVisibleBasket: (isVisibleBasket) => dispatch(shoppingItemsActions.setIsVisibleBasket(isVisibleBasket)),
    setShoppingItemCount: (shoppingItemCount) => dispatch(shoppingItemsActions.setShoppingItemCount(shoppingItemCount)),
    setTotalPrice: (totalPrice) => dispatch(shoppingItemsActions.setTotalPrice(totalPrice)),
})
export default connect(mapStateToProps, mapDispatchToProps)(CatagoryDetail);


