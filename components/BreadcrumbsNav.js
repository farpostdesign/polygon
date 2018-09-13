import PropTypes from 'prop-types';
import { Breadcrumb, Classes, Popover, Menu, MenuItem, Button } from '@blueprintjs/core';

const BreadcrumbsNav = ({ items }) => {
    const lastItemIndex = items.length - 1;
    const ancestors = items.slice(0, lastItemIndex);
    const currentItem = items[lastItemIndex];
    return (
        <ul className={Classes.BREADCRUMBS} style={{margin: '1rem 0 2rem 0' }}>
            {ancestors.map((crumb, index) =>
                <li key={index} className={Classes.BREADCRUMB}><Breadcrumb href={crumb.href} text={crumb.title}/></li>)}
            <li>
                <Popover>
                    <Button text={currentItem.title} minimal={true} rightIcon="caret-down" large={true} />
                    <Menu>
                        <MenuItem text="Edit" icon="edit" />
                        <MenuItem text="Move" icon="move" />
                        <MenuItem text="Delete" icon="trash" intent="danger" />
                    </Menu>
                </Popover>
            </li>
        </ul>
    );
};

BreadcrumbsNav.propTypes = {
    items: PropTypes.array
};

export default BreadcrumbsNav;
