import React from 'react';
import { Icon } from 'antd';

function IntegreatedIcon(props) {
    return (
        <div>
            {                
                props.type != null ?
                    <Icon type={!!props.type ? props.type : "question"}/>                   
                        :
                    <Icon component={!!props.component ? props.component : 'question'}/>                    
            }
        </div>
    )
}
export default IntegreatedIcon;