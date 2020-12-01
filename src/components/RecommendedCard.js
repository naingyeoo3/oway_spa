import React, { Component } from 'react';
import MobileAutocompleteRecommendedCard from './MobileAutocompleteRecommendedCard';
// import MobileHotelRecommendedCard from './MobileHotelRecommendedCard';
// import MobileTourAutocompleteCard from './MobileTourAutocompleteCard';

class RecommendedCard extends Component {
    constructor(props){
        super(props);
    
    }
    getRecommendedCard(route){
        const { 
            mobileHotelRegionCities,
            mobileBusRegionCities,
            mobileRegionCities,
            mobileTourCities
        } = this.props;
        switch (route) {
            case '/':
                return (
                    <MobileAutocompleteRecommendedCard 
                        mobileRegionCities={mobileRegionCities}
                        callbackParent={(keyword, name)=> this.props.callbackParentMobileCity('from', keyword, name)}
                    />
                );
                break;
            case '/flights':
                return (
                    <MobileAutocompleteRecommendedCard 
                        mobileRegionCities={mobileRegionCities}
                        callbackParent={(keyword, name)=> this.props.callbackParentMobileCity('from', keyword, name)}
                    />
                );
                break;
            case '/buses':
                return (
                    <MobileAutocompleteRecommendedCard 
                        mobileRegionCities={busMobileCities}
                        callbackParent={(keyword, name)=> this.props.callbackParentMobileCity('from', keyword, name)}
                    />
                );
                break;
            case '/hotels':
                return (
                    <MobileHotelRecommendedCard 
                        mobileRegionCities={mobileHotelRegionCities}
                        callbackParent={(data)=> this.props.callbackParentHotel(data)}                                    
                    />
                );
                break;
            case '/tours':
                return (
                    <MobileTourAutocompleteCard 
                        mobileRegionCities={mobileTourCities}
                        callbackParent={(id, name)=> this.props.callbackParentMobileCity(id, name)}
                    />
                );
            break;
            case '/attractions':
                return (
                    <MobileTourAutocompleteCard 
                        mobileRegionCities={mobileTourCities}
                        callbackParent={(id, name)=> this.props.callbackParentMobileCity(id, name)}
                    />
                )
            default:

            break;
        }
    }
    render() {
        const { router } = this.props;
        return (
            <div>
            {
                this.getRecommendedCard(router.location.pathname)
            }
            </div>
        );
    }
}

export default RecommendedCard;