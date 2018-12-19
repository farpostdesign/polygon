import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';

class ViewersEditor extends React.Component {
    state = {
        selected: []
    };

    handleChange = (newValue) => {
        const selected = newValue.map((el) => el.value);
        this.setState({ selected });
    };

    render() {
        return (
            <div>
                <label className="p-form--label">Viewers</label>
                <CreatableSelect
                    isMulti
                    onChange={this.handleChange}
                    options={this.props.options}
                    closeMenuOnSelect={false}
                />
            </div>
        );
    }
}

ViewersEditor.propTypes = {
    options: PropTypes.array.isRequired
};

export default ViewersEditor;
