import axios from 'axios';
import React, { Component } from 'react';
import { tokenConfig } from '../actions/auth';
import OrderView from './OrderView'
class Order extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            viewCompleted: false,
            orderList : [],
            orderOpen: false,
            activeItem: {
                orderNumber: "",
                itemTitle: "",
                address: "",
                price: "",
                completed: false,
            },
        }
    }

    componentDidMount() {
        this.getOrderList()
    }


    getOrderList = (getState) => {
        axios
            .get('/api/order/', tokenConfig(getState))
            .then((res) => this.setState({ orderList:res.data }))
            .catch((err) => console.log(err))
    }

    toggle = () => {
        this.setState({ orderOpen: !this.state.orderOpen })
    }

    handleSubmit = (item, getState) => {       
        this.toggle()
        if (item.id) {
            axios
                .put(`/api/order/${item.id}/`, item, tokenConfig(getState))
                .then((res) => this.getOrderList(getState))
                .catch((err) => console.log(err))
            return
        }
        axios
            .post("/api/order/", item, tokenConfig(getState))
            .then((res) => this.getOrderList(getState))
            .catch((err) => console.log(err))
        return

    }

    editItem = (item) => {
        this.setState({ activeItem: item, orderOpen: !this.state.orderOpen})
        
    }

    displayCompleted = (status) => {
        if (status) {
            return this.setState({ viewCompleted:true })
        }
        return this.setState({ viewCompleted:false })
    }

    renderTabList = () => {
        return(
            <div className="nav nav-tabs">
                <span 
                    style={{marginRight:3, fontFamily:'arial'}}
                    onClick={() => this.displayCompleted(true)}
                    className={this.state.viewCompleted ? "nav-link active" : "nav-link"}>
                    Complete
                </span>
                <span
                    style={{fontFamily:'arial'}} 
                    onClick={() => this.displayCompleted(false)}
                    className={this.state.viewCompleted ? "nav-link" : "nav-link active"}>
                    Incomplete
                </span>
            </div>
        )
    }

    renderItems = () => {
        const { viewCompleted } = this.state
        const newItems = this.state.orderList.filter(
            (item) => item.completed === viewCompleted
        )

        return newItems.map((item) => (
            <li key={item.id}
                className="list-group-item d-flex justify-content-between 
                            align-items-center">
                <span style={{fontFamily:'arial'}}>
                    {item.orderNumber} 
                </span>
                <span>
                    {item.itemTitle}
                </span>
                <span>
                    <button style={{margin:5, fontFamily:'arial'}}
                            className="btn btn-secondary mr-2"
                            onClick={() => {this.editItem(item)}}>
                        Edit Address / Make Payment
                    </button>
                </span>
            </li>
        ))
    }


    render() { 
        return (
            <div className="pg-bg">
            <main className="container">
                <h1 className="text-white text-uppercase text-center my-4">
                    Order List</h1>
                <div className="support">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div classNmae="card p-3">
                            {this.renderTabList()}
                            <ul className="list-group list-groupflush border-top-0">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.orderOpen ? (
                    <OrderView
                        activeItem={this.state.activeItem}
                        show={this.state.orderOpen}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}/>
                ) : null}
            </main>
            </div>
        )
    }
}
 
export default Order;