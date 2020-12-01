import React, { Component } from 'react';
import { connect } from 'react-redux';

import { DEV_URL } from '../constants/credentials';
import { FormattedMessage } from 'react-intl';

class PopularDestinationImageCard extends React.Component{
    constructor(props){
        super(props);
    }     
    handleQuery(keyword, title, slug, from){
        const { searchComponentReducers, router, locales, navbarOptions } = this.props;
        const default_region = 'local';
        switch (router.location.pathname) {
            case '/':
                return window.open(`${DEV_URL}/flights/search/${searchComponentReducers.searchTab}/${from}/${keyword}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/Flexi/${searchComponentReducers.travellerClass.key}/Flexi/Flexi/${navbarOptions.nation.value}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self');
                break;
            case '/flights':
                return window.open(`${DEV_URL}/flights/search/${searchComponentReducers.searchTab}/${from}/${keyword}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/Flexi/${searchComponentReducers.travellerClass.key}/Flexi/Flexi/${navbarOptions.nation.value}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self');
                break;
            case '/buses':
                return window.open(`${DEV_URL}/buses/${searchComponentReducers.searchTab}/${from}/${title}/flexi/flexi/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self');
                break;
            case '/hotels':
                var child_str = searchComponentReducers.travellers.childAge.length > 0 ? searchComponentReducers.travellers.childAge.map((child, index)=> `enquired_children[${index}]=${child.age}`).join('&') : '';                            
                return window.open(`${DEV_URL}/hotels/search/?hotel_city=${keyword}&hotel_search_term=${slug}&hotel_search_scope=${searchComponentReducers.destination.scope}&hotel_search_region=${default_region}&checkin_date=${searchComponentReducers.fromDate.date}&checkout_date=${searchComponentReducers.toDate.date}&enquired_rooms=${searchComponentReducers.travellers.room}&enquired_adults=${searchComponentReducers.travellers.adult}&${child_str}&citizien=foreigner/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self')
                break;
            case '/tours':
                return window.open(`${DEV_URL}/destinations/${keyword}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/0/0/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self')
                break;
            case '/attractions':
                return window.open(`${DEV_URL}/attractions/${keyword}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${searchComponentReducers.travellers.adult}/0/0/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self')
                break;
            case '/myanmar_visa':
                return 
                break;

            default:
                break;
        }
    }
    render(){
        const { desData } = this.props;
        return(        
            <div key={desData.id} onClick={()=> this.handleQuery(desData.keyword, desData.dest, desData.slug, desData.from)}>                        
                <div 
                    className='carosel-item' 
                    style={{
                        backgroundImage:`url(${require(`../assests/images/jpg/${desData.img_url}`)})`,
                        height:"280px",
                        borderRadius:"10px",
                        backgroundPosition: "center",
                        backgroundSize:"100% 100%",
                        backgroundRepeat: "no-repeat"
                    }}   
                    />
                <a href={desData.link}>                         
                    <p><FormattedMessage id={desData.name} /></p>  
                </a>          
            </div>   
            )
    }
    
}

const mapStateToProps = state => ({
    router        : state.router,
    searchComponentReducers: state.searchComponentReducers,
    navbarOptions: state.navbarOptions,
    locales: state.locales    
});

const mapDispatchToProps = dispatch => {
    return{                             
        autocompleteSelectToValue : (keyword, title)=> dispatch(autocompleteSelectToValue(keyword, title)),        
        handleRefreshState: ()=> dispatch(handleRefreshState()),
        handleRefreshStateEnd: ()=> dispatch(handleRefreshStateEnd())        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularDestinationImageCard);

