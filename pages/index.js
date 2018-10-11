import PropTypes from 'prop-types';
import Router from 'next/router';
import ProjectsList from '../components/List';
import LettersFilter from '../components/LettersFilter';
import Layout from '../components/Layout';
import Section from '../components/Section';
import { InlineCreate } from '../components/forms';
import store from '../services/store';
import 'isomorphic-unfetch';

const fakeCurrentLetter = 'D';

const Index = ({ projects }) => (
    <Layout>
        <Section>
            <InlineCreate name="name"
                text="Add Project"
                handleSubmit={(attributes) => {
                    store.dispatch({ type: 'addProject', attributes })
                        .then((res) => {
                            if (res.errors) {
                                throw res.errors;
                            }
                            const project = res.data;
                            Router.push(`/projects?id=${project._id}`);
                        }).catch(alert);
                }}/>
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
