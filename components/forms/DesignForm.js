import { Component } from 'react';
import FormField from './FormField';
import Dropzone from 'react-dropzone';
import style from '../../style';

class DesignForm extends Component {
    constructor(props) {
        super(props);
        this.state = { files: [] };
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDrop(dropedFiles) {
        this.setState({ files: this.state.files.concat(dropedFiles) });
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
                                <img
                                    alt="Preview"
                                    key={file.preview}
                                    src={file.preview}
                                    style={{ width: '23vw', height: '23vw', objectFit: 'cover' }}
                                />
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
