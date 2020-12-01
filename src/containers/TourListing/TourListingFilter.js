import React, { Component } from 'react';

import IntegreatedIcon from '../../components/Icon';
import { Collapse, Checkbox } from 'antd';

import './tour-listing-filter.scss'

class TourListingFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        };
    }
    componentDidMount(){
        this.setState({isLoading: false})
    }
    handleFilter(e, keyword, query){
        if(e.target.checked){
            this.props.callbackAddFilter(query);            
        }else{
            this.props.callbackRemoveFilter(query);
        }
    }
    handleRemoveFilter(){
        this.setState({isLoading: true})
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 1000);
        this.props.callbackUpdate()
    }
    render() { 
        const { filters } = this.props;

        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div>
                        <h4>Duration</h4>
                    </div>
                    <div onClick={()=> this.handleRemoveFilter()} className="reset-btn">reset</div>
                </div>
                <hr></hr>
                <div>
                    {
                        this.state.isLoading ?
                        <div>loading ...</div>
                        :
                        <div>
                            {
                                filters.map( (item, index) => (
                                    <div key={index} className="filter-item">
                                        <Checkbox 
                                            onChange={(e)=> this.handleFilter(e, item.keyword, item.query)} 
                                            key={index}
                                        >
                                                {item.name}
                                        </Checkbox>
                                    </div>                                
                                ))
                            }                
                        </div>
                    }
                </div>                
            </div>
        );
    }
}
 
export default TourListingFilter;