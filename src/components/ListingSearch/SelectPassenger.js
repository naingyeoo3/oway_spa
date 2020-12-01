import React, { Component } from 'react';
import { connnect, connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'
import { 
    addTravllerCount, 
    reduceTravllerCount,
    addChildAgeSelector,
    reduceChildAgeSelector 
} from '../../actions/searchComponentActions'

import SelectChildAge from '../SelectChildAge';

import './select-passenger.scss';

const typeArrow = require('../../assests/images/svg/change-arrow.svg')
const closeIcon = require('../../assests/images/svg/close-icon.svg')

class SelectPassenger extends Component {
    constructor(props){
        super(props);
        this.state={
            isOpenAdultMenu: false,
            showModal: false
        }
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);               
    }   
    showDropdownMenu = () => this.setState({isOpenAdultMenu: !this.state.isOpenAdultMenu});
    hideDropdownMenu = () => this.setState({isOpenAdultMenu: false});

    detectHotelListing = () => this.props.router.location.pathname.includes('hotels/search');

    handleCount(type, count){        
        if(count == 'min'){
            if(this.detectHotelListing() && type == 'child'){
                this.props.reduceChildAgeSelector();
            }
            this.props.reduceTravllerCount(type);
        }else{
            if(this.detectHotelListing() && type == 'child'){
                this.props.addChildAgeSelector();
            }
            this.props.addTravllerCount(type);
        }
    }
    getTravelCount(type){
        const { searchComponentReducers } = this.props;
        switch (type) {
            case 'adult':
                return searchComponentReducers.travellers.adult;
                break;
            case 'child':
                return searchComponentReducers.travellers.child;
                break;
            case 'infact':
                return searchComponentReducers.travellers.infact;
                break;
            case 'room':
                return searchComponentReducers.travellers.room;
                break;
            default:
                break;
        }
    }
    getTravellersCount(){
        const { isHotel, searchComponentReducers } = this.props;
        if(isHotel){
            return(
                <div className="traveller">
                    <span>
                        <span>{searchComponentReducers.travellers.room}</span>
                        <span>Room(s)</span>
                    </span>
                    <span>
                        <span>{searchComponentReducers.travellers.adult}</span>
                        <span>Guest(s)</span>
                    </span>
                </div>
            )
        }else{
            return(
                <div className="traveller">
                    <span>{Number(searchComponentReducers.travellers.adult) +  Number(searchComponentReducers.travellers.child) + Number(searchComponentReducers.travellers.infact)}</span><span>Traveller(s)</span>
                </div>
            )
        }
    }
    getAgeSelector = () => this.props.searchComponentReducers.travellers.childAge.map( (item, index)=> <SelectChildAge key={index} item={item} callbackParent={()=> this.sentData()}/>)         
                
    getStyleAdd(type){
        const { searchComponentReducers, router } = this.props;
        if(type == 'room'){
            if(searchComponentReducers.travellers.room >= 9){
                return {pointerEvents: 'none',opacity: '0.3'}
            } 
        }
        if(type == 'adult'){
            if(router.location.pathname.includes('hotels/search')){
                if(searchComponentReducers.travellers.adult >= 36){
                    return {pointerEvents: 'none',opacity: '0.3'}
                }
            }else if(searchComponentReducers.travellers.adult >= 9){
                return {pointerEvents: 'none',opacity: '0.3'}
            }                
        }
        if(type == 'child'){
            if(searchComponentReducers.travellers.child >= 9){
                return {pointerEvents: 'none',opacity: '0.3'}
            }
        }
        if(type == 'infact'){
            if(searchComponentReducers.travellers.infact >= 17){
                return {pointerEvents: 'none',opacity: '0.3'}
            }
        }
    }
    getStyleReduce(type){
        const { searchComponentReducers, router } = this.props;
        if(type == 'room'){
            if(searchComponentReducers.travellers.room <= 1){
                return {pointerEvents: 'none',opacity: '0.3'}
            } 
        }
        if(type == 'adult'){
            if(searchComponentReducers.travellers.adult <= 1){
                return {pointerEvents: 'none',opacity: '0.3'}
            } 
        }
        if(type == 'child'){
            if(searchComponentReducers.travellers.child == 0){
                return {pointerEvents: 'none',opacity: '0.3'}
            } 
        }
        if(type == 'infact'){
            if(searchComponentReducers.travellers.infact == 0){
                return {pointerEvents: 'none',opacity: '0.3'}
            } 
        }

    }
    getTravellersInfo(info) {
        const { isBus, isTour, isHotel, isFlight, isAttraction } = this.props;
        if(isBus){
            if(info == 'adult') {
                return(
                    <p>
                        <span>Adult</span>
                        <span className="small-text">(12 yrs and above)</span>
                    </p>
                )                
            }else {
                return (
                    <p>
                        <span>Child</span>
                        <span className="small-text">(2 - 12 yrs)</span>
                    </p>
                )
            }
        }else if(isTour) {
            if(info == 'adult') {
                return(
                    <p>
                        <span>Adult</span>
                        <span className="small-text">(12+ yrs)</span>
                    </p>
                )                
            }else if(info == 'child') {
                return (
                    <p>
                        <span>Child</span>
                        <span className="small-text">(2 - 11 yrs)</span>
                    </p>
                )
            }else {
                return (
                    <p>
                        <span>Infant</span>
                        <span className="small-text">(under 2 yrs)</span>
                    </p>
                )
            }
        }else if(isAttraction) {
            if(info == 'adult') {
                return(
                    <p>
                        <span>Adult</span>
                        <span className="small-text">(12+ yrs)</span>
                    </p>
                )                
            }else if(info == 'child') {
                return (
                    <p>
                        <span>Child</span>
                        <span className="small-text">(2 - 11 yrs)</span>
                    </p>
                )
            }else {
                return (
                    <p>
                        <span>Infant</span>
                        <span className="small-text">(under 2 yrs)</span>
                    </p>
                )
            }
        }else if(isHotel) {
            if(info == 'room') {
                return(
                    <p>
                        <span>Room</span>
                    </p>
                )                
            }else if(info == 'adult') {
                return (
                    <p>
                        <span>Adult</span>
                    </p>
                )
            }else {
                return (
                    <p>
                        <span>Child</span>
                        <span className="small-text">(0 - 11 yrs)</span>
                    </p>
                )
            }
        }else if(isFlight) {
            if(info == 'adult') {
                return(
                    <p>
                        <span>Adult</span>
                    </p>
                )                
            }else if(info == 'child') {
                return (
                    <p>
                        <span>Child</span>
                        <span className="small-text">(2 - 11 yrs)</span>
                    </p>
                )
            }else {
                return (
                    <p>
                        <span>Infant</span>
                        <span className="small-text">(below 2yrs)</span>
                    </p>
                )
            }
        }
    }
    render() { 
        const { isOpenAdultMenu } = this.state;
        const { listTypes } = this.props;
        const { searchComponentReducers, router } = this.props;
        const { isHotel } = this.props;
        return (
            <div className={isHotel ? "search-type-dropdown traveller-type" : "search-type-dropdown passenger-type"}>
                <button onClick={()=> this.showDropdownMenu()}>                    
                    {this.getTravellersCount()}
                    <img src={typeArrow} alt="Dropdown Arrow"></img>
                </button>
                { 
                isOpenAdultMenu ? 
                    <ul className={isHotel ? "hotel passenger-list" : "passenger-list"} id="passenger-list">
                        <p className="close-icon">
                            <button onClick={()=> this.hideDropdownMenu()}>
                                Close
                            </button>
                        </p>
                        {
                            listTypes.map(list=> (
                                <li key={list} className="passenger-list-item" >                                    
                                    <div>
                                        {this.getTravellersInfo(list)}
                                    </div>
                                    <div className="select-count">
                                        <button style={this.getStyleReduce(list)} onClick={()=> this.handleCount(list, 'min')}><span>&#45;</span></button>
                                        <span className="count">{this.getTravelCount(list)}</span>
                                        <button style={this.getStyleAdd(list)} onClick={()=> this.handleCount(list, 'add')}><span>&#43;</span></button>
                                    </div>
                                </li>
                            ))
                        }
                        {
                            router.location.pathname.includes('hotels/search') && searchComponentReducers.travellers.child > 0 ?
                            <span className="text-small age-title"><FormattedMessage id="search.children.age" /></span>
                            :
                            null
                        }
                        <div className="age-selector">                            
                            {
                                router.location.pathname.includes('hotels/search') && searchComponentReducers.travellers.child > 0 ?                                                                                
                                this.getAgeSelector()
                                :
                                null
                            }
                        </div>                        
                    </ul>                
                :
                    null
                }    
            <div>
      </div>         
            </div>
        );
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
export default connect(mapStateToProps, mapDispatchToProps)(SelectPassenger);