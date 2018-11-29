import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import NavBar from './NavBar';
import LogOutButton from './LogOutButton';
import '../src/css/app.sass';

const Layout = ({ children, navBar }) => (
    <div id="layout">
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://fonts.googleapis.com/css?family=Roboto&amp;subset=cyrillic" rel="stylesheet" />
        </Head>
        <div id="content" className="p-content">
            {navBar &&
                    <NavBar>
                        <h1 className="p-logo">Polygon</h1>
                        <LogOutButton />
                    </NavBar>
            }
            {children}
        </div>
    </div>
);

Layout.defaultProps = {
    navBar: true
};

Layout.propTypes = {
    navBar: PropTypes.bool,
    children: PropTypes.oneOfType([ PropTypes.element, PropTypes.array ])
};

export default Layout;
