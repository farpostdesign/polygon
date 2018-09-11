import PropTypes from 'prop-types';
import { Breadcrumb, Classes } from '@blueprintjs/core';

const BreadcrumbsList = ({ items }) => (
    <ul className={Classes.BREADCRUMBS} style={{margin: '1rem 0 2rem 0' }}>
        {items.map((crumb, index) =>
            <li key={index} className={Classes.BREADCRUMB}><Breadcrumb href={crumb.href} text={crumb.title}/></li>)}
    </ul>
);

BreadcrumbsList.propTypes = {
    items: PropTypes.array
};

export default BreadcrumbsList;
