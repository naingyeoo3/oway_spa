import React, { Component } from 'react';

class ImageComponent extends Component {
    render() {
        return (
            <div>
                <img src={require(this.props.img_path)} />            
            </div>
        );
    }
}

export default ImageComponent;