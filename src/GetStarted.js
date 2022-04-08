import React, { useEffect } from 'react';
import {
    Form,
    Button,
    Container,
} from 'react-bootstrap'
import { Auth, Hub } from 'aws-amplify';

const initialFormState = {
    username: '',
    password: '',
    email: '',
    authCode: '',
    formType: '',
};

class GetStarted extends React.Component {

    constructor(props) {
        super(props);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.confirmSignUp = this.confirmSignUp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            formState: initialFormState
        };
        this.state.formState.formType = props.formType;
    }

    onChange(e) {
        e.persist();
        // console.log(e.target.name);
        // console.log(e.target.value);
        this.setState({ formState: { ...this.state.formState, [e.target.name]: e.target.value } });
        // console.log(this.state.formState);
    }

    async signUp(e) {
        e.preventDefault();
        const { username, email, password } = this.state.formState;
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email
                }
            });
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error.message);
        }
        // await Auth.signUp({ username, password, attributes: { email } });
        this.setState({ formState: { ...this.state.formState, formType: "confirmSignUp" } });
    }

    async confirmSignUp(e) {
        e.preventDefault();
        const { username, authCode } = this.state.formState;
        try {
            const { user } = await Auth.confirmSignUp(username, authCode);
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error.message);
        }

        this.setState({ formState: { ...this.state.formState, formType: "signIn" } });
    }

    async signIn(e) {
        e.preventDefault();
        const { username, password } = this.state.formState;
        try {
            const { user } = await Auth.signIn(username, password);
            console.log(user);
        } catch (error) {
            console.log('error signing up:', error.message);
        }

        this.setState({ formState: { ...this.state.formState, formType: "signedIn" } });
    }

    render() {
        return (
            <div >
                <Container fluid className='jumbotron heading'>
                    <div className='container-fluid '>
                        {
                            this.state.formState.formType === 'signUp' && (
                                <Form className='form-get-started' onSubmit={this.signUp}>
                                    <h1 className="jumbotron-heading">Sign Up</h1>
                                    <Form.Group className="mb-3" controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" placeholder="Username" name="username" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Email" name="email" onChange={this.onChange} />
                                    </Form.Group>
                                    <Button variant="outline-light sign-in-up" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            )
                        }
                        {
                            this.state.formState.formType === 'signIn' && (
                                <Form className='form-get-started' onSubmit={this.signIn}>
                                    <h1 className="jumbotron-heading">Sign In</h1>
                                    <Form.Group className="mb-3" controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" placeholder="Username" name="username" onChange={this.onChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password" onChange={this.onChange} />
                                    </Form.Group>
                                    <Button variant="outline-light sign-in-up" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            )
                        }
                        {
                            this.state.formState.formType === 'confirmSignUp' && (
                                <Form className='form-get-started' onSubmit={this.confirmSignUp}>
                                    <h1 className="jumbotron-heading">Confirm Sign Up</h1>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Auth Code</Form.Label>
                                        <Form.Control type="password" placeholder="Confirmation Code" name="authCode" onChange={this.onChange} />
                                    </Form.Group>
                                    <Button variant="outline-light sign-in-up" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            )
                        }
                        {
                            this.state.formState.formType === 'signedIn' && (
                                <h1> Hello {this.state.formState.username}! </h1>
                            )
                        }
                    </div>
                </Container>
            </div>
        )
    }
}

export default GetStarted;