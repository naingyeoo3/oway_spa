import React, { Component } from 'react';
import AliceCarousel from 'react-alice-carousel';
import ImageCard from '../ImageCard';

import "react-alice-carousel/lib/scss/alice-carousel.scss"

class Carousel extends Component {
    responsive = {
        0: { items: 1},
        576:{items:2},
        992: { items: 3 },
    }
    render() {
        const { items } = this.props;        
        return (
          <div>
            {
              items != null ?
              <AliceCarousel 
                mouseDragEnabled
                responsive={this.responsive}
                autoPlayInterval={3000}
                autoPlayDirection="ltr"
                autoPlay={true}>
                  {
                    items.map((item,index) => {
                      return(<ImageCard desData={item} key={index} />)                    
                    })
                  }
              </AliceCarousel>
              :
              <div/>
            }
          </div>
            
        );
    }
}

export default Carousel;