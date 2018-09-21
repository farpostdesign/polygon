import { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import FormField from './FormField';
import style from '../../style';

class InlineCreate extends Component {
    constructor() {
        super();
        this.state = { isEditable: false };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    handleEditClick() {
        this.setState({ isEditable: true });
    }

    handleSaveClick() {
        Router.push('/projects?id=100');
    }

    render() {
        return (
            <div>
                { this.state.isEditable ? <FormField type="text" name="name" /> : null}
                {
                    this.state.isEditable
                        ? <button onClick={this.handleSaveClick} style={style.BUTTON}>Create</button>
                        : <button onClick={this.handleEditClick} style={style.BUTTON}>{this.props.text}</button>
                }

            </div>
        );
    }
}

InlineCreate.defaultProps = {
    text: 'Add'
};

InlineCreate.propTypes = {
    text: PropTypes.string
};

export default InlineCreate;
