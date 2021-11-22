import React, { Component } from 'react';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css';
import { Card, Container, Row } from 'react-bootstrap'
import './item.css'
import { Button } from 'react-bootstrap'
import { Col } from 'react-bootstrap'
import Search from './Search'
import { loadUser, tokenConfig } from '../actions/auth';
import store from '../store'
import { AiOutlineLike } from 'react-icons/ai'
import { VscComment } from 'react-icons/vsc'
import CommentView from './CommentView';

class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: this.props.list,
            commentList: [],
            commentViewOpen: false,
        }
    }

    componentDidMount() {
        this.getCommentList()
    }

    getCommentList = () => {
        axios
            .get(`/api/comment/?itemId=${this.state.list.id}`)
            .then((res) => {this.setState({ commentList: res.data })})
            .catch((err) => console.log(err))

    }

    toggleCommentView = () => {
        this.setState({ commentViewOpen: !this.state.commentViewOpen })
    }

    orderConfirm = (item, getState) => {
        if (store.getState().auth.isAuthenticated) {
            const orderNumber = Date.now() + Math.random()
            alert("Thank you for your order! Your order number is " + orderNumber)
            const submitOrder ={ orderNumber: orderNumber, 
                                 itemTitle: item.title,
                                 address: "", 
                                 price: item.price.toString(), 
                                 payment: false }
            axios
                .post("/api/order/", submitOrder, tokenConfig(getState))
                .catch((err) => console.log(err))
            console.log(this.state.commentList)
        }
        else {
            alert("You need to login to buy this item")
        }
        
    }

    handleCommentSubmit = (comment) => {
        if((store.getState().auth.isAuthenticated) ){
            this.toggleCommentView()
            if (comment.id) {
                axios
                    .put("/api/comment/", comment)
                    .then((res) => this.getCommentList())
                    .catch((err) => console.log(err))
                return
            }
            axios
                .post("/api/comment/", comment)
                .then((res) => this.getCommentList())
                .catch((err) => console.log(err))
            return
        }
        else alert("You have to login to submit comment")
    }
    

    render() { 
        const item = this.state.list
        return (
                <div key={item.id}>                
                    <div className='card-item'>
                    <Card  
                        bg='light'
                        style={{ width: '19rem' }}>
                        <Card.Img variant="top" 
                                    src={item.cover}
                                    className="shopItem-card"/>
                        <Card.Body>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Text>Price {item.price}</Card.Text>
                            <Card.Text>Quantity {item.quantity}</Card.Text>
                            <Button onClick={() => {this.orderConfirm(item)}}> Buy </Button>
                            <span className="like-button">
                                <AiOutlineLike onClick={() => this.props.likeClick(item)}
                                        style={{marginRight:2}}/>
                                    {item.likes}
                                <VscComment style={{paddingLeft:7,marginRight:3}}
                                            onClick={() => this.toggleCommentView()}/>
                                {this.state.commentList.length}
                                {this.state.commentViewOpen ? (
                                    <CommentView
                                        itemId={item.id}
                                        commentList={this.state.commentList}
                                        show={this.state.commentViewOpen}
                                        toggle={this.toggleCommentView}
                                        onSave={this.handleCommentSubmit}/>
                                 ): null}
                            </span>
                        </Card.Body>
                    </Card>
                    </div>
                </div>               
        )
    }
}

export default Item;