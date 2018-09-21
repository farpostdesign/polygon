import PropTypes from 'prop-types';
import style from '../../style';

const onChangeStub = () => {
    // do nothing for now
};

const FormField = ({ label, name, type, value, autoFocus }) => {
    return (
        <span>
            {label ? <label htmlFor={name}>{label || name}</label> : null}
            <input
                id={`form_field_${name}`}
                type={type}
                name={name}
                style={style.INPUT}
                value={value}
                onChange={onChangeStub}
                autoFocus={autoFocus}
            />
        </span>
    );
};

FormField.defaultProps = {
    autoFocus: false
};

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string,
    autoFocus: PropTypes.bool
};

export default FormField;

