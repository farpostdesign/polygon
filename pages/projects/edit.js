import React from 'react';
import PropTypes from 'prop-types';
import { ViewersEditor } from '../../components/forms';
import Layout from '../../components/Layout';
import BreadcrumbsNav from '../../components/BreadcrumbsNav';
import Section from '../../components/Section';
import store from '../../services/store';
import { optionsForSelect } from '../../utils';

const ProjectEdit = ({ project, breadcrumbs, viewers, selectedViewers }) => (
    <Layout>
        <BreadcrumbsNav items={breadcrumbs} />
        <Section>
            <ViewersEditor
                options={optionsForSelect(viewers, { valueKey: '_id', labelKey: 'email' })}
                selected={optionsForSelect(selectedViewers, { valueKey: '_id', labelKey: 'email' })}
                handleSubmit={(selected) => {
                    store.dispatch({
                        type: 'updateProject',
                        id: project._id,
                        attributes: { viewers: selected } }
                    ).catch(alert);
                }}
            />
        </Section>
    </Layout>
);

ProjectEdit.getInitialProps = async (context) => {
    const { project, breadcrumbs } = await store.getState(context).project(context.query.id);
    breadcrumbs[breadcrumbs.length - 1].href = `/projects?id=${project._id}`;
    breadcrumbs.push({ name: 'Edit' });
    const viewers = await store.getState(context).viewers();
    let selectedViewers = [];
    if (project.viewers && project.viewers.length) {
        selectedViewers = viewers.filter((viewer) => project.viewers.includes(viewer._id));
    }
    return { project, breadcrumbs, viewers, selectedViewers };
};

ProjectEdit.propTypes = {
    project: PropTypes.object.isRequired,
    breadcrumbs: PropTypes.array.isRequired,
    viewers: PropTypes.array.isRequired,
    selectedViewers: PropTypes.array.isRequired
};

export default ProjectEdit;
