import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import PolygonNavigationBar from './PolygonNavigationBar';
import CreateProject from './CreateProject';

// Global styles
const style =`
body, html {
  height: 100%;
  width: 100%;
  font-size: 16px;
}

* { margin: 0; padding:0; box-sizing: border-box; }
`;

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { createProjectIsOpen: false };

        this.handleOpenCreateProject = this.handleOpenCreateProject.bind(this);
        this.handleCloseCreateProject = this.handleCloseCreateProject.bind(this);
    }

    render() {
        return (
            <div id="layout" style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100%',
                width: '100%'
            }}>
                <Head>
                    <link rel="stylesheet" href="/static/normalize.css" />
                    <link rel="stylesheet" href="/static/blueprintjs/lib/css/blueprint.css" />
                    <style global>{style}</style>
                </Head>
                <div id="container" style={{ display: 'flex', flex: '1 1 auto' }}>
                    { this.props.navBar && <PolygonNavigationBar onClickCreateProject={this.handleOpenCreateProject} /> }
                    <div id="content" style={{ flex: '1 1 auto', padding: '16px' }}>
                        { this.props.children }
                    </div>
                </div>
                <CreateProject isOpen={this.state.createProjectIsOpen} onClose={this.handleCloseCreateProject} />
            </div>
        );
    }

    handleOpenCreateProject() {
        this.setState({ createProjectIsOpen: true });
    }

    handleCloseCreateProject() {
        this.setState({ createProjectIsOpen: false });
    }
}

Layout.defaultProps = {
    navBar: true
};

Layout.propTypes = {
    navBar: PropTypes.bool,
    children: PropTypes.oneOfType([ PropTypes.element, PropTypes.array ])
};

export default Layout;
