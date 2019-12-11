import React from 'react';
import CartItem from './CartItem.js';

class ProductDisplay extends React.Components {
    //Items state arrayi yapmamiz lazim buraya
    items = [
        {
            name: 'Elma',
            price: '7',
            number: '1'
        }
    ]
    renderItems() {
        this.items.map((item, index) => {
            return (
                <CartItem name={item.name} price={item.price} number={item.number} key={index} />
            )
        })
    }


    render() {
        return (
            <div>
                {this.renderItems()}
            </div>
        )
    }

}
export default ProductDisplay;