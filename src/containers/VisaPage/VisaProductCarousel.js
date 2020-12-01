import React, {  PureComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Carousel from '../../components/Carousel';
import '../../styles/product-carousel.scss'

class VisaProductCarousel extends PureComponent {
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
  getTitle(){
      return (
        <h2 className='header-title'>
            <FormattedMessage id="today.hot.deal" />
            <small><FormattedMessage id="today.hot.deal.small" /></small>
        </h2>
      )
  }
  render() {
      const { hotDealReducer } = this.props;
    return (
      <div>
        {
          hotDealReducer.visa.items.length > 0 ?
          <div className='promo-wrap content-padding ongoing-promo'>
            <div className='app-container'>
              {this.getTitle()}        
              <Carousel items={hotDealReducer.visa.items.length > 0 ? hotDealReducer.visa.items : null}/>
            </div>
          </div> 
          :
          <div className="none-hotdeal" />
        }
      </div>
      
    )
  }
 }

const mapStateToProps = state => ({
  router        : state.router,
  hotDealReducer: state.hotDealReducer    
});

export default connect(mapStateToProps, null)(VisaProductCarousel);