import React, { useState } from 'react';
import * as FaIcons from "react-icons/fa"
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import './navbar.css'
import { IconContext } from 'react-icons'
import { Link } from 'react-router-dom'
import LoginForm from './auth/LoginForm'
import { Router, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/auth'
import 'semantic-ui-css/semantic.min.css'

class Navbar extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            sidebar: false
        }
    }
    

    setSidebar = () => {
        this.setState({sidebar: !this.state.sidebar})
    }

    showSidebar = () => {
        this.setSidebar()
    }



    render() {
        const { user, isAuthenticated } = this.props.auth
        const greetings = " Hello, "
        const userLinks = (
            <div className="guest-button">
                <span>{ greetings }</span>
                <div className='ui simple dropdown item'>
                    {user? user.username: ' '}
                    <i className="dropdown icon"/>
                    <div style={{paddingTop:2}}className='menu'>
                        <Link to='/order' className='item'>
                                My order
                        </Link>
                        <a onClick={this.props.logout} className='item'>
                            Logout
                        </a>
                    </div>
                    <div>
                        
                    </div>    
                </div>
            </div>
        )

        const guestLinks = (
            <div className="guest-button">
                <span>
                    <Link className="link-sign" to='/register'>
                        Sign Up 
                    </Link>
                </span>
                <span className="button-login">
                    <Link className="link-sign" to='/login'>
                        Login
                    </Link>
                    
                </span>
            </div>
        )

       return (
        <>
        <IconContext.Provider value={{ color:'fff' }}>
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={this.showSidebar}/>
                </Link>
                    {isAuthenticated ? userLinks: guestLinks}
            </div>
                <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={this.showSidebar}>
                        <li className="nav-bar-toggle">
                            <Link to="#" className='menu-bars'>
                                <AiIcons.AiOutlineClose />
                            </Link>
                        </li>
                        {SidebarData.map((item, index) => {
                            return (
                                <li key={index} className ={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span className="item-title">{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
        </IconContext.Provider>
        </>
       )
       
                    }
}


const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(
    mapStateToProps,
    { logout }
)(Navbar)