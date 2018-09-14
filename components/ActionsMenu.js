import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';
import forms from '../components/forms';

function strToTitleCase(str) {
    return `${str.charAt(0).toUpperCase()}${str.substr(1).toLowerCase()}`;
}

const ActionsMenu = ({ target, onActionCallback }) => (
    <Popover
        position={Position.BOTTOM_LEFT}
        interactionKind={PopoverInteractionKind.CLICK}
        content={
            <Menu>
                <MenuItem text="Edit" icon="edit" onClick={onActionCallback('edit')} />
                <MenuItem text="Move" icon="move" onClick={onActionCallback('move')} />
                <MenuItem text="Delete" icon="trash" intent="danger" onClick={onActionCallback('delete')} />
            </Menu>
        }
        target={target}
    />
);

ActionsMenu.propTypes = {
    target: PropTypes.element,
    onActionCallback: PropTypes.func
};

export class ActionsMenuController extends React.Component {
    constructor(props) {
        super(props);
        if (!props.type) {
            throw '`type` props is required';
        }
        this.state = {
            openDialog: null
        };

        this.handleAction = this.handleAction.bind(this);
        this.handleOnDialogClose = this.handleOnDialogClose.bind(this);
    }

    render() {
        return (
            <span>
                <ActionsMenu target={this.props.target} onActionCallback={this.handleAction} />
                {this.state.openDialog && this.buildDialog()}
            </span>
        );
    }

    handleAction(action) {
        return () => this.setState({ openDialog: action });
    }

    handleOnDialogClose() {
        this.setState({ openDialog: null });
    }

    buildDialog() {
        const formKey = `${strToTitleCase(this.state.openDialog)}${strToTitleCase(this.props.type)}`;
        const componentName = forms[formKey];
        return React.createElement(componentName, { isOpen: true, onClose: this.handleOnDialogClose });
    }
}

ActionsMenuController.propTypes = {
    target: PropTypes.element,
    type: PropTypes.string
};

export default ActionsMenu;
