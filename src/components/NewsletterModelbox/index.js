import React, { Component } from 'react';
import { Modal} from 'antd';
import Subscribe from '../Subscribe'
import { connect } from 'react-redux'
import './newsletter-model.scss'
import { sentUserSubscribe } from '../../actions/subscribeActions';
import { SUBSCRIBE_API_KEY } from '../../constants/credentials';
import { FormattedMessage } from 'react-intl'

class NewsletterModelbox extends Component{
    state = { newslettervisible: false, };
    constructor(props){
        super(props);
    }  

    subscribeemail(val){
      const payload = {            
          "email": val,             
          "ipAddress": "122.248.100.141",             
          "apiKey": SUBSCRIBE_API_KEY
      } 
      this.props.sentUserSubscribe(payload); 
    } 
    

    
  showModal()  {
    this.setState({
      newslettervisible: true,
    });
      if(this.props.isMobile){
        this.props.callbackNavDrawer()
       
    }
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      newslettervisible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      newslettervisible: false,
    });
  };

  render() {
    return (
      <div className="header-newsletter-model">
        <a link="#" type="primary"  onClick={()=> this.showModal()}  className="newsletter-menu">
         
          <FormattedMessage id="subscribe.menu.text" />
        </a>
        <Modal
          title={false}
          visible={this.state.newslettervisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={500}
          wrapClassName="newsletter-modal"
          footer={[
            <a link="#" key="back" size="large" onClick={this.handleCancel} >No, thanks!</a>
          ]}
          
        >
          <Subscribe 
                subscribeemail={(params) => this.subscribeemail(params)}
                />            
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  router : state.router,
  subscribeReducer: state.subscribeReducer 
  
});
const mapDispatchToProps = dispatch => {
  return{                     
    sentUserSubscribe: (params)=> dispatch(sentUserSubscribe(params))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewsletterModelbox);