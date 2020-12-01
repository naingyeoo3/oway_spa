import React, { Component } from 'react';
import { Input } from 'antd';

class AutocompletePlaceholder extends Component {
    render() {
        return (
            <Input style={{color:"#ddd",opacity:"0.3"}} className={this.props.route == '/buses' ? "spinner bus-spinner" : "spinner"} readOnly/>
        );
    }
}

export default AutocompletePlaceholder;