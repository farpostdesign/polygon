import { Component } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import List from '../components/List';
import Layout from '../components/Layout';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import Section from '../components/Section';
import H3 from '../components/H3';
import { InlineEdit } from '../components/forms';
import 'isomorphic-unfetch';

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
            <div key={image.id} className="p-designs--item">
                <H3 id={image.id}>{image.name}</H3>
                <img className="p-designs--image" src={image.preview} />
                <div className="p-small-hide">
                    <button className="p-button" data-filename={image.name} onClick={this.handleFileRemoved}>Remove</button>
                    <button className="p-button" data-filename={image.name}>Replace</button>
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
                    <Dropzone accepts="image/*" onDrop={this.handleFilesAdded} className="p-dropzone">
                        {this.state.images.length ? 'Drop to add more images or click' : 'Drop to add images or click'}
                    </Dropzone>
                </Section>
                <div className="p-collumns-container">
                    <div className="p-designs p-collumn">
                        {this.state.images.map(this.buildImage)}
                    </div>
                    <div className="p-quicknav-container p-small-hide">
                        <div className="p-quicknav">
                            <List items={this.state.images} />
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

Design.getInitialProps = async ({ query }) => {
    const res = await fetch(`http://localhost:3000/api/design?id=${query.id}`);
    const { design, breadcrumbs } = await res.json();
    return { design, breadcrumbs , images: fakeImages };
};

Design.propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired,
    design: PropTypes.object.isRequired
};

export default Design;
