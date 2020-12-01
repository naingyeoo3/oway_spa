import React, { Component } from 'react';
import { Checkbox } from 'antd';
 
class TourFilterCategories extends Component {
    constructor(props) {
        super(props);     
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

    handleCatFilter(e, tourCode){
        if(e.target.checked){
            this.props.callbackAddFilter(tourCode);
        }else{
            this.props.callbackRemoveFilter(tourCode);
        }
    }
    handleReset(){
        this.props.resetCatFilter();
        this.props.callbackUpdate();        
    }
    render() { 
        const { filters } = this.props;
        return (
            <div className="filter-section">
                <div className="filter-title">
                    <div>
                        <h4>Tour Type</h4>
                    </div>
                    <div className="reset-btn" onClick={()=> this.handleReset()}>reset</div>
                </div>
                <hr></hr>
                <div>
                    {
                        filters.isFetching ?
                        <div>loading ...</div>
                        :
                        <div>
                            {
                                filters.data.length > 0 ?
                                <div>
                                    {
                                        filters.data.map((cat,index)=>(
                                            <div key={index} className="filter-item">
                                                <div>
                                                    <Checkbox                                 
                                                        key={index}
                                                        onChange={(e)=> this.handleCatFilter(e, cat.categoryCode)}
                                                    >
                                                            {cat.categoryTitle}
                                                    </Checkbox>
                                                </div>
                                                <div>
                                                    {this.getCategoryIcon(cat.categoryTitle)}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                :
                                <div>
                                    no filter found
                                </div>
                            }
                        </div>
                    }
                </div>
                
                <div>
                
                </div>
            </div>
        );
    }
}
 
export default TourFilterCategories;