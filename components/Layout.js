import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

// Global styles
const style =`
body, html {
  height: 100%;
  width: 100%;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
}

a { color: #6e6eab; }

* { margin: 0; padding:0; box-sizing: border-box; }

`;

const Layout = ({ children }) => (
    <div id="layout" style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        width: '100%'
    }}>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://fonts.googleapis.com/css?family=Roboto&amp;subset=cyrillic" rel="stylesheet" />
            <style global>{style}</style>
        </Head>
        <div id="container" style={{ display: 'flex', flex: '1 1 auto' }}>
            <div id="content" style={{ flex: '1 1 auto', padding: '16px' }}>
                {children}
            </div>
        </div>
    </div>
);

Layout.defaultProps = {
    navBar: true
};

Layout.propTypes = {
    children: PropTypes.oneOfType([ PropTypes.element, PropTypes.array ])
};

export default Layout;
