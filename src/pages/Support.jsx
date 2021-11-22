import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css"
import Case from "../components/case"
import axios from 'axios'
import { tokenConfig } from '../actions/auth';
import { Container } from 'semantic-ui-react'
import './Support.css'

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";


class Support extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            viewCompleted: false,
            supportList : [],
            caseOpen: false,
            activeItem: {
                title: "",
                email: "",
                description: "",
                response: "",
                completed: false,
            },
        }
    }
    
    componentDidMount() {
        this.getSupports()
    }
    
    getSupports = (getState) => {
        axios
            .get('/api/support/', tokenConfig(getState))
            .then((res) => this.setState({ supportList: res.data }))
            .catch((err) => console.log(err))
    }

    refreshList = () => {
        axios
            .get("/api/support/")
            .then((res) => this.setState({ supportList:res.data }))
            .catch((err) => console.log(err))
    }

    toggle = () => {
        this.setState({ caseOpen: !this.state.caseOpen })
    }

    handleSubmit = (item, getState) => {       
        this.toggle()
        if (item.id) {
            axios
                .put(`/api/support/${item.id}/`, item, tokenConfig(getState))
                .then((res) => this.getSupports(getState))
                .catch((err) => console.log(err))
            return
        }
        axios
            .post("/api/support/", item, tokenConfig(getState))
            .then((res) => this.getSupports(getState))
            .catch((err) => console.log(err))
        return
        
    }

    handleDelete = (item, getState) => {
        alert("You have deleted one case!")
        axios
            .delete(`/api/support/${item.id}/`, tokenConfig(getState))
            .then((res) => this.getSupports(getState))
            .catch((err) => console.log(err))
            
    }

    createItem = () => {
        
        const item = { title: "", email: "", description: "", response: "", completed:false}
        
        this.setState({ activeItem: item, caseOpen: !this.state.caseOpen })
        
    }

    editItem = (item) => {
        this.setState({ activeItem: item, caseOpen: !this.state.caseOpen})
        
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
        const newItems = this.state.supportList.filter(
            (item) => item.completed === viewCompleted
        )

        return newItems.map((item) => (
            <li key={item.id}
                className="list-group-item d-flex justify-content-between 
                            align-items-center">
                <span style={{fontFamily:'arial'}}
                    title={item.description}>
                    {item.title}
                </span>
                <span>
                    <button style={{margin:5, fontFamily:'arial'}}
                            className="btn btn-secondary mr-2"
                            onClick={() => {this.editItem(item)}}>
                        Edit
                    </button>
                    <button className="btn btn-danger"
                            onClick={() => {this.handleDelete(item)}}>
                        Delete
                    </button>
                </span>
            </li>
        ))
    }


    render() { 
        return (
            <div className="bg-photo">
            <main className="container">
                <h1 className="text-white text-uppercase text-center my-4">
                    Support List</h1>
                <Container textAlign='center' className="help-text">Please Login to use support here</Container>
                <div className="support">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div classNmae="card p-3">
                            <div className="mb-4">
                                <button className="btn btn-primary"
                                        onClick={this.createItem}>
                                    Submit Case
                                </button>
                            </div>
                            {this.renderTabList()}
                            <ul className="list-group list-groupflush border-top-0">
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.caseOpen ? (
                    <Case
                        activeItem={this.state.activeItem}
                        show={this.state.caseOpen}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}/>
                ) : null}
            </main>
            </div>
        )
    }
}
 
export default Support;