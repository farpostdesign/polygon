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
        <div className="p-small-hide">
            <AnchorButton href="/projects/new" text="New Project" />
        </div>
        <ProjectsList items={projects} />
    </Layout>
);

Index.getInitialProps = () => {
    const projects = fakeProjects
        .filter(item => {
            return typeof(item.parent) === 'undefined' &&
                item.title[0].toUpperCase() === fakeCurrentLetter;
        });
    return { projects };
};

Index.propTypes = {
    projects: PropTypes.array
};

export default Index;
