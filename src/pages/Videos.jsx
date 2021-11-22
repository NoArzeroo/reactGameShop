import React from 'react';
import VideoCarousel from '../components/video';
import "./Video.css"

class Videos extends React.Component {
    render() { 
        return (
            <div className="video-bg">
                <h1 className="text-white text-uppercase text-center my-4">
                    Welcome to  G-theater</h1>
                <VideoCarousel/>
            </div>
        )
    }
}
 
export default Videos;