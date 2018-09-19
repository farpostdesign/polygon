import PropTypes from 'prop-types';
import ProjectsList from '../components/List';
import LettersFilter from '../components/LettersFilter';
import Layout from '../components/Layout';
import AnchorButton from '../components/AnchorButton';
import fakeProjects from '../fakeProjects';

const fakeCurrentLetter = 'D';
const Index = ({ projects }) => (
    <Layout>
        <LettersFilter current={fakeCurrentLetter} />
        <AnchorButton href="/projects/new" text="New Project" />
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
