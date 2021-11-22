import React, { Component, useState } from 'react';
import { Button, Modal, Form, } from "react-bootstrap"
import QRCode from 'react-qr-code'
import './OrderView.css'

class OrderView extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            activeItem: this.props.activeItem,
            show: this.props.show,
            qrCode: false,
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

    makePayment = () => {
        this.setState({ qrCode: !this.state.qrCode })
    }

    render() {
        const { toggle, onSave } = this.props
        const handleClose = () => this.setShow(false)
    
        return (
            <Modal show={this.state.show}
                   onExit={toggle} 
                   onHide={handleClose}
                   keyboard={false}>
                <Modal.Header closeButton>Case</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Order Number</Form.Label>
                            <Form.Control plaintext
                                          readOnly
                                          defaultValue={this.state.activeItem.orderNumber}
                                          name="Order Number"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Item</Form.Label>
                            <Form.Control plaintext
                                          readOnly
                                          defaultValue={this.state.activeItem.itemTitle}
                                          name="itemTitle"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >Address</Form.Label>
                            <Form.Control type="address"
                                          defaultValue={this.state.activeItem.address}
                                          name="address"
                                          as="input"
                                          onChange={this.handleChange}
                                          placeholder="Enter Address here"/>
                            <Form.Text className="text-muted">
                                We'll never share your information with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label >Price</Form.Label>
                            <Form.Control type="text"
                                          name="description"
                                          as="textarea"
                                          plaintext
                                          readOnly
                                          defaultValue={this.state.activeItem.price}/>
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
                        <Button variant="success"
                                onClick={() => this.makePayment()}>
                            Make payment
                        </Button>
                        <div className="qrcode">
                        {this.state.qrCode ? (
                            <QRCode value={this.state.activeItem.price}/>
                        ) : null}
                        </div>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        )
    }
}
 
export default OrderView;