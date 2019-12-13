import React from 'react';
import './Basket.css'
import { connect } from 'react-redux'
import { actions as shoppingItemsActions } from '../../duck/reducers/Redux';
import MinusIcon from '../../img/minusIcon.png'

class Basket extends React.Component {
    state = {
        shoppingItemCount: this.props.shoppingItemCount
    }

    renderItems() {
        console.log(this.props)
        return this.props.shoppingItems.map((item, index) => {
            return (
                <div key={index} className='CartItem'>
                    <img alt="" style={{ width: 40, height: 40,flex:0.2 }} src={item.productPhoto}></img>
                    <p className='CartName' style={{flex:0.7}}>{item.name}</p>
                    <p className='CartName' style={{marginLeft:10}} style={{flex:0.1}}>{item.price}₺</p>
                    <img onClick={() => this.deleteItem(item, index)}  className="MinusIcon" style={{flex:0.1}}src={MinusIcon}/>
                </div>
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

    renderShoppingCart = () => {
        if (this.props.isVisibleBasket) {
            return (
                <div className="ShoppingCart">
                    <ul className='ShoppingList'> {this.renderItems()}</ul>
                    <div className='Checkout'>{this.props.totalPrice}</div>
                </div>
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderShoppingCart()}
                <div onClick={() => {
                    this.props.setIsVisibleBasket(!this.props.isVisibleBasket)
                }} className="MainDiv" >
                    <div className="BoxDiv">
                        <i className="fas fa-shopping-cart"></i>
                        {this.props.shoppingItemCount}
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


