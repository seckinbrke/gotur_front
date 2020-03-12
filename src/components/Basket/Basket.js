import React from 'react';
import './Basket.css'
import { connect } from 'react-redux'
import { actions as shoppingItemsActions } from '../../duck/reducers/Redux';
import MinusIcon from '../../img/minusIcon.png'
import { history } from '../../App';
import axios from 'axios';

class Basket extends React.Component {
    state = {
        shoppingItemCount: this.props.shoppingItemCount,
        showAlert: false,
        userInformation: {},

    }
    // componentDidMount() {
    //     localStorage.setItem('shoppingItems', JSON.stringify([]));
    //     localStorage.setItem('shoppingItemCount', "0");
    //     localStorage.setItem('totalPrice', "0");
    //     this.props.setShoppingItem([])
    //     this.props.setShoppingItemCount(0);
    //     this.props.setTotalPrice(0);
    // }


    renderItems() {

        return this.props.shoppingItems.map((item, index) => {
            return (
                <li key={index} className='CartItem'>
                    <img alt="" style={{ width: 30, height: 30, flex: 0.1, borderRadius: 10 }} src={item.productPhoto}></img>
                    <p className='CartName' style={{ flex: 0.8, fontSize: 13 }}>{item.name}</p>
                    <p className='CartName' style={{ flex: 0.1 }}>{item.price}₺</p>
                    <img onClick={() => this.deleteItem(item, index)} className="MinusIcon" style={{ flex: 0.1 }} src={MinusIcon} />
                </li>
            )
        })
    }

    deleteItem = (item, index) => {
        let shoppingItemCount = JSON.parse(localStorage.getItem('shoppingItemCount'));
        let totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
        let shoppingBox = this.props.shoppingItems;
        shoppingBox.splice(index, 1)
        this.props.setShoppingItem(shoppingBox)
        localStorage.setItem('shoppingItems', JSON.stringify(shoppingBox));
        setTimeout(() => {
            this.props.setIsVisibleBasket(false);
            this.props.setIsVisibleBasket(true);
        }, 1)
        localStorage.setItem('shoppingItemCount', shoppingItemCount - 1);
        this.props.setShoppingItemCount(shoppingItemCount - 1)
        localStorage.setItem('totalPrice', totalPrice - item.price);
        this.props.setTotalPrice(totalPrice - item.price)

    }
    renderPopUp() {
        const { showAlert } = this.state;
        if (showAlert) {
            return (
                <div className='Alert'>
                    <div className='Alert_inner'>
                        <h1 className='AlertName'>Siparişleriniz yola çıktı.</h1>
                        <h5 className='AlertSubType'>Götür dedin götürüyoruz.</h5>
                        <button className='AlertButton' onClick={() => { this.setState({ showAlert: !showAlert }) }}>Götür bakalım</button>
                    </div>
                </div >
            );
        }
    }
    async orderCompleted() {
        let userInformation = JSON.parse(localStorage.getItem('userInformation'));
        if (userInformation[0].USER.creditCardNo === null) {
            history.push({ pathname: '/odeme' })
        } else {
            let REQUEST_URL = 'http://goturapp.herokuapp.com/order/add';
            let orderObj = {
                userName: userInformation[0].USER.name,
                userSurname: userInformation[0].USER.surname,
                userId: userInformation[0].USER._id,
                userPhoneNumber: userInformation[0].USER.phoneNumber,
                userAddress: userInformation[0].USER.address,
                userCreditCardInfo: [{
                    creditCardNo: userInformation[0].USER.creditCardNo,
                    creditCardCvc: userInformation[0].USER.creditCardCvc,
                    creditCardDate: userInformation[0].USER.creditCardDate,
                    creditCardNameSurname: userInformation[0].USER.creditCardNameSurname,
                }],
                shoppingItems: this.props.shoppingItems
            }
            let body = {
                orderObj: orderObj
            }
            await axios.post(REQUEST_URL, body)
                .then(response => response)
                .then(responseData => {
                    if (responseData.status === 200) {
                        console.log(responseData)
                        this.props.setIsVisibleBasket(false);
                        localStorage.setItem('shoppingItems', JSON.stringify([]));
                        localStorage.setItem('shoppingItemCount', "0");
                        localStorage.setItem('totalPrice', "0");
                        this.props.setShoppingItem([])
                        this.props.setShoppingItemCount(0);
                        this.props.setTotalPrice(0);
                        this.setState({
                            showAlert: !this.state.showAlert
                        });
                    } else {
                        console.log(responseData)
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    renderShoppingCart = () => {
        if (this.props.isVisibleBasket) {
            return (
                <div className="ShoppingCart">
                    <div className="BasketTitle">Sepetim</div>
                    <ul className='ShoppingList'> {this.renderItems()}</ul>
                    <div className="TotalPriceDiv">
                        <p className="TotalPriceText">Toplam: {this.props.totalPrice} ₺</p>
                        <button onClick={() => this.orderCompleted()} className="CheckOut">Siparişi Tamamla</button>
                    </div>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderPopUp()}
                {this.renderShoppingCart()}
                <div onClick={() => {
                    this.props.setIsVisibleBasket(!this.props.isVisibleBasket)
                }} className="MainDiv" >
                    <div className="BoxDiv">
                        <i className="fas fa-shopping-cart"></i>
                        <p className="ItemCount">{this.props.shoppingItemCount}</p>
                    </div>
                </div>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Basket);


