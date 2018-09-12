import PropTypes from 'prop-types';
import { Button, H1, Popover, Menu, MenuItem } from '@blueprintjs/core';

const style = {
    padding: '16px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const PolygonNavigationBar = ({ onClickCreateProject }) => (
    <nav style={style}>
        <H1>P</H1>
        <Popover position="bottom-left">
            <Button icon="add" large={true} />
            <Menu key="menu">
                <MenuItem icon="folder-close" text="Add Project" onClick={onClickCreateProject} />
                <MenuItem icon="media" text="Add Design" />
            </Menu>
        </Popover>
    </nav>
);

PolygonNavigationBar.propTypes = {
    onClickCreateProject: PropTypes.func
};

export default PolygonNavigationBar;
