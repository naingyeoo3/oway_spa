import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Radio } from 'antd';
import { FormattedMessage } from 'react-intl'

const RadioGroup = Radio.Group;

class SearchNationRadioGroup extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { navbarOptions }= this.props;
        return (
            <RadioGroup onChange={this.props.callbackSelectRadio} value={navbarOptions.nation.type}>
                <Radio value='f'>
                    <FormattedMessage id="search.nationality.foreigner" />
                </Radio>
                <Radio value='l'>
                    <FormattedMessage id="search.nationality.myanmar" />
                </Radio>                        
            </RadioGroup>
        );
    }
}

const mapStateToProps = state => ({     
    navbarOptions: state.navbarOptions
 });

    
export default connect(mapStateToProps, null)(SearchNationRadioGroup);