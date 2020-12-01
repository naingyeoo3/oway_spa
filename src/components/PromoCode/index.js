import React, { Component } from 'react';

class PromoCode extends Component {
    constructor(props){
        super(props);
        this.state ={
            promoCode :''
        }
        this.handleCodeChange = this.handleCodeChange.bind(this);
    }
    handleCodeChange(e){
       this.setState({
           promoCode : e.target.value
       })
    }
    render() {
        return (
            <div>
                 <h3 className="heading heading-sm heading-payment">Use Promo Code<span> (Optional)</span></h3>
                        <div className="card promo-card">
                            <div className="promo-code">
                                <label>PROMO CODE</label>
                                <input value={this.state.promoCode} placeholder="-"  onChange={this.handleCodeChange}/>
                            </div>
                            <div className="promo-error">{this.props.message}</div>
                            <button type="button" onClick={()=>this.props.handleApply(this.state.promoCode)}>Apply</button>
                        </div>
            </div>
        );
    }
}

export default PromoCode;