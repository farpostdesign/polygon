import PropTypes from 'prop-types';
import style from '../../style';

const onChangeStub = () => {
    // do nothing for now
};

const FormField = ({ label, name, type, value }) => {
    return (
        <div>
            <label>
                {label || name}
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
        </div>
    );
};

FormField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    label: PropTypes.string
};

export default FormField;

