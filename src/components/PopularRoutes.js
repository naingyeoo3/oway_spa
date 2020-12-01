import React, { Component } from 'react';
import { connect } from 'react-redux';
import PopularRoutesItem from './PopularRoutesItem';

import { 
    autocompleteSelectFromValue,
    autocompleteSelectToValue,
    handleRefreshState,
    handleRefreshStateEnd    
} from '../actions/searchComponentActions'
import { busPopularRoutes } from '../constants/busConstants';
import { flightPopularRoutes } from '../constants/flightConstants';
import { FormattedMessage } from 'react-intl';

class PopularRoutes extends Component {
    constructor(props){
        super(props);
        this.state={
            scrollStepInPx: 50, 
            delayInMs: 16.66,
            intervalId: 0
        }
    }
    scrollStep() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        window.scroll(0, window.pageYOffset - this.state.scrollStepInPx);
    }
      
    scrollToTop() {
        let intervalId = setInterval(this.scrollStep.bind(this), this.state.delayInMs);
        this.setState({ intervalId: intervalId });
    }
    handleSetPopularRoute = (from, fromKeyword, to, toKeyword) => {        
        this.props.autocompleteSelectFromValue(fromKeyword, from);
        this.props.autocompleteSelectToValue(toKeyword, to);
        this.props.handleRefreshState()
        setTimeout(() => {
            this.props.handleRefreshStateEnd()    
        }, 300); 
        this.scrollToTop()                
    }
    detectBusRoute = () => this.props.router.location.pathname == '/buses';
    render() {
        return (
            <div className={this.detectBusRoute() ? "popular-routes bus content-padding hidden-xs" : "popular-routes content-padding hidden-xs" }> 
                <div className="app-container">
                    <h2 className="header-title">{this.props.name ? <FormattedMessage id="popular.bus.routes" /> : <FormattedMessage id="popular.flight.routes" />}<small><FormattedMessage id="popular.routes.small" /></small></h2>
                    {   
                        this.detectBusRoute() ?
                        busPopularRoutes.map((item, index)=> 
                            <PopularRoutesItem 
                                callbackFunDept={(from, fromKeyword, to, toKeyword)=> this.handleSetPopularRoute(from, fromKeyword, to, toKeyword)}                            
                                key={index} 
                                item={item} 
                            />
                        )
                        :                     
                        flightPopularRoutes.map((item, index)=> 
                            <PopularRoutesItem
                                callbackFunDept={(from, fromKeyword, to, toKeyword)=> this.handleSetPopularRoute(from, fromKeyword, to, toKeyword)}                            
                                key={index}
                                item={item}
                                name="flight"
                            />
                        )
                    }
                </div>               
            </div>
        );  
    }
}

const mapStateToProps = state => ({
    router        : state.router    
 });

 const mapDispatchToProps = dispatch => {
    return{                     
        autocompleteSelectFromValue : (keyword, title)=> dispatch(autocompleteSelectFromValue(keyword, title)),
        autocompleteSelectToValue : (keyword, title)=> dispatch(autocompleteSelectToValue(keyword, title)),        
        handleRefreshState: ()=> dispatch(handleRefreshState()),        
        handleRefreshStateEnd: ()=> dispatch(handleRefreshStateEnd()), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularRoutes);