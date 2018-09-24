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

* { margin: 0; padding:0; box-sizing: border-box; }

a { color: #6e6eab; }

button + button {
    margin-left: 1rem;
}

@media screen and (min-width: 1024px) {
    .p-large-hide { display: none; }
}

@media screen and (max-width: 1023px) {
    .p-small-hide { display: none; }
}
`;

const Layout = ({ children }) => (
    <div id="layout" style={{ maxWidth: '1240px' }}>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="https://fonts.googleapis.com/css?family=Roboto&amp;subset=cyrillic" rel="stylesheet" />
            <style global>{style}</style>
        </Head>
        <div id="content" style={{ padding: '1.25rem' }}>
            <h1 style={{ fontSize: '1.25rem', margin: '.5rem 0 1.5rem 0' }}>Polygon</h1>
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
