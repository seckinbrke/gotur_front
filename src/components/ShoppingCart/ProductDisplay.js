import React from 'react';
import CartItem from './CartItem.js';

class ProductDisplay extends Components {
    //Items state arrayi yapmamiz lazim buraya
    items = {
        name:'Elma',
        price:'7',
        number:'1'
    }
    cartList = this.items.map((name,index) => {
        <CartItem name={name} price={price} number={number} key={index}/>
    })

}
export default ProductDisplay;