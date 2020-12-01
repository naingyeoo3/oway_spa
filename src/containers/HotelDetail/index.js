import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import history from '../../utils/history';
import { Select, Affix, Tooltip } from 'antd';

import ImageGallery from 'react-image-gallery';
import StarRatingIcon from '../../assests/images/png/icon-star-rating.png';
import HotelReservation from '../../components/HotelReservation';
import MapComponent from '../../components/MapComponent';

import {requestHotelDetail} from '../../actions/hotelsListingAction';
import {
    addHotelRoom,
    addExtraBed,
    appendRoom,
    clearReservation
} from '../../actions/hotelReservationAction';
import { requestHotelCheckout } from '../../actions/hotelCheckoutAction';
import { HOTEL_API_KEY, CHECKOUT_API_KEY} from '../../constants/credentials';
import LocationIcon from '../../assests/images/png/map.png';
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';
import ReactHtmlParser from 'react-html-parser'
import SEOList from '../../components/SEOList';
import Newsletter from '../../components/Newsletter';
import './style.scss';

class HotelDetail extends Component {
  constructor(props){
      super(props);
      this.state = {
          showAmenity : false,
          showDescription : false,
          showExtraBedErr: false
      }
      this.renderFacilities = this.renderFacilities.bind(this);
  }
  componentDidMount(){
    const { hotelsListing } = this.props;
    const params = this.props.match.params;
    const slug = params.slug;

    const payload = {
        "checkin"      : params.checkin,
        "apiKey"       : HOTEL_API_KEY,   
        "checkout"     : params.checkout,
        "currency"     : params.currency,
        "nationality"  : params.national,
        "lang"         : params.lang, 
        "enquiredRooms": params.room,
        "limit"        : params.limit 
    }
    // if(hotelsListing.detail == null){
        this.props.requestHotelDetail(slug,payload);
    // }    
    this.props.clearReservation()
  }
  componentDidUpdate(){
      if(this.state.showExtraBedErr){
        setTimeout(() => {
          this.setState({showExtraBedErr: false})
        }, 70000);
      }
      
  }

  renderRating(stars) {
    let starArrays = [];
    for (let i = 0; i < stars; i++) {
        let star = <img key={`stars ${i}`} src={StarRatingIcon} alt="Star Rating"/>
        starArrays.push(star);
    }
    return starArrays;
  }

  renderParking(parking) {
      let parkingInfo = [];
      Object.keys(parking).forEach(function(key) {
         let info = <div key={key}> {key} : {parking[key]}</div>  
         parkingInfo.push(info);  
     })
     return parkingInfo;
  }
   
  renderAmenityDetail(categories) {
    let that = this;
    let categoryArray = []
    Object.keys(categories).forEach(function(key) {
                                            
        let category= <div key={key} className="amenity-detail">
                        <div className="col-title">{key}</div>
                        <div className="col-detail">{that.renderFacilities(categories[key])}</div>
                     </div>
        categoryArray.push(category);             
    })
   return  (this.state.showAmenity)?  categoryArray : categoryArray.slice(0,2);
  }
   
  renderFacilities(category){  
    return (category.map((amenity,index)=>{
           return <div key={index} className="col-facilities">
                    <div><img src={amenity.icon} alt={amenity.description}/></div>
                    <div>{amenity.name}</div>
                </div>
    }))
  }


  
   renderAmenities(amenities){
     return (amenities.length < 6)?
             amenities.map((amenity,index)=>{
                 return <div key={index} className="col-amenities">
                          <img src={amenity.icon} alt={amenity.description}/>
                          <span>{amenity.name}</span>
                        </div>
             })
            :
             amenities.slice(0,6).map((amenity,index)=>{
                 return <div key={index} className="col-amenities">
                          <img src={amenity.icon} alt={amenity.description}/>
                          <span>{amenity.name}</span>
                        </div>
             })
      
   }
   detectAddedBefore = (list, room) => list.find(item => item.rates[0].id == room.id);
        
   getIndexAddedBefore = (list, room) => list.indexOf(this.detectAddedBefore(list,room));

