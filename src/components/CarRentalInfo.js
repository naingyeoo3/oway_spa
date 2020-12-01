import React from 'react';
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl';

import '../containers/CarRentalPage/car-rental.scss'

class CarRentalInfo extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(){
        window.open(`http://cars.oway.com.mm/resportaloway.htm`, '_blank')
    }
    render(){
        return(        
            <div className="search-section carrental-search">
                <h2 className="mobile-title"><FormattedMessage id="mobile.carrental.title" /></h2>
                <div className="sub-carrental-search">                    
                    {
                        this.props.locales.lang == 'en' ?
                        <div>
                            <img src={require('../assests/images/jpg/car-rental-web.jpg')} alt="Car Rental" className="web" />
                            <img src={require('../assests/images/jpg/car-rental-mobile.jpg')} alt="Car Rental" className="mobile" />
                        </div>
                        :
                        <div>
                            <img src={require('../assests/images/jpg/car-rental-web-mm.jpg')} alt="Car Rental" className="web" />
                            <img src={require('../assests/images/jpg/car-rental-mobile-mm.jpg')} alt="Car Rental" className="mobile" />
                        </div>
                    }
                    <div className="carrental-btn">
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


export default connect(mapStateToProps,null)(CarRentalInfo);
