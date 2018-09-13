import PropTypes from 'prop-types';
import { Breadcrumb, Classes, Button } from '@blueprintjs/core';
import ActionsMenu from './ActionsMenu';

const BreadcrumbsNav = ({ items }) => {
    const lastItemIndex = items.length - 1;
    const ancestors = items.slice(0, lastItemIndex);
    const currentItem = items[lastItemIndex];
    return (
        <ul className={Classes.BREADCRUMBS} style={{margin: '1rem 0 2rem 0' }}>
            {ancestors.map((crumb, index) =>
                <li key={index} className={Classes.BREADCRUMB}><Breadcrumb href={crumb.href} text={crumb.title}/></li>)}
            <li>
                <ActionsMenu target={
                    <Button text={currentItem.title} minimal={true} rightIcon="caret-down" large={true} />
                } />
            </li>
        </ul>
    );
};

BreadcrumbsNav.propTypes = {
    items: PropTypes.array
};

export default BreadcrumbsNav;
