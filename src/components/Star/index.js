import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class Star extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="star">
                <div className={this.props.className}></div>
            </div> 
        )
    }
}

export default Star;