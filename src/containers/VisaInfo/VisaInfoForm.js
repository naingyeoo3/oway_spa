import React, { Component } from 'react';
import VisaFirstForm from './VisaFirstForm';
import VisaSecondForm from './VisaSecondForm';
import VisaConfirmInfo from './VisaConfirmInfo';
 
class VisaInfoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        };
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
    }

    nextPage() {        
        this.setState({ page: this.state.page + 1 });
    }
    
    previousPage() {
        this.setState({ page: this.state.page - 1 });
    }
    nextSubmit() {
        this.props.onSubmit()
        this.setState({ page: this.state.page + 1 });
    }
     
    render() { 
        const { onSubmit } = this.props;
        const { page } = this.state;
        return (
            <div>
                <div style={{display:'flex'}}>
                    <div style={page == 1 ?{ backgroundColor:"#1890ff"}:{}}>1 Entry Info</div>
                    <div style={page == 2 ?{ backgroundColor:"#1890ff"}:{}}>2 Personal Info</div>
                    <div style={page == 3 ?{ backgroundColor:"#1890ff"}:{}}>3 Confirmation</div>
                </div>
                {page === 1 && <VisaFirstForm onSubmit={this.nextPage} />}
                {page === 2 &&
                    <VisaSecondForm
                        previousPage={this.previousPage}
                        onSubmit={()=> this.nextSubmit()}
                    />}
                {page === 3 && <VisaConfirmInfo />}
            </div>
        );
    }
}
 
export default VisaInfoForm;