import React from 'react';
import PropTypes from 'prop-types';

const FormField = React.forwardRef((props, ref) => {
    return (
        <span>
            {props.label ? <label className="p-form--label" htmlFor={props.name}>{props.label}</label> : null}
            <input
                ref={ref}
                id={`form_field_${props.name}`}
                {...props}
                className="p-form--field"
            />
        </span>
    );
});

FormField.defaultProps = {
    autoFocus: false
};

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    label: PropTypes.string,
    autoFocus: PropTypes.bool
};

export default FormField;

