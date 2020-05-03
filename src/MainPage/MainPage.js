import React from 'react';
import './MainPage.css';
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';
import CategoryItem from '../components/Category/CategoryItem/CategoryItem';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { history } from '../App';
import Basket from '../components/Basket/Basket';
import { connect } from 'react-redux';
import { actions as globalActions } from '../duck/reducers/Redux'

class MainPage extends React.Component {
    state = {
        data: [],
        categoryData: [],
        error: false,
        query: "",
        isVisible: true,
        userInformation: null
    }
    componentDidMount() {
        this.getCategory();
        let userInformation = JSON.parse(localStorage.getItem('userInformation'));
        this.setState({
            userInformation: userInformation[0]
        })
    }

    getCategory = async () => {
        // this.setState({ isVisible: true })
        // let body = { name: this.state.query }
        let REQUEST_URL = 'http://goturapp.herokuapp.com/mainType/get';
        await axios.get(REQUEST_URL)
            .then(response => response)
            .then(responseData => {
                console.warn(responseData.data)
                this.setState({ categoryData: responseData.data, isVisible: false })
            })
            .catch(error => {
                this.setState({ error: true });
            })
    }
    handleChange(event) {
        this.setState({ query: event.target.value });
    }
    goDetail(item) {
        history.push({ pathname: "/catagoryDetail", search: "?query=" + item.mainType, state: { item: item } })
    }
    renderItems = () => {
        if (this.state.isVisible) {
            return (
                <Spinner />
            )
        }
        else {
            return this.state.categoryData.map(data => {
                return <CategoryItem key={data._id}
                    title={data.mainType}
                    link={data.typePhoto}
                    onClick={() => this.goDetail(data)}
                />
            });
        }
    }
    render() {
        return (
            <div >
                {this.renderItems()}
                <Basket />
            </div>
        );
    }
}
const mapStateToProps = ({ Redux: { global } }) => ({
    global
})
const mapDispatchToProps = (dispatch) => ({
    setGlobal: (global) => dispatch(globalActions.setGlobal(global)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

