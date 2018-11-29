import PropTypes from 'prop-types';

const NavBar = (props) => (
    <div className="p-side-bar">{props.children}</div>
);

NavBar.propTypes = {
    children: PropTypes.node
};

export default NavBar;
