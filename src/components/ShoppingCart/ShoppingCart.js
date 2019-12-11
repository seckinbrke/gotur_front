import React from 'react';
import ProductDisplay from './ProductDisplay.js';

const shoppingCart = props => {
    if (props.items.length === 0) {
        return (
            <div className="EmptyCart">
                Sepetinizde ürün bulunmamaktadır.
            </div>
        )
    } else {
        return (
            <div className="shoppingCart">
                <ProductDisplay items={props.items} checkout={props.checkout} />
            </div>
        )

    }

}
export default shoppingCart;