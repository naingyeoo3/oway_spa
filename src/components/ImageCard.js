import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
const dateFormat = 'DD MMM YYYY';
const hotel_time = new Date().getHours();

import { DEV_URL } from '../constants/credentials';
import { FormattedMessage } from 'react-intl';

class ImageCard extends React.Component{
    constructor(props){
        super(props);        
    }
    
    gotoPromotion(data){
        const { navbarOptions, locales, searchComponentReducers, router } = this.props;    
        const start_date = moment().add(5,'days').format(dateFormat);
        const end_date = moment().add(5,'days').format(dateFormat);
        const hotel_start_date = moment().add(1,'day').format(dateFormat);
        const hotel_end_date = moment().add(2,'day').format(dateFormat);
        const hotel_start_plusdate = moment().add(2,'day').format(dateFormat);
        const hotel_end_plusdate = moment().add(3,'day').format(dateFormat);
        //const hotel_time = moment().format('HH');
        
        const adult = 1;
        const enquired_rooms = 1;
        const child_str = 0;
        const hotel_adult = 2;

        if(data.keyword == "bagan"){
            window.open(`${DEV_URL}/destination/335962/23+Oct+2019/23+Oct+2019/Bagan+%28Nyaung-U%29/2/0/0`, '_blank')
        }else if(data.keyword == "stb") {
            window.open(`${DEV_URL}/singapore-tourism-board/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_blank')
        }else if(data.keyword == "air-kbz") {
            window.open(`${DEV_URL}/air-kbz-great-offer/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_blank')
        }else if(data.keyword == "summer-sale") {
            window.open(`${DEV_URL}`, '_self')
        }else if(data.keyword == "great-thingyan") {
            window.open(`${DEV_URL}/the-great-thingyan-sale/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_blank')
        }else if(data.keyword == "balloon") {
            window.open(`${DEV_URL}/ballooning-packages/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_blank')
        }else if(data.keyword == "hotel") {
            hotel_time > 17 ? 
            window.open(`${DEV_URL}/hotels/search?hotel_city=${data.hotel_city}&hotel_search_term=${data.slug}&hotel_search_scope=${data.scope}&checkin_date=${hotel_start_plusdate}&checkout_date=${hotel_end_plusdate}&enquired_rooms=${enquired_rooms}&enquired_adults=${hotel_adult}&${child_str}&citizien=${navbarOptions.nation.other_name}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_blank')
            :
            window.open(`${DEV_URL}/hotels/search?hotel_city=${data.hotel_city}&hotel_search_term=${data.slug}&hotel_search_scope=${data.scope}&checkin_date=${hotel_start_date}&checkout_date=${hotel_end_date}&enquired_rooms=${enquired_rooms}&enquired_adults=${hotel_adult}&${child_str}&citizien=${navbarOptions.nation.other_name}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_blank')
        }else{
            window.open(`${DEV_URL}/destination/${data.cityId}/${end_date}/${start_date}/${data.cityName}/${adult}/0/0/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_blank')
        }                        
    }
    render(){
        const { locales } = this.props;
        const { desData } = this.props;        
        return(                   
            <div key={this.props.desData.id} className="carosel-item">
                <a href={desData.url} target="_blank">
                    <div 
                        className='carosel-item-image' 
                        style={{
                            height: 218,
                            backgroundImage: `url(${desData.image})`,
                            backgroundSize:'cover',
                            backgroundPosition: 'center',
                            borderRadius: 10,
                            width: '100%',
                            transition: '0.5s all ease-in'
                        }}
                    />
                    <p>{locales.lang === 'my' ? desData.myaTitle : desData.engTitle}</p>                
                </a>                
            </div>   
        )
    }    
}

const mapStateToProps = state => ({         
    searchComponentReducers: state.searchComponentReducers,    
    navbarOptions: state.navbarOptions,
    locales : state.locales,
    router  : state.router    
 });

export default connect(mapStateToProps,null)(ImageCard);

