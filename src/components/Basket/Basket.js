import React from 'react';
import './Basket.css'
import goturIcon from '../../img/gotur.png'


class Basket extends React.Component {
    state = {
        data: [],
        unfiltredItems: [],
        categoryItems: [],
        query: "",
        error: false,
        isVisible: true
    }
    render() {
       
        return (
           <div className="MainDiv"  >
             <img className="Image" src={goturIcon} alt="" />
           </div>
        );
    }
}
export default Basket;


