import Link from 'next/link';
import PropTypes from 'prop-types';

const style = {
    display: 'inline-block',
    padding: '.5rem .7rem',
    border: '2px solid #6e6eab',
    borderRadius: '4px',
    textDecoration: 'none',
    margin: '0 0 2rem 0'
};

const AnchorButton = ({ href, text }) => <Link href={href}><a style={style}>{text}</a></Link>;

AnchorButton.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string
};

export default AnchorButton;
