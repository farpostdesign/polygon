import PropTypes from 'prop-types';
import ProjectsList from '../components/List';
import LettersFilter from '../components/LettersFilter';
import Layout from '../components/Layout';
import fakeProjects from '../fakeProjects';

const fakeCurrentLetter = 'D';
const Index = ({ projects }) => (
    <Layout>
        <LettersFilter current={fakeCurrentLetter} />
        <ProjectsList items={projects} />
    </Layout>
);

Index.getInitialProps = () => {
    const projects = fakeProjects
        .filter(item => typeof(item.parent) === 'undefined');
    return { projects };
};

Index.propTypes = {
    projects: PropTypes.array
};

export default Index;
