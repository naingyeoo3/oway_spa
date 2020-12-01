import React, { Component } from 'react';

import { 
    Alignment, 
    Classes, 
    H3, 
    H5, 
    InputGroup, 
    Navbar, 
    Switch, 
    Tab, 
    TabId,
    Button, 
    Tabs } from "@blueprintjs/core";

import MenuItem from './MenuItem';
import LogoImag from './LogoImag';

import { appMenu, appMenuRightItems } from '../../constants/constants';

const styles = {
    navbar: {
        backgroundColor: 'transparent',
        boxShadow: 'none'
    }
}

class ListingMenuBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            animate: true
        }
    }
    
    getMenuItems = () => appMenu.map((item)=> <MenuItem key={item.id} item={item}/>)
    
    getRightMenuItem = () => appMenuRightItems.map((item)=> <div className="cz-menu-item"><h5>{item.name}</h5></div>)

    render() {
        return (
            <div className="app-container">
                <Navbar style={styles.navbar}>
                    <Navbar.Group>
                        <LogoImag />
                        {this.getMenuItems()}                        
                    </Navbar.Group>
                    <Navbar.Group align={Alignment.RIGHT}>
                        {this.getRightMenuItem()}
                    </Navbar.Group>
                </Navbar>     
            </div>            
        );
    }
}

export default ListingMenuBar;