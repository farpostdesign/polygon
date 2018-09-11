import ProjectsList from '../components/List';
import LettersFilter from '../components/LettersFilter';
import Layout from '../components/Layout';
import fakeProjects from '../fakeProjects';

const fakeCurrentLetter = 'D';
const Index = () => (
    <Layout>
        <LettersFilter current={fakeCurrentLetter} />
        <ProjectsList items={fakeProjects} />
    </Layout>
);

export default Index;
