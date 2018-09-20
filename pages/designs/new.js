import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import BreadcrumbsNav from '../../components/BreadcrumbsNav';
import { DesignForm } from '../../components/forms';
import fakeProjects from '../../fakeProjects';

/**
 * Helpers
 *
 */

const rootCrumb = { title: 'Project', href: '/' };
const thisCrumb = { title: 'New Design' };

function findDescendantsRecursively(parentId, ascendants = []) {
    const project = fakeProjects.find(item => item.id === parentId);
    if (!project) {
        return ascendants;
    }
    if (typeof(project.parent) === 'undefined') {
        return [project, ...ascendants];
    }
    return findDescendantsRecursively(project.parent, [project, ...ascendants]);
}

function findBreadcrumbs(projectId) {
    projectId = Number(projectId);
    const project = fakeProjects.find(item => item.id === projectId);
    let breadcrumbs = [];
    if (project) {
        breadcrumbs = findDescendantsRecursively(project.parent);
        breadcrumbs.push(project);
    }
    return [rootCrumb, ...breadcrumbs, thisCrumb];
}

/**
 * Component
 *
 */

const New = ({ breadcrumbs }) => (
    <Layout>
        <BreadcrumbsNav items={breadcrumbs} />
        <DesignForm />
    </Layout>
);

New.getInitialProps = ({ query }) => {
    const breadcrumbs = findBreadcrumbs(query.project);
    return { breadcrumbs };
};

New.propTypes = {
    breadcrumbs: PropTypes.array
};

/**
 * Expose
 *
 */

export default New;