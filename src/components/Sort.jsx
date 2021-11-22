import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Sort.css'
class Sort extends React.Component {
    constructor(props) {
        super(props)
    }

    render() { 
        const { sortByName, sortByPrice, sortByLikes } = this.props
        return (
            <span className="sort-bar">
                <a onClick={() => sortByName()} > Sort by Name | </a>
                <a onClick={() => sortByPrice()}> Sort by Price | </a>
                <a onClick={() => sortByLikes()}> Sort by Likes </a>
            </span>
            
        )
    }
}
 
export default Sort