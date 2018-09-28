import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';

class InlineEdit extends Component {
    constructor() {
        super();
        this.wrapperRef = null;
        this.saveButtonRef = null;

        this.state = { isEditable: false };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.setSaveButtonRef = this.setSaveButtonRef.bind(this);
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

    handleSaveClick() {
        this.setState({ isEditable: false });
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
                        ? <FormField type="text" name="name" value={this.props.object.name} ref={this.setWrapperRef} autoFocus/>
                        :  <span className="p-inline-editable">{this.props.object.name}</span>
                }
                {
                    this.state.isEditable
                        ? <button ref={this.setSaveButtonRef} onClick={this.handleSaveClick} className="p-button">Save</button>
                        : <button onClick={this.handleEditClick} className="p-button">Edit</button>
                }
            </div>
        );
    }
}

InlineEdit.propTypes = {
    object: PropTypes.object.isRequired
};

export default InlineEdit;
