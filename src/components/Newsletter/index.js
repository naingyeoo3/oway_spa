import React, { Component } from 'react';
import { connect } from 'react-redux'
import Subscribe from '../Subscribe'
import { sentUserSubscribe } from '../../actions/subscribeActions';
import { SUBSCRIBE_API_KEY } from '../../constants/credentials';

class Newsletter extends Component {
    state = { visible: false };
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

  render() {
    return (
        <Subscribe 
            subscribeemail={(params) => this.subscribeemail(params)}
        />            

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
  
export default connect(mapStateToProps,mapDispatchToProps)(Newsletter);
