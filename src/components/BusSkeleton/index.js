import React, {Component} from 'react'
import './style.scss'

class Skeleton extends Component {
    render() {
        return (
            <div className="card">
                <div className="bus-skeleton">
                    <div className="col-info">
                        <div className="info">
                            <div className="logo">
                                <div className="image background"></div>
                                <div className="heading background"></div>
                            </div>
                            <div className="route">
                                <div className="top background"></div>
                                <div className="line background"></div>
                                <div className="bottom background"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-price">
                        <div className="price">
                            <div className="per background"></div>
                            <div className="currency background"></div>
                        </div>
                        <div className="select">
                            <div className="button background"></div>
                        </div>
                        
                    </div>
                </div>
                <div className="accordion-skeleton">
                    <div className="details background"></div>
                    <div className="cancellation background"></div>
                </div>
            </div>
        )
    }
}

export default Skeleton;



