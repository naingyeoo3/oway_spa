import React, { Component } from 'react';
import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,    
    Menu, 
    MenuDivider, 
    MenuItem, 
    Popover, 
    Position    
} from "@blueprintjs/core";

const styles = {
    navStyle : {
        display: 'flex',
        justifyContent:'space-between',
        backgroundColor: '#0A56BB',
        color: '#fff',
        boxShadow: 'none',
        height: '36px'
    },
    navGroup : {
        height: '36px'
    },
    btn : {
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#fff',
        backgroundImage: 'none',
        boxShadow: 'none',

    },
    divider : {
        margin: '0px 4px',
        borderLeft: '1px solid #fff',
        height: '14px'
    }
}

class ListingTopNavbar extends Component {
    render() {
        const exampleMenu = (
            <Menu>
                <MenuItem icon="graph" text="Graph" />                
                <MenuItem icon="map" text="Map" />                
                <MenuItem icon="th" text="Table" shouldDismissPopover={false} />
                <MenuDivider />                                                
            </Menu>
        );
        return (
                <Navbar style={styles.navStyle}>
                    <NavbarGroup style={styles.navGroup}>
                        <Popover content={exampleMenu} position={Position.BOTTOM}>
                            <Button style={styles.btn} text="FAQs" />
                        </Popover>                                                                                                
                        <NavbarDivider style={styles.divider} />
                        <Button style={styles.btn} text="Contact" />
                        <NavbarDivider style={styles.divider} />
                        <Button style={styles.btn} text="Call Us" />
                        <NavbarDivider style={styles.divider} />
                        <Button style={styles.btn} text="App Download" />
                    </NavbarGroup>
                    <NavbarGroup style={styles.navGroup}>                                                                
                        <Button style={styles.btn} text="Track Booking" />
                        <NavbarDivider style={styles.divider}/>
                        <Button style={styles.btn} text="Foreigner" />
                        <NavbarDivider style={styles.divider}/>
                        <Button style={styles.btn} text="Nation" />
                        <NavbarDivider style={styles.divider}/>
                        <Button style={styles.btn} text="Currency" />
                    </NavbarGroup>
                </Navbar>            
        );
    }
}

export default ListingTopNavbar;