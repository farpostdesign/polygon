import Head from 'next/head';
import PolygonNavigationBar from '../components/PolygonNavigationBar';

// Global styles
const style =`
body, html {
  height: 100%;
  width: 100%;
}
`;

export default ({ children }) =>
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
      <PolygonNavigationBar />
      <div id="content" style={{ flex: '1 1 auto', padding: '16px' }}>
        { children }
      </div>
    </div>
  </div>
