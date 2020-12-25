import React from 'react';
import { Col, Row, Container } from 'react-bootstrap'


function About(props) {
    const dd = {
        marginTop: '50px',
        borderRadius: '50px'
    }
    return (
        <div>
            <h1 style={{ textAlign: "center", marginTop: '50px', fontFamily: 'Playfair Display', fontStyle: 'italic' }}>About us</h1>
            <Container>
                <Row>
                    <Col md={6}>
                        <img src="images/about.jpg" alt="" width="400px" height="80%" style={dd} />
                    </Col>
                    <Col md={6}>
                        <h5 style={{ textAlign: "center", marginTop: '50px', color: '#bd9d1b' }}>Welcome to Roxandrea Hotel</h5>
                        <h2 style={{ textAlign: "center", marginTop: '10px' }}>Welcome To Our Hotel</h2>
                        <p>On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their.</p>
                        <p>When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About;