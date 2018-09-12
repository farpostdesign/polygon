import PropTypes from 'prop-types';
import { Dialog, H2, FormGroup, InputGroup, Button, Classes } from '@blueprintjs/core';

const CreateDesign = ({ isOpen, onClose }) => (
    <Dialog isOpen={isOpen} onClose={onClose}>
        <div className={Classes.DIALOG_BODY}>
            <H2>Create Design</H2>
            <FormGroup
                label="Design Name"
                labelFor="name"
            >
                <InputGroup id="name" placeholder="Name of the design" />
            </FormGroup>
            <FormGroup
                label="Files"
                labelFor="file"
            >
                <p>File uploader here</p>
            </FormGroup>
            <Button text="Add project" type="submit" intent="success" />
        </div>
    </Dialog>
);

CreateDesign.defaultProps = {
    isOpen: false
};

CreateDesign.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func
};

export default CreateDesign;
