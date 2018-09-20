import { Component } from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';
import Layout from '../components/Layout';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import { DesignForm } from '../components/forms';
import style from '../style';
import fakeDesigns from '../fakeDesign';
import fakeProjects from '../fakeProjects';

/**
 * Helpers
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

function findBreadcrumbs(designId) {
    designId = Number(designId);
    const design = fakeDesigns.find(item => item.id === designId);
    const project = fakeProjects.find(item => item.id === design.project);
    const breadcrumbs = findDescendantsRecursively(project.parent);
    return [{ title: 'Projects', href: '/' }, ...breadcrumbs, project, design];
}

/**
 * Component
 */

const imageStyle = {
    border: '1px solid #ccc',
    marginBottom: '.75rem',
    maxWidth: '100%'
};

const quickNavStyle = {
    flex: '0 0 200px'
};

const fakeImages = [
    { href: '#1', name: 'Kompleksoe snabjenie1', preview: 'http://www.poligon.farpost.com/v2/apps/poligon/add_files/41601.jpg' },
    { href: '#2', name: 'Kompleksoe snabjenie2', preview: 'http://www.poligon.farpost.com/v2/apps/poligon/add_files/41602.jpg' },
    { href: '#3', name: 'Kompleksoe snabjenie3', preview: 'http://www.poligon.farpost.com/v2/apps/poligon/add_files/41801.jpg' },
    { href: '#4', name: 'Shkola svarshika', preview: 'http://www.poligon.farpost.com/v2/apps/poligon/add_files/dazel_1920px_tekst2.jpg' }
];

class Design extends Component {
    constructor(props) {
        super(props);
        this.state = { images: props.images };

        this.handleFileRemoved = this.handleFileRemoved.bind(this);
        this.handleFilesAdded = this.handleFilesAdded.bind(this);
        this.buildImage = this.buildImage.bind(this);
    }

    handleFilesAdded(dropedFiles) {
        this.setState({ images: this.state.images.concat(dropedFiles) });
    }

    handleFileRemoved(event) {
        const { filename } = event.target.dataset;
        const filesWithoutRemoved = this.state.images.filter((image) => image.name !== filename);
        this.setState({ images: filesWithoutRemoved });
    }

    buildImage(image) {
        return (
            <div>
                <h2 id='1'>{image.name}</h2>
                <img style={imageStyle} src={image.preview} />
                <div className="p-small-hide">
                    <button style={style.BUTTON} data-filename={image.name} onClick={this.handleFileRemoved}>Remove</button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Layout navBar={false}>
                <BreadcrumbsNav items={this.props.breadcrumbs}/>
                <div className="p-small-hide">
                    <DesignForm
                        files={this.state.images}
                        onFilesAdded={this.handleFilesAdded}
                        onFileRemoved={this.handleFileRemoved}
                        preview={false}
                        design={this.props.design}
                    />
                </div>
                <div style={{ display: 'flex' }}>
                    <div className="p-small-hide" style={quickNavStyle}>
                        <div style={{position: 'fixed' }}>
                            <a href="#top">Top</a>
                            <br/>
                            <br/>
                            <List items={this.state.images} />
                        </div>
                    </div>
                    <div style={style.DESIGNS}>
                        {this.state.images.map(this.buildImage)}
                    </div>
                </div>
            </Layout>
        );
    }
}

Design.getInitialProps = ({ query }) => {
    const designId = Number(query.id);
    const design = fakeDesigns.find(item => item.id === designId);
    if (!design) {
        throw 'Desing not found';
    }
    const breadcrumbs = findBreadcrumbs(designId);
    return { design, breadcrumbs, images: fakeImages };
};

Design.propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired,
    design: PropTypes.object.isRequired
};

export default Design;
