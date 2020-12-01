import React, { Component } from 'react';
import './style.scss';

export class PriceFilter extends Component {

    constructor(props){
        super(props);
    }
    render() {
        return ( 
            <div>
                <input name="price" type="range" min={0} max={this.props.max} 
                    className="slider" id="myRange" 
                    onChange={(e) => this.props.handleChange(e)} />
                    <div className="price">
                        <div>USD 0</div>
                        <div>USD {this.props.max}</div>
                    </div>
             </div>
                            
                 
           
        )
    }
}

export default PriceFilter;
