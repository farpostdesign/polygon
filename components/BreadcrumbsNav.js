import PropTypes from 'prop-types';
import Link from 'next/link';

const style = {
    margin: '1rem 0 2rem 0',
    display: 'flex',
    listStyle: 'none'
};

const separetorStyle = {
    padding: '0 .5rem'
};

const BreadcrumbsNav = ({ items }) => {
    if (!items.length) {
        return null;
    }
    const lastItemIndex = items.length - 1;
    const ancestors = items.slice(0, lastItemIndex);
    const currentItem = items[lastItemIndex];
    return (
        <ul style={style}>
            {ancestors.map((crumb, index) =>
                <li key={index}>
                    <Link href={crumb.href}><a>{crumb.title}</a></Link>
                    <span style={separetorStyle}>/</span>
                </li>)}
            <li>{currentItem.title}</li>
        </ul>
    );
};

BreadcrumbsNav.propTypes = {
    items: PropTypes.array
};

export default BreadcrumbsNav;
