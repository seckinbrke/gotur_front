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
import { Provider } from 'react-redux'
import store from "./duck/index";
import { connect } from 'react-redux';
import SignIn from './SingIn/SignIn';
import SignUp from './SignUp/SignUp';
import Dashboard from './Dashboard/Dashboard';
import Payment from './Payment/Payment';
import Products from './Dashboard/Products';
import AddProduct from './Dashboard/AddProduct';

export const history = createHistory({ forceRefresh: true })

class Root extends React.Component {
   //this.props.location.pathname !== "signIn" (Sayfa dizinini gösteren kod)
    
    render() {
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
                            <Route path="/urunler" component={Products}/>
                            <Route path="/odeme" exact component={Payment} />
                            <Route path="/urunekle" exact component={AddProduct} />

                        </Switch>
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
