import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DEV_URL } from '../constants/credentials';
import { FormattedMessage } from 'react-intl';
import Star from './Star';

class RecommendedProductImageCard extends React.Component{
    constructor(props){
        super(props);
    }     
    handleQuery(keyword, slug){
        const { 
            searchComponentReducers,
            router,
            locales,
            navbarOptions,
            desData 
        } = this.props;
        
        switch (router.location.pathname) {  
            case '/hotels':
                var child_str = searchComponentReducers.travellers.childAge.length > 0 ? searchComponentReducers.travellers.childAge.map((child, index)=> `enquired_children[${index}]=${child.age}`).join('&') : '';
                window.open(`${DEV_URL}/hotels/search?hotel_city=${desData.hotel_city}&hotel_search_term=${desData.slug}&hotel_search_scope=${desData.scope}&hotel_search_region=${default_region}&checkin_date=${searchComponentReducers.fromDate.date}&checkout_date=${searchComponentReducers.toDate.date}&enquired_rooms=${searchComponentReducers.travellers.room}&enquired_adults=${searchComponentReducers.travellers.adult}&${child_str}&citizien=${navbarOptions.nation.other_name}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self')
                break;
            case '/tours':
                if(keyword == "bagan"){
                 return window.open(`${DEV_URL}/destination/335962/23+Oct+2019/23+Oct+2019/Bagan+%28Nyaung-U%29/2/0/0`, '_self')
                }else {
                 return window.open(`${DEV_URL}/destination/${keyword}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${slug}/2/0/0/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self')
                }
                break;
            case '/attractions':
                    if(keyword == "bagan"){
                      
                     return window.open(`${DEV_URL}/attraction/335962/23+Oct+2019/23+Oct+2019/Bagan+%28Nyaung-U%29/2/0/0`, '_self')
                    }else {
                        return window.open(`${DEV_URL}/attraction/${keyword}/${searchComponentReducers.fromDate.date}/${searchComponentReducers.toDate.date}/${slug}/2/0/0/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self')
                    }
                    break;
            default:
                return(
                    null
                )
                break;
        }
        
    }
    currencyType(data){ 
        const {  navbarOptions } = this.props;
        return(
            navbarOptions.nation.type == 'f'?
            <div className="recommended-price">{
                navbarOptions.currency.type == 'mmk'?
                <span>{data.price_mmk}</span>
                :<span>{data.price_usd}</span>
                }
            </div> 
            :
            <div className="recommended-price">{
                navbarOptions.currency.type == 'mmk'?
                <span>{data.lprice_mmk}</span>
                :<span>{data.lprice_usd}</span>
                }
            </div> 
        )
    }
    starRate(star_rate){
        const { router } = this.props;
        return(
            router.location.pathname == '/hotels' ?
            <Star className={star_rate}></Star>
            :null
        )
    }
    promoPercent (promo_percent){
        return(
            promo_percent
            ?<div className="promo_percent"><span>{promo_percent} </span></div>
            :null
        )
    }
    promoSeason (promo_season){
        return(
            promo_season
            ?<div className="promo_season"><span>{promo_season} </span></div>
            :null
        )
    }
    render(){
        const { desData, router } = this.props;
        return (
            <div key={desData.id} onClick={()=> this.handleQuery(desData.keyword,desData.slug)}>        
                <div 
                    className='carosel-item recommended-imagecard'
                    style={router.location.pathname == '/hotels' ?
                        {backgroundImage:`url(${require(`../assests/images/jpg/recommended-hotels/${desData.img_url}`)})`,}:
                        {backgroundImage:`url(${require(`../assests/images/jpg/recommended-tours/${desData.img_url}`)})`,}
                    }>
                    <div className="main-promo">
                        {this.promoPercent(desData.promo_percent)} 
                        {this.promoSeason(desData.promo_season)}
                    </div>
                </div>
                <a href={desData.link}> 
                    <h2><FormattedMessage id={desData.name} /></h2>
                    {this.starRate(desData.star_rate)}
                    <small><FormattedMessage id={desData.starting} /></small>
                    {this.currencyType(desData)} 
                    <p><FormattedMessage id={desData.small} /></p>
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

export default connect(mapStateToProps,null)(RecommendedProductImageCard);

