import React from 'react';
import { Menu, MenuItem, Popover, Icon, PopoverInteractionKind, Position } from '@blueprintjs/core';

const ActionsMenu = () => (
    <Popover
        position={Position.BOTTOM_LEFT}
        interactionKind={PopoverInteractionKind.CLICK}
    >
        <Icon icon="more" style={{marginRight: '.75rem', transform: 'rotate(90deg)'}} onClick={this.handleClick} />
        <Menu>
            <MenuItem text="Edit" icon="edit" />
            <MenuItem text="Move" icon="move" />
            <MenuItem text="Delete" icon="trash" intent="danger" />
        </Menu>
    </Popover>
);

export default ActionsMenu;
