import React from 'react';
import FormField from './FormField';
import store from '../../services/store';

class RequestMagicLinkForm extends React.Component {
    state = {
        email: ''
    };

    handleFieldCange = (event) => {
        const { value, name } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = () => {
        const { email } = this.state;
        store.dispatch({ type: 'sendmagiclink', userdata: { email } })
            .then((res) => {
                if (res.errors) {
                    throw res.errors;
                }
                alert(res.message);
            }).catch(alert);
    };

    render() {
        return (
            <div>
                <div className="p-form--group">
                    <FormField type="email" name="email" label="Email" onChange={this.handleFieldCange} />
                </div>
                <button type='submit' className="p-button" onClick={this.handleSubmit}>Send Magic Link</button>
            </div>
        );
    }
}

export default RequestMagicLinkForm;
