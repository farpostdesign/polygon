import { Button, H1 } from '@blueprintjs/core';

const style = {
    padding: '16px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

const PolygonNavigationBar = () => (
    <nav style={style}>
        <H1>P</H1>
        <Button icon="add" large={true} />
    </nav>
);

export default PolygonNavigationBar;
