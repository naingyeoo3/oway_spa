import React, { Component } from 'react';
import { Button, Input, Select, Alert, Checkbox, AutoComplete } from 'antd';
class ContactInfo extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h3 className="heading heading-dark heading-checkout">Contact Info</h3>
                <div className="form-container">
                    <div className="card form-card">
                        <div className="form-group">
                            {/* <Input.Group className="contact-info-input" compact> */}
                            <div className="card input-card select-card">
                                <label>First name</label>
                                <div className="two-column">
                                    <Select
                                        defaultValue={this.props.title}
                                        onSelect={this.props.handleSelectTitle}
                                        dropdownClassName="form-select">
                                        <Select.Option value="Mr">Mr.</Select.Option>
                                        <Select.Option value="Ms">Ms.</Select.Option>
                                        <Select.Option value="Mrs">Mrs.</Select.Option>
                                    </Select>
                                    <Input
                                        name="firstName"
                                        defaultValue={this.props.firstName}
                                        value={this.props.firstName}
                                        placeholder="enter your first name"
                                        onChange={this.props.handleContactInfoInput} />
                                </div>
                                {/* <span className="error-text">#error text</span> */}
                            </div>
                            <div className="card input-card">
                                <label>Last name</label>
                                <Input
                                    name="lastName"
                                    className="contact-info-input"
                                    defaultValue={this.props.lastName}
                                    value={this.props.lastName}
                                    placeholder="enter your last name"
                                    onChange={this.props.handleContactInfoInput} />
                            </div>
                            <div className="card input-card select-card mobile-card">
                                <label>Mobile number</label>
                                <div className="two-column">
                                    <AutoComplete
                                        dataSource={this.props.options}
                                        onSelect={this.props.handleSelectDialCode}
                                        onSearch={this.props.handleSearch}
                                        placeholder="95"
                                        defaultValue="95"
                                        optionLabelProp="value"
                                        dropdownClassName="form-select dialcode-select"
                                    />
                                    <Input
                                        name="phoneNumber"
                                        defaultValue={this.props.mobileNumber}
                                        value={this.props.mobileNumber}
                                        placeholder="9123456789"
                                        onChange={this.props.handleContactInfoInput}
                                    />
                                </div>
                            </div>
                            <div className="card input-card">
                                <label>Email to receive booking info</label>
                                <Input
                                    name="email"
                                    defaultValue={this.props.email}
                                    value={this.props.email}
                                    type="email"
                                    onChange={this.props.handleContactInfoInput}
                                    className="contact-info-input"
                                    placeholder="username@gmail.com" />
                                {/* <span className="error-text">#error text</span> */}
                            </div>
                            <div className="card input-card check-card">
                                <Checkbox
                                    name="isTravelling"
                                    defaultChecked={this.props.isTravelling}
                                    checked ={this.props.isTravelling}
                                    onChange={this.props.handleContactInfoCheckChange}>
                                    I'm also travelling
                                        </Checkbox>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default ContactInfo;