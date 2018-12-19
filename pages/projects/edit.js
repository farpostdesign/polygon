import React from 'react';
import PropTypes from 'prop-types';
import { ViewersEditor } from '../../components/forms';
import Layout from '../../components/Layout';
import BreadcrumbsNav from '../../components/BreadcrumbsNav';
import Section from '../../components/Section';
import store from '../../services/store';
import { optionsForSelect } from '../../utils';

const ProjectEdit = ({ breadcrumbs, viewers }) => (
    <Layout>
        <BreadcrumbsNav items={breadcrumbs} />
        <Section>
            <ViewersEditor options={optionsForSelect(viewers, { valueKey: '_id', labelKey: 'email' })} />
        </Section>
    </Layout>
);

ProjectEdit.getInitialProps = async (context) => {
    const { project, breadcrumbs } = await store.getState(context).project(context.query.id);
    breadcrumbs[breadcrumbs.length - 1].href = `/projects?id=${project._id}`;
    breadcrumbs.push({ name: 'Edit' });
    const viewers = await store.getState(context).viewers();
    return { breadcrumbs, viewers };
};

ProjectEdit.propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    viewers: PropTypes.array.isRequired
};

export default ProjectEdit;
