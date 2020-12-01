import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../utils/history';

import LoginForm from './LoginForm';

import { requestUserLogin } from '../../actions/users';

import { USER_API_KEY } from '../../constants/credentials';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailLogin: true
        };
    }                

    handleSubmit(values,  dispatch){        
        const payload = {
            "apiKey": USER_API_KEY,
            "email": values.email ? values.email : '',
            "phoneCode": values.phoneCode ? values.phoneCode : '',
            "phoneNumber": values.phoneNumber ? values.phoneNumber : '',
            "password": window.btoa(values.password.trim().replace(/[a-z]/gi,char => /[a-z]/.test(char)? char.toUpperCase(): char.toLowerCase()).split('').reverse().join('')),            
            "channelType": 1,
            "userType": 1,
            "deviceId": "2793460186",
            "deviceType": [
                "windows",
                "Chrome "
            ],
            "loc": [
                "Singapore",
                "SG",
                "18.136.185.14"
            ]
        }
        dispatch(requestUserLogin(payload))        
        // history.push('/')
    }
  
    render() { 
        const { users } = this.props;
        const { emailLogin } = this.state;
        return (
            <div>
                <div>
                    <button onClick={()=> this.setState({emailLogin: false})}>Phone</button>
                    <button onClick={()=> this.setState({emailLogin: true})}>Email</button>
                </div>
                <LoginForm 
                    onSubmit={this.handleSubmit} 
                    emailLogin={emailLogin}
                    isFetching={users.isFetching}
                    />           
                <Link to="/forgot-password">forgot password?</Link>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        requestUserLogin: (payload) => dispatch(requestUserLogin(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)