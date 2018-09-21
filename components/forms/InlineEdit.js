import { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import style from '../../style';

class InlineEdit extends Component {
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
    }

    render() {
        return (
            <div>
                {
                    this.state.isEditable
                        ? <FormField type="text" name="name" value={this.props.object.title} />
                        :  <span style={style.INLINE_EDITABLE}>{this.props.object.title}</span>
                }
                {
                    this.state.isEditable
                        ? <button onClick={this.handleSaveClick} style={style.BUTTON}>Save</button>
                        : <button onClick={this.handleEditClick} style={style.BUTTON}>Edit</button>
                }

            </div>
        );
    }
}

InlineEdit.propTypes = {
    object: PropTypes.object.isRequired
};

export default InlineEdit;
