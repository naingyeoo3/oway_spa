import React, { Component } from 'react';
 
class FileUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleUpload(e){
        const files = e.target.files
        console.log(files[0].name);
        this.props.renderOnChange(files[0].name);
    }
    render() { 
        return (
            <div>
                <input type="file" onChange={(e)=> this.handleUpload(e)} />
                {/* <button type="button">ok</button> */}
            </div>
        );
    }
}
 
export default FileUpload;