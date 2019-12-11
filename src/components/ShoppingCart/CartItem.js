import React from 'react';
import plusIcon from '../../img/plusIcon';
import minusIcon from '../../img/minusIcon'

const cartItem = (props) => { 
    name = props.name;
    price = props.price;
    number = props.number;
    return(
    <div className='cartItem'>
        <p>{name}  {price} {number}</p>
        //artı ve eksi butonlarına onClick eklenecek
        <div className='plusDiv'>
            <img className="Image" src={plusIcon} alt="" />
        </div>
        <div className='minusDiv'>
            <img className="Image" src={minusIcon} alt="" />
        </div>
       </div>
    )
}
addOne = () => {
    this.number++;
} 
removeOne = () => {
    this.number--;
} 

export default cartItem;