import { Component } from 'react';
import FormField from './FormField';
import Dropzone from 'react-dropzone';
import style from '../../style';

class DesignForm extends Component {
    constructor(props) {
        super(props);
        this.state = { files: [] };
        this.handleDrop = this.handleDrop.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleDrop(dropedFiles) {
        this.setState({ files: this.state.files.concat(dropedFiles) });
    }

    handleRemove(event) {
        const { filename } = event.target.dataset;
        const filesWithoutRemoved = this.state.files.filter((file) => file.name !== filename);
        this.setState({ files: filesWithoutRemoved });
    }

    render() {
        return (
            <div>
                <FormField type="text" name="name" />
                <br />
                <br />
                <Dropzone accepts="image/*" onDrop={this.handleDrop} style={{}}>
                    <span style={style.BUTTON}>
                        {this.state.files.length ? 'Choose more files' : 'Choose files'}
                    </span>
                </Dropzone>
                {this.state.files.length > 0 &&
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {this.state.files.map((file) => (
                                <div key={file.name}>
                                    <img
                                        alt="Preview"
                                        src={file.preview}
                                        style={{ width: '23vw', height: '23vw', objectFit: 'cover' }}
                                    />
                                    <div>
                                        <button
                                            style={style.BUTTON}
                                            data-filename={file.name}
                                            onClick={this.handleRemove}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                }
                <br />
                <br />
                <input style={style.BUTTON} type="submit" value="Add Design"/>
            </div>
        );
    }
}

export default DesignForm;
