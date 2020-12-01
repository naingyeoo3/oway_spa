import React, { Component } from 'react';

class AirasiaBigPoint extends Component {
    constructor(props){
        super(props);
        this.state={
            airAsiaMemberId : ''
        }
        this.handleMemberIdChange = this.handleMemberIdChange.bind(this);
    }
    handleMemberIdChange(e){
        this.setState({
            airAsiaMemberId : e.target.value
        })
    }
    render() {
        return (
            <div>
                <h3 className="heading heading-sm heading-payment">Earn Airasia Big Points</h3>
                        <div className="card big-point">
                            <div className="image">
                                <img src={require(`../../assests/images/svg/airasia-big-point.svg`)} alt="Airasia Big Points" />
                            </div>
                            <div className="number">
                                <p>
                                    AirAsia BIG Loyalty Membership Number
                                </p>
                                <div className="input-card">
                                    <div className="card">
                                        <label>Membership Number</label>
                                        <input name="airAsiaMemberId" value={this.state.airAsiaMemberId}  placeholder="-" onChange={this.handleMemberIdChange} />
                                    </div>
                                    <div className="apply-block">
                                        <button type="button" onClick={()=>this.props.handleApply(this.state.airAsiaMemberId)}>Apply</button>
                                    </div>
                                    {/* <div className="earn-point">
                                        <p>
                                            You will earn <span>336</span> Airasia BIG Loyalty
                                            <img src={require(`../../assests/images/svg/point.svg`)} alt="Airasia BIG Loyalty" />
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
            </div>
        );
    }
}

export default AirasiaBigPoint;