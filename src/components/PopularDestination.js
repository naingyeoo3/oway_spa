import React, {  PureComponent } from 'react'
import { connect } from 'react-redux'

import { Tabs } from 'antd';
import AliceCarousel from 'react-alice-carousel'
import PopularDestinationImageCard from './PopularDestinationImageCard'

import { busPopularDestination } from '../constants/busConstants'
import { hotelPopularDestination } from '../constants/hotelConstants'
import { 
    flightPopularIntDest, 
    flightPopularDomDest
} from '../constants/flightConstants'
import { 
    tourPopularMyaDest,
    tourPopularIntDest
} from '../constants/tourConstants'

import "react-alice-carousel/lib/scss/alice-carousel.scss"
import '../styles/product-carousel.scss';
import { FormattedMessage } from 'react-intl';

const TabPane = Tabs.TabPane;
 
class PopularDestination extends PureComponent {
    constructor(props){
        super(props);
    }
    state = {
        galleryItems: [1, 2, 3].map((i) => (<h2 key={i}>{i}</h2>)),
    };
    responsive = {
        0: { items: 5 },    
        1024: { items: 6 },
    }    
    getPopularDestination = () => {
        const { router } = this.props;
        switch (router.location.pathname) {
            case '/':
                return (
                    <div>
                        <Tabs type="card">
                            <TabPane tab={<FormattedMessage id="popular.international" />} key="1">
                                <AliceCarousel 
                                    mouseDragEnabled
                                    items={this.state.galleryItems}
                                    responsive={this.responsive}
                                    autoPlayInterval={6000}
                                    autoPlayDirection="ltr"
                                    autoPlay={false}>
                                        {
                                            flightPopularIntDest.map((item,index) => {
                                                return(
                                                    <PopularDestinationImageCard 
                                                        desData={item} 
                                                        key={index} 
                                                        callbackParent={(keyword, title)=> this.props.callbackParent(keyword, title)}
                                                        />
                                                )
                                            })
                                        }
                                </AliceCarousel>
                            </TabPane>                            
                            <TabPane tab={<FormattedMessage id="popular.domestic" />} key="2">
                                <AliceCarousel 
                                    mouseDragEnabled
                                    items={this.state.galleryItems}
                                    responsive={this.responsive}
                                    autoPlayInterval={6000}
                                    autoPlayDirection="ltr"
                                    autoPlay={true}>
                                    {
                                        flightPopularDomDest.map((item,index) => {
                                            return(
                                                <PopularDestinationImageCard 
                                                    desData={item} 
                                                    key={index} 
                                                    callbackParent={(keyword, title)=> this.props.callbackParent(keyword, title)}
                                                    />
                                            )
                                        })
                                    }
                                </AliceCarousel>
                            </TabPane>
                        </Tabs>
                    </div>
                )
                break;
            case '/flights':
                return (
                    <div>
                        <Tabs type="card">
                            <TabPane tab={<FormattedMessage id="popular.international" />} key="1">
                                <AliceCarousel 
                                    mouseDragEnabled
                                    items={this.state.galleryItems}
                                    responsive={this.responsive}
                                    autoPlayInterval={6000}
                                    autoPlayDirection="ltr"
                                    autoPlay={false}>
                                        {
                                            flightPopularIntDest.map((item,index) => {
                                                return(<PopularDestinationImageCard desData={item} key={index} />)
                                            })
                                        }
                                </AliceCarousel>
                            </TabPane>                            
                            <TabPane tab={<FormattedMessage id="popular.domestic" />} key="2">
                                <AliceCarousel 
                                    mouseDragEnabled
                                    items={this.state.galleryItems}
                                    responsive={this.responsive}
                                    autoPlayInterval={6000}
                                    autoPlayDirection="ltr"
                                    autoPlay={true}>
                                    {
                                        flightPopularDomDest.map((item,index) => {
                                            return(<PopularDestinationImageCard desData={item} key={index} />)
                                        })
                                    }
                                </AliceCarousel>
                            </TabPane>
                        </Tabs>
                    </div>
                )
                break;
            case '/buses':
                return (
                    <AliceCarousel 
                        mouseDragEnabled
                        items={this.state.galleryItems}
                        responsive={this.responsive}
                        autoPlayInterval={6000}
                        autoPlayDirection="ltr"
                        autoPlay={false}>
                            {
                                busPopularDestination.map((item,index) => {
                                    return(<PopularDestinationImageCard desData={item} key={index} />)
                                })
                            }
                    </AliceCarousel>                                        
                )
                break;
            case '/hotels':
                return (
                    <AliceCarousel 
                        mouseDragEnabled
                        items={this.state.galleryItems}
                        responsive={this.responsive}
                        autoPlayInterval={6000}
                        autoPlayDirection="ltr"
                        autoPlay={false}>
                            {
                                hotelPopularDestination.map((item,index) => {
                                    return(<PopularDestinationImageCard desData={item} key={index} />)
                                })
                            }
                    </AliceCarousel>
                )
                break;
            case '/tours':
                return (
                    <Tabs type="card">
                        <TabPane tab={<FormattedMessage id="popular.international" />} key="1">
                            <AliceCarousel 
                                mouseDragEnabled
                                items={this.state.galleryItems}
                                responsive={this.responsive}
                                autoPlayInterval={6000}
                                autoPlayDirection="ltr"
                                autoPlay={false}>
                                    {
                                        tourPopularIntDest.map((item,index) => {
                                            return(<PopularDestinationImageCard desData={item} key={index} />)
                                        })
                                    }
                            </AliceCarousel>
                        </TabPane>                            
                        <TabPane tab={<FormattedMessage id="popular.myanmar" />} key="2">
                            <AliceCarousel 
                                mouseDragEnabled
                                items={this.state.galleryItems}
                                responsive={this.responsive}
                                autoPlayInterval={6000}
                                autoPlayDirection="ltr"
                                autoPlay={true}>
                                {
                                    tourPopularMyaDest.map((item,index) => {
                                        return(<PopularDestinationImageCard desData={item} key={index} />)
                                    })
                                }
                            </AliceCarousel>
                        </TabPane>
                    </Tabs>
                )
                break;
                case '/attractions':
                return (
                    <Tabs type="card">
                        <TabPane tab={<FormattedMessage id="popular.international" />} key="1">
                            <AliceCarousel 
                                mouseDragEnabled
                                items={this.state.galleryItems}
                                responsive={this.responsive}
                                autoPlayInterval={6000}
                                autoPlayDirection="ltr"
                                autoPlay={false}>
                                    {
                                        tourPopularIntDest.map((item,index) => {
                                            return(<PopularDestinationImageCard desData={item} key={index} />)
                                        })
                                    }
                            </AliceCarousel>
                        </TabPane>                            
                        <TabPane tab={<FormattedMessage id="popular.myanmar" />} key="2">
                            <AliceCarousel 
                                mouseDragEnabled
                                items={this.state.galleryItems}
                                responsive={this.responsive}
                                autoPlayInterval={6000}
                                autoPlayDirection="ltr"
                                autoPlay={true}>
                                {
                                    tourPopularMyaDest.map((item,index) => {
                                        return(<PopularDestinationImageCard desData={item} key={index} />)
                                    })
                                }
                            </AliceCarousel>
                        </TabPane>
                    </Tabs>
                )
                break;
            default:
                break;
        }
    }
    render() 
    {
        return (
            <div className='promo-wrap content-padding destination-pormo-wrap hidden-xs'>
                <div className='app-container'>
                    <h2 className='header-title'>
                    <FormattedMessage id="popular.destination" />
                        <small><FormattedMessage id="popular.destination.small" /></small>                        
                    </h2>   
                    {
                        this.getPopularDestination()
                    }
                </div>
            </div>
            );  
    }
 }

 const mapStateToProps = state => ({
    router        : state.router    
});

export default connect(mapStateToProps, null)(PopularDestination);