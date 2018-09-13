import PropTypes from 'prop-types';
import { Dialog, H2, FormGroup, InputGroup, Button, Classes } from '@blueprintjs/core';

const CreateProject = ({ isOpen, onClose }) => (
    <Dialog isOpen={isOpen} onClose={onClose}>
        <div className={Classes.DIALOG_BODY}>
            <H2>Create Project</H2>
            <FormGroup
                label="Project Name"
                labelFor="name"
            >
                <InputGroup id="name" placeholder="Name of the project" />
            </FormGroup>
            <Button text="Add project" type="submit" intent="success" />
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
