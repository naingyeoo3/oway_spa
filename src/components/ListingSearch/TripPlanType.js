import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
const typeArrow = require('../../assests/images/svg/change-arrow.svg')

class TripPlanType extends Component {
    constructor(props){
        super(props);
        this.state={
            displayMenu: false
        }
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);       
    }

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
    
    handleChange = (value) => this.props.callbackParent(value);

    getSelectValue = (value)=> value == 1 ? 'One Way' : 'Round Trip'

    render() {        
        const { selectedValue, tripPlan } = this.props;
        return (
                <div className="search-type-dropdown trip-type">
                    <button onClick={this.showDropdownMenu}>
                        {this.getSelectValue(selectedValue)}
                        <img src={typeArrow} alt="Dropdown Arrow"></img>
                    </button>
                    { 
                        this.state.displayMenu ? (
                            <ul>
                                {
                                    tripPlan.map((plan)=> (
                                        <li key={plan.id} onClick={()=> this.handleChange(plan.id)}><a> <FormattedMessage id={plan.text} /></a></li>
                                    ))
                                }
                            </ul>
                        )
                        :
                        (
                            null
                        )
                    }
                </div>            
        )
    }
}
 
export default TripPlanType;