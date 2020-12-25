import React from 'react'
import Room from './Room';
// import Restaurant from './Restaurant';
import About from './About';
import Contact from './Contact'


function Home(props) {
    return (
        <div>
            <Room />
            <About />
            <Contact />
        </div>
    )
}

export default Home;