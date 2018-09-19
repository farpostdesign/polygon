import Link from 'next/link';
import PropTypes from 'prop-types';
import style from '../style';

const AnchorButton = ({ href, text }) => {
    return <Link href={href}><a style={style.BUTTON}>{text}</a></Link>;
};

AnchorButton.propTypes = {
    href: PropTypes.string,
    text: PropTypes.string
};

export default AnchorButton;
