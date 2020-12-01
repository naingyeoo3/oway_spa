import React, { Component, Suspense, lazy } from 'react';


import ListingSearchType from './ListingSearchType';
import ListingSearchComponent from './ListingSearchComponent';

import './listing-search.scss';

class ListingSearch extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    render() {
        return (
            <div className="app-row">
                <div className="app-container">
                    <ListingSearchType />
                    <ListingSearchComponent />
                </div>
            </div>
        );
    }
}

export default ListingSearch;