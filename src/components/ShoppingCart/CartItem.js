import React from 'react';
import plusIcon from '../../img/plusIcon.png';
import minusIcon from '../../img/minusIcon.png'


class CartItem extends React.Component {
    //Items state arrayi yapmamiz lazim buraya
    /*
     <div className='plusDiv'>
                        <img className="Image" src={plusIcon} alt="" />
                    </div>
                    <div className='minusDiv'>
                        <img className="Image" src={minusIcon} alt="" />
                    </div>
    */
    state = {
        name:this.props.name,
        price:this.props.price
    }
    componentDidMount() {
        this.setState({
            name:this.props.name,
            price:this.props.price
        })
    }
    render() {
        return (
            <div className='CartItem'>
                <p className='CartName'>{this.state.name} /{this.state.price}</p>
            </div>
        )
    }

}
export default CartItem;