   formatedPayload(room, bookJson){       
        const payload = {
            "type": room.type,
            "rates": [
                {
                    "id": room.id,
                    roomId: room.rates[0].id,
                    "booked": {
                        "numberOfRooms": bookJson.numberOfRooms,
                        "numberOfExtrabed": bookJson.numberOfExtrabed
                    },
                    "deal": room.rates[0].deal,
                    "inventory": room.rates[0].deal,
                    "category": room.rates[0].category,
                    "cancellationPolicy": room.rates[0].cancellationPolicy,
                    "services": room.rates[0].services,
                    "promotions": room.rates[0].promotions,
                    "promotionAnnouncement": room.rates[0].promotionAnnouncement
                }
            ],
            images: room.images,
            amenities: room.amenities
        }
        return payload
   }
   handleReserveRoom(value, room){
        const { hotelReservation } = this.props;       
        const selectedRoom = hotelReservation.roomsList;
        var new_room = [];
        if(this.detectAddedBefore(selectedRoom, room)){            
            new_room = hotelReservation.roomsList;            
            const bookJson = {                
                    "numberOfRooms": value,
                    "numberOfExtrabed": 0                
            }       
            new_room[this.getIndexAddedBefore(hotelReservation.roomsList, room)] = this.formatedPayload(room, bookJson)
            this.props.addHotelRoom(new_room);
        }else{            
            new_room = hotelReservation.roomsList;            
            const bookJson = {                
                    "numberOfRooms": value,
                    "numberOfExtrabed": 0                
            }                                                                                                        
            new_room.push(this.formatedPayload(room, bookJson));
            this.props.addHotelRoom(new_room);
        }
   }        

   handleAddExtraBed(value,room){           
    const { hotelReservation } = this.props;       
    const selectedRoom = hotelReservation.roomsList;
    var new_room = [];
    if(this.detectAddedBefore(selectedRoom, room)){ 
        new_room = hotelReservation.roomsList;
        const bookJson = {            
                "numberOfRooms": this.detectAddedBefore(selectedRoom, room).rates[0].booked.numberOfRooms,
                "numberOfExtrabed": value            
        }       
        new_room[this.getIndexAddedBefore(hotelReservation.roomsList, room)] = this.formatedPayload(room, bookJson)
        this.props.addHotelRoom(new_room);
    }else{
        this.setState({showExtraBedErr: true})
    }    
   }
  renderImageGallery(images){
    let hotelImages =[];
    images.map((image)=>{
        const hotelImage = {
            original    : image.url,
            originalClass : 'original-image'
        }
        hotelImages.push(hotelImage)
    });    
    if(images.length === hotelImages.length){
        return <ImageGallery items={hotelImages} showThumbnails={false} showFullscreenButton={false} showPlayButton={false}/>
    } 
  }
  formatedDate = (param) => moment(param).format(dateFormat); // refromated "2018-07-01"

