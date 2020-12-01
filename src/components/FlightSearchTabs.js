import React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { Tabs } from 'antd';

const { TabPane } = Tabs;

import { changeTripPlan } from '../actions/searchComponentActions';
import { Web, Mobile } from '../constants/helper';
import { flightSearchWay } from '../constants/constants';


class FlightSearchTabs extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tab: 1
        }
    }
    callback = (key) => {
        this.setState({tab: key})
        // this.props.callbackParent(key)
        this.props.changeTripPlan(key)
      }
    render(){
        const { searchComponentReducers } = this.props;
        return (
            <div>
            <Web>
                <div className="search-layout">
                    <div className='trip-select-tabs'>
                        {
                            flightSearchWay.map( (item) => (
                                <div 
                                    key={item.id} 
                                    className={searchComponentReducers.searchTab == item.id ? "tab active" : "tab"}
                                    onClick={()=> this.props.changeTripPlan(item.id)}
                                >
                                    <FormattedMessage id={item.text} />
                                </div>
                            ))
                        }                                
                    </div>
                </div>
            </Web>
            <Mobile>
                <Tabs 
                    defaultActiveKey="2" 
                    onChange={this.callback}                    
                    className={searchComponentReducers == 2 ? 'right-tab-bar':''}             
                >
                    {
                            flightSearchWay.map( (item) => (
                                <TabPane tab={<FormattedMessage id={item.text} />} key={item.id} />                                
                            ))
                    }                                                                      
                </Tabs>
            </Mobile>
        </div>    
        )
    }
    
}

const mapStateToProps = state => ({     
    searchComponentReducers: state.searchComponentReducers
 });

const mapDispatchToProps = dispatch => {
    return{                     
        changeTripPlan: (type)=> dispatch(changeTripPlan(type))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchTabs);