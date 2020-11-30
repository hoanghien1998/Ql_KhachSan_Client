import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import About from './About'
import Restaurant from './Restaurant'
import Room from './Room'
export default class Dieuhuong extends Component {
    render() {
        return (
            
            <Switch>
                <Route exact path="/rooms" component={Room}/>
                <Route exact path="/restaurant" component={Restaurant}/>
                <Route exact path="/about" component={About}/>
                {/* <Route exact path="/sanpham/:id/:slug" component={ChiTiet}/>
                <Route component={Baoloi}></Route> */}
            </Switch>
            
        )
    }
}
