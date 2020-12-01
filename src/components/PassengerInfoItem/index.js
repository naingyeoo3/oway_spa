import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { divisionCode, townshipCodes, nrcTypeCodes } from '../../constants/nrc';
import { Button, Input, Select, Checkbox, DatePicker, Tooltip } from 'antd';
const dateFormat = 'YYYY-MM-DD';
class PassengerInfoItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            isComplete: false,
            isTravelling: false,
            firstName: '',
            lastName: '',
            title: (this.props.type == "Adult") ? "Mr." : "Mstr.",
            type: this.props.type,
            dateOfBirth: '',
            number:'',
            nrcNumber:'',
            countryOfPassport: '',
            passportNumber: '',
            passportExpiredDate: '',
            formEdit: false,
            selectedDivision: divisionCode[0],
            townships: townshipCodes[divisionCode[0]],
            selectedTownship: townshipCodes[divisionCode[0]][0],
            selectedNrcType: nrcTypeCodes[0]
        }
        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleOnChangeInput = this.handleOnChangeInput.bind(this);
        this.handleOnChangeDOB = this.handleOnChangeDOB.bind(this);
        this.handleOnChangePassportDate = this.handleOnChangePassportDate.bind(this);
        this.checkFormComplete = this.checkFormComplete.bind(this);
        this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
        this.handleSelectTitle = this.handleSelectTitle.bind(this);
        this.handleDivisionCodeChange = this.handleDivisionCodeChange.bind(this);
        this.handleNrcCodeChange = this.handleNrcCodeChange.bind(this);
        this.handleTownshipChange = this.handleTownshipChange.bind(this);

    }


    handleCollapse() {
        this.setState({
            isOpen: true
        })
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.contactInfo && this.state.isTravelling !== this.props.contactInfo.isTravelling) {
            console.log("state changing")
            if (this.props.contactInfo.isTravelling) {
                console.log("Changing State")
                this.setState({
                    firstName: this.props.contactInfo.firstName,
                    lastName: this.props.contactInfo.lastName,
                    title: this.props.contactInfo.title,
                    isTravelling: true
                })
            }
            else {
                this.setState({
                    firstName: '',
                    lastName: '',
                    title: 'Mr',
                    isTravelling: false
                })
            }
        }
        if (prevState.isComplete !== this.state.isComplete && this.state.isComplete) {
            let payload = {}
            if(!this.props.nrcNeeded){
             payload = {
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    title: this.state.title,
                    dateOfBirth: this.state.dateOfBirth,
                    countryOfPassport: this.state.countryOfPassport,
                    passportNumber: this.state.passportNumber,
                    passportExpiredDate: this.state.passportExpiredDate
                }
            }else{
                payload={
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    title: this.state.title,
                    dateOfBirth: this.state.dateOfBirth,
                    nrcNumber : `${this.state.selectedDivision}${this.state.selectedTownship}${this.state.selectedNrcType}${this.state.nrcNumber}`
                }
            }
           
            this.props.handleCompleteTravellerInfo(this.state.type, payload)
        }
    }

    handleSelectTitle(value) {
        this.setState({
            title: value
        })
    }
    handleOnKeyUp() {
        //console.log("form complete", this.checkFormComplete())
    }

    handleOnPanelChange(value, mode) {
        //console.log("form COmplete", this.checkFormComplete())
    }

    handleOnChangeInput(e) {
        let formComplete = (this.props.nrcNeeded)? this.checkFormCompleteNRC() : this.checkFormComplete()
        this.setState({
            [e.target.name]: e.target.value,
            isComplete: formComplete
        })
        //console.log("formComplete", formComplete);
        //console.log("isComplete", this.state.isComplete);
    }
    
    checkFormComplete = () => {
        return this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.title.length > 0 && this.state.dateOfBirth.length > 0 && this.state.passportExpiredDate.length > 0 && this.state.passportNumber.length > 0 && this.state.countryOfPassport.length > 0
    }

    checkFormCompleteNRC =()=>{
         return this.state.firstName.length > 0 && this.state.lastName.length > 0 && this.state.title.length > 0 && this.state.dateOfBirth.length > 0 && this.state.selectedDivision.length >0 && this.state.selectedTownship.length>0&&this.state.selectedNrcType.length>0 && this.state.nrcNumber.length > 5
    }



    handleOnChangeDOB(date, dateString) {
        console.log("date Str DOB", dateString)
        let formComplete = (this.props.nrcNeeded)? this.checkFormCompleteNRC : this.checkFormComplete()
        this.setState({
            dateOfBirth: dateString,
            isComplete: formComplete
        })
    }
    handleOnChangePassportDate(date, dateString) {
        let formComplete = this.checkFormComplete()
        this.setState({
            passportExpiredDate: dateString,
            isComplete: formComplete
        })
    }
    disabledDate(current) {
        // Can not select days before today and today
        let futureMonth = moment(new Date()).add(6, 'M');
        return current && current < moment(futureMonth).endOf('day');
    }
    renderTitleOption(titles) {
        return titles.map((title, index) => {
            return <Select.Option key={index} value={title}>{title}</Select.Option>
        })

    }
    handleDivisionCodeChange(value) {
        let formComplete = this.checkFormCompleteNRC()
        this.setState({
            selectedDivision: value,
            townships: townshipCodes[value],
            selectedTownship: townshipCodes[value][0],
            isComplete : formComplete
        })
    }
    handleTownshipChange(value) {
        let formComplete = this.checkFormCompleteNRC()
        this.setState({
            selectedTownship: value,
            isComplete : formComplete
        })
    }
    handleNrcCodeChange(value) {
        let formComplete = this.checkFormCompleteNRC()
        console.log("selected nrc value",value);
        this.setState({
            selectedNrcType: value,
            isComplete : formComplete
        })
    }
    render() {
        let futureMonth = moment(new Date()).add(6, 'M').add(1,'d');
        let { townships } = this.state;
        return (
            <div className="form-container">
                {
                    (this.state.isOpen) ?
                        <div className="card form-card passenger-card">
                            <div className="form-group collapsed-title">
                                <div className="card input-card check-card">
                                    <Checkbox checked>{`${this.props.type} ${this.props.id + 1}`}</Checkbox>
                                    {
                                        (this.state.isComplete) ?
                                            <span className="badge-complete">complete</span>
                                            :
                                            <span></span>
                                    }
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="card input-card select-card">
                                    <label>First name</label>
                                    <div className="two-column">
                                    <Select
                                        defaultValue={this.state.title}
                                        onSelect={this.props.handleSelectTitle}
                                        dropdownClassName="form-select">
                                        {
                                            this.renderTitleOption(this.props.titles)
                                        }        
                                    </Select>
                                    <Input placeholder="enter your first name"
                                        name="firstName"
                                        onChange={this.handleOnChangeInput}
                                        onKeyUp={this.handleOnKeyUp}
                                        defaultValue={this.state.firstName} />
                                    </div>    
                                </div>
                                <div className="card input-card">
                                    <label>Last name</label>
                                    <Input placeholder="enter your last name"
                                        name="lastName"
                                        onChange={this.handleOnChangeInput}
                                        onKeyUp={this.handleOnKeyUp}
                                        defaultValue={this.state.lastName} />
                                </div>
                                <div className="card input-card">
                                    <label>Date of birth</label>
                                    {/* <Tooltip placement="top" title="Please make sure your ID is valid for at least six months after your date of travel.">
                                        <img src={require(`../../assests/images/svg/info-icon.svg`)} alt="Information" className="info" />
                                    </Tooltip> */}
                                    <DatePicker onChange={this.handleOnChangeDOB}
                                        onKeyUp={this.handleOnKeyUp}
                                        defaultValue={moment(new Date(), dateFormat)}
                                        format={dateFormat}
                                    />
                                </div>
                                {
                                    (this.props.nrcNeeded) ?
                                        (this.props.type != "Infant") ?
                                           <Fragment>
                                            <div className="card input-card select-card nrc-card">
                                                <label>NRC no.</label>
                                                <div className="two-column">
                                                    <Select
                                                        defaultValue={divisionCode[0]}
                                                        onChange={this.handleDivisionCodeChange}
                                                        dropdownClassName="form-select division-select"
                                                        className="division-code"
                                                    >
                                                        {divisionCode.map(code => (
                                                            <Select.Option key={code} value={code}>{code}</Select.Option>
                                                        ))}
                                                    </Select>
                                                    <Select
                                                        defaultValue={this.state.selectedTownship}
                                                        value={this.state.selectedTownship}
                                                        onChange={this.handleTownshipChange}
                                                        dropdownClassName="form-select township-select"
                                                        className="township-code"
                                                    >
                                                        {
                                                            townships.map(code => (
                                                                <Select.Option key={code} value={code}>{code}</Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                    <Select
                                                        defaultValue={nrcTypeCodes[0]}
                                                        onChange={this.handleNrcCodeChange}
                                                        dropdownClassName="form-select nrctype-select"
                                                        className="nrc-code"
                                                    >
                                                        {
                                                            nrcTypeCodes.map(code => (
                                                                <Select.Option key={code} value={code}>{code}</Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                    <Input defaultValue={this.state.nrcNumber}
                                                    name="nrcNumber"
                                                    onKeyUp={this.handleOnKeyUp}
                                                    onChange={this.handleOnChangeInput}
                                                    placeholder="123456" />
                                                </div>
                                            </div>
                                            </Fragment>
                                            :
                                            <Fragment></Fragment>
                                        :
                                        <Fragment>
                                            <div className="card input-card">
                                                <label>Passport issuing country</label>
                                                <Input defaultValue={this.state.countryOfPassport}
                                                    name="countryOfPassport"
                                                    onKeyUp={this.handleOnKeyUp}
                                                    onChange={this.handleOnChangeInput}
                                                    placeholder="Passport Issuing Country" />
                                            </div>
                                            <div className="card input-card">
                                                <label>Passport number</label>
                                                <Input name="passportNumber"
                                                    defaultValue={this.state.passportNumber}
                                                    onKeyUp={this.handleOnKeyUp}
                                                    onChange={this.handleOnChangeInput}
                                                    placeholder="Passport Number" />
                                            </div>
                                            <div className="card input-card">
                                                <label>Passport expiry</label>
                                                {/* <Tooltip placement="top" title="Please make sure your ID is valid for at least six months after your date of travel.">
                                                    <img src={require(`../../assests/images/svg/info-icon.svg`)} alt="Information" className="info" />
                                                </Tooltip> */}
                                                <DatePicker onChange={this.handleOnChangePassportDate}
                                                    disabledDate={this.disabledDate}
                                                    defaultValue={moment(new Date(futureMonth), dateFormat)}
                                                    format={dateFormat}
                                                />
                                            </div>
                                        </Fragment>

                                }

                            </div>
                        </div>
                        :
                        <div className="card plus-card">
                            <div className="form-collapsed" onClick={this.handleCollapse}>
                                <img src={require(`../../assests/images/svg/plus.svg`)} alt="Plus Sign" />
                                <h4 className="heading heading-dark">{`${this.props.type} ${this.props.id + 1}`}</h4>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default PassengerInfoItem;