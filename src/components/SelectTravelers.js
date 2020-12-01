import React from 'react';
import { connect } from 'react-redux';
import { Popover } from 'antd';

import { 
    addTravllerCount, 
    reduceTravllerCount,
    addChildAgeSelector,
    reduceChildAgeSelector 
} from '../actions/searchComponentActions'

import SelectChildAge from './SelectChildAge';
import IntegreatedIcon from './Icon';
import '../styles/select-travelers.scss';

import { FormattedMessage } from 'react-intl'


class SelectTravelers extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible: false
        }
    }
    hide = () => {
        this.setState({
          visible: false,
        });
      };

    handleVisibleChange = visible => {
    this.setState({ visible });
    };

    detectHotelRoute = (route) => route == '/hotels';
    detectBusesRoute = (route) => route == '/buses';
    detectFligtsRoute = (route) => route == '/flights';
    detectHomeRoute = (route) => route == '/';
    detectToursRoute = (route) => route == '/tours';
    detectToursAttractionRoute = (route) => route == '/attractions';
    detectHotelBusRoute = (route) => route == '/hotels' || route == '/buses';
    sentData = () => console.log('sent data')
    getAgeSelector = () =>         
        this.props.searchComponentReducers.travellers.childAge.map( (item, index)=> 
            <SelectChildAge key={index} item={item} callbackParent={()=> this.sentData()}/>
        )
                    
    handleGenerateSelectAge = (opt) => {
        this.props.addTravllerCount(opt);
        this.props.addChildAgeSelector();
    }
    reduceGenerateAgeSelector = (opt) => {        
        this.props.reduceTravllerCount(opt);
        this.props.reduceChildAgeSelector();
    }
    render(){
        const { 
            searchComponentReducers,
            router
         } = this.props;
        return(            
            <div className="traveler">                                
                <Popover                                                    
                trigger="click"
                placement="bottomRight"
                visible={this.state.visible}
                overlayStyle={
                    this.props.locales.lang == 'en' ? 
                    {fontFamily:'Lato,sans-serif'} 
                        : 
                    {fontFamily:'Pyidaungsu, sans-serif'}}
                onVisibleChange={this.handleVisibleChange}
                overlayClassName="search-dropdown-traveler"
                content={                    
                    <div className="traveler-select"> 
                        {
                            this.detectHotelRoute(router.location.pathname) ?
                            <div className="select-adults">
                                <label className="select-item room"><span className="traveller-label"><FormattedMessage id="search.room" /></span></label>
                                <button 
                                    className="select-item icon" 
                                    onClick={()=> {
                                        this.setState({visible: true})
                                        this.props.reduceTravllerCount('room')
                                    }}
                                    style={searchComponentReducers.travellers.room <= 1? {pointerEvents: 'none',opacity: '0.3'}:{}}
                                >
                                    <IntegreatedIcon 
                                        type="minus-circle"                                         
                                        />
                                </button>
                                <div className="select-item count">{searchComponentReducers.travellers.room}</div>
                                <button 
                                    className="select-item icon" 
                                    onClick={()=> {
                                        this.setState({visible: true})
                                        this.props.addTravllerCount('room')
                                        }}
                                    style={searchComponentReducers.travellers.room >= 9 ? {pointerEvents: 'none',opacity: '0.3'}:{}}
                                >
                                    <IntegreatedIcon 
                                        type="plus-circle" 
                                        
                                    />
                                </button>
                            </div>
                            :
                            null    
                        }                            
                        <div className="select-adults">
                            <label className="select-item adult"><span className="traveller-label"><FormattedMessage id="search.adult" /></span>
                                {this.detectBusesRoute(router.location.pathname) && <span><FormattedMessage id="search.above.twelve" /></span>}
                            </label>
                            <button 
                                className="select-item icon" 
                                onClick={()=> {
                                    this.setState({visible: true})
                                    this.props.reduceTravllerCount('adult')
                                }}
                                style={searchComponentReducers.travellers.adult <= 1? {pointerEvents: 'none',opacity: '0.3'}:{}}
                            >
                                <IntegreatedIcon 
                                    type="minus-circle"                                         
                                    />
                            </button>
                            <div className="select-item count">{searchComponentReducers.travellers.adult}</div>
                            <button 
                                className="select-item icon" 
                                onClick={()=> {
                                    this.setState({visible: true})
                                    this.props.addTravllerCount('adult')
                                    }}
                                style={ 
                                    (this.detectHotelRoute(router.location.pathname) ? searchComponentReducers.travellers.adult >= 36 : searchComponentReducers.travellers.adult >= 9) ? 
                                    {pointerEvents: 'none',opacity: '0.3'}
                                    :
                                    {}
                                    }
                            >
                                <IntegreatedIcon 
                                    type="plus-circle" 
                                    
                                />
                            </button>
                        </div>
                        <div className="select-adults">
                            <label className="select-item child">
                                <span className="traveller-label"><FormattedMessage id="search.child" /></span>
                                {this.detectHotelRoute(router.location.pathname) && <span><FormattedMessage id="search.eleven" /></span>}
                                {this.detectBusesRoute(router.location.pathname) && <span><FormattedMessage id="search.two.twelve" /></span>}
                                {this.detectFligtsRoute(router.location.pathname) && <span><FormattedMessage id="search.two.twelve" /></span>}
                                {this.detectHomeRoute(router.location.pathname) && <span><FormattedMessage id="search.two.twelve" /></span>}
                                {this.detectToursRoute(router.location.pathname) && <span><FormattedMessage id="search.two.twelve" /></span>}
                                {this.detectToursAttractionRoute(router.location.pathname) && <span><FormattedMessage id="search.two.twelve" /></span>}
        
                            </label>
                            <button
                                className="select-item icon" 
                                onClick={()=> this.detectHotelRoute(router.location.pathname) ? this.reduceGenerateAgeSelector('child') : this.props.reduceTravllerCount('child')}
                                style={searchComponentReducers.travellers.child == 0? {pointerEvents: 'none',opacity: '0.3'}:{}}
                                >
                                <IntegreatedIcon 
                                    type="minus-circle"
                                    
                                    />
                            </button>
                            <div className="select-item count">{searchComponentReducers.travellers.child}</div>
                            <button
                                className="select-item icon" 
                                onClick={()=> this.detectHotelRoute(router.location.pathname) ? this.handleGenerateSelectAge('child') : this.props.addTravllerCount('child')}
                                style={searchComponentReducers.travellers.child >= 9 ? {pointerEvents: 'none',opacity: '0.3'}:{}}
                            >
                                <IntegreatedIcon 
                                    type="plus-circle" 
                                    
                                />
                            </button>
                        </div>
                        {
                            this.detectHotelBusRoute(router.location.pathname) ?
                                null
                                :
                            <div className="select-adults">
                                <label className="select-item infant"><span className="traveller-label"><FormattedMessage id="search.infant" /></span><span><FormattedMessage id="search.below.two" /></span></label>
                                <button
                                    className="select-item icon" 
                                    onClick={()=> this.props.reduceTravllerCount('infact')}
                                    style={searchComponentReducers.travellers.infact == 0? {pointerEvents: 'none',opacity: '0.3'}:{}}
                                >
                                    <IntegreatedIcon 
                                        type="minus-circle"                                 
                                        />
                                </button>
                                <div className="select-item count">{searchComponentReducers.travellers.infact}</div>
                                <button
                                    className="select-item icon" 
                                    onClick={()=> this.props.addTravllerCount('infact')}
                                    style={searchComponentReducers.travellers.infact >= 17 ? {pointerEvents: 'none',opacity: '0.3'}:{}}
                                >
                                    <IntegreatedIcon 
                                        type="plus-circle" 
                                        
                                    />
                                </button>
                            </div>     
                        }
                        {
                            this.detectHotelRoute(router.location.pathname) && searchComponentReducers.travellers.child > 0 ?
                            <p className="age-title"><FormattedMessage id="search.children.age" /></p>
                            :
                            null
                        }
                        <div className="age-selector">                                    
                            {
                                this.detectHotelRoute(router.location.pathname) && searchComponentReducers.travellers.child > 0 ?                                                                                
                                this.getAgeSelector()
                                :
                                null
                            }
                        </div>
                    </div>                    
                }
            >
                <div className="popover-open-btn">                    
                {this.detectHotelRoute(router.location.pathname) ? <span><FormattedMessage id="search.room.guests" /></span> : <span><FormattedMessage id="search.room.travellers" /></span>}
                        <div className="traveler-title">
                            {this.detectHotelRoute(router.location.pathname) ? <span className="room">{searchComponentReducers.travellers.room}</span> : null}
                            <span className="adult">{searchComponentReducers.travellers.adult}</span>
                            <span className="child">{searchComponentReducers.travellers.child}</span>
                            {this.detectHotelBusRoute(router.location.pathname) ? null : <span className="infant">{searchComponentReducers.travellers.infact}</span>}
                        </div>
                    </div>
            </Popover>   
            </div>     
        )
    }

}

const mapStateToProps = state => ({     
    searchComponentReducers: state.searchComponentReducers,
    router          : state.router,
    locales : state.locales    
 });

const mapDispatchToProps = dispatch => {
    return{             
        addTravllerCount : (type) => dispatch(addTravllerCount(type)),
        reduceTravllerCount : (type) => dispatch(reduceTravllerCount(type)),
        addChildAgeSelector : ()=> dispatch(addChildAgeSelector()),
        reduceChildAgeSelector: ()=> dispatch(reduceChildAgeSelector())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTravelers);