import React from 'react';
import { FormattedMessage } from 'react-intl'

export const getLabelFormService = (route) => {    
    switch (route) {
        case '/':
            return <FormattedMessage id="search.text.from" />;
            break;
        case '/flights':
            return <FormattedMessage id="search.text.from" />;
            break;
        case '/buses':
            return <FormattedMessage id="search.text.from" />;
            break;
        case '/hotels':
            return <FormattedMessage id="search.text.hotel" />;
            break;
        case '/tours':
            return <FormattedMessage id="search.text.destination" />;
            break;
        case '/attractions':
            return <FormattedMessage id="search.text.destination" />;
            break;
        case '/myanmar_visa':
            return 'First Name';
            break;
        default:
            return <FormattedMessage id="search.text.from" />;
            break;
    }
}
export const getLabelToService = (route) => {    
    switch (route) {
        case '/':
            return <FormattedMessage id="search.text.to" />;
            break;
        case '/flights':
            return <FormattedMessage id="search.text.to" />;
            break;
        case '/buses':
            return <FormattedMessage id="search.text.to" />;
            break;
        case '/hotels':
            return '';
            break;
        case '/tours':
            return '';
            break;
         case '/attractions':
            return '';
            break;
            
        case '/myanmar_visa':
            return 'First Name';
            break;
        default:
            return 'From';
            break;
    }
}
export const getClassNameDepServices = ( route )=> {
    switch (route) {
        case '/':
            return 'search-section';
            break;
        case '/flights':
            return 'search-section';
            break;
        case '/hotels':
            return 'hotel-search search-section';
            break;
        case '/buses':
            return 'bus-search search-section';
            break;
        case '/tours':
            return 'tour-search search-section';
            break;
         case '/attractions':
            return 'tour-search search-section';
            break;
        case '/myanmar_visa':
            return 'visa-search search-section';
            break;
        default:
            return 'search-section';
            break;
    }
}
export const getLableDateInput = (route, searchTab) => {   
    if(route == '/' || route == '/flights' || route == '/buses'){
        return (
            <span>
                <span className="date-label"><FormattedMessage id="search.text.departdate" /></span>
                <span className={searchTab == 2 ? "round-to-label" : "to-label"}>
                    <FormattedMessage id="search.text.returndate" />
                </span>
            </span>
        )           
    }else if(route == '/hotels'){
        return (
            <span>
                <span className="date-label"><FormattedMessage id="search.checkin" /></span>
                <span className="round-to-label">
                    <FormattedMessage id="search.checkout" />
                </span>
            </span>
        )           
    }        
}