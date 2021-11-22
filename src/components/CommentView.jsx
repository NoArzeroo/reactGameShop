import React, { Component } from 'react';
import { Button, Modal, Form, } from "react-bootstrap"


class CommentView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            commentList: this.props.commentList,
            show: this.props.show,
            activeItem:{
                content:"",
                itemId:this.props.itemId
            }
        }
    }

    setShow = (status) => {
        return this.setState({show: status})
    }

    handleChange = (event) => {
        let { name, value } = event.target
        const activeItem = { ...this.state.activeItem, [name]: value }
        this.setState({ activeItem: activeItem })
    }

    renderItems = () => {
        const items = this.state.commentList

        return items.map((item) => (
            <li key={item.id}
                className="list-group-item d-flex justify-content-between 
                            align-items-center">
                <span style={{fontFamily:'arial'}}>
                    {item.content}
                </span>
                
            </li>
        ))
    }

    render() { 
        const { toggle, onSave } = this.props
        const handleClose = () => this.setShow(false)
        return (
            <Modal show={this.state.show}
                   onExit={toggle}
                   onHide={handleClose}
                   keyboard={false}>
                <Modal.Header closeButton>Comment</Modal.Header>
                <Modal.Body>
                <ul className="list-group list-groupflush border-top-0">
                                {this.renderItems()}
                </ul>
                <div>
                <Form.Group>
                    <Form.Label >Description</Form.Label>
                    <Form.Control type="text"
                                  name="content"
                                  as="textarea"
                                  onChange={this.handleChange}
                                  defaultValue={this.state.activeItem.content}
                                  placeholder="Enter description here"/>
                </Form.Group> 
                </div>
                <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button color="success"
                                onClick={() => onSave(this.state.activeItem)}
                                >
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
            
        );
    }
}
 
export default CommentView;