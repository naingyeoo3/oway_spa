import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import './menu-item.scss';

class MenuItem extends Component {
    render() {
        return (
            <div className="cz-menu-item">
                <h5>{this.props.item ? <FormattedMessage id={this.props.item.title} /> : null }</h5>                
            </div>
        );
    }
}

export default MenuItem;