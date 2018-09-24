import { Component } from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import FormField from './FormField';
import style from '../../style';
import { titelize } from '../../utils';

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
        this.setState({ isEditable: false });
        Router.push(this.props.stubRedirect);
    }

    render() {
        const placeholder = this.props.placeholder || titelize(this.props.name);
        return (
            <div>
                { this.state.isEditable ? <FormField type="text" name={this.props.name} placeholder={placeholder} autoFocus/> : null}
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
    name: PropTypes.string.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    stubRedirect: PropTypes.string
};

export default InlineCreate;
