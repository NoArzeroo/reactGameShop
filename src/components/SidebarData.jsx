import React, { Component } from 'react';
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as IoIcons from 'react-icons/io'

export const SidebarData =[
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome/>,
        cName:'nav-text'
    },
    {
        title: 'Videos',
        path: '/videos',
        icon: <AiIcons.AiFillVideoCamera/>,
        cName:'nav-text'
    },
    {
        title: 'Photos',
        path: '/photos',
        icon: <FaIcons.FaPhotoVideo/>,
        cName:'nav-text'
    },
    {
        title: 'Shop',
        path: '/shop',
        icon: <AiIcons.AiFillShop/>,
        cName:'nav-text'
    },
    {
        title: 'Support',
        path: '/support',
        icon: <IoIcons.IoMdHelpCircle/>,
        cName:'nav-text'
    },
]