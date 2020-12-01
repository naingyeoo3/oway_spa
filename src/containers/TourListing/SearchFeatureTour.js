import React, { Component } from 'react';
 
import { AutoComplete } from 'antd'
const { Option } = AutoComplete;

class SearchFeatureTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            value:''
        };
    }
    getDataSource = () =>
        this.props.listingTours
            .map((tour, index )=> (      
                    <Option key={index} text={tour.title} onClick={()=> this.props.callbackFun(tour)}>                    
                        <p>{tour.title}</p>
                    </Option>        
            ))     
    handleSearch(value){
        if(value == undefined){
            this.props.updateListing()
        }
    }
    render() { 
        return (
            <div>
                <AutoComplete 
                    dataSource={this.getDataSource()}                    
                    style={{ width: 200 }}
                    allowClear={true}
                    onChange={(value)=> this.handleSearch(value)}    
                    placeholder="Search by tour"
                    dropdownClassName="search-feature-tour"
                    filterOption={(inputValue, option) => {
                        if(option.props.text != undefined){
                            return option.props.text.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                    }}            
                    optionLabelProp="text"
                />
            </div>
        );
    }
}
 
export default SearchFeatureTour;