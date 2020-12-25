import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel'

export default class Slider extends Component {
    render() {
        return (
            
            <Carousel width="100%">
                <Carousel.Item>
                    <img src="/images/bg_1.jpg" alt="First slide" width="100%" height="450px"/>
                    <Carousel.Caption>
                    <h3 style={{color:'white'}}>Roxandrea </h3>
                    <p style={{color:'white'}}>More than a hotel... an experience </p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img src="/images/bg_2.jpg" alt="First slide" width="100%" height="450px"/>
                    <Carousel.Caption>
                    <h3 style={{color:'white'}}>Experience Epic Beauty</h3>
                    <p style={{color:'white'}}>Roxandrea Hotel &amp; Resort </p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img src="/images/bg_3.jpg" alt="First slide" width="100%" height="450px"/>
                    <Carousel.Caption>
                    <h3 style={{color:'#FFCC00'}}>Amenities</h3>
                    <p style={{color:'#FFCC00'}}>Even the all-powerful Pointing </p>
                    </Carousel.Caption>
                </Carousel.Item>

            </Carousel>
            
        )
    }
}
