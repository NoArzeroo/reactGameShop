import React, { useState } from 'react';
import PhotoItem from '../components/photoItem';
import "./Photos.css"

class Photos extends React.Component {

    render() { 
        return (
            <div className="pg-bg">
                <h1>Wallpaper Space</h1>
                <PhotoItem />
            </div>
        )
    }
}
 
export default Photos;


  
  