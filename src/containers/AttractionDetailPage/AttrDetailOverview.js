import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser'

class AttrDetailOverview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getCategoryIcon(type) {
    switch (type) {
      case 'Health and Wellness':
        return (<img src={require(`../../assests/images/svg/healthandwellness.svg`)} alt="Health and Wellness" />);
        break;
      case 'Tour':
        return (<img src={require(`../../assests/images/svg/tour-triptype.svg`)} alt="Tour" />);
        break;
      case 'Transport':
        return (<img src={require(`../../assests/images/svg/transport.svg`)} alt="Transport" />);
        break;
      case 'Combo Deal':
        return (<img src={require(`../../assests/images/svg/combo.svg`)} alt="Combo Deal" />);
        break;
      case 'Learning':
        return (<img src={require(`../../assests/images/svg/learning.svg`)} alt="Learning" />);
        break;
      case 'Family':
        return (<img src={require(`../../assests/images/svg/family.svg`)} alt="Family" />);
        break;
      case 'Honeymoon':
        return (<img src={require(`../../assests/images/svg/honeymoon.svg`)} alt="Honeymoon" />);
        break;
      case 'Beach':
        return (<img src={require(`../../assests/images/svg/beach.svg`)} alt="Beach" />);
        break;
      case 'Leisure':
        return (<img src={require(`../../assests/images/svg/leisure.svg`)} alt="Leisure" />);
        break;
      case 'Culture':
        return (<img src={require(`../../assests/images/svg/culture.svg`)} alt="Culture" />);
        break;
      case 'Popular':
        return (<img src={require(`../../assests/images/svg/popular.svg`)} alt="Popular" />);
        break;
      default:
        break;
    }
  }
  render() {
    const { description, features, categories, cities, data } = this.props;
    return (
      <div>
        <div className="card overview" id="overview">
          <div className="title">
            <h2 className="heading heading-md heading-primary">Overview</h2>
            <p className="noti">
              {data && Number(data.duration) > 0 ? <span className="badge badge-outline-blue font-size-15"> {data.duration} Day(s)</span> : null}
              <span className="badge badge-blue font-size-15">
                min {data && data.ticket.min} ticket(s)
              </span>
            </p>
          </div>
          <div className="description">{ReactHtmlParser(description && description.summary)}</div>
        </div>
        <div className="tour-info">
          <div className="title">
            <h3 className="heading heading-sm heading-blue">Price included</h3>
          </div>
          {features ? (
            <div className="feature">
              {features.flight ? 
                <p>
                  <img src={require(`../../assests/images/svg/flight-gray.svg`)} alt="Flight" />
                  <span>Flight</span>
                </p>
                :
                <p className="hide">
                  <img src={require(`../../assests/images/svg/flight-gray.svg`)} alt="Flight" />
                  <span>Flight</span>
                </p>
              }
              {features.accommodation ? 
                <p>
                  <img src={require(`../../assests/images/svg/hotel-gray.svg`)} alt="Hotel" />
                  <span>Hotel</span>
                </p>
                :
                <p className="hide">
                  <img src={require(`../../assests/images/svg/hotel-gray.svg`)} alt="Hotel" />
                  <span>Hotel</span>
                </p>
              }
              {features.meal ? 
                <p>
                  <img src={require(`../../assests/images/svg/meal-gray.svg`)} alt="Meal" />
                  <span>Meal</span>
                </p>
                :
                <p className="hide">
                  <img src={require(`../../assests/images/svg/meal-gray.svg`)} alt="Meal" />
                  <span>Meal</span>
                </p>
              }
              {features.entranceFee ? 
                <p>
                  <img src={require(`../../assests/images/svg/entrance-gray.svg`)} alt="Entrance Fees" />
                  <span>Entrance Fees</span>
                </p>
                :
                <p className="hide">
                  <img src={require(`../../assests/images/svg/entrance-gray.svg`)} alt="Entrance Fees" />
                  <span>Entrance Fees</span>
                </p>
              }
              {features.tourGuide ? 
                <p>
                  <img src={require(`../../assests/images/svg/tour-gray.svg`)} alt="Tour Guide" />
                  <span>Tour Guide</span>
                </p>
                :
                <p className="hide">
                  <img src={require(`../../assests/images/svg/tour-gray.svg`)} alt="Tour Guide" />
                  <span>Tour Guide</span>
                </p>
              }              
              {features.transportation ? 
                <p>
                  <img src={require(`../../assests/images/svg/transport-gray.svg`)} alt="Transport" />
                  <span>Transport</span>
                </p>
                :
                <p className="hide">
                  <img src={require(`../../assests/images/svg/transport-gray.svg`)} alt="Transport" />
                  <span>Transport</span>
                </p>
              }
            </div>
          ) : null}
        </div>
        <div className="tour-info">
          <div className="title">
            <h3 className="heading heading-sm heading-blue">Destinations</h3>
          </div>
          <div className="feature">
            {cities &&
              cities.map((city, index) => <p key={index}>{city.name}</p>)}
          </div>
        </div>
        <div className="tour-info">
          <div className="title">
            <h3 className="heading heading-sm heading-blue">Trip Type</h3>
          </div>
          <div className="feature">
            {categories &&
              categories.map((cat, index) => (
                <div key={index}>{this.getCategoryIcon(cat.name)}</div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default AttrDetailOverview;
