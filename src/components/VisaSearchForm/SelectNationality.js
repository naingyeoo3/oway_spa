import React, { Component } from 'react';
import { connect } from 'react-redux';
import update from 'react-addons-update'
import { FormattedMessage } from 'react-intl'

import { AutoComplete } from 'antd';
const { Option, OptGroup } = AutoComplete

import AutocompleteNation from './AutocompleteNation';
import IntegreatedIcon from '../Icon';
import { Web, Mobile } from '../../constants/helper';
import { nationality } from '../../constants/visaPageConstants';       

class SelectNationality extends Component {
    constructor() {
        super();
        this.state = {
            displayMenu: false,
            value: ''
        };       
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        this.handleSearch = this.handleSearch.bind(this); 
        this.getdataSource = this.getdataSource.bind(this);        
    }; 
    showDropdownMenu(event) {
        event.preventDefault();
        this.props.callbackParent('')
        this.setState({ displayMenu: true, value: '' }, () => {
        document.addEventListener('click', this.hideDropdownMenu);        
        });
    }
    
    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });
    }
    getdataSource = () =>         
        nationality.map((item, index )=> (      
            <OptGroup key={index} label={item.title}>         
            {
                item.countries.map(country => (
                <Option 
                    key={country.id} 
                    text={country.name} 
                    value={country.name}                 
                    >
                    {country.name}                            
                </Option>
                ))            
            }
            </OptGroup>          
        ))        
    handleSelectValue(value, opt) {        
        this.props.callbackParent(value)
        this.setState({displayMenu: false})
    }
    handleSearch(value){
        this.setState(update(this.state,{$set:{value: value}}))
    }
    render() {
        const { formReducer, formSubmit } = this.props;                

        return(
            <div className="form-item select-column">                
                <label><FormattedMessage id="search.visa.nationality" /></label>
                <Web>
                    <button 
                        className="nation-value" 
                        onClick={this.showDropdownMenu}
                    >
                        {formReducer.nationality.value ? formReducer.nationality.value : 'Select Nationality'}
                    </button>
                    <IntegreatedIcon type="caret-down"/>
                    { 
                        this.state.displayMenu ? (
                        <div className="dropdown-show">
                            <AutocompleteNation 
                                callbackSelect={(value)=> this.handleSelectValue(value)} 
                                formReducer={this.props.formReducer}
                            />
                        </div>
                        )
                        :
                        null
                    }
                </Web>                
                <Mobile>
                    <button 
                        onClick={()=> this.props.callbackMobileDrawer('mobile_nation')}
                    >
                        {formReducer.nationality.value ? formReducer.nationality.value : 'Select Nationality'}
                    </button>
                </Mobile>
                {formSubmit && formReducer.nationality.valid == false ? <p className="visa-form-required">Please select nationality</p> : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({         
    formReducer: state.formReducer 
 });

export default connect(mapStateToProps, null)(SelectNationality);