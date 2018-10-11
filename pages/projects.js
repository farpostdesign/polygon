import PropTypes from 'prop-types';
import Router from 'next/router';
import Layout from '../components/Layout';
import { InlineCreate } from '../components/forms';
import List from '../components/List';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import Section from '../components/Section';
import H3 from '../components/H3';
import { InlineEdit } from '../components/forms';
import 'isomorphic-unfetch';

const store = {
    dispatch(action) {
        const type = action.type;
        return store[type](action);
    },

    addProject(action) {
        return fetch('/api/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(action.attributes)
        }).then((res) => res.json());
    }
};

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
                <InlineCreate name="name"
                    text="Add Subfolder"
                    handleSubmit={(attributes) => {
                        attributes.parent = project._id;
                        store.dispatch({ type: 'addProject', attributes })
                            .then((res) => {
                                if (res.errors) {
                                    throw res.errors;
                                }
                                const project = res.data;
                                Router.push(`/projects?id=${project._id}`);
                            }).catch(alert);
                    }} />
                <List icon='folder-close' items={subProjects} />
            </Section>
            <Section>
                <H3>Designs</H3>
                <InlineCreate name="name" text="Add Design" stubRedirect="/design?id=100" />
                <List icon='media' items={designs} />
            </Section>
        </Layout>
    );
};

Projects.getInitialProps = async ({ query }) => {
    const res = await fetch(`http://localhost:3000/api/project?id=${query.id}`);
    const { project, subProjects, breadcrumbs, designs } = await res.json();
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
