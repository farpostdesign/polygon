import PropTypes from 'prop-types';
import style from '../style';

const H3 = ({ id, children }) => <h3 id={id} style={style.SECTION_HEADER}>{children}</h3>;

H3.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.any
};

export default H3;
