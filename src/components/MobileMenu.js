import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

class MobileMenu extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { item } = this.props;
        return (
            <li>
                <Link to={item.link} title={item.title}>
                    <p>
                        <img src={require(`../assests/images/svg/${item.icon}`)} alt={item.title} />
                        {
                            item.status == 'new' ?
                            <span className="new">&nbsp;</span>
                            :
                            null
                        }
                    </p>                    
                    <h5 className={this.props.locales.lang == 'my' ? "myanmar" : null }><FormattedMessage id={item.title} /></h5>
                </Link>
            </li>
        );  
    }
}

const mapStateToProps = state => ({
    locales       : state.locales
}); 
export default connect(mapStateToProps,null)(MobileMenu);