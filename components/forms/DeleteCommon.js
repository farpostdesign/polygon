import PropTypes from 'prop-types';
import { Dialog, H2, Button, Classes } from '@blueprintjs/core';

const CreateProject = ({ isOpen, onClose }) => (
    <Dialog isOpen={isOpen} onClose={onClose}>
        <div className={Classes.DIALOG_BODY}>
            <H2>Are you sure?</H2>
            <Button text="Yes, delete it" type="submit" intent="danger" />
        </div>
    </Dialog>
);

CreateProject.defaultProps = {
    isOpen: false
};

CreateProject.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};

export default CreateProject;
