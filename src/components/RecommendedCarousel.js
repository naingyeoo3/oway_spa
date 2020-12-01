import React, { Component } from 'react';
import RecommendedProductImageCard from './RecommendedProductImageCard';
import AliceCarousel from 'react-alice-carousel'



class RecommendedCarousel extends Component {
    constructor(props){
        super(props);
    }
    state = {
        // galleryItems: [1, 2, 3, 4, 5] .map((i) => (<h2 key={i}>{i}</h2>)),
    };
    responsive = {
        0: { items: 1 },    
        1024: { items: 4 },
    }    
    render() { 
        return (
            <div>
                    {this.props.hotelRecommendedIntltest.map((recommendcity,index)=> 
                        <AliceCarousel 
                        mouseDragEnabled
                        items={this.state.galleryItems}
                        responsive={this.responsive}
                        autoPlayDirection="ltr"
                        autoPlay={false}
                        key={index}
                        >                                                                         
                        {
                            recommendcity.cities.map((item,index)=> (
                                <RecommendedProductImageCard desData={item} key={index} />
                            ))
                        }                                    
                    </AliceCarousel>
                )}

           
         </div>
        );  
    }
}

export default RecommendedCarousel;