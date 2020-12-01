import React from 'react';
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl';
import { DEV_URL } from '../constants/credentials';

import '../containers/OwayRidePage/oway-ride.scss';

class OwayRideInfo extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(){
        window.open(`${DEV_URL}/oway_ride_service`, '_blank')
    }
    render(){
        return(        
            <div className="search-section owayride-search">
                <h2 className="mobile-title"><FormattedMessage id="header.menu.owayride" /></h2>
                <div className="sub-owayride-search">                    
                    {
                        this.props.locales.lang == 'en' ?
                        <div>
                            <img src={require('../assests/images/jpg/ridestep-web.jpg')} alt="Car Rental" className="web" />
                            <img src={require('../assests/images/jpg/ridestep-mobile.jpg')} alt="Car Rental" className="mobile" />
                        </div>
                        :
                        <div>
                            <img src={require('../assests/images/jpg/ridestep-webmm.jpg')} alt="Car Rental" className="web" />
                            <img src={require('../assests/images/jpg/ridestep-mobile-mm.jpg')} alt="Car Rental" className="mobile" />
                        </div>
                    }
                    <div className="owayride-btn">
                        <button className="btn-orange" onClick={()=> this.handleClick()}><FormattedMessage id="search.btn.startbooking" /></button>
                    </div>
                </div>           
            </div>
        )
    }    
}

const mapStateToProps = state => ({
    locales       : state.locales
});


export default connect(mapStateToProps,null)(OwayRideInfo);
