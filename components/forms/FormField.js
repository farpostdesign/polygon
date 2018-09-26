import React from 'react';
import PropTypes from 'prop-types';
import style from '../../style';

const onChangeStub = () => {
    // do nothing for now
};

const FormField = React.forwardRef((props, ref) => {
    return (
        <span>
            {props.label ? <label htmlFor={name}>{props.label}</label> : null}
            <input
                ref={ref}
                id={`form_field_${props.name}`}
                {...props}
                onChange={onChangeStub}
                style={style.INPUT}
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

