import PropTypes from 'prop-types';
import Link from 'next/link';

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
                        <ul className="p-breadcrumbs">
                            <li>
                                <span className="p-breadcrumbs--separator">&larr;</span>
                                <Link href={previous.href}><a>{previous.title}</a></Link>
                                <span className="p-breadcrumbs--separator">/</span>
                            </li>
                            <li>{currentItem.title}</li>
                        </ul>
                    </div>
            }
            {ancestors.length > 0 &&
                    <div className="p-small-hide">
                        <ul className="p-breadcrumbs">
                            {ancestors.map((crumb, index) =>
                                <li key={index}>
                                    <Link href={crumb.href}><a>{crumb.title}</a></Link>
                                    <span className="p-breadcrumbs--separator">/</span>
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
