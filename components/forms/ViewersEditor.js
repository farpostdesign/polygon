import React from 'react';
import PropTypes from 'prop-types';
import CreatableSelect from 'react-select/lib/Creatable';

class ViewersEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: props.selected };
    }

    handleChange = (newSelected) => {
        this.setState({ selected: newSelected });
        const selectedValues = newSelected.map((el) => el.value);
        this.props.handleSubmit(selectedValues);
    };

    render() {
        return (
            <div>
                <label className="p-form--label">Viewers</label>
                <CreatableSelect
                    isMulti
                    onChange={this.handleChange}
                    options={this.props.options}
                    value={this.state.selected}
                    closeMenuOnSelect={false}
                />
            </div>
        );
    }
}

ViewersEditor.propTypes = {
    options: PropTypes.array.isRequired,
    selected: PropTypes.array,
    handleSubmit: PropTypes.func.isRequired
};

ViewersEditor.defaultProps = {
    selected: []
};

export default ViewersEditor;
