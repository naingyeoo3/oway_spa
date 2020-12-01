import React, { Component } from 'react';
import { Menu } from 'antd';
    
const MobileTravelerClass = (props) =>    
    <Menu>
        {
            props.travelerClass.map( (item)=> (
                <Menu.Item 
                    key={item.id} 
                    onClick={()=> props.callbackParent(item.title, item.keyword)}
                >                                       
                    <a>{item.title}</a>
                </Menu.Item>        
            ))
        }                            
    </Menu>
export default MobileTravelerClass;