import React, { Component } from 'react';
 
class CancellationPolicy extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
     
    render() { 
        const { detail } = this.props;
        if(detail){
            return (
                <div>
                    <h5>Cancellation Policy</h5>
                    <p>{detail.policies.cancellation}</p>
                </div>
            );
        }else{
            return ( <div />)
        }
        
    }
}
 
export default CancellationPolicy;