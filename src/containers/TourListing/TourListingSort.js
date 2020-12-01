import React, { Component } from 'react';
import { Button } from 'antd';
 
class TourListingSort extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleSortPrice(){
        const { sort } = this.props;
        sort.price == 0 ? this.props.callbackSortDec() : this.props.callbackSortAce();
    }
    handleSortDiscount(){
        const { sort } = this.props;
        sort.discount == 0 ? this.props.callbackSortDiscount() : this.props.callbackSortDiscountDec();
    }
    handleSortRecommed(){
        const { sort } = this.props;
        sort.recommended == 0 ? this.props.callbackSortRecommended() : this.props.callbackSortRecommendedDec();
    }
    render() { 
        const { sort } = this.props;
        return (
            <div className="sorting-block">
                <div>
                    <p className="sorted-by">Sorted by</p>
                </div>                                   
                <div className="sorting-filter">
                    <div className="sorting-list">
                        <p onClick={()=> this.handleSortDiscount()}>
                            { 
                                sort.discount == 0 ?
                                <span className="active">
                                    Discount
                                    <img src={require(`../../assests/images/svg/sorting-down.svg`)} alt="" />
                                </span>
                                :
                                <span>
                                    Discount
                                    <img src={require(`../../assests/images/svg/sorting-up.svg`)} alt="" />
                                </span>
                            }  
                        </p>
                        <p onClick={()=> this.handleSortRecommed()}>
                            { 
                                sort.recommended == 0 ?
                                <span className="active">
                                    Recommended
                                    <img src={require(`../../assests/images/svg/sorting-down.svg`)} alt="" />
                                </span>
                                :
                                <span>
                                    Recommended
                                    <img src={require(`../../assests/images/svg/sorting-up.svg`)} alt="" />
                                </span>
                            }  
                        </p>
                        <p onClick={()=> this.handleSortPrice()}>
                            {
                                sort.price == 0 ?
                                <span className="active">
                                    Price
                                    <img src={require(`../../assests/images/svg/sorting-down.svg`)} alt="" />
                                </span> 
                                :
                                <span>
                                    Price
                                    <img src={require(`../../assests/images/svg/sorting-up.svg`)} alt="" />
                                </span>
                            }  
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default TourListingSort;