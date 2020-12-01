import React, {Component} from 'react'
import callCenterIcon from '../../assests/images/svg/call-center.svg'
import emailIcon from '../../assests/images/svg/email.svg'
import './customer-care.scss'

class CustomerCare extends Component {
    render() {
        return (
            <div className="customer-care">
                <h3 className="heading">Customer Care Center</h3>
                <p>
                    <img src={callCenterIcon} alt="(+95) 1 231 8939" />
                    <a href="tel:+9512318939" title="(+95) 1 231 8939">(+95) 1 231 8939</a>
                </p>
                <p>
                    <img src={emailIcon} alt="support@owaytrip.com" />
                    <a href="mailto:support@owaytrip.com" title="support@owaytrip.com">support@owaytrip.com</a>
                </p>
            </div>
        )
    }
}

export default CustomerCare;