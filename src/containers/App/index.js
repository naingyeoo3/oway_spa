import React from 'react';
import { connect } from 'react-redux';
import en from 'react-intl/locale-data/en';
import mm from 'react-intl/locale-data/my';
import {IntlProvider, addLocaleData} from 'react-intl';
import { Switch, Route } from 'react-router-dom';
import HomePage from '../Homepage/Loadable';
import NotFoundPage from '../NotFoundPage';
import FlightPage from '../FlightPage/Loadable';
import CarRentalPage from '../CarRentalPage/Loadable';
import ApplicationBar from '../ApplicationBar';
import ApplicationFooter from '../ApplicationFooter';
import HotelPage from '../HotelPage/Loadable';
import BusExpressPage from '../BusExpressPage/Loadable';
import TourPage from '../TourPage/Loadable';

import VisaPage from '../VisaPage/Loadable';
import OwayRidePage from '../OwayRidePage/Loadable';
import TopScrollButton from '../../components/TopScrollButton';
import FlightListing from '../FlightListing/Loadable';
import HotelListing from '../HotelListing/Loadable';
import FlightReturn from '../FlightReturn/Loadable';
import TourDetailPage from '../TourDetailPage';
import HotelDetail from '../HotelDetail/Loadable';
import PassengerInfo from '../PassengerInfo/Loadable';
import TourListing from '../TourListing';
import BusListing from '../BusListing';
import BusCheckout from '../BusCheckOut/Loadable';
import Payment from '../Payment/Loadable';
import BusReturn from '../BusReturn/Loadable';
import AttractionListing from '../AttractionListing';
import AttractionDetailPage from '../AttractionDetailPage';
import TourCheckoutPage from '../TourCheckoutPage';
import ThankYouPage from '../ThankYouPage/Loadable';
import HotelPassengerInfo from '../HotelPassengerInfo';
import KBZPay from '../KBZPay/Loadable';
import OnePay from '../OnePay/Loadable';
import WavePay from '../WavePay/Loadable';
import LoginRegister from '../LoginRegister';
import VisaInfo from '../VisaInfo/Loadable';
import ForgotPassword from '../ForgotPassword';
import ChangePassword from '../ChangePassword';
import { Web, Mobile } from '../../constants/helper';

import './app.scss';


const overrideStyle = {
  background: 'none'
}

addLocaleData([...mm,...en]);

class App extends React.Component {
  render() {
    return (
      <IntlProvider key={this.props.locales.lang} locale={this.props.locales.lang} messages={this.props.locales.messages}>    
        <div className='wrapper'
          style={
            this.props.locales.lang == 'en' ? {fontFamily:'Lato,sans-serif'} : {fontFamily:'Pyidaungsu, sans-serif'}            
            }>            
          <ApplicationBar style={overrideStyle}/>       
          <div className="main-content">
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/flights" component={FlightPage} />
              <Route exact path="/hotels" component={HotelPage} />              
              <Route exact path="/buses" component={BusExpressPage} />
              <Route exact path="/tours" component={TourPage} />
              <Route exact path="/attractions" component={TourPage} />
              <Route exact path="/myanmar_visa" component={VisaPage} />
              <Route exact path="/car_rental" component={CarRentalPage} />
              <Route exact path="/sign-in" component={LoginRegister} />
              <Route exact path="/agent-sign-in" component={LoginRegister} />              
              <Route exact path="/register" component={LoginRegister} />
              <Route exact path="/forgot-password" component={ForgotPassword} />
              <Route exact path="/change-password" component={ChangePassword} />
              <Route exact path="/flights/search/:tripPlan/:from/:to/:fromDate/:toDate/:adult/:child/:infant/:class/:currency/:locales" component={FlightListing}/>               
              <Route exact path="/flights/search/return/:tripPlan/:from/:to/:fromDate/:toDate/:adult/:child/:infant/:class/:currency/:locales" component={FlightReturn}/>
              <Route exact path="/hotels/search/:name/:slug/:scope/:from/:to/:room/:adult/:nationName/:currency/:nation/:locales" component={HotelListing}/>              
              <Route exact path="/hotels/search/:slug/:checkin/:checkout/:currency/:national/:lang/:room/:limit" component={HotelDetail}/>
              <Route exact path="/hotels/search/:hotelSlug/checkout" component={HotelPassengerInfo}/>              
              <Route exact path="/hotels/search/:hotelSlug/checkout/payment" component={Payment} />
              <Route exact path="/buses/search/:tripId/:fromCity/:fromCityId/:toCity/:toCityId/:fromDate/:toDate/:adult/:child/:currency/:nation/:locale" component={BusListing}/>
              <Route exact path="/buses/search/return/:tripId/:fromCity/:busRouteId/:toCity/:busRouteRateId/:fromDate/:toDate/:adult/:child/:currency/:nation/:locale" component={BusReturn}/>
              <Route exact path="/tours/search/:cityName/:fromDate/:toDate/:adult/:child/:infact/:currency/:nation/:locale" component={TourListing}/>
              <Route exact path="/tours/search/detail/:tourId" component={TourDetailPage} />
              <Route exact path="/flights/search/detail/:flightType/checkout" component={PassengerInfo}/>
              <Route exact path="/flights/search/detail/:flightType/checkout/payment" component={Payment}/>
              <Route exact path="/bus/search/detail/:busRouteId/checkout" component={BusCheckout}/>
              <Route exact path="/bus/search/detail/:busRouteId/checkout/payment" component={Payment}/>
              <Route exact path="/attractions/search/:cityName/:fromDate/:toDate/:adult/:child/:infact/:currency/:nation/:locale" component={AttractionListing}/>
              <Route exact path="/attractions/search/detail/:tourId" component={AttractionDetailPage} />   
              <Route exact path="/tours/search/detail/:tourId/checkout" component={TourCheckoutPage} />                         
              <Route exact path="/tours/search/detail/:tourId/checkout/payment" component={Payment} />
              <Route exact path="/attractions/search/detail/:tourId" component={AttractionDetailPage} />
              <Route exact path="/myanmar_visa/apply" component={VisaInfo} />
              <Route path= "/flights/search/checkout/thank-you" component={ThankYouPage}/>
              <Route path ="/bus/search/checkout/thank-you" component={ThankYouPage}/>   
              <Route exact path="/checkout/mobile-payment/kbz-pay" component={KBZPay}/>
              <Route exact path="/checkout/mobile-payment/one-pay" component={OnePay}/>
              <Route exact path="/checkout/mobile-payment/wave-pay" component={WavePay}/>
              <Route path= "/tour/search/checkout/thank-you" component={ThankYouPage}/>
              <Route path= "/hotel/search/checkout/thank-you" component={ThankYouPage}/>                         
              <Route path="" component={NotFoundPage} />
            </Switch>
          </div>                
          <ApplicationFooter />
          <TopScrollButton />
        </div>
    </IntlProvider>
    );
  }
}


export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: ()=> console.log('askdjf')
  };
}

const mapStateToProps = state => ({ 
  locales: state.locales,   
  navbarOptions : state.navbarOptions
});

export default connect(mapStateToProps, mapDispatchToProps)(App);