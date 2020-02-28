import React from 'react';
import './App.module.css';
import MainPage from './MainPage/MainPage';
import {
    BrowserRouter as Router,
    Switch,
    withRouter,
    Route,
} from "react-router-dom";
import Headers from './components/NavBar/NavBar'
import CatagoryDetail from './components/Category/CatagoryDetail';
import createHistory from 'history/createBrowserHistory';
import Basket from './components/Basket/Basket';
import { Provider } from 'react-redux'
import store from "./duck/index";
import { connect } from 'react-redux';
import SignIn from './SingIn/SignIn';
import SignUp from './SignUp/SignUp';
import Dashboard from './Dashboard/Dashboard';
import Payment from './Payment/Payment';

export const history = createHistory({ forceRefresh: true })

class Root extends React.Component {
    basket = () => {
        if (this.props.location.pathname !== "signIn") {
            return (
                <Basket />
            )
        }
    }
    render() {
        console.log(history)
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className="App">
                        <Headers />
                        <Switch>
                            <Route path="/" exact initial component={SignIn} />
                            <Route path="/uyeOl" exact component={SignUp} />
                            <Route path="/anasayfa" exact component={MainPage} />
                            <Route path="/catagoryDetail" component={CatagoryDetail} />
                            <Route path="/dashboard" component={Dashboard}/>
                            <Route path="/odeme" exact component={Payment} />
                        </Switch>
                        {/*this.basket()*/}
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
