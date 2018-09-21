import PropTypes from 'prop-types';
import style from '../style';

const H3 = ({ children }) => <h3 style={style.SECTION_HEADER}>{children}</h3>;

H3.propTypes = {
    children: PropTypes.any
};

export default H3;
