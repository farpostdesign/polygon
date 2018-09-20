import PropTypes from 'prop-types';
import style from '../../style';

const onChangeStub = () => {
    // do nothing for now
};

const FormField = ({ name, type, value }) => {
    return (
        <label>
            Name:
            <br />
            <input
                id={`form_field_${name}`}
                type={type}
                name={name}
                style={style.INPUT}
                value={value}
                onChange={onChangeStub}
            />
        </label>
    );
};

FormField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
};

export default FormField;

