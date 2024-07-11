import React, { Component } from 'react';
import './Auth.css';

class AuthPage extends Component {
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    submitHandler = (e) => {
        e.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        const requestBody = {
            query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}) {
                        _id
                        email
                    }
                }
            `
        };

        fetch('http://localhost:8000/graphiql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }

    render() {
        return (
            <form className='auth-form' onSubmit={this.submitHandler}>
                <div className='form-control'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' ref={this.emailEl}></input>
                </div>
                <div className='form-control'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' ref={this.passwordEl}></input>
                </div>
                <div className='form-actions'>
                    <button type='submit'>Submit</button>
                    <button type='button'>Switch to Sign Up</button>
                </div>
            </form>
        );
    }
}

export default AuthPage;
