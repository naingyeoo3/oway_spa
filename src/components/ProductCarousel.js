import React, {  PureComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import AliceCarousel from 'react-alice-carousel';

import ImageCard from './ImageCard';
import Carousel from './Carousel';
import { 
    flightTodayHotDeals,
    busTodayHotDeals,
    hotelTodayHotDeals,
    tourTodayHotDeals,
    visaTodayHotDeals,
    carRentalTodayHotDeals
} from '../constants/promotionConstants'




import '../styles/product-carousel.scss'

class ProductCarousel extends PureComponent {
  state = {
    galleryItems: [1, 2, 3].map((i) => (<h2 key={i}>{i}</h2>)),
  }
  componentWillUnmount(){
    galleryItems: null
  }
  responsive = {
    0: { items: 1},
    576:{items:2},
    992: { items: 3 },
  }
  getTodayHotDeals = () => {
    const { router, hotDealReducer } = this.props;
    switch (router.location.pathname) {
        case '/':
          return ( <Carousel items={ hotDealReducer.flight.items } /> )
        break;
        case '/flights':
          return ( <Carousel items={ hotDealReducer.flight.items } /> )            
        break;
        case '/hotels':
          return ( <Carousel items={ hotDealReducer.hotel.items } /> )
        break;
        case '/buses':
          return ( <Carousel items={ hotDealReducer.bus.items } /> )
        break;
        case '/tours':
          return ( <Carousel items={ hotDealReducer.tour.items } /> )
        break;
        case '/attractions':
          return (
            <AliceCarousel 
              mouseDragEnabled
              items={this.state.galleryItems}
              responsive={this.responsive}
              autoPlayInterval={3000}
              autoPlayDirection="ltr"
              autoPlay={true}>
                {
                  tourTodayHotDeals.map((item,index) => {

                    return(<ImageCard desData={item} key={index} />)

                  })
                }
            </AliceCarousel>
          )
        break;
        case '/myanmar_visa':
          return ( <Carousel items={ hotDealReducer.deals.items } /> )        
        break;
        case '/car_rental':
          return ( <Carousel items={ hotDealReducer.deals.items } /> )
        break;
        default:
          return(
            null
          )
        break;
    }
  }
  render() {
    return (
      <div className='promo-wrap content-padding ongoing-promo'>
        <div className='app-container'>
          <h2 className='header-title'>
            <FormattedMessage id="today.hot.deal" />
            <small><FormattedMessage id="today.hot.deal.small" /></small>
          </h2>          
          {
              this.getTodayHotDeals()
          }
        </div>
      </div> 
    )
  }
 }

const mapStateToProps = state => ({
  router        : state.router,
  hotDealReducer: state.hotDealReducer    
});

export default connect(mapStateToProps, null)(ProductCarousel);