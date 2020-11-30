import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Menu extends Component {
    render() {
        const dd={
            marginLeft:'50px',
            color:'white',
            textDecoration:'none',
            
        }
        
        return (
            <div style={{backgroundColor:'#d6c170',color:'whlite',width:'100%'}}>
                <Link to="/" style={{ marginLeft:'100px',color:'white',textDecoration:'none',fontSize:'20pt'}}>Roxandrea</Link>
                <Link to="/home" style={{marginLeft:'350px', color:'white',textDecoration:'none'}}>Home</Link>
                <Link to="/bookroom" style={dd}>BookRoom</Link>
                <Link to="/rooms" style={dd}>Rooms</Link>
                <Link to="/restaurant" style={dd}>Restaurant</Link>
                <Link to="/about" style={dd}>About</Link>
                <Link to="/contact" style={dd}>Contact</Link>
            </div>
        )
    }
}
