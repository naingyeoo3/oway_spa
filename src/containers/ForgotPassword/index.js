import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../../utils/history';

import OtpInput from 'react-otp-input';
import { message, Modal, Button } from 'antd';

import ForgotPasswordForm from './ForgotPasswordForm';

import { 
    forgotPasswrod,
    verifyUserOtp,
    requestOtpHide 
} from '../../actions/users';

import { 
    USER_API_KEY, 
    VERIFY_KEY 
} from '../../constants/credentials';

export class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEmail: true,
            showAlert: true,
            otp: ''
        };
    }
    componentDidUpdate(){
        const { users } = this.props;
        const { showAlert } = this.state;
        if(showAlert && users.user){
            message.info(users.user.message)
            this.setState({showAlert: false})               
        }
    }
    
    handleSubmit(values, dispatch){
        const payload = {
            "channelType": 1,
            "email": values.email ? values.email : '',
            "phoneCode": values.phoneCode ? values.phoneCode : '',
            "phoneNumber": values.phoneNumber ? values.phoneNumber : '',
            "apiKey": USER_API_KEY
        }
        dispatch(forgotPasswrod(payload))
    }

    handleChange = otp => this.setState({ otp });

    handleVerify(){
        const { form } = this.props;
        const { otp } = this.state;
        if(otp){        
            const  payload = Object.assign({}, form.forgotform.values , 
              {
                "channelType": 2,
                "apiKey": VERIFY_KEY,            
                "activationCode": Number(this.state.otp)
              })
              this.props.verifyUserOtp(payload);
              setTimeout(() => {
                this.setState({showAlert: true})  
              }, 200);
          }else{
            message.info('will be correct otp')  
          }        
      }

    renderModal(){
        return (
            <Modal
          title="OTP"
          visible={this.props.users.otpConfirm}  
          onCancel={()=> this.props.requestOtpHide()}            
          footer={[
            <Button 
              key="login-go-back"
              onClick={()=> history.push('/')}
            >
              go back to Home?
            </Button>,          
            <Button 
              key="verify" 
              type="primary" 
              loading={this.props.users.isFetching} 
              onClick={()=> this.handleVerify()}>
              verify
            </Button>
          ]}
        >
          return back your email and check otp code
            <OtpInput 
                numInputs={6}
                value={this.state.otp}
                onChange={this.handleChange}
                separator={<span>-</span>}
            />
        </Modal>
        )        
    }
    render() {
        return (
            <div>
                <div>
                    <button onClick={()=> this.setState({isEmail: false})}>Phone</button>
                    <button onClick={()=> this.setState({isEmail: true})}>Email</button>
                </div>
                <ForgotPasswordForm 
                    isEmail={this.state.isEmail}
                    onSubmit={this.handleSubmit}
                    isFetching={this.props.users.isFetching}/>                    
                {this.renderModal()}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users,
    form: state.form
})

const mapDispatchToProps = (dispatch) => ({    
    forgotPasswrod: (payload)=> dispatch(forgotPasswrod(payload)),
    verifyUserOtp : (payload)=> dispatch(verifyUserOtp(payload)),
    requestOtpHide: ()=> dispatch(requestOtpHide())
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
