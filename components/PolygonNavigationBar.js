import React from 'react';
import PropTypes from 'prop-types';
import { Button, H1, Popover, Menu, MenuItem } from '@blueprintjs/core';
import CreateProject from './CreateProject';
import CreateDesign from './CreateDesign';

const style = {
    padding: '16px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

class PolygonNavigationBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            createProjectIsOpen: false,
            createDesignIsOpen: false
        };

        this.handleOpenCreateProject = this.handleOpenCreateProject.bind(this);
        this.handleCloseCreateProject = this.handleCloseCreateProject.bind(this);
        this.handleOpenCreateDesign = this.handleOpenCreateDesign.bind(this);
        this.handleCloseCreateDesign = this.handleCloseCreateDesign.bind(this);
    }

    render() {
        return (
            <nav style={style}>
                <H1>P</H1>
                <Popover position="bottom-left">
                    <Button icon="add" large={true} />
                    <Menu key="menu">
                        <MenuItem icon="folder-close" text="Add Project" onClick={this.handleOpenCreateProject} />
                        <MenuItem icon="media" text="Add Design" onClick={this.handleOpenCreateDesign} />
                    </Menu>
                </Popover>
                <CreateProject isOpen={this.state.createProjectIsOpen} onClose={this.handleCloseCreateProject} />
                <CreateDesign isOpen={this.state.createDesignIsOpen} onClose={this.handleCloseCreateDesign} />
            </nav>
        );
    }

    handleOpenCreateProject() {
        this.setState({ createProjectIsOpen: true });
    }

    handleCloseCreateProject() {
        this.setState({ createProjectIsOpen: false });
    }

    handleOpenCreateDesign() {
        this.setState({ createDesignIsOpen: true });
    }

    handleCloseCreateDesign() {
        this.setState({ createDesignIsOpen: false });
    }
}

PolygonNavigationBar.propTypes = {
    onClickCreateProject: PropTypes.func,
    onClickCreateDesign: PropTypes.func
};

export default PolygonNavigationBar;
