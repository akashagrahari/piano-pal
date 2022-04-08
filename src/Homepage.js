import React from 'react';
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
    NavLink,
} from 'react-bootstrap'
import pianobg from './images/piano2.png';
import {
    BiFileFind,
} from 'react-icons/bi'

import {
    BsUpload,
    BsMusicNoteBeamed,
} from 'react-icons/bs'

class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Container fluid className='jumbotron text-center heading'>
                    <div className='container-fluid '>
                        <h1 className="jumbotron-heading">Piano Pal</h1>
                        <h2 className=" text-muted">The free open source piano learning tool</h2>
                    </div>

                    {/* <p>
                    <link href="#" className=''="btn btn-primary my-2">Main call to action</a>
                    <link href="#" className=''="btn btn-secondary my-2">Secondary action</a>
                </p> */}
                </Container >
                <img src={pianobg} className='piano-img' alt='...' />
                <Container fluid className='jumbotron how-to'>
                    <div className='container-fluid '>
                        <div className='row'>
                            <div className='col-lg-4'>
                                <BiFileFind size={80} />
                                <div className='how-to-text'>
                                    <h4 className='text-muted'>Find a MIDI file from sources like <a href='https://freemidi.org/' target='_blank'>FreeMidi</a> </h4>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <BsUpload size={80} />
                                <div className='how-to-text'>
                                    <h4 className='text-muted'>Upload the midi file on Piano Pal </h4>
                                </div>
                            </div>
                            <div className='col-lg-4'>
                                <BsMusicNoteBeamed size={80} />
                                <div className='how-to-text'>
                                    <h4 className='text-muted'>Play along and learn the song </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
}

export default Homepage;