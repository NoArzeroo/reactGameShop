import React, { Component } from 'react';
import './Shop.css'
import axios from 'axios';
import Search from '../components/Search'


class Shop extends Component{
    constructor(props) {
        super(props)
        this.state = {
            itemList: [],
            sortStatus: 0,
        }
    }

    componentDidMount(){
        this.getItemList() 
    }    

    getItemList = () => {
        axios
            .get("/api/itemsLists/")
            .then((res) => this.setState({ itemList: res.data }))
            .catch((err) => console.log(err))         
    }

    sortByName = () => {
        const list = this.state.itemList
        list.sort(function (a, b){
            if (a.title.toLowerCase() > b.title.toLowerCase())
                return 1
            if (a.title.toLowerCase() < b.title.toLowerCase())
                return -1
            return 0 
        })
        this.setState({ itemList: list, sortStatus: 1 })  
    }

    sortByPrice = () => {
        const list = this.state.itemList
        list.sort(function(a, b) {
            if (a.price > b.price)
                return 1
            if (a.price < b.price)
                return -1
            return 0
        })
        this.setState({ itemList:list, sortStatus: 2 })
    }

    sortByLikes = () => {
        const list = this.state.itemList
        list.sort(function(a, b) {
            if (a.likes > b.likes)
                return -1
            if (a.likes < b.likes)
                return 1
            return 0
        })
        this.setState({ itemList: list, sortStatus: 3 })
    }

    likeClick = (item) => {
        item.likes += 1
        const data = { "likes": item.likes}
        axios
            .patch(`/api/itemsLists/${item.id}/`, data)
            .catch((err) => console.log(err))
        
       switch (this.state.sortStatus) {
            case 1: 
                this.sortByName()
                break
            case 2: 
                this.sortByPrice()
                break
            case 3: 
                this.sortByLikes() 
                break
            default: 
                this.getItemList()
        } 
    }

    render() {
        return (
            <div>                     
            <div className='pg-bg'>
                <h1 className="text-white text-uppercase text-center my-4"> 
                    Welcom to G-Zone</h1>
                <div>
                    <Search content={this.state.itemList}
                            getItemList={this.getItemList}
                            likeClick={this.likeClick}
                            sortByName={this.sortByName}
                            sortByPrice={this.sortByPrice}
                            sortByLikes={this.sortByLikes}/>
                </div>
            </div>
            </div>
        )
    }
}

export default Shop