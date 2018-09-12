import PropTypes from 'prop-types';
import { Button, H1 } from '@blueprintjs/core';

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
        <Button icon="add" large={true} onClick={onClickCreateProject} />
    </nav>
);

PolygonNavigationBar.propTypes = {
    onClickCreateProject: PropTypes.func
};

export default PolygonNavigationBar;
