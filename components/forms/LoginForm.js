import React from 'react';
import Router from 'next/router';
import FormField from './FormField';
import store from '../../services/store';

class LoginForm extends React.Component {
    state = {
        email: '',
        password: ''
    };

    handleFieldCange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        const { email, password } = this.state;
        const credentials = { email, password };
        store.dispatch({ type: 'login', credentials })
            .then((res) => {
                if (res.errors) {
                    throw res.errors;
                }
                Router.push('/');
            }).catch(alert);
    };

    render() {
        return (
            <div>
                <div className="p-form--group">
                    <FormField type="email" name="email" label="Email" onChange={this.handleFieldCange} />
                </div>
                <div className="p-form--group">
                    <FormField type="password" name="password" label="Password" onChange={this.handleFieldCange} />
                </div>
                <button type='submit' className="p-button" onClick={this.handleSubmit}>Log in</button>
            </div>
        );
    }
}

export default LoginForm;
