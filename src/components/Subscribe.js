import React, { Component,PureComponent } from 'react';
import { connect } from 'react-redux';

import { Input, Button, Icon } from 'antd';
import { FormattedMessage } from 'react-intl'
import '../styles/subscribe.scss'

class Subscribe extends Component {
    constructor(props){
        super(props);
        this.state = {
            params : '',
            errors : null,
            success:'newsletter-success',
            wrone : 'newsletter-danger',
            isShow: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleClick = this.handleClick.bind(this);  
    }

    componentWillMount(){
      }
    
      getData(){
        setTimeout(() => {
          this.setState({
            success: 'no-display',
            wrone : 'no-display'
          })
        }, 8000)
      } 
    
      componentDidMount(){
        this.getData();
      }
    
    handleChange(e){
        this.setState({
            params : e.target.value,
          
        })
     }

     handleClear(){
         this.setState({
             params: '',
         })
         this.setState({isShow: true})
         if(this.state.params != ''){
            this.setState({isShow: false})
         }
         
         if(this.state.isShow == true){
            setTimeout(() => {
                this.setState({isShow: false})
            }, 5000);
        }        
     }
   
    handleKeyPress(e){
        if(e.key === 'Enter'){
            this.props.subscribeemail(this.state.params);
            this.setState({
                params: '',
            })
            this.setState({isShow: true})
            if(this.state.isShow == true){
                setTimeout(() => {
                    this.setState({isShow: false})
                }, 5000);
            }
        }
    }
 
    handleClick(e){
        this.props.subscribeemail(this.state.params);
        this.setState({isShow: true})
        if(this.state.isShow == true){
            setTimeout(() => {
                this.setState({isShow: false})
            }, 5000);
        }        
        this.setState({
            params: '',
        })
        
    }
    render(){

        
        const { subscribeReducer } = this.props; 
        return(
            <div className={this.props.router.location.pathname=='/myanmar_visa' || this.props.router.location.pathname=='/car_rental'  || this.props.router.location.pathname=='/oway_ride' ? 'subscribe-block bg-color' : 'subscribe-block'} >
                <div className="app-container">
                    {/* <div className="subscribe-mobile">
                        <div>
                            <img src={require('../assests/images/png/QR-code.png')} alt="Oway QR" />
                        </div>
                        <div>
                            <a href="https://itunes.apple.com/us/app/oway-travel/id1314252839?ls=1&mt=8" target="_blank" rel="noopener" title="Oway App store download">
                                <img src={require('../assests/images/png/app-store.png')} alt="Download on the App Store" />
                            </a>
                            <a href="https://play.google.com/store/apps/details?id=com.mobile.oway.myapplication&hl=en" target="_blank"  rel="noopener" title="Oway App store download">
                                <img src={require('../assests/images/png/google-playstore.png')} alt="Get it on Google Play" />
                            </a>
                        </div>
                    </div> */}
                    <div className="subscribe-sub-block">
                        <div>
                            <img src={require(`../assests/images/png/subscribe.png`)} alt="Subscribe" />
                        </div>
                        <div>
                            <h3><FormattedMessage id="subscribe.uptodate.text" /></h3>
                            <p>
                            <FormattedMessage id="subscribe.content.text" />
                                
                            </p>
                        </div>
                        <div className="send-email">
                        <FormattedMessage id="subscribe.enter.email">
                            { placeholder =>
                                <input
                                onChange={this.handleChange} 
                                placeholder={placeholder}
                                onFocus={this.handleClear}
                                type="text"
                                onKeyPress={ this.handleKeyPress}
                                value={this.state.params} 
                                />
                            }
                        </FormattedMessage>
                            {/* <input type="text" onChange={this.handleChange} 
                
                            value={this.state.params} 
                            onKeyPress={ this.handleKeyPress}
                            placeholder={<FormattedMessage id="subscribe.enter.email" />}/> */}                                                     
                            <button onClick={this.handleClick} className="btn-orange"><FormattedMessage id="subscribe.submit.text" /></button>
                            <div>
                            {
                                subscribeReducer.isFetching ? 
                                <span className="subscribe-loading"> <img src={require(`../assests/images/loading.gif`)} /></span>
                                :
                            
                                <span> 
                                    {/* {
                                    subscribeReducer.response != null ?                                
                                        <span className ={subscribeReducer.response.code == "200" ? this.state.success : this.state.wrone }>
                                    
                                    {subscribeReducer.response.message}
                                  
                                    </span> : null}  */}
                                    {
                                        this.state.isShow ?
                                        <span>
                                        {
                                            !!subscribeReducer.response &&
                                            <span>
                                            {
                                                subscribeReducer.response.code == 200 ? 
                                                <span className="newsletter-success"> {subscribeReducer.response.message} </span>
                                                :
                                                <span className="newsletter-danger">{subscribeReducer.response.message}</span>
                                            }
                                            </span>
                                        }                                        
                                        </span>                                    
                                        :
                                        <span />
                                    }                                    
                                </span>                                
                            }   
                            </div>                         
                        </div>                                                                                           
                    </div>                                       
                </div>
            </div>    
        );
     }
}

const mapStateToProps = state => ({    
    router : state.router,
    subscribeReducer: state.subscribeReducer     
});

export default connect(mapStateToProps, null)(Subscribe);