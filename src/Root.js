import React from 'react';
import './App.module.css';
import MainPage from './MainPage/MainPage';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Headers from './components/NavBar/NavBar'
import CatagoryDetail from './components/Category/CatagoryDetail';
import createHistory from 'history/createBrowserHistory';
import Basket from './components/Basket/Basket';
import { Provider } from 'react-redux'
import store from "./duck/index";
import { connect } from 'react-redux';
export const history = createHistory({ forceRefresh: true })

class Root extends React.Component {
    func() {
        localStorage.setItem('shoppingItems', JSON.stringify([]));
        localStorage.setItem('shoppingItemCount', "0");
        localStorage.setItem('totalPrice', "0");
        console.log("aasdf")
    }
    render() {
        console.log(this.props.shoppingItems)
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className="App">
                        <Headers/>
                        <Switch>
                            <Route path="/" exact initial component={MainPage} />
                            <Route path="/catagoryDetail" component={CatagoryDetail} />
                        </Switch>
                        <Basket />
                        {/* <button onClick={() => this.func()} style={{ width: 100, height: 100, backgroundColor: 'goldenrod', zIndex: 155 }}>
                        </button> */}
                    </div>
                </Router >
            </Provider>
        );
    }

}
const mapStateToProps = ({ Redux: { shoppingItems } }) => ({
    shoppingItems
})
export default connect(mapStateToProps)(Root);
