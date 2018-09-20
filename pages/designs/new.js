import { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../../components/Layout';
import BreadcrumbsNav from '../../components/BreadcrumbsNav';
import { DesignForm } from '../../components/forms';
import fakeProjects from '../../fakeProjects';

/**
 * Helpers
 *
 */

const rootCrumb = { title: 'Projects', href: '/' };
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

class New extends Component {
    constructor(props) {
        super(props);
        this.state = { images: [] };

        this.handleFilesAdded = this.handleFilesAdded.bind(this);
        this.handleFileRemove = this.handleFileRemove.bind(this);
    }

    handleFilesAdded(droppedFiles) {
        this.setState({ images: this.state.images.concat(droppedFiles) });
    }

    handleFileRemove(event) {
        const { filename } = event.target.dataset;
        const filteredImages = this.state.images.filter((image) => image.name !== filename);
        this.setState({ images: filteredImages });
    }

    render() {
        return (
            <Layout>
                <BreadcrumbsNav items={this.props.breadcrumbs} />
                <DesignForm
                    files={this.state.images}
                    onFilesAdded={this.handleFilesAdded}
                    onFileRemoved={this.handleFileRemove}
                />
            </Layout>
        );
    }
}

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
