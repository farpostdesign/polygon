import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';

class InlineEdit extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = null;
        this.saveButtonRef = null;

        this.state = { isEditable: false, object: props.object };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.setSaveButtonRef = this.setSaveButtonRef.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    setSaveButtonRef(node) {
        this.saveButtonRef = node;
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleEditClick() {
        this.setState({ isEditable: true });
    }

    handleInputChange(event) {
        const { value } = event.target;
        this.setState({ object: { [this.props.name]: value } });
    }

    handleSaveClick() {
        this.setState({ isEditable: false });
        this.props.handleSubmit(this.state.object);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && !this.saveButtonRef.contains(event.target)) {
            this.setState({ isEditable: false });
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.isEditable
                        ? <FormField type="text" name={this.props.name} ref={this.setWrapperRef} onChange={this.handleInputChange} value={this.state.object[this.props.name]} autoFocus/>
                        :  <span className="p-inline-editable">{this.state.object[this.props.name]}</span>
                }
                {
                    this.state.isEditable
                        ? <button ref={this.setSaveButtonRef} onClick={this.handleSaveClick} className="p-button">Save</button>
                        : <button onClick={this.handleEditClick} className="p-button">{this.props.buttonText}</button>
                }
            </div>
        );
    }
}

InlineEdit.propTypes = {
    object: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string
};

InlineEdit.defaultProps = {
    buttonText: 'Edit'
};

export default InlineEdit;
