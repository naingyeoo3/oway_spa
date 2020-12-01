import React, { Component } from 'react';
import StarRatingIcon from '../../assests/images/png/icon-star-rating.png';
import './style.scss';
export default class StarRating extends Component {
    render() {
        return (
        
                
                    (!this.props.checked)?
                        <span className="star-rating" onClick={()=>this.props.onClick(this.props.count)}>{this.props.count}
                            <img className="rating" src={StarRatingIcon} alt="star-icon"/>
                        </span>
                    :
                    
                        <span className="star-rating-checked" onClick={()=>this.props.onClick(this.props.count)}>{this.props.count}
                            <img className="rating"  src={StarRatingIcon} alt="star-icon"/>
                        </span>    

                
            

        )
    }
}
