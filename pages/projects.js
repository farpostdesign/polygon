import url from 'url';
import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import List from '../components/List';
import BreadcrumbsList from '../components/BreadcrumbsList';
import fakeProjects from '../fakeProjects';
import fakeDesign from '../fakeDesign';

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
    const breadcrumbs = findDescendantsRecursively(project.parent);
    return [{ title: 'Projects', href: '/' }, ...breadcrumbs, project];
}

const Projects = ({ subProjects, breadcrumbs, designs }) => {
    return (
        <Layout>
            <BreadcrumbsList items={breadcrumbs} />
            <List icon='folder-close' items={subProjects} />
            <List icon='media' items={designs} />
        </Layout>
    );
};

Projects.getInitialProps = async ({ req }) => {
    const { query } = url.parse(req.url, true);
    const projectId = Number(query.id);

    const project = fakeProjects.find(item => item.id === projectId);
    if (!project) {
        throw 'Project not found';
    }

    const subProjects = fakeProjects.filter(item => item.parent === projectId);
    const designs = fakeDesign.filter(item => item.project === projectId);
    const breadcrumbs = findBreadcrumbs(project.id);

    return { subProjects, breadcrumbs, designs };
};

Projects.propTypes = {
    subProjects: Projects.array,
    breadcrumbs: PropTypes.array,
    designs: PropTypes.array
};

export default Projects;
