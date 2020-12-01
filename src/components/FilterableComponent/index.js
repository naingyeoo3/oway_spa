import React, { Component } from 'react';
import { Checkbox,Button } from 'antd';
import './styles.scss';
import StarRating from '../StarRating';
import EarlyMorning from '../../assests/images/svg/weather.svg';
import Morning from '../../assests/images/svg/morning.svg';
import Afternoon from '../../assests/images/svg/afternoon.svg';
import Evening from '../../assests/images/svg/evening.svg';
class FilterableComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isExpanedFlight: false,
            isExpanedBusOperator : false,
        }
    }
    changeCurrencyCode(currency) {
        return (currency === "USD") ? '$' : 'MMK'
    }
    renderStopsComponent() {
        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div><h4>{this.props.filter_name.toUpperCase()}</h4></div>
                    <div className="reset-btn" onClick={() => this.props.resetCallback(this.props.filter_name)}>reset</div>
                </div>
                <hr />
                {
                    this.props.filters.map((item, index) => {
                        // console.log("Checked", this.props.checkedFilters);
                        return <div key={index} className="filter-item">
                               <Checkbox name={this.props.filter_name} type="checkbox" 
                               value={item.value} onChange={(e) => this.props.filterCallback(e)} 
                               checked={(this.props.checkedFilters.includes(item.value.toString()))}>
                                <strong>{item.name}</strong>
                               </Checkbox>
                        </div>
                    })
                }
            </div>
        )
    }

    renderHotelTypeComponent() {
        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div><h4>{this.props.filter_name.toUpperCase()}</h4></div>
                    <div className="reset-btn" onClick={() => this.props.resetCallback("hotelType")}> reset</div>
                </div>
                <hr />
                {
                    this.props.filters.map((item, index) => {
                        return <div key={index} className="filter-item">
                            <Checkbox name={"hotelType"} type="checkbox" value={item} onChange={(e) => this.props.filterCallback(e)} checked={(this.props.checkedFilters.includes(item))}>
                                <strong>{item}</strong>
                            </Checkbox>
                        </div>
                    })
                }
            </div>
        )
    }
    renderBedTypeComponent() {
        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div><h4>{this.props.filter_name.toUpperCase()}</h4></div>
                    <div className="reset-btn" onClick={() => this.props.resetCallback("bedType")}> reset</div>
                </div>
                <hr />
                {
                    this.props.filters.map((item, index) => {
                        return <div key={index} className="filter-item">
                            <Checkbox name={"bedType"} type="checkbox" value={item} onChange={(e) => this.props.filterCallback(e)} checked={(this.props.checkedFilters.includes(item))}>
                                <strong>{item}</strong>
                            </Checkbox>
                        </div>
                    })
                }
            </div>
        )
    }
    renderClassesComponent() {

        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div><h4>{this.props.filter_name.toUpperCase()}</h4></div>
                    <div className="reset-btn" onClick={() => this.props.resetCallback(this.props.filter_name)}>reset</div>
                </div>
                <hr />
                {
                    this.props.filters.map((item, index) => {
                        return <div key={index} className="filter-item">
                            <Checkbox name={this.props.filter_name} type="checkbox" value={item} 
                            onChange={(e) => this.props.filterCallback(e)} checked={(this.props.checkedFilters.includes(item))}>
                                <strong>{item}</strong>
                            </Checkbox>
                        </div>
                    })
                }
            </div>
        )
    }


    renderBusAmenityComponent(){
        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div><h4>{this.props.filter_name.toUpperCase()}</h4></div>
                    <div className="reset-btn" onClick={()=>this.props.resetCallback()}>reset</div>
                </div>
                <hr />
                {
                    this.props.filters.map((item, index) => {
                        return <div key={index} className="filter-item">
                            <Checkbox name={this.props.filter_name} type="checkbox" 
                                      value={item}   
                                      onChange={(e) => this.props.filterCallback(e)} 
                                      checked={(this.props.checkedFilters.includes(item))}
                                    >
                                <strong>{item}</strong>
                            </Checkbox>
                        </div>
                    })
                }
            </div>
        )
    }

    renderBusClassesComponent(){
        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div><h4>{this.props.filter_name.toUpperCase()}</h4></div>
                    <div className="reset-btn" onClick={()=>this.props.resetCallback()}>reset</div>
                </div>
                <hr />
                {
                    this.props.filters.map((item, index) => {
                        return <div key={index} className="filter-item">
                            <Checkbox name={this.props.filter_name} type="checkbox" 
                                      value={item}   
                                      onChange={(e) => this.props.filterCallback(e)} 
                                      checked={(this.props.checkedFilters.includes(item))}
                                    >
                                <strong>{item}</strong>
                            </Checkbox>
                        </div>
                    })
                }
            </div>
        )
    }

    renderBusOperatorsComponent(){
        return (
            <div className="filter-section">
                <div className="filter-title">
                     <div><h4>{this.props.filter_name.toUpperCase()}</h4></div>
                     <div className="reset-btn" onClick={()=>this.props.resetCallback()}>Reset</div>
                </div>
                <hr/>
                {
                   (this.props.filters.length < 6) ?
                   this.props.filters.map((item, index) => {
                       return <div key={index} className="filter-item">
                           <Checkbox name="operators" type="checkbox" value={item} 
                            onChange={(e) => this.props.filterCallback(e)} 
                            checked={(this.props.checkedFilters.includes(item))}>
                               <strong>{item}</strong>
                           </Checkbox>
                       </div>
                   })
                   :
                   (this.state.isExpanedBusOperator) ?
                       this.props.filters.map((item, index) => {
                            return <div key={index} className="filter-item">
                                    <Checkbox name="operators" type="checkbox" value={item}  
                                     onChange={(e) => this.props.filterCallback(e)} 
                                     checked={(this.props.checkedFilters.includes(item))}>
                                    <strong>{item}</strong>
                                    </Checkbox>
                                    </div>
                       })
                       :
                       this.props.filters.slice(0, 6).map((item, index) => {
                           return  <div key={index} className="filter-item">
                                    <Checkbox name="operators" type="checkbox" value={item} 
                                      onChange={(e) => this.props.filterCallback(e)} 
                                      checked={(this.props.checkedFilters.includes(item))}
                                    >
                                    <strong>{item}</strong>
                                    </Checkbox>
                                    </div>
                       })
                }
                 <div className="button-section">
                    {
                        (this.props.filters.length > 6) ?
                            (!this.state.isExpanedBusOperator) ?
                                <Button type="primary" 
                                onClick={() => this.setState({ isExpanedBusOperator: true })}>
                                   {`Show More ${this.props.filters.length - 6} Bus Lines`}
                                </Button>
                                
                                :
                                <Button type="primary" 
                                onClick={() => this.setState({ isExpanedBusOperator: false })}>
                                    Hide
                                </Button>
                               
                            :
                            <div></div>
                    }
                </div>
                
            </div>
        )
    }

    renderAirlinesComponent() {
        // console.log("Airline Name",this.props.filters);
        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div><h4>{this.props.filter_name.toUpperCase()}</h4></div>
                    <div className="reset-btn" onClick={() => this.props.resetCallback("airlineName")}>reset</div>
                </div>
                <hr />
                {
                    (this.props.filters.length < 6) ?
                        this.props.filters.map((item, index) => {
                            return <div key={index} className="filter-item">
                                <Checkbox name="airlineName" type="checkbox" value={item.name} onChange={(e) => this.props.filterCallback(e)}
                                    checked={(this.props.checkedFilters.includes(item.name))}>
                                    <strong>{item.name}</strong>
                                </Checkbox>
                                <div>{`${this.changeCurrencyCode(item.currency)} ${item.price}`}</div>
                            </div>
                        })
                        :
                        (this.state.isExpanedFlight) ?
                            this.props.filters.map((item, index) => {
                                return <div key={index} className="filter-item">
                                    <Checkbox name="airlineName" type="checkbox" value={item.name} onChange={(e) => this.props.filterCallback(e)}
                                        checked={(this.props.checkedFilters.includes(item.name))}>
                                        <strong>{item.name}</strong>
                                    </Checkbox>
                                    <div>{`${this.changeCurrencyCode(item.currency)} ${item.price}`}</div>
                                </div>
                            })
                            :
                            this.props.filters.slice(0, 6).map((item, index) => {
                                return <div key={index} className="filter-item">
                                    <Checkbox name="airlineName" type="checkbox" value={item.name} onChange={(e) => this.props.filterCallback(e)}
                                        checked={(this.props.checkedFilters.includes(item.name))}>
                                        <strong>{item.name}</strong>
                                    </Checkbox>
                                    <div>{`${this.changeCurrencyCode(item.currency)} ${item.price}`}</div>
                                </div>
                            })
                }
                <div className="button-section">
                    {
                        (this.props.filters.length > 6) ?
                            (!this.state.isExpanedFlight) ?
                                <Button type="primary" 
                                onClick={() => this.setState({ isExpanedFlight: true })}>
                                   {`Show More ${this.props.filters.length - 6} Flights`}
                                </Button>
                                
                                :
                                <Button type="primary" 
                                onClick={() => this.setState({ isExpanedFlight: false })}>
                                    Hide
                                </Button>
                               
                            :
                            <div></div>
                    }
                </div>


            </div>
        )
    }

    renderDepartureTime() {
        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div><h4>{"Departure Time"}</h4></div>
                    <div className="reset-btn" onClick={() => this.props.resetCallback(this.props.filter_name)}>reset</div>
                </div>
                <hr />
                {
                    this.props.filters.map((item, index) => {
                        return <div key={index} className="filter-item departure-time">
                            <div>
                                <Checkbox name={this.props.filter_name} type="checkbox" value={item.name} onChange={(e) => this.props.filterCallback(e)} checked={(this.props.checkedFilters.includes(item.name))}>
                                    <strong>{item.name}</strong>
                                    <h4>{item.text}</h4>
                                </Checkbox>
                            </div>
                            <div>
                                
                               {
                                   this.renderDepartureTimeIcon(item.name)
                               }
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }

    renderDepartureTimeIcon(time){
        switch(time){
            case "Early Morning" : return  <img src={EarlyMorning} alt="early-moring-img" />
            case "Morning" : return  <img src={Morning} alt="early-moring-img" />
            case "Afternoon" : return  <img src={Afternoon} alt="early-moring-img" />
            case "Evening" : return  <img src={Evening} alt="early-moring-img" />
        }
    }

    renderAmenities() {
        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div><h4>{this.props.filter_name.toUpperCase()}</h4></div>
                    <div className="reset-btn" onClick={() => this.props.resetCallback("amenities")}>reset</div>
                </div>
                <hr/>
                {
                    this.props.filters.map((item, index) => {
                        return <div key={index} className="filter-item">
                            <div>
                                <Checkbox name="amenities" type="checkbox" value={item.id} 
                                onChange={(e) => this.props.filterCallback(e)} checked={(this.props.checkedFilters.includes(item.id))}>                                
                                    <strong>{item.name}</strong>                                
                                </Checkbox>
                            </div>
                            <div>
                                <img style={{width:"32px"}} src={item.icon} alt="amenities_icon"/>
                            </div>
                        </div>
                    })
                }
            </div>
        )
    }

    renderStars(){
        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div><h4>{this.props.filter_name.toUpperCase()}</h4></div>
                    <div className="reset-btn" onClick={() => this.props.resetCallback(this.props.filter_name)}>reset</div>
                </div>
                <hr/>
                <div className="filter-item star-filter">
                    {
                        this.props.filters.map((item,index)=>{
                          return  <StarRating count={item.toString()} key={index} onClick={this.props.filterCallback} 
                            checked={(this.props.checkedFilters.includes(item.toString()))}/>
                        })
                    }
                </div>
            </div>
        )
    }
    render() {
        return (
            <div>                
                {!!this.props.isStop && this.renderStopsComponent()}
                {!!this.props.isAirline && this.renderAirlinesComponent()}
                {!!this.props.isClass && this.renderClassesComponent()}
                {!!this.props.isDeparts && this.renderDepartureTime()}
                {!!this.props.isBusOperator && this.renderBusOperatorsComponent()}
                {!!this.props.isBusAmenity && this.renderBusAmenityComponent()}
                {!!this.props.isBusClasses && this.renderBusClassesComponent()}
                {!!this.props.isHotelType && this.renderHotelTypeComponent()}
                {!!this.props.isAmenities && this.renderAmenities()}
                {!!this.props.isBedType && this.renderBedTypeComponent()}
                {!!this.props.isStar && this.renderStars()}
            </div>

        )
    }
}

export default FilterableComponent;