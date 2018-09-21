import { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import List from '../components/List';
import Layout from '../components/Layout';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import Section from '../components/Section';
import H3 from '../components/H3';
import { InlineEdit } from '../components/forms';
import style from '../style';
import fakeDesigns from '../fakeDesign';
import fakeProjects from '../fakeProjects';

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

function findBreadcrumbs(designId) {
    designId = Number(designId);
    const design = fakeDesigns.find(item => item.id === designId);
    const project = fakeProjects.find(item => item.id === design.project);
    const breadcrumbs = findDescendantsRecursively(project.parent);
    return [{ title: 'Projects', href: '/' }, ...breadcrumbs, project, design];
}

/**
 * Fake data
 *
 */

const fakeImages = [
    { id: 1, href: '?id=3#1', name: 'Kompleksoe snabjenie1', preview: 'http://www.poligon.farpost.com/v2/apps/poligon/add_files/41601.jpg' },
    { id: 2, href: '?id=3#2', name: 'Kompleksoe snabjenie2', preview: 'http://www.poligon.farpost.com/v2/apps/poligon/add_files/41602.jpg' },
    { id: 3, href: '?id=3#3', name: 'Kompleksoe snabjenie3', preview: 'http://www.poligon.farpost.com/v2/apps/poligon/add_files/41801.jpg' },
    { id: 4, href: '?id=3#4', name: 'Shkola svarshika', preview: 'http://www.poligon.farpost.com/v2/apps/poligon/add_files/dazel_1920px_tekst2.jpg' }
];


/**
 * Component
 *
 */

const imageStyle = {
    border: '1px solid #ccc',
    marginBottom: '.75rem',
    maxWidth: '100%'
};

const quickNavStyle = {
    flex: '0 0 200px'
};

class Design extends Component {
    constructor(props) {
        super(props);
        this.state = { images: props.images };

        this.handleFileRemoved = this.handleFileRemoved.bind(this);
        this.handleFilesAdded = this.handleFilesAdded.bind(this);
        this.buildImage = this.buildImage.bind(this);
    }

    handleFilesAdded(dropedFiles) {
        this.setState({ images: dropedFiles.concat(this.state.images) });
    }

    handleFileRemoved(event) {
        const { filename } = event.target.dataset;
        const filesWithoutRemoved = this.state.images.filter((image) => image.name !== filename);
        this.setState({ images: filesWithoutRemoved });
    }

    buildImage(image) {
        return (
            <div style={{ marginBottom: '2rem' }}>
                <H3 id={image.id}>{image.name}</H3>
                <img style={imageStyle} src={image.preview} />
                <div className="p-small-hide">
                    <button style={style.BUTTON} data-filename={image.name} onClick={this.handleFileRemoved}>Remove</button>
                    <button style={style.BUTTON} data-filename={image.name}>Replace</button>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Layout navBar={false}>
                <BreadcrumbsNav items={this.props.breadcrumbs}/>
                <Section>
                    <InlineEdit object={this.props.design} />
                </Section>
                <Section>
                    <Dropzone accepts="image/*" onDrop={this.handleFilesAdded} style={style.NOSTYLE}>
                        <span style={style.BUTTON}>
                            {this.state.images.length ? 'Add more files' : 'Add files'}
                        </span>
                    </Dropzone>
                </Section>
                <div style={{ display: 'flex' }}>
                    <div style={style.DESIGNS}>
                        {this.state.images.map(this.buildImage)}
                    </div>
                    <div className="p-small-hide" style={quickNavStyle}>
                        <div style={{position: 'fixed' }}>
                            <List items={this.state.images} />
                        </div>
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
