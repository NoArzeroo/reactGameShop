import axios from 'axios';
import React, { Component } from 'react';
import { render } from'react-dom'
import { Card, Container, Row, Col } from 'react-bootstrap';
import "./photoItem.css"
import { ResponsiveGallery } from 'react-responsive-gallery'
import ReactDOM  from 'react-dom';
class PhotoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            photoList:[]
        }
    }

    componentDidMount(){
        this.getPhoto()
    }

    getPhoto = () => {
        axios
            .get('api/photo/')
            .then((res) => this.setState({ photoList: res.data }))
            .catch((err) => console.log(err))
    }

    render() { 
        const itemList = this.state.photoList
        return (
                <div className="photoCard">
                    <Container fluid >
                    <Row xs='auto'>
                    {itemList.map((item) => (
                        <Col xs='auto'>
                        <Card style={{ width: '20rem' }}
                            border="dark">
                            <Card.Img varirant="top"
                                    className="photo-card"  
                                    src={ item.url }
                                    onClick={()=> window.open(item.url)}
                                    />
                        </Card>
                        </Col>
                    ))}
                    </Row>
                    </Container>  
                </div>
        )
    }
}

 
export default PhotoItem;