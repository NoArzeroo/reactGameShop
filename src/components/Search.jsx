import React, { useState } from 'react';
import Item from './item'
import { Container, Row, Col } from 'react-bootstrap'
import { Input } from 'semantic-ui-react'
import Sort from './Sort'
function Search({ content, 
                  getItemList, 
                  likeClick,
                  sortByName,
                  sortByPrice,
                  sortByLikes }) {
    const [searchObject, setSearchObject] = useState("")

   

    const filteredItems = content.filter(
        (item) => {
            if (searchObject === "") {
                return item
            } else if (item.title.toString()
                                 .toLowerCase()
                                 .includes(searchObject.toString()
                                                       .toLowerCase())) 
            return item 
            
        }
    )

    const checkItem = (item) => {
        console.log(item)
    }

    const handleChange = e => {
        setSearchObject(e.target.value)
    }

    return (
            <section>
                <div style={{marginBottom:10}}>
                <span>
                <Input className="input-search"
                       type="search"
                       placeholder="Search your game here"
                       onChange={handleChange}/>
                
                <Sort sortByName={sortByName}
                      sortByPrice={sortByPrice}
                      sortByLikes={sortByLikes}/>
                </span>
                </div>
                <div className='itemCard'>
                <Container fluid>
                    <Row xs={1} md={5}>
                    {filteredItems.map((item) =>
                        <Col> 
                            <div key={item.id}>
                                <Item list={item}
                                      getItemList={getItemList}
                                      likeClick={likeClick}/>
                            </div>
                        </Col>
                    )} 
                    </Row>
                </Container>
                </div>
            </section>
    )
}

export default Search