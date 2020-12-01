import React, { Component } from 'react'
import { connect } from 'react-redux';
import './style.scss'

class SortingSkeleton extends Component {
    constructor(props){
        super(props);
    }
    detectHotelListing = () => this.props.router.location.pathname.includes('hotels/search');
    detectTourListing = () => this.props.router.location.pathname.includes('tours/search');
    detectAttractionListing = () => this.props.router.location.pathname.includes('attractions/search');
    getSorting(){
        if(this.detectHotelListing()){
            return(
                <div className="sorting-filter">
                    <div className="background"></div>
                    <div className="background"></div>
                    <div className="background"></div>
                    <div className="background"></div>
                </div>
            )
        }else if(this.detectTourListing() || this.detectAttractionListing()){
            return(
                <div className="sorting-filter">
                    <div className="background"></div>
                    <div className="background"></div>
                    <div className="background"></div>
                </div>
            )
        }else{
            return(
                <div className="sorting-filter">
                    <div className="background"></div>
                    <div className="background"></div>
                    <div className="background"></div>
                    <div className="background"></div>
                    <div className="background"></div>
                </div>
            )
        }
    }    
    render() {
        return (
            <div className="sorting-skeleton">
                <div className="sorting-by background"></div>
                {this.getSorting()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    router        : state.router    
 });

export default connect(mapStateToProps, null)(SortingSkeleton);