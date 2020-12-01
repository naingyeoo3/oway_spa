import React, { Component } from 'react';
import { connect } from 'react-redux';

import moment from 'moment';
const dateFormat = 'DD MMM YYYY';

import { DEV_URL } from '../constants/credentials';
import { FormattedMessage } from 'react-intl';

class PopularCard extends Component {
    constructor(props){
        super(props);
        //console.info(moment().format('HH'))
        //console.log(moment().format('HH') > 16 ? moment().add(3, 'days').format(dateFormat) : moment().add(2, 'days').format(dateFormat))
    }
    handleQuery(prouduct, name, airportCode, keyword, tourId, slug, from, code, scope){        
        const { searchComponentReducers, navbarOptions, locales } = this.props;
        switch (prouduct) {
            case '/':
                return window.open(`${DEV_URL}/flights/search/${searchComponentReducers.searchTab}/${code}/${airportCode}/${moment().add(1,'days').format(dateFormat)}/${moment().add(1,'days').format(dateFormat)}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/Flexi/${searchComponentReducers.travellerClass.key}/Flexi/Flexi/${searchComponentReducers.nationType}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self');
                break;
            case '/flights':
                return window.open(`${DEV_URL}/flights/search/${searchComponentReducers.searchTab}/${code}/${airportCode}/${moment().add(1,'days').format(dateFormat)}/${moment().add(1,'days').format(dateFormat)}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${searchComponentReducers.travellers.infact}/Flexi/${searchComponentReducers.travellerClass.key}/Flexi/Flexi/${searchComponentReducers.nationType}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self');
                break;
            case '/buses':
                return window.open(`${DEV_URL}/buses/${searchComponentReducers.searchTab}/${from}/${name}/flexi/flexi/${moment().format('HH') > 16 ? moment().add(3, 'days').format(dateFormat) : moment().add(2, 'days').format(dateFormat)}/${moment().format('HH') > 16 ? moment().add(4,'days').format(dateFormat) : moment().add(3,'days').format(dateFormat)}/${searchComponentReducers.travellers.adult}/${searchComponentReducers.travellers.child}/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self');
                break;
            case '/hotels':
                var child_str = searchComponentReducers.travellers.childAge.length > 0 ? searchComponentReducers.travellers.childAge.map((child, index)=> `enquired_children[${index}]=${child.age}`).join('&') : '';                            
                return window.open(`${DEV_URL}/hotels/search?hotel_city=${keyword}&hotel_search_term=${slug}&hotel_search_scope=${scope}&checkin_date=${moment().format('HH') > 16 ? moment().add(2,'days').format(dateFormat) : moment().add(1,'days').format(dateFormat)}&checkout_date=${moment().format('HH') > 16 ? moment().add(3,'days').format(dateFormat):moment().add(2,'days').format(dateFormat)}&enquired_rooms=${searchComponentReducers.travellers.room}&enquired_adults=${searchComponentReducers.travellers.adult}&${child_str}&citizien=foreigner/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self')
                break;
            case '/tours':
                return window.open(`${DEV_URL}/destinations/${tourId}/${moment().add(4,'days').format(dateFormat)}/${moment().add(4,'days').format(dateFormat)}/${searchComponentReducers.travellers.adult}/0/0/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self')
                break;  
            case '/attractions':
                return window.open(`${DEV_URL}/attractions/${tourId}/${moment().add(4,'days').format(dateFormat)}/${moment().add(4,'days').format(dateFormat)}/${searchComponentReducers.travellers.adult}/0/0/${navbarOptions.currency.type}/${navbarOptions.nation.type}/${locales.queryName}`, '_self')
                break;
            default:
                break;
        }
    }
    render() {
        const { city } = this.props;
        return (
            <div
                style={{
                    backgroundImage:`url(${require(`../assests/images/jpg/${city.img_url}`)})`                    
                }}
                className="destination-img"
            >
                <div className="city-info">
                    <h5><FormattedMessage id={city.title} /></h5>
                    <ul>
                        <li onClick={()=> this.handleQuery('/flights', city.name, city.airportCode, city.hotel_keyword, city.tourId, city.slug, city.from, city.airCode, city.scope)}><a>Flights</a><span>.</span></li>
                        <li onClick={()=> this.handleQuery('/hotels',city.name, city.airportCode, city.hotel_keyword, city.tourId, city.slug, city.from, city.airCode, city.scope)}><a>Hotels</a><span>.</span></li>
                        <li onClick={()=> this.handleQuery('/buses', city.name, city.airportCode, city.hotel_keyword, city.tourId, city.slug, city.from, city.airCode, city.scope)}><a>Bus</a><span>.</span></li>
                        <li onClick={()=> this.handleQuery('/tours',city.name, city.airportCode, city.hotel_keyword, city.tourId, city.slug, city.from, city.airCode, city.scope)}><a>Tours</a></li>                
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    router        : state.router,
    searchComponentReducers: state.searchComponentReducers,
    navbarOptions: state.navbarOptions,
    locales     : state.locales    
});

const mapDispatchToProps = dispatch => {
    return{                             
        autocompleteSelectToValue : (keyword, title)=> dispatch(autocompleteSelectToValue(keyword, title)),        
        handleRefreshState: ()=> dispatch(handleRefreshState()),
        handleRefreshStateEnd: ()=> dispatch(handleRefreshStateEnd())        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularCard);