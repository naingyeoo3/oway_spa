import React, { Component } from 'react';
import './style.scss';

class FilterSkeleton extends Component {
    render() {
        return (
            <div className="filter-skeleton">
                <div className="card found-card">
                    <div className="found background"></div>
                    <div className="info background"></div>
                </div>
                <ul>
                    <li>
                        <div className="skeleton-section">
                            <div className="skeleton-title">
                                <div className="title background"></div>
                                <div className="reset-btn background"></div>
                            </div>
                            <hr></hr>
                            <div className="skeleton-item">
                                <div className="price background"></div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="skeleton-section">
                            <div className="skeleton-title">
                                <div className="title background"></div>
                                <div className="reset-btn background"></div>
                            </div>
                            <hr></hr>
                            <div className="skeleton-item">
                                <div className="item background"></div>
                                <div className="item background"></div>
                                <div className="item background"></div>
                            </div>
                        </div>                        
                    </li>
                    <li>
                        <div className="skeleton-section">
                            <div className="skeleton-title">
                                <div className="title background"></div>
                                <div className="reset-btn background"></div>
                            </div>
                            <hr></hr>
                            <div className="skeleton-item">
                                <div className="item background"></div>
                                <div className="item background"></div>
                                <div className="item background"></div>
                            </div>
                        </div>                        
                    </li>
                    <li>
                        <div className="skeleton-section">
                            <div className="skeleton-title">
                                <div className="title background"></div>
                                <div className="reset-btn background"></div>
                            </div>
                            <hr></hr>
                            <div className="skeleton-item">
                                <div className="item background"></div>
                                <div className="item background"></div>
                                <div className="item background"></div>
                            </div>
                        </div>                        
                    </li>
                    <li>
                        <div className="skeleton-section">
                            <div className="skeleton-title">
                                <div className="title background"></div>
                                <div className="reset-btn background"></div>
                            </div>
                            <hr></hr>
                            <div className="skeleton-item">
                                <div className="item background"></div>
                                <div className="item background"></div>
                                <div className="item background"></div>
                            </div>
                        </div>                        
                    </li>
                </ul>
            </div>
        );
    }
}

export default FilterSkeleton;