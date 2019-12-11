import React from 'react';
import CartItem from './CartItem';

class ProductDisplay extends React.Component {
  
    renderItems() {
        console.log(this.props.shoppingItems)
        return this.props.shoppingItems.map((item, index) => {
            return (
                <CartItem name={item.name} price={item.price}key={index} />
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