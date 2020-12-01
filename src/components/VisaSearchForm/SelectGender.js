import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Web, Mobile } from '../../constants/helper';
import { FormattedMessage } from 'react-intl';

class SelectGender extends Component {
    constructor() {
        super();
        this.state = {
            displayMenu: false,
        };       
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);       
    };
       
    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
        document.addEventListener('click', this.hideDropdownMenu);
        });
    }
    
    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });
    }
       
    render() {
        const { formReducer } = this.props;
        return(
            <div className="form-item select-column">
                <label><FormattedMessage id="search.visa.gender" /></label>
                <Web>
                    <button onClick={this.showDropdownMenu}>{formReducer.gender.value}</button>
                    { 
                        this.state.displayMenu ? (
                            <ul className="gender-list">
                                <li onClick={()=> this.props.callbackParent('Male')}>Male</li>
                                <li onClick={()=> this.props.callbackParent('Female')}>Female</li>
                            </ul>
                        )
                        :
                        (
                            null
                        )
                    }
                </Web>
                <Mobile>
                    <button onClick={()=> this.props.callbackMobileDrawer('mobile_gender')}>{formReducer.gender.value}</button>
                </Mobile>
            </div>
        )
    }
}

const mapStateToProps = state => ({         
    formReducer: state.formReducer 
 });

export default connect(mapStateToProps, null)(SelectGender);