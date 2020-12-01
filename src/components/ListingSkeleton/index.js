import React, { Component } from 'react'
import './style.scss'

class ListingSkeleton extends Component {
    render() {
        return (
            <div className="card">
                <div className="list-skeleton">
                    <div className="image background"></div>
                    <div className="info">
                        <div className="heading background"></div>
                        <div className="address background"></div>
                        <div className="address background"></div>
                        <div className="title background"></div>
                        <div className="included">
                            <div className="icon background"></div>
                            <div className="icon background"></div>
                            <div className="icon background"></div>
                            <div className="icon background"></div>
                            <div className="icon background"></div>
                        </div>
                    </div>
                    <div className="price">
                        <div className="currency background"></div>
                        <div className="per background"></div>
                        <div className="button background"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListingSkeleton;