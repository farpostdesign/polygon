import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import Layout from '../components/Layout';
import { InlineCreate } from '../components/forms';
import List from '../components/List';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import Section from '../components/Section';
import H3 from '../components/H3';
import { InlineEdit } from '../components/forms';
import store from '../services/store';
import 'isomorphic-unfetch';

/**
 * Component
 *
 */

class Projects extends React.Component {
    static async getInitialProps(context) {
        const { project, subProjects, breadcrumbs, designs } = await store.getState(context).project(context.query.id);
        return { project, subProjects, breadcrumbs, designs };
    }

    constructor(props) {
        super(props);
        const { project, subProjects, breadcrumbs, designs } = props;
        this.state = {
            project,
            subProjects,
            breadcrumbs,
            designs
        };
    }

    render() {
        return (
            <Layout>
                <BreadcrumbsNav items={this.state.breadcrumbs} />
                <Section>
                    <InlineEdit name="name"
                        object={this.state.project}
                        handleSubmit={(attributes) => {
                            store.dispatch({ type: 'updateProject', attributes, id: this.state.project._id })
                                .then((res) => {
                                    if (res.errors) {
                                        throw res.errors;
                                    }
                                    fetch(`http://localhost:3000/api/project?id=${this.state.project._id}`)
                                        .then((res) => res.json())
                                        .then(({ project, breadcrumbs }) => {
                                            this.setState({ project, breadcrumbs });
                                        });
                                }).catch(alert);
                        }} />
                </Section>
                <Section>
                    <H3>Projects</H3>
                    <InlineCreate name="name"
                        text="Add Subfolder"
                        handleSubmit={(attributes) => {
                            attributes.parent = this.state.project._id;
                            store.dispatch({ type: 'addProject', attributes })
                                .then((res) => {
                                    if (res.errors) {
                                        throw res.errors;
                                    }
                                    const project = res.data;
                                    Router.push(`/projects?id=${project._id}`);
                                }).catch(alert);
                        }} />
                    <List icon='folder-close' items={this.state.subProjects} />
                </Section>
                <Section>
                    <H3>Designs</H3>
                    <InlineCreate name="name"
                        text="Add Design"
                        handleSubmit={(attributes) => {
                            attributes.project = this.state.project._id;
                            store.dispatch({ type: 'addDesign', attributes })
                                .then((res) => {
                                    if (res.errors) {
                                        throw res.errors;
                                    }
                                    const design = res.data;
                                    Router.push(`/design?id=${design._id}`);
                                }).catch(alert);
                        }} />
                    <List icon='media' items={this.state.designs} />
                </Section>
            </Layout>
        );
    }
}

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
