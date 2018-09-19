import PropTypes from 'prop-types';
import style from '../../style';

const FormField = ({ name, type }) => {
    return (
        <label>
            Name:
            <br />
            <input id={`form_field_${name}`} type={type} name={name} style={style.INPUT} />
        </label>
    );
};

FormField.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string
};

export default FormField;

