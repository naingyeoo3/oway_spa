
import moment from 'moment';
const dateFormat = 'DD MMM YYYY';
import { myanmarCities } from './constants';
import { busCities } from './busConstants'

export const flightState = {
    from: {
        fromCityTitle: 'Yangon (RGN)',            
        fromCity:'RGN',
        placeholder: 'Origin'
    },
    to : {
        toCityTitle: 'Bangkok (DMK)',
        toCity:'DMK',
        placeholder: 'Destination'
    },
    destination: {
        name: 'Yangon, Myanmar',
        slug: 'yangon',
        scope: 'city',
        placeholder: 'Where do you want to stay?'
    },
    tourDestination: {
        cityId: 123,
        name: 'Bangkok',
        placeholder: 'Where do you want to go?'
    },
    fromDate:{
        date: moment().format('HH') > 19 ? moment().add(2,'days').format(dateFormat) : moment().add(1,'days').format(dateFormat),            
    },
    toDate: {
        date: moment().format('HH') > 19 ? moment().add(2,'days').format(dateFormat) : moment().add(1,'days').format(dateFormat),            
    },
    onewayDate: {
        date: moment().format('HH') > 19 ? moment().add(2,'days').format(dateFormat) : moment().add(1,'days').format(dateFormat),            
    },
    travellers: {
        adult: 1,
        child: 0,
        infact: 0,
        room: 1,
        childAge: []
    },
    travellersType:'',
    searchTab: 2,
    isRefreshing: false,
    recommendedCities : myanmarCities
}

export const busesState = {
    from: {
        fromCityTitle: 'Yangon',            
        fromCity:'Yangon',
        id: 5001,
        placeholder: 'Origin'  
    },
    to : {
        toCityTitle: 'Mandalay',
        toCity:'Mandalay',
        id: 1913,
        placeholder: 'Destination'  
    },
    destination: {
        name: 'Yangon, Myanmar',
        slug: 'yangon',
        scope: 'city',
        placeholder: 'Where do you want to stay?'
    },
    tourDestination: {
        cityId: 123,
        name: 'Bangkok',
        placeholder: 'Where do you want to go?'
    },
    fromDate:{
        date: moment().format('HH') > 16 ? moment().add(3, 'days').format(dateFormat) : moment().add(2, 'days').format(dateFormat),            
    },
    toDate: {
        date: moment().format('HH') > 16 ? moment().add(4,'days').format(dateFormat) : moment().add(3,'days').format(dateFormat),            
    },
    onewayDate: {
        date: moment().format('HH') > 16 ? moment().add(3, 'days').format(dateFormat) : moment().add(2, 'days').format(dateFormat),            
    },
    travellers: {
        adult: 1,
        child: 0,
        infact: 0,
        room: 1,
        childAge: []
    },
    travellersType:'',
    searchTab: 2,
    isRefreshing: false,
    recommendedCities : busCities
}

export const hotelsState = {
    from: {
        fromCityTitle: 'Yangon',            
        fromCity:'Yangon',
        placeholder: 'Origin'  
    },
    to : {
        toCityTitle: 'Mandalay',
        toCity:'Mandalay',
        placeholder: 'Destination'  
    },
    destination: {
        name: 'Yangon, Myanmar',
        slug: 'yangon',
        scope: 'city',
        id: 32559,
        city_slug: 'yangon',
        township_slug: 'yangon',
        hotel_slug:'',
        country: 'Myanmar',
        region: 'local',
        placeholder: 'Where do you want to stay?'
    },
    tourDestination: {
        cityId: 123,
        name: 'Bangkok',
        placeholder: 'Where do you want to go?'
    },
    fromDate:{
        date: moment().format('HH') > 16 ? moment().add(2,'days').format(dateFormat) : moment().add(1,'days').format(dateFormat),            
    },
    toDate: {
        date: moment().format('HH') > 16 ? moment().add(3,'days').format(dateFormat):moment().add(2,'days').format(dateFormat),            
    },
    travellers: {
        adult: 2,
        child: 0,
        infact: 0,
        room: 1,
        childAge: []
    },
    travellersType:'',
    searchTab: 2,
    isRefreshing: false,
    recommendedCities : busCities
}

export const toursState = {
    from: {
        fromCityTitle: 'Yangon',            
        fromCity:'Yangon',
        placeholder: 'Origin'  
    },
    to : {
        toCityTitle: 'Mandalay',
        toCity:'Mandalay',
        placeholder: 'Destination'  
    },
    destination: {
        name: 'Yangon, Myanmar',
        slug: 'yangon',
        scope: 'city',
        placeholder: 'Where do you want to stay?'
    },
    tourDestination: {
        cityId: 123,
        name: 'Bangkok',
        placeholder: 'Where do you want to go?'
    },
    fromDate:{
        date: moment().format('HH') > 16 ? moment().add(5,'days').format(dateFormat) : moment().add(4,'days').format(dateFormat),            
    },
    toDate: {
        date: moment().format('HH') > 16 ? moment().add(5,'days').format(dateFormat) : moment().add(4,'days').format(dateFormat),            
    },
    travellers: {
        adult: 2,
        child: 0,
        infact: 0,
        room: 1,
        childAge: []
    },
    travellersType:'',
    searchTab: 2,
    isRefreshing: false,
    recommendedCities : busCities
}

export const toursattractionState = {
    from: {
        fromCityTitle: 'Yangon',            
        fromCity:'Yangon',
        placeholder: 'Origin'  
    },
    to : {
        toCityTitle: 'Mandalay',
        toCity:'Mandalay',
        placeholder: 'Destination'  
    },
    destination: {
        name: 'Yangon, Myanmar',
        slug: 'yangon',
        scope: 'city',
        placeholder: 'Where do you want to stay?'
    },
    tourDestination: {
        cityId: 123,
        name: 'Bangkok',
        placeholder: 'Where do you want to go?'
    },
    fromDate:{
        date: moment().format('HH') > 16 ? moment().add(5,'days').format(dateFormat) : moment().add(4,'days').format(dateFormat),            
    },
    toDate: {
        date: moment().format('HH') > 16 ? moment().add(5,'days').format(dateFormat) : moment().add(4,'days').format(dateFormat),            
    },
    travellers: {
        adult: 2,
        child: 0,
        infact: 0,
        room: 1,
        childAge: []
    },
    travellersType:'',
    searchTab: 2,
    isRefreshing: false,
    recommendedCities : busCities
}