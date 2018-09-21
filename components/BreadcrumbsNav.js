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
    const previous = ancestors[lastItemIndex - 1];
    const currentItem = items[lastItemIndex];
    return (
        <div>
            {previous &&
                    <div className="p-large-hide">
                        <ul style={style}>
                            <li>
                                <span style={separetorStyle}>&larr;</span>
                                <Link href={previous.href}><a>{previous.title}</a></Link>
                                <span style={separetorStyle}>/</span>
                            </li>
                            <li>{currentItem.title}</li>
                        </ul>
                    </div>
            }
            {ancestors.length > 0 &&
                    <div className="p-small-hide">
                        <ul style={style}>
                            {ancestors.map((crumb, index) =>
                                <li key={index}>
                                    <Link href={crumb.href}><a>{crumb.title}</a></Link>
                                    <span style={separetorStyle}>/</span>
                                </li>)}
                            <li>{currentItem.title}</li>
                        </ul>
                    </div>
            }
        </div>
    );
};

BreadcrumbsNav.propTypes = {
    items: PropTypes.array
};

export default BreadcrumbsNav;
