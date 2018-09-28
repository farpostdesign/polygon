import PropTypes from 'prop-types';
import ProjectsList from '../components/List';
import LettersFilter from '../components/LettersFilter';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { InlineCreate } from '../components/forms';
import 'isomorphic-unfetch';

const fakeCurrentLetter = 'D';
const Index = ({ projects }) => (
    <Layout>
        <Section>
            <InlineCreate name="name" text="Add Project" stubRedirect="/projects?id=100"/>
        </Section>
        <LettersFilter current={fakeCurrentLetter} />
        <Section>
            <ProjectsList items={projects} />
        </Section>
    </Layout>
);

Index.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/projects');
    const projects = await res.json();
    return { projects };
};

Index.propTypes = {
    projects: PropTypes.array
};

export default Index;
