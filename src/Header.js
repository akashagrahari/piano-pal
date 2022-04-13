import React from 'react';
import {
    Navbar,
    Container,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';

function Header(props) {
    const navigate = useNavigate();

    async function logout() {
        try {
            await Auth.signOut({ global: true });
            sessionStorage.clear();
            props.updateSignedIn(false);
            navigate('/');
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        < Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container fluid>
                <Navbar.Brand href="/">Piano Pal</Navbar.Brand>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
                    {
                        props.signedIn ?
                            <div>
                                <Navbar.Brand>{props.getToken()}</Navbar.Brand>
                                <Button variant="outline-light header-button" onClick={logout}>Sign out </Button>
                            </div> :
                            <div>
                                <Button variant="outline-light header-button" href='/sign-in'>Sign in </Button>
                                <Button variant="outline-light header-button" href='/sign-up'>Sign up</Button>
                            </div>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header;