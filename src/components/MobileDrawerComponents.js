import React, { Component } from 'react';

import MobileTourComponent from './MobileTourComponent';
import MobileFlightFromComponent from './MobileFlightFromComponent';
import MobileFlightToComponent from './MobileFlightToComponent';
import MobileHotelComponent from './MobileHotelComponent';
import MobileBusFromComponent from './MobileBusFromComponent';
import MobileBusToComponent from './MobileBusToComponent';
import DateInputComponent from './DateInputComponent';
import MobileSelectTravelers from './MobileSelectTravelers';
import MobileTravelerClass from './MobileTravelerClass';

import { travelerClass } from '../constants/constants';

class MobileDrawerComponents extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div>
                {
                    this.props.visibleOpt == 'tour_dest' &&
                    <MobileTourComponent 
                        isLoading={this.props.isLoading}                        
                        callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                    />
                }
                {
                    this.props.visibleOpt == 'flight_from' &&
                    <MobileFlightFromComponent 
                        isLoading={this.props.isLoading}                        
                        callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                    />
                }
                {
                    this.props.visibleOpt == 'flight_to' &&
                    <MobileFlightToComponent 
                        isLoading={this.props.isLoading}                        
                        callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                    />
                }
                {
                    this.props.visibleOpt == 'hotel_dest' &&
                    <MobileHotelComponent 
                        isLoading={this.props.isLoading}                        
                        callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                    />
                }
                {
                    this.props.visibleOpt == 'bus_from' &&
                    <MobileBusFromComponent 
                        isLoading={this.props.isLoading}
                        callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                    />
                }
                {
                    this.props.visibleOpt == 'bus_to' &&
                    <MobileBusToComponent 
                        isLoading={this.props.isLoading}
                        callbackHideMobileDrawer={()=> this.props.callbackHideMobileDrawer()}
                    />
                }
                {
                    this.props.visibleOpt == 'departure' &&
                    <DateInputComponent 
                        isMobileDept={true} 
                        callbackParentDrawerClose={()=> this.props.callbackHideMobileDrawer()}                                
                    />               
                }
                {
                    this.props.visibleOpt == 'date' &&
                    <div>
                        <DateInputComponent 
                            isMobileDate={true} 
                            callbackParentDrawerClose={()=> this.props.callbackHideMobileDrawer()}
                        />
                        <div className="range-picker-position"/>
                    </div>
                }
                {
                    this.props.visibleOpt == 'select_travel' &&
                    <MobileSelectTravelers />
                }
                {
                    this.props.visibleOpt == 'select_class' && 
                    <MobileTravelerClass 
                        travelerClass={travelerClass} 
                        callbackParent={(title, keyword)=> this.props.selectTravellerClass(title, keyword)}
                    />
                }
                {
                    this.props.visibleOpt == 'select_room' &&
                    <MobileSelectTravelers />
                }
            </div>
        );
    }
}

export default MobileDrawerComponents;