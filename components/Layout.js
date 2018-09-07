import PropTypes from 'prop-types';
import Head from 'next/head';
import PolygonNavigationBar from '../components/PolygonNavigationBar';

// Global styles
const style =`
body, html {
  height: 100%;
  width: 100%;
  font-size: 16px;
}

* { margin: 0; padding:0; box-sizing: border-box; }
`;

const Layout = ({ children, navBar }) => (
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
            { navBar && <PolygonNavigationBar /> }
            <div id="content" style={{ flex: '1 1 auto', padding: '16px' }}>
                { children }
            </div>
        </div>
    </div>
);

Layout.defaultProps = {
    navBar: true
};

Layout.propTypes = {
    navBar: PropTypes.boolean,
    children: PropTypes.oneOfType([ PropTypes.element, PropTypes.array ])
};

export default Layout;
