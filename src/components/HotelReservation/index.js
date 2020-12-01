import React, { Component } from 'react';
import history from '../../utils/history';
import './style.scss';

export default class HotelReservation extends Component {
    constructor(props){
        super(props);
        this.state = {
            isOpenDetail : false
        }
        this.handleOpenDetail = this.handleOpenDetail.bind(this);
    }

    handleOpenDetail(){
        let checked = this.state.isOpenDetail;
        this.setState({
            isOpenDetail : !checked
        });
    }
    getTotalAmount(rooms){
        var total = null
        rooms.map(item => {
            if(item.rates[0].booked.numberOfRooms > 0){
                total += Number(item.rates[0].deal.prices.base - item.rates[0].deal.discount) * Number(item.rates[0].booked.numberOfRooms)
            }
            if(item.rates[0].booked.numberOfExtrabed > 0){
                total += Number(item.rates[0].deal.prices.extrabed) * Number(item.rates[0].booked.numberOfExtrabed)
            }
        })
        return total;
    }
    render() {
        return (
            <div className="card">
                <p className="title">Reservation</p>                   
                {
                    (this.props.roomsList.length > 0)?
                    <div>
                        <p className={(!this.state.isOpenDetail)?'detail-tag open':'detail-tag hide'} onClick={this.handleOpenDetail}>{(!this.state.isOpenDetail)?'open detail':'hide detail'}</p>
                        <div className="reservation-detail">
                            {
                                (this.state.isOpenDetail)?
                                    this.props.roomsList.map((room,index)=>                                
                                    <div key={index} className="room-item">
                                        <div className="room-item-detail">
                                            <div className="room-type">{`${room.rates[0].booked.numberOfRooms} x ${room.type}`}</div>
                                            <div className="room-price">{`${room.rates[0].deal.currencyCode} ${room.rates[0].deal.prices.base - room.rates[0].deal.discount}`}</div>
                                        </div>
                                        {
                                            room.rates[0].booked.numberOfExtrabed > 0 ?
                                            <div className="room-item-detail">
                                                <div className="room-type">{`${room.rates[0].booked.numberOfExtrabed} x extra bed(s)`}</div>
                                                <div className="room-price">{`${room.rates[0].deal.currencyCode} ${room.rates[0].deal.prices.extrabed}`}</div>
                                            </div>
                                            :
                                            <div></div>
                                        }                                
                                    </div>                               
                                    )
                                :
                                <div></div>
                            }                        
                            {/* <p className="reserve-text">{(this.props.totalExtraBeds > 0)? `${this.props.totalRooms} Rooms,${this.props.totalNights} Nights,${this.props.totalExtraBeds} Extra Bed(s) for`
                            :`${this.props.totalRooms} Rooms,${this.props.totalNights} Nights for`}
                            </p> */}
                            <p className="total-price"> {this.props.currency} {this.getTotalAmount(this.props.roomsList)}</p>
                            <button className="btn-orange" onClick={()=> this.props.callbackFun()}>Reserve {this.props.totalRooms} Rooms</button>
                        </div>
                    </div>
                    :
                    <div className="no-reservation">No Reservation</div>
                }
            </div>
        )
    }
}
