import React from 'react';
import { Popover } from 'antd';
function IntegreatedPopover(props){
    return(
        <Popover 
            title={!!props.title ? props.title : ''}
            trigger={!!props.trigger ? props.trigger : 'click'}
            placement={!!props.placement ? props.placement : "bottom"}
            visible={!!props.visible ? props.visible : false}
            onVisibleChange={!!props.onVisibleChange ? props.onVisibleChange : props.onVisibleChange}
            content={!!props.content ? props.content : null}
        />
    )
}
export default IntegreatedPopover;