import React, { Component } from 'react';
import './styles.scss';

class SortableComponent extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const { sortItems } = this.props;
        return (
            <div className="sorting-list">
                {
                    sortItems.map((item,index) => (
                        <p key={index} onClick={()=> this.props.callbackParent(item.keyword)}>{item.name}</p>
                    ))
                    
                }
            </div>
        );
    }
}

export default SortableComponent;