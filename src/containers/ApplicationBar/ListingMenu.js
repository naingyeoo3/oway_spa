import React, { Component } from 'react';
import { Web } from '../../constants/helper';
import AppMenuBar from './AppMenuBar';
 
class ListingMenu extends Component {
    render() { 
        const { style, isListing } = this.props;
        return (
            <div>
                <div className="stick-bar" style={!!style ? style :{}}>
                    <div className="app-container">
                        <Web>
                            <AppMenuBar
                                isSticky={true} 
                                callbackParent={this.props.handleClickMenu}
                                currentMenu={this.props.currentMenu}
                                menuMode="horizontal"
                                isListing={isListing}
                            />  
                        </Web>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default ListingMenu;