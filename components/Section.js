import PropTypes from 'prop-types';

const Section = ({ children }) => (
    <section className="p-section">{children}</section>
);

Section.propTypes = {
    children: PropTypes.any
};

export default Section;
