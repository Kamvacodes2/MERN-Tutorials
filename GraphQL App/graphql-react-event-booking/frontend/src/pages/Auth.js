import React, { Component } from 'react';
import './Auth.css';
import AuthContext from '../context/auth-context';


class AuthPage extends Component {

    state = {
        isLogin: true
    }

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    switchModeHandler = () => {
        this.setState(prevState => {
            return { isLogin: !prevState.isLogin };
        })
    }

    submitHandler = (e) => {
        e.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        let requestBody = {
            query: `
                query Login($email: String!, $password: String!) {
                    login(email: $email, password: $password){
                        userId
                        token
                        tokenExpiration
                    }
                }
            `,
            variables: {
                email: email,
                password: password
            }
        };

        if (!this.state.isLogin) {
            requestBody = {
                query: `
                    mutation CreateUser($email: String!,  $password: String!){
                        createUser(userInput: {email: $email, password: $password}) {
                            _id
                            email
                        }
                    }
                `,
                variables: {
                    email: email,
                    password: password
                }
            };
        }

        fetch('http://localhost:8000/graphiql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        }).then(resData => {
            if (resData.data.login.token) {
                this.context.login(resData.data.login.token,
                    resData.data.login.userId,
                    resData.data.login.tokenExpiration);
            }

        })
            .catch(err => {
                console.log(err);
                alert('This user already exists, switch to login!')
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
                    <button type='button' onClick={this.switchModeHandler}>Switch to {this.state.isLogin ? 'Sign Up' : 'Login'}</button>
                </div>
            </form>
        );
    }
}

export default AuthPage;


// fetch('http://localhost:8000/graphiql', {
//     method: 'POST',
//     body: JSON.stringify(requestBody),
//     headers: {
//         'Content-Type': 'application/json'
//     }
// })
// .then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok ' + response.statusText);
//     }
//     return response.json();
// })
// .then(data => {
//     console.log(data);
// })
// .catch(error => {
//     console.error('There was a problem with the fetch operation:', error);
// });
