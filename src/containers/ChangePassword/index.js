import React, { Component } from 'react'
import { connect } from 'react-redux'

import { requestChangePass } from '../../actions/users';
import PasswordForm from './PasswordForm';

export class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleSubmit(values,  dispatch){        
        console.log(values)
    }
    render() {
        return (
            <div>
                <PasswordForm 
                    onSubmit={this.handleSubmit} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    requestChangePass: (payload)=> dispatch(requestChangePass(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)
