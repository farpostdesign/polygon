import PropTypes from 'prop-types';
import Layout from '../components/Layout';
import { InlineCreate } from '../components/forms';
import List from '../components/List';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import Section from '../components/Section';
import H3 from '../components/H3';
import { InlineEdit } from '../components/forms';
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
            <Section>
                <InlineEdit object={project} />
            </Section>
            <Section>
                <H3>Projects</H3>
                <InlineCreate text="Add Subfolder" stubRedirect="/projects?id=100" />
                <List icon='folder-close' items={subProjects} />
            </Section>
            <Section>
                <H3>Designs</H3>
                <InlineCreate text="Add Design" stubRedirect="/design?id=100" />
                <List icon='media' items={designs} />
            </Section>
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
