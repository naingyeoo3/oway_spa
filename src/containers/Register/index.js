import React, { Component } from 'react';
import { connect } from 'react-redux';

import RegisterForm from './RegisterForm';

import { requestUserRegister } from '../../actions/users';
import { USER_API_KEY } from '../../constants/credentials';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleSubmit(values, dispatch){
        const payload = {
            "apiKey": USER_API_KEY,
            "email": values.email ? values.email : '',
            "password": window.btoa(values.password.trim().replace(/[a-z]/gi,char => /[a-z]/.test(char)? char.toUpperCase(): char.toLowerCase()).split('').reverse().join('')),
            "confirmPassword": window.btoa(values.confirmPassword.trim().replace(/[a-z]/gi,char => /[a-z]/.test(char)? char.toUpperCase(): char.toLowerCase()).split('').reverse().join('')),
            "phoneCode": values.phoneCode ? values.phoneCode : '',
            "phoneNumber": values.phoneNumber ? values.phoneNumber : '',
            "userType": 1,
            "channelType": 1,
            "deviceId": "3065501690",
            "deviceType": "linux"
        }
        dispatch(requestUserRegister(payload))        
    }
    render() { 
        return (
            <div>
                <RegisterForm onSubmit={this.handleSubmit} />
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
const mapDispatchToProps = (dispatch) => ({
    requestUserRegister: (payload)=> dispatch(requestUserRegister(payload))   
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);