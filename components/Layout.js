import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import '../src/css/app.sass';

const Layout = ({ children }) => (
    <div id="layout">
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://fonts.googleapis.com/css?family=Roboto&amp;subset=cyrillic" rel="stylesheet" />
        </Head>
        <div id="content" className="content">
            <h1 className="p-logo">Polygon</h1>
            {children}
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
