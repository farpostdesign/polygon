import url from 'url';
import List from '../components/List';
import Layout from '../components/Layout';
import fakeDesign from '../fakeDesign';
import fakeProjects from '../fakeProjects';

const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: '1 1 auto'
};

const imageStyle = {
    border: '1px solid #ccc',
    marginBottom: '.75rem',
    maxWidth: '100%'
};

const quickNavStyle = {
    flex: '0 0 200px',
};

const images = [
    { href: '#1', title: 'Kompleksoe snabjenie1' },
    { href: '#2', title: 'Kompleksoe snabjenie2' },
    { href: '#3', title: 'Kompleksoe snabjenie3' },
    { href: '#4', title: 'Shkola svarshika' }
];

const Design = ({ project }) => (
    <Layout navBar={false}>
        <div style={{ display: 'flex' }}>
            <div style={quickNavStyle}>
                <div style={{position: 'fixed' }}>
                    <a href={project.href}>Back</a>
                    <br/>
                    <br/>
                    <List items={images} />
                </div>
            </div>
            <div style={style}>
                <h2 id='1'>Kompleksoe snabjenie1</h2>
                <img style={imageStyle} src="http://www.poligon.farpost.com/v2/apps/poligon/add_files/41601.jpg" />
                <h2 id='2'>Kompleksoe snabjenie2</h2>
                <img style={imageStyle} src="http://www.poligon.farpost.com/v2/apps/poligon/add_files/41602.jpg" />
                <h2 id='3'>Kompleksoe snabjenie3</h2>
                <img style={imageStyle} src="http://www.poligon.farpost.com/v2/apps/poligon/add_files/41801.jpg" />
                <h2 id='4'>Shkola svarshika</h2>
                <img style={imageStyle} src="http://www.poligon.farpost.com/v2/apps/poligon/add_files/dazel_1920px_tekst2.jpg" />
            </div>
        </div>
    </Layout>
);

Design.getInitialProps = ({ req }) => {
    const { query } = url.parse(req.url, true);
    const designId = Number(query.id);
    const desing = fakeDesign.find(item => item.id === designId);
    if (!desing) {
        throw 'Desing not found';
    }
    const project = fakeProjects.find(item => item.id === desing.project);
    if (!project) {
        throw 'Project for desing not found';
    }
    return { project };
};

export default Design;
