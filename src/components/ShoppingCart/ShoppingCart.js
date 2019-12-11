import React from 'react';
import ProductDisplay from './ProductDisplay';
import './ShoppingCart.css' 

export default class ShoppingCart extends React.Component {
    //Items state arrayi yapmamiz lazim buraya

    render() {
        return (
            <div className="ShoppingCart">
                <ProductDisplay shoppingItems={this.props.shoppingItems} checkout={this.props.checkout} />
            </div>
        )
    }

}