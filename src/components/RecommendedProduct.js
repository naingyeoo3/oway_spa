import React, {  PureComponent } from 'react'
import { connect } from 'react-redux'

import { Tabs } from 'antd';
// import AliceCarousel from 'react-alice-carousel'

import RecommendedCarousel from './RecommendedCarousel'
// import RecommendedProductImageCard from './RecommendedProductImageCard'
import { 
    hotelRecommendedDes, 
} from '../constants/hotelConstants'
import { 
    tourRecommendedDes
} from '../constants/tourConstants'

import "react-alice-carousel/lib/scss/alice-carousel.scss"
import '../styles/product-carousel.scss';
import { FormattedMessage } from 'react-intl';

const TabPane = Tabs.TabPane;
 
class RecommendedProduct extends PureComponent {
    constructor(props){
        super(props);
    }  
    getPopularDestination = () => {
        const { router ,product} = this.props;
        switch (router.location.pathname) {
            case '/hotels':
                return (
                    <div>
                        <h2 className='header-title'>
                            <FormattedMessage id="recommended.hotel" />
                            <small><FormattedMessage id="recommended.hotel.small" /></small>                        
                        </h2> 
                        <Tabs type="card">
                            <TabPane tab={<FormattedMessage id="popular.text.mandalay" />} key="1">
                                <RecommendedCarousel
                                    hotelRecommendedIntltest={hotelRecommendedDes.filter((city) => city.descity === 'mandalay')
                                    } key={hotelRecommendedDes.id}/> 
                            </TabPane>                            
                            <TabPane tab={<FormattedMessage id="popular.text.yangon" />} key="2">
                                <RecommendedCarousel                                
                                    hotelRecommendedIntltest={hotelRecommendedDes.filter((city) => city.descity === 'yangon')
                                    } key={hotelRecommendedDes.id}/> 
                            </TabPane>
                            <TabPane tab={<FormattedMessage id="popular.text.nyaungu" />} key="3">
                                <RecommendedCarousel  
                                    hotelRecommendedIntltest={hotelRecommendedDes.filter((city) => city.descity === 'nyaungu')
                                    }  key={hotelRecommendedDes.id}/> 
                            </TabPane>
                            <TabPane tab={<FormattedMessage id="popular.text.inlelake" />} key="4">
                                <RecommendedCarousel                                
                                    hotelRecommendedIntltest={hotelRecommendedDes.filter((city) => city.descity === 'inle')
                                    } key={hotelRecommendedDes.id}/> 
                            </TabPane>
                            <TabPane tab={<FormattedMessage id="popular.text.pyinoolwin"  />} key="5">
                                <RecommendedCarousel                                
                                    hotelRecommendedIntltest={hotelRecommendedDes.filter((city) => city.descity === 'pyin oo lwin')
                                    } key={hotelRecommendedDes.id}/> 
                            </TabPane>
                            <TabPane tab={<FormattedMessage id="popular.text.naypyitaw" />} key="6">
                                <RecommendedCarousel                                
                                    hotelRecommendedIntltest={hotelRecommendedDes.filter((city) => city.descity === 'nay pyi taw')
                                    } key={hotelRecommendedDes.id}/>
                            </TabPane>
                        </Tabs>
                    </div>
                )
                break;
            case '/tours':
                return (
                    <div>
                        <h2 className='header-title'>
                             <FormattedMessage id="recommended.tour" />
                            <small><FormattedMessage id="recommended.tour.small" /></small>                        
                        </h2> 
                    <Tabs type="card">
                        <TabPane tab={<FormattedMessage id="popular.text.singapore" />} key="1">
                            <RecommendedCarousel  
                            
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'Singapore')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>                            
                        <TabPane tab={<FormattedMessage id="recommended.title.thailand" />} key="2">
                        <RecommendedCarousel     
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'thailand')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>
                        <TabPane tab={<FormattedMessage id="recommended.title.myanmar" />} key="3">
                        <RecommendedCarousel  
                            
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'myanmar')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>
                        <TabPane tab={<FormattedMessage id="recommended.title.europe" />} key="4">
                        <RecommendedCarousel  
                            
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'europe')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>
                        <TabPane tab={<FormattedMessage id="recommended.title.korea" 
                        />} key="5">
                            <RecommendedCarousel  
                            
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'korea')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>
                        <TabPane tab={<FormattedMessage id="recommended.title.vietnam" 
                        />} key="6">
                            <RecommendedCarousel  
                            
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'vietnam')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>
                        
                       
                    </Tabs>
                    </div>
                )
                break;
                case '/attractions':
                return (
                    <div>
                        <h2 className='header-title'>
                             <FormattedMessage id="recommended.tour" />
                            <small><FormattedMessage id="recommended.tour.small" /></small>                        
                        </h2> 
                    <Tabs type="card">
                        <TabPane tab={<FormattedMessage id="popular.text.singapore" />} key="1">
                            <RecommendedCarousel  
                            
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'Singapore')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>                            
                        <TabPane tab={<FormattedMessage id="recommended.title.thailand" />} key="2">
                        <RecommendedCarousel     
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'thailand')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>
                        <TabPane tab={<FormattedMessage id="recommended.title.myanmar" />} key="3">
                        <RecommendedCarousel  
                            
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'myanmar')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>
                        <TabPane tab={<FormattedMessage id="recommended.title.europe" />} key="4">
                        <RecommendedCarousel  
                            
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'europe')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>
                        <TabPane tab={<FormattedMessage id="recommended.title.korea" 
                        />} key="5">
                            <RecommendedCarousel  
                            
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'korea')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>
                        <TabPane tab={<FormattedMessage id="recommended.title.vietnam" 
                        />} key="6">
                            <RecommendedCarousel  
                            
                            hotelRecommendedIntltest={tourRecommendedDes.filter((city) => city.descity === 'vietnam')
                            } key={tourRecommendedDes.id}/> 
                        </TabPane>
                        
                       
                    </Tabs>
                    </div>
                )
                break;
            default:
                break;
        }
    }
    render() 
    {
        return (
            <div className='promo-wrap content-padding destination-pormo-wrap recommended-promo hidden-xs'>
                <div className='app-container'>
                      
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
export default connect(mapStateToProps, null)(RecommendedProduct);