import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown} from 'antd';

import { selectTravellerClass } from '../actions/searchComponentActions'

import { travelerClass } from '../constants/constants';

class SearchInputClass extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { searchComponentReducers } = this.props;
        return (
            <div className="select-class-type" id="select-class-type">
                <Dropdown                     
                    overlay={
                        <Menu>
                            {
                                travelerClass.map( (item)=> (
                                    <Menu.Item 
                                        key={item.id} 
                                        onClick={()=> this.props.selectTravellerClass(item.title, item.keyword)}                                        
                                    >                                       
                                        <a>{item.title}</a>
                                    </Menu.Item>        
                                ))
                            }                            
                        </Menu>
                    } 
                    trigger={['click']}
                    onClick={this.props.handleVisibleChangeTravelType} 
                    overlayClassName="search-dropdown-class traveller-class" 
                    placement="bottomRight"                            
                >                
                    <div className="popover-open-btn">
                        <span></span>
                        {searchComponentReducers.travellerClass.name}                        
                    </div>
                </Dropdown>
            </div>
        );
    }
}

const mapStateToProps = state => ({ 
    searchComponentReducers: state.searchComponentReducers
 });

const mapDispatchToProps = dispatch => {
    return{                     
        selectTravellerClass : (title, keyword)=> dispatch(selectTravellerClass(title, keyword)),        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchInputClass);