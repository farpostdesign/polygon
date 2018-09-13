import React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Popover, PopoverInteractionKind, Position } from '@blueprintjs/core';

const ActionsMenu = ({ target }) => (
    <Popover
        position={Position.BOTTOM_LEFT}
        interactionKind={PopoverInteractionKind.CLICK}
        content={
            <Menu>
                <MenuItem text="Edit" icon="edit" />
                <MenuItem text="Move" icon="move" />
                <MenuItem text="Delete" icon="trash" intent="danger" />
            </Menu>
        }
        target={target}
    />
);

ActionsMenu.propTypes = {
    target: PropTypes.element
};

export default ActionsMenu;
