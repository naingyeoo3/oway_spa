import React from 'react';
import { connect } from 'react-redux'

import { selectChildAge } from '../actions/searchComponentActions';
import { childNum } from '../constants/constants';

class SelectChildAge extends React.Component {
    constructor(props){
        super(props);        
        this.state={
            value: ''
        }
    }
    onChangeFunc(value){        
        this.props.selectChildAge(value.target.name, Number(value.target.value))
    }
    render() {
        return (
            <div className="sub-age">
                <select name={this.props.item.name} onChange={(val)=> {this.onChangeFunc({target: { name: this.props.item.name, value: val.target.value }})}}>                
                    {
                        childNum.map( num=> (
                        <option key={num} value={num}>{num}</option>    
                    ))
                    }                    
                </select>
            </div>
        );
    }
}
const mapStateToProps = state => ({     
    searchComponentReducers: state.searchComponentReducers    
 });

const mapDispatchToProps = dispatch => {
    return{                     
        selectChildAge: (name, age)=> dispatch(selectChildAge(name, age))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SelectChildAge);