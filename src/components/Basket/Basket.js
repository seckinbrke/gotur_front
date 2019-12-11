import React from 'react';
import './Basket.css'
import goturIcon from '../../img/gotur.png'


class Basket extends React.Component {
    state = {
        isVisible: false,
    }
    render() {
        return (
            <div onClick={() => {
                this.setState({ isVisible: !this.state.isVisible })
                console.log(this.state.isVisible)
            }} className="MainDiv" >
                <div className="BoxDiv">
                    <i class="fas fa-shopping-cart"></i>
                </div>
                <img className="Image" src={goturIcon} alt="" />
            </div>
        );
    }
}
export default Basket;


