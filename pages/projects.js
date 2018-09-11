import url from 'url';
import PropTypes from 'prop-types';
import { Breadcrumb } from '@blueprintjs/core';
import Layout from '../components/Layout';
import List from '../components/List';
import BreadcrumbsList from '../components/BreadcrumbsList';
import fakeProjects from '../fakeProjects';

const Projects = ({ project, subProjects }) => {
    return (
        <Layout>
            <BreadcrumbsList>
                <Breadcrumb href="/" text="Projects" />
                <Breadcrumb text={project.title} />
            </BreadcrumbsList>
            <List items={subProjects} />
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

    return { project, subProjects };
};

Projects.propTypes = {
    project: PropTypes.object,
    items: PropTypes.array
};

export default Projects;
