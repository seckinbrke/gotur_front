import React from 'react';
import SignInSide from './SingInSide';
class SignIn extends React.Component {
    componentDidMount() {
        localStorage.setItem('userInformation', JSON.stringify([]));
    }
    render() {
        return (
            <div>
                <SignInSide />
            </div>
        );
    }
}
export default SignIn;

