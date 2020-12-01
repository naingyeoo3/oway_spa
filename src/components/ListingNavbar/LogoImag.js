import React, { Component } from 'react';

import './logo-image.scss';

class LogoImag extends Component {
    render() {
        return (
            <div>
                <img src={require('../../assests/images/oway-blue-logo.png')} />    
            </div>
        );
    }
}

export default LogoImag;