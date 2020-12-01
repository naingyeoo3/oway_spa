import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';

import './tour-detail-image.scss';

const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
  ];

class TourDetailImage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount(){
      this.loadImages()
    }
    loadImages(){
      const { images } = this.props;
      var new_images = [];
      if(images != null && images.length > 0){
        images.map( img => {
          new_images.push({
            original: img.path,
            thumbnail: img.path,
          })
        })
      }
      return new_images;
    }
    render() {       
        return (
            <div>
                <ImageGallery 
                    items={this.loadImages()} 
                    thumbnailPosition="right"
                    showPlayButton={false}
                    showFullscreenButton={false}
                />
            </div>
        );
    }
}
 
export default TourDetailImage;