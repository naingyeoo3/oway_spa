import React, { Component, Suspense, lazy } from 'react';
import ListingTopNavbar from './ListingTopNavbar';
import ListingMenuBar from './ListingMenuBar';

import './listing-navbar.scss';

class ListingNavbar extends Component {
    render() {
        
        return (
            <div>
                <div style={{backgroundColor:"#0A56BB"}}>
                    <div className="app-container">
                        <ListingTopNavbar />                    
                    </div>
                </div>
                <div className="cz-app-bar">
                    <ListingMenuBar />
                </div>                
            </div>            
        );
    }
}

export default ListingNavbar;