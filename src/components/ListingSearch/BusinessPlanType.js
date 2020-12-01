import React, { Component } from 'react';
const typeArrow = require('../../assests/images/svg/change-arrow.svg')

class BusinessPlanType extends Component {
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

    handleChange = (title, keyword) =>  this.props.callbackParent(title, keyword);

    render() {         
        const { businessPlan, selectedValue } = this.props;    
        return(         
        <div className="search-type-dropdown class-type">
            <button onClick={this.showDropdownMenu}>
                {selectedValue}
                <img src={typeArrow} alt="Dropdown Arrow"></img>
            </button>
            { 
                this.state.displayMenu ? (
                    <ul>
                        {
                            businessPlan.map((plan)=> (
                                <li key={plan.id} onClick={()=> this.handleChange(plan.title, plan.keyword)}><a>{plan.title}</a></li>
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
 
export default BusinessPlanType;