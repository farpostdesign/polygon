import PropTypes from 'prop-types';

const H3 = ({ id, children }) => <h3 id={id} className="p-section--header">{children}</h3>;

H3.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.any
};

export default H3;
