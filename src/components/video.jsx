import axios from 'axios';
import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import "./video.css"
class VideoCarousel extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            videoList:[]
        }
    }

    componentDidMount() {
        this.getVideo()
    }

    getVideo = () => {
        axios
            .get("api/video/")
            .then((res) => {this.setState({ videoList: res.data })})
            .catch((err) => console.log(err))
    }

    render() { 
        const playList = this.state.videoList
        return (
            <div className="carousel">
                <Carousel interval={null}>
                    {playList.map((item) => (
                        <Carousel.Item>
                            <video style = {{width:"80%"}} controls>
                                <source src={item.link} type="video/mp4"></source>
                            </video>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        )
    }
}
 
export default VideoCarousel;