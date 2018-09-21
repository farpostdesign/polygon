import PropTypes from 'prop-types';
import ProjectsList from '../components/List';
import LettersFilter from '../components/LettersFilter';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { InlineCreate } from '../components/forms';
import fakeProjects from '../fakeProjects';

const fakeCurrentLetter = 'D';
const Index = ({ projects }) => (
    <Layout>
        <Section>
            <InlineCreate text="Add Project" stubRedirect="/projects?id=100"/>
        </Section>
        <LettersFilter current={fakeCurrentLetter} />
        <Section>
            <ProjectsList items={projects} />
        </Section>
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
