import { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import { titelize } from '../../utils';

class InlineCreate extends Component {
    constructor(props) {
        super(props);
        this.state = { isEditable: false, value: { [props.name]: '' } };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.setCreateButtonRef = this.setCreateButtonRef.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    setCreateButtonRef(node) {
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
        this.setState({ value: { [this.props.name]: value } });
    }

    handleSaveClick() {
        this.setState({ isEditable: false });
        this.props.handleSubmit(this.state.value);
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target) && !this.saveButtonRef.contains(event.target)) {
            this.setState({ isEditable: false });
        }
    }

    render() {
        const placeholder = this.props.placeholder || titelize(this.props.name);
        return (
            <div>
                { this.state.isEditable ? <FormField type="text" name={this.props.name} placeholder={placeholder} ref={this.setWrapperRef} onChange={this.handleInputChange} autoFocus/> : null}
                {
                    this.state.isEditable
                        ? <button ref={this.setCreateButtonRef} onClick={this.handleSaveClick} className="p-button">Create</button>
                        : <button onClick={this.handleEditClick} className="p-button">{this.props.text}</button>
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
    handleSubmit: PropTypes.func
};

export default InlineCreate;
