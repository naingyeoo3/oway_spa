import React, { Component } from 'react';
import CustomerCare from './CustomerCare';
import './style.scss';
class TravellerDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            paymentProcessingAmount: 0
        }
    }
    componentDidMount(){
        this.setState({paymentProcessingAmount : this.props.paymentProcessingAmount})
    }
    renderFlight(){
        let rates = this.props.rates;
        let currencyCode = this.props.currencyCode;        
        let adult = this.props.adult;
        let child = this.props.child;
        let infant = this.props.infant;
        return (
            <div>
                <div className="card traveller-detail">
                    <h3 className="heading heading-gray heading-sm">Traveller Details</h3>
                    <div className="detail-block">
                        <div className="detail-item">
                            <p className="feature">
                                <span>{adult}</span>
                                <span className="icon">&times;</span>
                                <span>Adult(s)</span>
                            </p>
                            <p className="value primary"> 
                                {`${currencyCode} ${rates.adultBase}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">
                                <span>{child}</span>
                                <span className="icon">&times;</span>
                                <span>Child(s)</span>
                            </p>
                            <p className="value primary">
                                {`${currencyCode} ${rates.childBase}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">
                                <span>{infant}</span>
                                <span className="icon">&times;</span>
                                <span>Infant(s)</span>
                            </p>
                            <p className="value primary">
                                {`${currencyCode} ${rates.infantBase}`}
                            </p>
                        </div>
                    </div>
                    <h3 className="heading heading-bg-primary heading-sm">Price Details</h3>
                    <div className="detail-block">                                
                        <div className="detail-item">
                            <p className="feature">Sub Total</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates.subTotal}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Airline Taxes</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates.tierAmount}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Taxes</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates.taxAmount}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Convenience Fees</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${ (rates.paymentProcessingAmount)?rates.paymentProcessingAmount: 0 }`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Discount</p>
                            <p className="value gray">
                                {`- ${currencyCode} ${rates.discountAmount}`}
                            </p>
                        </div>
                    </div>
                    <div className="detail-block total-block">
                        <div className="detail-item">
                            <p className="feature">Total</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates.total}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Promotion</p>
                            <p className="value gray">
                                {`- ${currencyCode} 0`}
                            </p>
                        </div>
                    </div>
                    <div className="detail-block grand-total">
                        <div className="detail-item">
                            <p className="feature">Grand Total</p>
                            <p className="value primary">
                                {`+ ${currencyCode} ${rates.total}`}
                            </p>
                        </div>
                    </div>
                    {/* <p className="amount-payable">
                        Amount payable in USD 243,597
                    </p> */}
                </div>
                <CustomerCare />
        </div>
        )
    }
    renderTour(){
        let rates = this.props.rates;
        let currencyCode = this.props.currencyCode;        
        let adult = this.props.adult;
        let child = this.props.child;
        let infant = this.props.infant;
        return (
            <div>            
                <div className="card traveller-detail">
                    <h3 className="heading heading-gray heading-sm">Traveller Details</h3>
                    <div className="detail-block">
                        <div className="detail-item">
                            <p className="feature">
                                <span>{adult}</span>
                                <span className="icon">&times;</span>
                                <span>Adult(s)</span>
                            </p>
                            <p className="value primary"> 
                                {`${currencyCode} ${rates && rates.adultBase}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">
                                <span>{child}</span>
                                <span className="icon">&times;</span>
                                <span>Child(s)</span>
                            </p>
                            <p className="value primary">
                                {`${currencyCode} ${rates && rates.childBase}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">
                                <span>{infant}</span>
                                <span className="icon">&times;</span>
                                <span>Infant(s)</span>
                            </p>
                            <p className="value primary">
                                {`${currencyCode} ${rates && rates.infantBase}`}
                            </p>
                        </div>
                    </div>
                    <h3 className="heading heading-bg-primary heading-sm">Price Details</h3>
                    <div className="detail-block">                                
                        <div className="detail-item">
                            <p className="feature">Sub Total</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates && rates.subTotal}`}
                            </p>
                        </div>                        
                        <div className="detail-item">
                            <p className="feature">Taxes</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates && rates.taxAmount}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Tiers</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates && rates.tierAmount}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Convenience Fees</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates && (rates.paymentProcessingAmount)?rates.paymentProcessingAmount: 0 }`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Discount</p>
                            <p className="value gray">
                                {`- ${currencyCode} ${rates && rates.discountAmount}`}
                            </p>
                        </div>
                    </div>
                    <div className="detail-block total-block">
                        <div className="detail-item">
                            <p className="feature">Total</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates && rates.total}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Promotion</p>
                            <p className="value gray">
                                {`- ${currencyCode} 0`}
                            </p>
                        </div>
                    </div>
                    <div className="detail-block grand-total">
                        <div className="detail-item">
                            <p className="feature">Grand Total</p>
                            <p className="value primary">
                                {`+ ${currencyCode} ${rates && rates.total}`}
                            </p>
                        </div>
                    </div>
                    {/* <p className="amount-payable">
                        Amount payable in USD 243,597 
                        no response data what the key we check?
                    </p> */}
                </div>
                <CustomerCare />
        </div>
        )
    }
    renderBus() {
        let rates = this.props.rates;
        let currencyCode = this.props.currencyCode;        
        let adult = this.props.adult;
        let child = this.props.child;
        let infant = this.props.infant;
        return (
            <div>            
                <div className="card traveller-detail">
                    <h3 className="heading heading-gray heading-sm">Traveller Details</h3>
                    <div className="detail-block">
                        <div className="detail-item">
                            <p className="feature">
                                <span>{adult}</span>
                                <span className="icon">&times;</span>
                                <span>Adult(s)</span>
                            </p>
                            <p className="value primary"> 
                                {`${currencyCode} ${rates && rates.adultBase}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">
                                <span>{child}</span>
                                <span className="icon">&times;</span>
                                <span>Child(s)</span>
                            </p>
                            <p className="value primary">
                                {`${currencyCode} ${rates && Number(child) *rates.childBase}`}
                            </p>
                        </div>
                    </div>
                    <h3 className="heading heading-bg-primary heading-sm">Price Details</h3>
                    <div className="detail-block">                                
                        <div className="detail-item">
                            <p className="feature">Sub Total</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates && rates.subTotal}`}
                            </p>
                        </div>                        
                        <div className="detail-item">
                            <p className="feature">Taxes</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates && rates.taxAmount}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Tiers</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates && rates.tierAmount}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Convenience Fees</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates && (rates.paymentProcessingAmount)?rates.paymentProcessingAmount: 0 }`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Discount</p>
                            <p className="value gray">
                                {`- ${currencyCode} ${rates && rates.discountAmount}`}
                            </p>
                        </div>
                    </div>
                    <div className="detail-block total-block">
                        <div className="detail-item">
                            <p className="feature">Total</p>
                            <p className="value gray">
                                {`+ ${currencyCode} ${rates && rates.total}`}
                            </p>
                        </div>
                        <div className="detail-item">
                            <p className="feature">Promotion</p>
                            <p className="value gray">
                                {`- ${currencyCode} 0`}
                            </p>
                        </div>
                    </div>
                    <div className="detail-block grand-total">
                        <div className="detail-item">
                            <p className="feature">Grand Total</p>
                            <p className="value primary">
                                {`+ ${currencyCode} ${rates && rates.total}`}
                            </p>
                        </div>
                    </div>
                    {/* <p className="amount-payable">
                        Amount payable in USD 243,597 
                        no response data what the key we check?
                    </p> */}
                </div>
                <CustomerCare />
        </div>
        )
    }
    renderHotel(){
        const { checkout } = this.props;
        if(checkout){        
            return (
                <div>            
                    <div className="card traveller-detail">
                        <h3 className="heading heading-gray heading-sm">Selected rooms</h3>
                        <div className="detail-block">
                            {
                                checkout.rates.deal.hotel.rooms.map((item, index)=>(
                                    <div key={index} className="selected-rooms">
                                        <div className="detail-item">
                                            <p className="feature">
                                                <span>{item.numberOfRooms}</span>
                                                <span className="icon">&times;</span>
                                                <span>{item.type}</span>
                                            </p>
                                            <p className="value primary"> 
                                                {`${checkout.rates.deal.currencyCode} ${item.prices.base}`}
                                            </p>
                                        </div>
                                        {
                                            item.numberOfExtrabed > 0 ?
                                            <div className="detail-item">
                                                <p className="feature">
                                                    <span>{item.numberOfExtrabed}</span>
                                                    <span className="icon">&times;</span>
                                                    <span>Extra Bed</span>
                                                </p>
                                                <p className="value primary"> 
                                                    {`${checkout.rates.deal.currencyCode} ${item.prices.extrabed}`}
                                                </p>
                                            </div>  
                                            :
                                            null
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <h3 className="heading heading-bg-primary heading-sm">Price Details</h3>
                        <div className="detail-block">                                
                            <div className="detail-item">
                                <p className="feature">Sub Total</p>
                                <p className="value gray">
                                    {`+ ${checkout.rates.deal.currencyCode} ${checkout.rates.deal.hotel.subTotal}`}
                                </p>
                            </div>                        
                            <div className="detail-item">
                                <p className="feature">Taxes</p>
                                <p className="value gray">
                                    {`+ ${checkout.rates.deal.currencyCode} ${checkout.rates.deal.hotel.taxAmount}`}
                                </p>
                            </div>
                            <div className="detail-item">
                                <p className="feature">Convenience Fees</p>
                                <p className="value gray">
                                {`+ ${checkout.rates.deal.currencyCode}`}
                                </p>
                            </div>
                            <div className="detail-item">
                                <p className="feature">Discount</p>
                                <p className="value gray">
                                    {`+ ${checkout.rates.deal.currencyCode} ${checkout.rates.deal.hotel.discountAmount}`}
                                </p>
                            </div>
                        </div>
                        <div className="detail-block total-block">
                            <div className="detail-item">
                                <p className="feature">Total</p>
                                <p className="value gray">
                                    {`+ ${checkout.rates.deal.currencyCode} ${checkout.rates.deal.hotel.total}`}
                                </p>
                            </div>
                            <div className="detail-item">
                                <p className="feature">Promotion</p>
                                <p className="value gray">
                                    {`- ${checkout.rates.deal.currencyCode} ${0}`}
                                </p>
                            </div>
                        </div>
                        <div className="detail-block grand-total">
                            <div className="detail-item">
                                <p className="feature">Grand Total</p>
                                <p className="value primary">
                                    {`+ ${checkout.rates.deal.currencyCode} ${checkout.rates.deal.hotel.total}`}
                                </p>
                            </div>
                        </div>
                        {/* <p className="amount-payable">
                            Amount payable in USD .... 
                            no response data what the key we check?
                        </p> */}
                    </div>
                    <CustomerCare />
            </div>
            )
        }
    }
    render() {
        
        const { 
            isFlight, 
            isTour, 
            isHotel ,
            isBus
        } = this.props;
        return (
            <div>
                {isFlight && this.renderFlight()}
                {isTour && this.renderTour()}
                {isHotel && this.renderHotel()}
                {isBus && this.renderBus()}
            </div>
        );
    }
}

export default TravellerDetail;