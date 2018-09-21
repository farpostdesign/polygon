import PropTypes from 'prop-types';
import style from '../style';

const Section = ({ children }) => (
    <section style={style.SECTION}>{children}</section>
);

Section.propTypes = {
    children: PropTypes.any
};

export default Section;
