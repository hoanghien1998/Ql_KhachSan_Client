import React from "react";
import Room from "./Room";
// import Restaurant from './Restaurant';
import About from "./About";
import Contact from "./Contact";

function Home(props) {
    return (
        <>
            <Room
                token={props.token}
                handleAddToCart={(e) => props.handleAddToCart(e)}
            />
            <About />
            <Contact />
        </>
    );
}

export default Home;
