import React, { useEffect, useState } from 'react';
import {
    Form,
    Button,
    Container,
} from 'react-bootstrap'
import { Auth, Hub } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
    username: '',
    password: '',
    email: '',
    authCode: '',
    formType: '',
};

function GetStarted(props) {
    const navigate = useNavigate();
    initialFormState.formType = props.formType;
    const [formState, updateFormState] = useState(initialFormState);

    useEffect(() => {
        if (props.getToken()) {
            navigate('/main');
        }
    });

    function onChange(e) {
        e.persist();
        updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
    }
    const { formType } = formState;

    async function signUp(e) {
        e.preventDefault();
        const { username, email, password } = formState;
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                }
            });
            console.log("User: ", user);
            updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
        } catch (error) {
            console.log('error signing up:', error.message);
            alert(error.message);
        }
    }

    async function confirmSignUp(e) {
        e.preventDefault();
        const { username, authCode } = formState;
        try {
            const { user } = await Auth.confirmSignUp(username, authCode);
            console.log("User: ", user);
            updateFormState(() => ({ ...formState, formType: "signIn" }));
        } catch (error) {
            console.log('error signing up:', error.message);
            alert(error.message);
        }
    }

    async function signIn(e) {
        e.preventDefault();
        const { username, password } = formState;
        try {
            const { user } = await Auth.signIn(username, password);
            console.log("User: ", user);
            props.updateSignedIn(true);
            props.setToken(username);
            navigate('/main');
            // updateFormState(() => ({ ...formState, formType: "signedIn" }));
        } catch (error) {
            console.log('error signing up:', error.message);
            alert(error.message);
        }
    }

    return (
        <div >
            <Container fluid className='jumbotron heading'>

                <div className='container-fluid '>
                    {
                        formState.formType === 'signUp' && (
                            <Form className='form-get-started' onSubmit={signUp}>
                                <h1 className="jumbotron-heading">Sign Up</h1>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="username" placeholder="Username" name="username" onChange={onChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Email" name="email" onChange={onChange} />
                                </Form.Group>
                                <Button variant="outline-light sign-in-up" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )
                    }
                    {
                        formState.formType === 'signIn' && (
                            <Form className='form-get-started' onSubmit={signIn}>
                                <h1 className="jumbotron-heading">Sign In</h1>
                                <Form.Group className="mb-3" controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="username" placeholder="Username" name="username" onChange={onChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" onChange={onChange} />
                                </Form.Group>
                                <Button variant="outline-light sign-in-up" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )
                    }
                    {
                        formState.formType === 'confirmSignUp' && (
                            <Form className='form-get-started' onSubmit={confirmSignUp}>
                                <h1 className="jumbotron-heading">Confirm Sign Up</h1>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Auth Code</Form.Label>
                                    <Form.Control type="password" placeholder="Confirmation Code" name="authCode" onChange={onChange} />
                                </Form.Group>
                                <Button variant="outline-light sign-in-up" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )
                    }
                </div>
            </Container>
        </div>
    )
}


export default GetStarted;