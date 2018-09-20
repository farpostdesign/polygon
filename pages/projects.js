import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import AnchorButton from '../components/AnchorButton';
import List from '../components/List';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import { ProjectForm } from '../components/forms';
import fakeProjects from '../fakeProjects';
import fakeDesign from '../fakeDesign';

/**
 * Helpers
 *
 */

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

/**
 * Component
 *
 */

const Projects = ({ project, subProjects, breadcrumbs, designs }) => {
    return (
        <Layout>
            <BreadcrumbsNav items={breadcrumbs} />
            <div style={{ display: 'flex' }}>
                <div style={{ flex: '1 1 50%' }}>
                    {!(subProjects.length || designs.length) ? <p>Empty</p> : ''}
                    <List icon='folder-close' items={subProjects} />
                    <List icon='media' items={designs} />
                </div>
                <div className="p-small-hide" style={{ flex: '1 1 50%' }}>
                    <ProjectForm project={project} />
                    <AnchorButton href={`/projects/new?parent=${project.id}`} text="Add Subproject" />
                    <AnchorButton href={`/designs/new?project=${project.id}`} text="Add Design" />
                </div>
            </div>
        </Layout>
    );
};

Projects.getInitialProps = async ({ query }) => {
    const projectId = Number(query.id);

    const project = fakeProjects.find(item => item.id === projectId);
    if (!project) {
        throw 'Project not found';
    }

    const subProjects = fakeProjects.filter(item => item.parent === projectId);
    const designs = fakeDesign.filter(item => item.project === projectId);
    const breadcrumbs = findBreadcrumbs(project.id);

    return { project, subProjects, breadcrumbs, designs };
};

Projects.propTypes = {
    project: PropTypes.object,
    subProjects: PropTypes.array,
    breadcrumbs: PropTypes.array,
    designs: PropTypes.array
};

/**
 * Expose
 *
 */

export default Projects;
