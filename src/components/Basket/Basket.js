import React from 'react';
import './Basket.css'
import ShoppingCart from '../ShoppingCart/ShoppingCart'


class Basket extends React.Component {
    state = {
        isVisible: false,
    }
    renderShoppingCart = () => {
        if (this.state.isVisible) {
            return (
                <ShoppingCart shoppingItems={this.props.shoppingItems} />
            )
        }
    }
    render() {
        return (
            <div>
                {this.renderShoppingCart()}
                <div onClick={() => {
                    this.setState({ isVisible: !this.state.isVisible })
                    console.log(this.state.isVisible)
                }} className="MainDiv" >
                    <div className="BoxDiv">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                </div>
            </div>
        );
    }
}
export default Basket;


