import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  Modal, 
  message, 
  Button 
} from 'antd';

import OtpInput from 'react-otp-input';

import Login from '../Login';
import Register from '../Register';

import { 
  requestCountry
 } from '../../actions/countryAction';
import {
  verifyUserOtp,
  requestOtpHide
} from '../../actions/users';

import { 
  CONFIRM_API_KEY,
  VERIFY_KEY 
} from '../../constants/credentials';


class LoginRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginShow: true,
            regShow: false,
            isLoading: true,
            showAlert: true,
            optnum:''
        };
    }
    componentDidMount(){      
      this.detectLoginRegister();
      this.loadCountryList();      
    }
    loadCountryList(){
      const { countryListing } = this.props;
      const payload = {
        "apiKey": CONFIRM_API_KEY,
        "channelType": 1,
      }
      if(countryListing.countryList.length < 1){
        this.props.requestCountry(payload)
      }      
    }
    componentDidUpdate(prevProps){
      const { router, users } = this.props;
      const { showAlert } = this.state;
      if(router.location.pathname != '/'){
        if(prevProps.location.pathname != router.location.pathname){
          this.detectLoginRegister()
        }
      }
      
      if(showAlert && users.user){
        message.info(users.user.message)
        this.setState({showAlert: false})
      }       
    }
    detectLoginRegister(){
      const { router } = this.props;
      if(router.location.pathname.includes('sign-in')){
        this.setState({loginShow: true, regShow: false, isLoading: false})
      }else{
        this.setState({loginShow: false, regShow: true, isLoading: false})
      }
    }
    handleChange = otp => this.setState({ otp });

    handleVerify(){
      const { form } = this.props;
      const { otp } = this.state;
      if(otp){
        if(form.hasOwnProperty('login')){
          const  payload = Object.assign({}, form.login.values , 
            {
              "channelType": 2,
              "apiKey": VERIFY_KEY,            
              "activationCode": Number(this.state.otp)
            })
            this.props.verifyUserOtp(payload);
            setTimeout(() => {
              this.setState({showAlert: true})  
            }, 200);
        }else if(form.hasOwnProperty('register')){
          const  payload = Object.assign({}, form.register.values , 
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
          message.info('please login again')  
        }
      }else{
        message.info('please check email and enter otp code')
      }            
    }

    renderModal(){
      return (
          <Modal
        title="OTP"
        visible={this.props.users.otpConfirm}              
        footer={[
          <Button 
            key="login-go-back"
            onClick={()=> this.props.requestOtpHide()}
          >
            go back to Login?
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
        const { countryListing, users } = this.props;
        const { isLoading, loginShow, regShow } = this.state;
        return (
            <div className="app-container">
                <div className="tab-pannel">
                    <button onClick={()=> this.setState({loginShow: true, regShow: false})}>Login</button>
                    <button onClick={()=> this.setState({loginShow: false, regShow: true})}>Register</button>
                </div>                           
                {
                    isLoading ?
                    <div>loading..</div>
                    :
                    <div className="show-pannel">
                    {loginShow && <Login />}
                    {regShow && <Register />}
                    {this.renderModal()}
                </div>
                }
                
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    router : state.router,
    countryListing: state.countryListing,
    users: state.users,
    form: state.form
})

const mapDispatchToProps = (dispatch) => ({
  requestCountry : (payload)=> dispatch(requestCountry(payload)),
  verifyUserOtp  : (payload)=> dispatch(verifyUserOtp(payload)),
  requestOtpHide : ()=> dispatch(requestOtpHide())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister)
