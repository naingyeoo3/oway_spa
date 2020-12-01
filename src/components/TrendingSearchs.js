import React, { Component } from 'react';
import { connect } from 'react-redux';

import PopularRoutesItem from './PopularRoutesItem'
import HotelPopularRoutesItem from './HotelPopularRoutesItem'
import TourPopularRoutesItem from './TourPopularRoutesItem'
import { 
    autocompleteSelectFromValue,
    autocompleteSelectToValue,
    handleRefreshState,
    handleRefreshStateEnd,
    selectDestinationValue,
    selectTourDestinationValue
} from '../actions/searchComponentActions'

import { busTrendingRoutes } from '../constants/busConstants'
import { flightTrendingRoutes } from '../constants/flightConstants'
import { hotelTrendingCities } from '../constants/hotelConstants'
import { tourTrendingCities } from '../constants/tourConstants'
import { FormattedMessage } from 'react-intl'

class TrendingSearchs extends Component {
    constructor(props){
        super(props);
    }
    handleSetPopularRoute = (from, fromKeyword, to, toKeyword) => {        
        this.props.autocompleteSelectFromValue(fromKeyword, from);
        this.props.autocompleteSelectToValue(toKeyword, to);
        this.props.handleRefreshState()
        setTimeout(() => {
            this.props.handleRefreshStateEnd()    
        }, 300);                 
    }
    handleSetDestination = (destination)=>{
        this.props.selectDestinationValue(destination)
        this.props.handleRefreshState()
        setTimeout(() => {
            this.props.handleRefreshStateEnd()    
        }, 300);                 
    }
    handleSelectTourDestination = (destination) => {
        this.props.selectTourDestinationValue(destination);
        this.props.handleRefreshState()
        setTimeout(() => {
            this.props.handleRefreshStateEnd()    
        }, 300);                 
    }

    getTrending = () => {
        const { router } = this.props;
        switch (router.location.pathname) {
            case '/':
                return (
                    flightTrendingRoutes.map((item, index)=> 
                        <PopularRoutesItem 
                            isSearchComponent={true}
                            callbackFunDept={(from, fromKeyword, to, toKeyword)=> this.handleSetPopularRoute(from, fromKeyword, to, toKeyword)} 
                            key={index} 
                            item={item}
                            name="flight"/>
                    )
                )
            break;
            case '/flights':
                return (
                    flightTrendingRoutes.map((item, index)=> 
                        <PopularRoutesItem 
                            isSearchComponent={true}
                            callbackFunDept={(from, fromKeyword, to, toKeyword)=> this.handleSetPopularRoute(from, fromKeyword, to, toKeyword)} 
                            key={index} 
                            item={item}
                            name="flight"/>
                    )
                )
            break;
            case '/buses':
                return (
                    busTrendingRoutes.map((item, index)=> 
                        <PopularRoutesItem 
                            isSearchComponent={true}
                            callbackFunDept={(from, fromKeyword, to, toKeyword)=> this.handleSetPopularRoute(from, fromKeyword, to, toKeyword)} 
                            key={index} 
                            item={item}/>
                    )
                )
            break;
            case '/hotels':
                return (
                    hotelTrendingCities.map((item, index)=> 
                        <HotelPopularRoutesItem                             
                            callbackFunDept={(destination)=> this.handleSetDestination(destination)} 
                            key={index} 
                            item={item}/>
                    )
                )
            break;
            case '/tours':
                return (
                    tourTrendingCities.map((item, index)=> 
                        <TourPopularRoutesItem                             
                            callbackFunDept={(destination)=> this.handleSelectTourDestination(destination)} 
                            key={index} 
                            isRoute={true}
                            item={item}/>
                    )
                )
            break;
            case '/attractions':
                return (
                    tourTrendingCities.map((item, index)=> 
                        <TourPopularRoutesItem                             
                            callbackFunDept={(destination)=> this.handleSelectTourDestination(destination)} 
                            key={index} 
                            isRoute={true}
                            item={item}/>
                    )
                )
            break;
           
            default:
            break;
        }
    }

    render() {
        const { router } = this.props;
        return (
            <div className= {
                router.location.pathname == '/hotels' ? 
                "trending-search trending-hotel hidden-xs" 
                : 
                "trending-search hidden-xs"
            } >
                <span><FormattedMessage id="search.trending" />: </span>
                <div>
                    {
                        this.getTrending()
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({     
    searchComponentReducers: state.searchComponentReducers,
    router: state.router    
 });

const mapDispatchToProps = dispatch => {
    return{                     
        autocompleteSelectFromValue : (keyword, title)=> dispatch(autocompleteSelectFromValue(keyword, title)),
        autocompleteSelectToValue : (keyword, title)=> dispatch(autocompleteSelectToValue(keyword, title)),        
        handleRefreshState: ()=> dispatch(handleRefreshState()),        
        handleRefreshStateEnd: ()=> dispatch(handleRefreshStateEnd()),
        selectDestinationValue: (destination)=> dispatch(selectDestinationValue(destination)),
        selectTourDestinationValue: (destination)=> dispatch(selectTourDestinationValue(destination))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingSearchs);