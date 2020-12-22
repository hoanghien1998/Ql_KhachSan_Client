import React, { Component } from 'react'
import Room from './Room';
// import Restaurant from './Restaurant';
import About from './About';
import Contact from './Contact'
import Slider from "./Slider";


export default class Home extends Component {
    render() {
        return (
            <div>

                <Room/> 
                {/* <Restaurant/> */}
                <About/>
                <Contact/>
            </div>
        )
    }
}
