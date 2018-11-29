import { Component } from 'react';
import PropTypes from 'prop-types';
import store from '../services/store';
import Dropzone from 'react-dropzone';
import List from '../components/List';
import Layout from '../components/Layout';
import BreadcrumbsNav from '../components/BreadcrumbsNav';
import Section from '../components/Section';
import H3 from '../components/H3';
import { InlineEdit } from '../components/forms';
import 'isomorphic-unfetch';

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
        this.buildfileReplaceHandler = this.buildfileReplaceHandler.bind(this);
        this.buildImage = this.buildImage.bind(this);
    }

    handleFilesAdded(droppedFiles) {
        store.dispatch({
            type: 'uploadFiles',
            id: this.props.design._id,
            files: droppedFiles
        }).then((res) => {
            if (res.errors) {
                throw res.errors;
            }

            this.setState({ images: res.data });
        }).catch(alert);
    }

    buildfileReplaceHandler(fileId) {
        return (sendedFiles) => {
            store.dispatch({
                type: 'replaceFile',
                designId: this.props.design._id,
                fileId,
                file: sendedFiles[0]
            }).then((res) => {
                if (res.errors) {
                    throw res.errors;
                }

                this.setState({ images: res.data });
            }).catch(alert);
        };
    }

    handleFileRemoved(event) {
        const { fileId } = event.target.dataset;
        store.dispatch({
            type: 'deleteFile',
            designId: this.props.design._id,
            fileId
        }).then((res) => {
            if (res.errors) {
                throw res.errors;
            }

            this.setState({ images: res.data });
        }).catch(alert);
    }

    buildImage(image) {
        return (
            <div key={image._id} className="p-designs--item">
                <H3 id={image._id}>{image.name}</H3>
                <img className="p-designs--image" src={image.src} />
                <div className="p-small-hide">
                    <button className="p-button" data-file-id={image._id} onClick={this.handleFileRemoved}>Remove</button>
                    <Dropzone accepts="image/*" multiple={false} onDrop={this.buildfileReplaceHandler(image._id)} className="p-button">Replace</Dropzone>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Layout navBar={false}>
                <BreadcrumbsNav items={this.props.breadcrumbs}/>
                <Section>
                    <InlineEdit name="name"
                        object={this.props.design}
                        handleSubmit={(attributes) => {
                            store.dispatch({ type: 'updateDesign', attributes, id: this.props.design._id })
                                .then((res) => {
                                    if (res.errors) {
                                        throw res.errors;
                                    }
                                    fetch(`http://localhost:3000/api/design?id=${this.props.design._id}`)
                                        .then((res) => res.json())
                                        .then(({ design, breadcrumbs }) => {
                                            this.setState({ design, breadcrumbs });
                                        });
                                }).catch(alert);
                        }}
                    />
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

Design.getInitialProps = async (context) => {
    const { design, breadcrumbs, files } = await store.getState(context).design(context.query.id);
    return { design, breadcrumbs , images: files };
};

Design.propTypes = {
    breadcrumbs: PropTypes.array.isRequired,
    images: PropTypes.array.isRequired,
    design: PropTypes.object.isRequired
};

export default Design;
