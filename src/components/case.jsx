import React, { Component, useState } from 'react';
import { Button, Modal, Form, } from "react-bootstrap"

class Case extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeItem: this.props.activeItem,
            show: this.props.show
        }
    }


    handleChange = (event) => {
        let { name, value } = event.target
        const activeItem = { ...this.state.activeItem, [name]: value }
        this.setState({ activeItem })
    }

    setShow = (status) => {
        return this.setState({show: status})
    }

    render() {
        const { toggle, onSave } = this.props
        const handleClose = () => this.setShow(false)
    
        return (
            <Modal show={this.state.show}
                   onExit={toggle} 
                   onHide={handleClose}
                   //backdrop="static"
                   keyboard={false}>
                <Modal.Header closeButton>Case</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="title"
                                          defaultValue={this.state.activeItem.title}
                                          name="title"
                                          as="input"
                                          onChange={this.handleChange}
                                          placeholder="Enter title here"/>
                            
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >Email</Form.Label>
                            <Form.Control type="email"
                                          defaultValue={this.state.activeItem.email}
                                          name="email"
                                          as="input"
                                          onChange={this.handleChange}
                                          placeholder="Enter email here"/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >Description</Form.Label>
                            <Form.Control type="text"
                                          name="description"
                                          as="textarea"
                                          onChange={this.handleChange}
                                          defaultValue={this.state.activeItem.description}
                                          placeholder="Enter description here"/>
                        </Form.Group> 
                        <Form.Group>
                            <Form.Label >Response</Form.Label>
                            <Form.Control plaintext
                                          readOnly
                                          defaultValue={this.state.activeItem.response}/>
                        </Form.Group>    
                    </Form>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button color="success"
                                onClick={() => onSave(this.state.activeItem)}
                                >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        )
    }
}
 
export default Case;