import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../../utils/history'; 

import RenderVisaInfo from './RenderVisaInfo'

class VisaConfirmInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    checkVisaSuccess = () => this.props.visaReducer.applyRes.data && this.props.visaReducer.applyRes.data.code == 200;
     
    

    render() { 
        const { visaReducer } = this.props;
        return (
            <div>
                {
                    visaReducer.applyRes.isFetching ?
                    <div>is loading apply visa ....</div>
                    :
                    <div>
                    {
                    this.checkVisaSuccess() ? 
                        <RenderVisaInfo info={visaReducer.applyRes && visaReducer.applyRes.data} /> 
                        : 
                        <div>
                            {visaReducer.applyRes.data.message}
                            </div>
                    }
                    </div>
                }
                
            </div>
        );
    }
}

const mapStateToProps = state => ({
    visaReducer : state.visaReducer
});
const mapDispatchToProps = dispatch => {
    return{                                     
        applyVisa: (payload)=> dispatch(applyVisa(payload))        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisaConfirmInfo);