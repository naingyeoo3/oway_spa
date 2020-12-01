import React, { Component } from 'react';
import { connect } from 'react-redux';

import VisaInfoForm from './VisaInfoForm';

import { applyVisa } from '../../actions/visaActions';

import { VISA_API_KEY } from '../../constants/credentials';
 
class VisaInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleSubmit(){
        const { navbarOptions, locales, visaInfo } = this.props;
        
        console.log(visaInfo.values)

        this.props.applyVisa(visaInfo.values)
    }
    render() { 
        return (
            <div className="app-container">
                <VisaInfoForm onSubmit={()=> this.handleSubmit()}/>                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    visaInfo  : state.form.visaInfo,
    navbarOptions : state.navbarOptions,
    locales : state.locales
});
const mapDispatchToProps = dispatch => {
    return{                                     
        applyVisa: (payload)=> dispatch(applyVisa(payload))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisaInfo)

