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
import store from "./duck/index.js";
import { connect } from 'react-redux';
import { actions as shoppingItemsActions } from './duck/Redux';
export const history = createHistory({ forceRefresh: true })

class Root extends React.Component {

    render() {
        console.log(this.props.shoppingItems)
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className="App">
                        <Headers />
                        {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
                        <Switch>
                            <Route path="/" exact initial component={MainPage} />
                            <Route path="/catagoryDetail" component={CatagoryDetail} />
                        </Switch>
                        <Basket shoppingItems={this.props.shoppingItems} />
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
