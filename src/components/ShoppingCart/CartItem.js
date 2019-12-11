import React from 'react';
import plusIcon from '../../img/plusIcon';
import minusIcon from '../../img/minusIcon'


class CartItem extends React.Components {
    //Items state arrayi yapmamiz lazim buraya

    render() {
        return (
            <div className='cartItem'>
                <p>{this.props.name} /{this.props.price} / {this.props.number}</p>
                <div className='plusDiv'>
                    <img className="Image" src={plusIcon} alt="" />
                </div>
                <div className='minusDiv'>
                    <img className="Image" src={minusIcon} alt="" />
                </div>
            </div>
        )
    }

}
export default CartItem;