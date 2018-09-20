import PropTypes from 'prop-types';
import FormField from './FormField';
import Dropzone from 'react-dropzone';
import style from '../../style';

const NOSTYLE = {};

const DesignForm = ({ design, files, onFilesAdded, onFileRemoved, preview }) => {
    return (
        <div>
            <FormField type="text" name="name" value={design && design.title} />
            <br />
            <br />
            <Dropzone accepts="image/*" onDrop={onFilesAdded} style={NOSTYLE}>
                <span style={style.BUTTON}>
                    {files.length ? 'Choose more files' : 'Choose files'}
                </span>
            </Dropzone>
            {preview && files.length > 0 &&
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {files.map((file) => (
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
                                        onClick={onFileRemoved}>
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
            }
            <br />
            <br />
            {!design && <input style={style.BUTTON} type="submit" value="Add Design"/>}
        </div>
    );
};

DesignForm.defaultProps = {
    preview: true
};

DesignForm.propTypes = {
    design: PropTypes.object,
    files: PropTypes.array.isRequired,
    onFilesAdded: PropTypes.func.isRequired,
    onFileRemoved: PropTypes.func.isRequired,
    preview: PropTypes.bool
};

export default DesignForm;
