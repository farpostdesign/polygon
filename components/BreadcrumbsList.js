import PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';

const BreadcrumbsList = ({ children }) => (
    <ul className={Classes.BREADCRUMBS} style={{margin: '1rem 0 2rem 0' }}>
        {children.map((crumb, index) =>
            <li key={index} className={Classes.BREADCRUMB}>{crumb}</li>)}
    </ul>
);

BreadcrumbsList.propTypes = {
    children: PropTypes.array
};

export default BreadcrumbsList;
