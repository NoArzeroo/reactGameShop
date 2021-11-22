import React, { Component } from 'react';
import mario from "../img/mario.jpeg";
import xbox from "../img/xbox-controller.png";
import ps5 from "../img/PS5-Logo.jpg"
import "./Home.css"
import { Button } from 'react-bootstrap';
class Home extends Component {
    render() {
        return(
            <div className="bg-home">
                <div>
                    <img src={mario} alt="marios"/>
                    <p className="nintendo">Pre-order digitally now–Play at launch
                        <span>
                            <Button variant="danger"
                                    className="ns-button"
                                    onClick={() => window.open("https://marioparty.nintendo.com/")}>
                                Learn More &gt;
                            </Button>
                        </span>
                    </p>
                </div>
                <div>
                    <img src={xbox} alt="xbox-controller"/>
                    <span className="xbox">Improve your game experience with the 2.0 Xbox Controller
                        <Button variant="success" 
                                className="xbox-button"
                                onClick={()=> window.open("https://www.xbox.com/en-US/accessories/controllers/xbox-wireless-controller")}>
                            Learn More 
                        </Button>
                    </span>
                </div>
                <div>
                    <h4 className="ps-header">PlayStation 5 Console</h4>
                    <p className="playstation">
                        Experience an all-new generation of incredible PlayStation games.
                    </p>
                    <Button variant="primary"
                            className="ps-button"
                            onClick={() => window.open("https://www.playstation.com/en-us/ps5/")}>
                        Learn More 
                    </Button>
                    <div>
                        <img src={ps5} alt="playstation 5" className="ps5-photo"/>
                    </div>                    
                </div>       
            </div>             
        )
    }
}

export default Home