  goToHotelCheckout(){
    const { 
        match, 
        navbarOptions,
        searchComponentReducers,
        locales,
        hotelReservation,
        hotelsListing
    } = this.props;
    const payload = {
        "productId": 1,
        "source": "OWAYDB",
        "channelType": 1,
        "fareType": navbarOptions.nation.other_name,//"foreigner",
        "apiKey": CHECKOUT_API_KEY,
        "checkIn": this.formatedDate(searchComponentReducers.fromDate.date),//"2018-07-01",
        "checkOut": this.formatedDate(searchComponentReducers.toDate.date), //"2018-07-02",
        "adults": searchComponentReducers.travellers.adult,//"2",
        "children": searchComponentReducers.travellers.child,//"0",
        "rooms": hotelReservation.roomsList
    }
    this.props.requestHotelCheckout(payload);
    history.push(`/hotels/search/${match.params.slug}/checkout`)
  }
  getSeletable(room){
      var seleableRoom = [];
      for (let i = 0; i < room + 1; i++) {
          seleableRoom.push(i)          
      }
      return seleableRoom;
  }
  render(){
      const {hotelsListing} = this.props; 
      const params = this.props.match.params;
      return <div>
                <div className="app-container">
                    {
                        (!hotelsListing.detail)?
                        <div>Loading</div>
                        :
                        <div className="hotel-detail">
                            <div className="detail-card card">
                                <div id="#overview" className="info-block">
                                    <div className="col-info">
                                        <div className="heading-block">
                                            <h1 className="heading heading-lg heading-gray">{hotelsListing.detail.name}</h1>
                                            <div className="rating">
                                                {this.renderRating(hotelsListing.detail.ratings.stars)}
                                            </div>
                                        </div>                                    
                                    </div> 
                                    <div className="col-price">
                                        <p className="text-small text-gray starting">Starting from</p>
                                        {
                                            (!hotelsListing.detail.rooms[0].rates[0].deal.discount > 0)?
                                            <p className="price-block">
                                                <span className="text-primary price-primary">
                                                    {`${params.currency}  ${hotelsListing.detail.rooms[0].rates[0].deal.prices.base}`}
                                                </span>
                                            </p>
                                            :
                                            <p className="price-block">
                                                <span className="text-gray-dark discount">
                                                    {`${params.currency}  ${hotelsListing.detail.rooms[0].rates[0].deal.prices.base}`}
                                                </span>
                                                <span className="text-primary price-primary"> {
                                                    `${params.currency}  ${hotelsListing.detail.rooms[0].rates[0].deal.prices.base - 
                                                    hotelsListing.detail.rooms[0].rates[0].deal.discount} `
                                                }</span>
                                            </p>
                                        }
                                        <span className="text-small text-primary">per night/room</span>
                                    </div>
                                </div>
                                {/* <Affix offsetTop={100}> */}
                                    <div className="tab-design">
                                        <div className="selected">
                                            <a href="#overview">Overview</a>
                                            <span className="line">&nbsp;</span>
                                        </div>
                                        <div>
                                            <a href="#rooms">Rooms</a>
                                            <span className="line">&nbsp;</span>
                                        </div>
                                        <div>
                                            <a href="#description">Description</a>
                                            <span className="line">&nbsp;</span>
                                        </div>
                                        <div>
                                            <a href="#amenities">Amenities</a>
                                            <span className="line">&nbsp;</span>
                                        </div>
                                    </div>
                                {/* </Affix> */}
                            </div>
                            <div className="gallery-block">
                                <div className="col-images">
                                    <div className="card">
                                    {
                                        this.renderImageGallery(hotelsListing.detail.images)
                                    }
                                    </div>
                                </div>
                                <div className="col-amenities">
                                    <div className="card popular-amenities">
                                        <div className="title">
                                            Most Popular Amenities
                                        </div>
                                        <div className="amenities">
                                            {this.renderAmenities(hotelsListing.detail.amenities)}
                                            <div className="show-all"><a href="#amenities">see all amenities</a></div>
                                        </div>
                                    </div>
                                    <div className="card hotel-address">
                                        <MapComponent isMarkerShown 
                                        latitude= {hotelsListing.detail.location.latitude}
                                        longitude = {hotelsListing.detail.location.longitude}
                                        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                        loadingElement={<div style={{ height: `100%` }} />}
                                        containerElement={<div style={{ height: `130px` }} />}
                                        mapElement={<div style={{ height: `100%` }} />}
                                        />
                                        <div className="address">
                                            <div><img src={LocationIcon} alt="Hotel Address"/></div>
                                            <div>{hotelsListing.detail.location.address},{hotelsListing.detail.location.cityName}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="rooms" className="room-detail-info">
                                <div className="detail-block">
                                    {
                                        hotelsListing.detail.rooms.map((room,index)=>{
                                        return  (room.availables.totalRooms > 0)?
                                            <div key={index} className="card">
                                                <div className="room-info">
                                                    <div className="col-image text-over-image">
                                                        <div className="promo-box">
                                                            {
                                                                room.rates[0].deal.display.discount == '0 %' ?
                                                                <span></span>
                                                                :
                                                                <span className="promo promo-rate">
                                                                    { room.rates[0].deal.display.discount } OFF
                                                                </span>
                                                            }
                                                            {
                                                                !room.rates[0].promotions[0] ?
                                                                <span></span>
                                                                :
                                                                <span className="promo promo-title">{room.rates[0].promotions[0].title}</span>
                                                            }                            
                                                            {
                                                                !room.rates[0].promotions[0] ?
                                                                <span></span>
                                                                :
                                                                <span className="promo promo-type">
                                                                    {
                                                                        room.rates[0].promotions[0].subtitles[0].key == 'promo_nature' ?                                        
                                                                        room.rates[0].promotions[0].subtitles[0].title
                                                                        :
                                                                        null
                                                                    }
                                                                </span>
                                                            } 
                                                        </div>
                                                        {
                                                            (room.images.length > 0)?
                                                            <img src={room.images[0].url} alt={room.type} />
                                                            :
                                                            <div>No Room Image</div>                           
                                                        }
                                                    </div>
                                                    <div className="col-info">
                                                        <h2 className="heading heading-md heading-primary">{room.type}</h2>
                                                        <div className="info-detail">
                                                            <div className="room-type">
                                                                <p>
                                                                    <img src={require(`../../assests/images/svg/icon-bed.svg`)} alt={room.bed} />
                                                                    {room.bed}
                                                                </p>
                                                                <p>
                                                                    <img src={require(`../../assests/images/svg/icon-room-square.svg`)} alt={room.size} />
                                                                    {room.size}
                                                                </p>
                                                            </div> 
                                                            <div className="adult-type">
                                                                <p>
                                                                    <img src={require(`../../assests/images/svg/icon-adult-gray.svg`)} alt="Adults" />
                                                                    {room.availables.maxAdults} &times; adult(s)
                                                                </p>
                                                                <p>
                                                                    <img src={require(`../../assests/images/svg/icon-child-gray.svg`)} alt="Childs" />
                                                                    {room.availables.maxChildren} &times; child(s)
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                                <div className="hotel-detail-menu">
                                                    <div>Facilities</div>
                                                    <div>What's included</div>
                                                    <div>Room</div>
                                                    <div>Bed</div>
                                                    <div>Average Price Per Room</div>
                                                </div>
                                                <div className="hotel-detail-item">
                                                    <div className="col-detail">
                                                        {
                                                        room.amenities.slice(0,5).map((amenity,index)=>{
                                                            return <p key={index} className="facilities">
                                                                        <img src={amenity.icon} alt={amenity.description}/>
                                                                        <span>{amenity.name}</span>
                                                                    </p>
                                                        })
                                                        }
                                                    </div> 
                                                    <div className="col-detail">
                                                        {
                                                            room.rates[0].services.map((service,index)=>{
                                                                return <p key={index}>{service}</p>
                                                            })
                                                        }
                                                        {                                                            
                                                            room.policies ?
                                                            <p className="cancellation-policy">                                                            
                                                                <Tooltip 
                                                                    placement="top" 
                                                                    title={ReactHtmlParser(room.policies)}
                                                                    overlayClassName="cancellation-policy">
                                                                    Cancellation Policy
                                                                    <img src={require(`../../assests/images/svg/icon-info-white.svg`)} alt="Cancellation Policy"/>
                                                                </Tooltip>                                                            
                                                            </p>
                                                            :
                                                            null
                                                        }
                                                    </div> 
                                                    <div className="col-detail">
                                                        <Select
                                                            defaultValue="0"
                                                            onChange={(value)=> this.handleReserveRoom(value,room)}
                                                            dropdownClassName="select-room">
                                                            {
                                                                this.getSeletable(room.availables.totalRooms).map((item, index)=> (
                                                                    <Option key={index} value={item}>{item}</Option>        
                                                                ))    
                                                            }
                                                        </Select>
                                                    </div>                                                    
                                                    <div className="col-detail col-bed">
                                                        <p>{room.bed}</p>
                                                        <div className="extra-bed">
                                                            Extra bed 
                                                            <Select
                                                                defaultValue="0"
                                                                onChange={(value)=> this.handleAddExtraBed(value,room)}
                                                                showArrow={false}
                                                                dropdownClassName="select-bed">
                                                                    {
                                                                        this.getSeletable(room.availables.extrabed).map((item, index)=> (
                                                                            <Option key={index} value={item}>{item}</Option>        
                                                                        ))    
                                                                    }
                                                            </Select>                                                            
                                                        </div>
                                                        {this.state.showExtraBedErr && <span class="error">Plsese select room</span>}
                                                    </div>                                                    
                                                    <div className="col-detail hotel-price">
                                                        {/* <div> starting from</div> */}
                                                        {
                                                            room.rates[0].deal.display.discount == '0 %' ?
                                                            <span></span>
                                                            :
                                                            <span className="promo promo-red">
                                                                { room.rates[0].deal.display.discount } OFF
                                                            </span>
                                                        }                                                        
                                                        {
                                                            (!room.rates[0].deal.discount > 0)?
                                                            <p className="price-block">
                                                                <span className="text-primary price-primary">
                                                                    {room.rates[0].deal.prices.base}
                                                                </span>
                                                            </p>
                                                            :
                                                            <p className="price-block">
                                                            <span className="text-gray-dark discount">
                                                                {`${params.currency}  ${(room.rates[0].deal.prices.base).toFixed(2)}`}
                                                            </span>
                                                            <span className="text-primary price-primary">
                                                                {`${params.currency}  ${(room.rates[0].deal.prices.base - room.rates[0].deal.discount).toFixed(2)}`}
                                                            </span>
                                                        </p> 
                                                        }                                   
                                                        <span className="text-small text-primary">per night/room</span>
                                                    </div>
                                                </div>                                        
                                            </div>                                            
                                            :
                                            <div />
                                        })
                                    }
                                </div>                            
                                <div className="reservation">
                                    {/* <Affix offsetTop={100}> */}
                                        <HotelReservation 
                                            roomsList={this.props.hotelReservation.roomsList}
                                            currency = {params.currency}
                                            callbackFun={()=> this.goToHotelCheckout()}
                                        />
                                        {/* <HotelReservation 
                                            roomsList={this.props.hotelReservation.roomsList}
                                            totalRooms = {this.props.hotelReservation.totalRooms}
                                            totalNights = {this.props.hotelReservation.totalNights}
                                            totalAmount = {this.props.hotelReservation.totalAmount}
                                            totalExtraBeds = {this.props.hotelReservation.totalExtraBeds}
                                            currency = {params.currency}
                                        /> */}
                                    {/* </Affix> */}
                                </div>                            
                            </div>
                            <div id="description" className="description card">
                               <div className="">
                                    <div className="info-header">
                                        Hotel Description
                                    </div>
                                    <div dangerouslySetInnerHTML ={{__html: hotelsListing.detail.description}} className={`info-content ${!this.state.showDescription && ' hide'}`}>
                                    </div>
                                    {
                                       (this.state.showDescription)?
                                       <div className="show-more" onClick={()=> this.setState({showDescription:false})}>
                                           <img src={require(`../../assests/images/svg/icon-up-arrow-blue.svg`)} alt="Hide" />
                                           hide
                                        </div> 
                                       :
                                       <div className="show-more" onClick={()=> this.setState({showDescription:true})}>
                                           <img src={require(`../../assests/images/svg/icon-down-arrow-blue.svg`)} alt="View More" />
                                            view more
                                        </div>      
                                    }                                    
                               </div>
                            </div>
                            <div id="amenities" className="amenities-block card">
                                <div className="info-header">
                                    Amenities/Facilities
                                </div>
                                {
                                    this.renderAmenityDetail(hotelsListing.categories)
                                } 
                                {
                                    (this.state.showAmenity)?
                                    <div className="show-more" onClick={()=> this.setState({showAmenity:false})}>
                                        <img src={require(`../../assests/images/svg/icon-up-arrow-blue.svg`)} alt="Hide" />
                                        hide
                                    </div> 
                                    :
                                    <div className="show-more" onClick={()=> this.setState({showAmenity:true})}>
                                        <img src={require(`../../assests/images/svg/icon-down-arrow-blue.svg`)} alt="View More" />
                                        view more
                                    </div> 
                                }
                            </div>
                            <div id="helpful-info" className="helpful-info card">
                                <div className="info-header">
                                    Helpful Info
                                </div>
                                <div className="helpful-info-block">
                                    <div className="helpful-info-item">
                                        <div>
                                            <img src={require(`../../assests/images/png/icon-check-in-out.png`)} alt="Check In"/>
                                        </div>
                                        <div>
                                            <p className="title">                                            
                                                Check In
                                            </p>
                                            <p>From: {hotelsListing.detail.reservationHours.checkin.from}</p>
                                            <p>To: {hotelsListing.detail.reservationHours.checkin.to}</p>
                                        </div>                                        
                                    </div>
                                    <div className="helpful-info-item">
                                        <div>
                                            <img src={require(`../../assests/images/png/icon-check-in-out.png`)} alt="Check Out"/>
                                        </div>
                                        <div>
                                            <p className="title">
                                                Check Out
                                            </p>
                                            <p>From: {hotelsListing.detail.reservationHours.checkout.from}</p>
                                            <p>To: {hotelsListing.detail.reservationHours.checkout.to}</p>
                                        </div>
                                    </div>
                                    <div className="helpful-info-item">
                                        <div>
                                            <img src={require(`../../assests/images/png/icon-parking.png`)} alt="Parking Available"/>
                                        </div>
                                        <div>
                                            <p className="title">
                                                Parking Available
                                            </p> 
                                            <p>
                                            {
                                                // this.renderParking(hotelsListing.detail.options.parking)
                                                hotelsListing.detail.options.parking.available
                                            }
                                            </p>
                                            <p>
                                            {
                                                hotelsListing.detail.options.parking.reservationNeeded == 'NotNeeded' ?
                                                'Reservation Not Needed'
                                                :
                                                'Reservation Needed'
                                            }
                                            </p>
                                        </div>
                                    </div>
                                    <div className="helpful-info-item">
                                        <div>
                                            <img src={require(`../../assests/images/png/icon-spoken-language.png`)} alt="Spoken Languages"/>
                                        </div>
                                        <div>
                                            <p className="title">
                                                Spoken Languages
                                            </p> 
                                            {
                                                (hotelsListing.spokenLanguages.map((language,index)=>{
                                                    return <p key={index}>
                                                            {language}                                         
                                                            </p>
                                                }))
                                            }
                                            </div>
                                    </div>
                                    <div className="helpful-info-item">
                                        <div>
                                            <img src={require(`../../assests/images/png/icon-pet.png`)} alt="Pets"/>
                                        </div>
                                        <div>
                                            <p className="title">
                                                Pets
                                            </p>
                                            <p>{(hotelsListing.detail.options.petAllow)? "Allowed" : "Not Allowed"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    }
                </div>
                <Newsletter />
                <SEOList 
                isListing={true}
                route={this.props.router.location.pathname}/>
             </div>
  }
}
const mapStateToProps = state => ({
    hotelsListing: state.hotelsListing,
    hotelReservation : state.hotelReservation,
    navbarOptions: state.navbarOptions,
    locales: state.locales,
    searchComponentReducers : state.searchComponentReducers,
    router: state.router
})
const mapDispatchToProps = dispatch => {
    return {
        requestHotelDetail : (slug,data)=> dispatch(requestHotelDetail(slug,data)),
        addHotelRoom : (room) => dispatch(addHotelRoom(room)),
        addExtraBed : (bed)=> dispatch(addExtraBed(bed)),
        requestHotelCheckout: (payload)=> dispatch(requestHotelCheckout(payload)),
        appendRoom: (payload)=> dispatch(appendRoom(payload)),
        clearReservation: ()=> dispatch(clearReservation())
    }
}    

export default connect(mapStateToProps,mapDispatchToProps)(HotelDetail);